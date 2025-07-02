import ButtonComponent from "../../../../components/button/button";
import GameSource from "../../round-view/game-source/game-source";
import HintsSection from "../../round-view/hints-section/hints-section";
import { GameStore, gameStore } from "../../../../store/game-store";
export default class CheckContinue extends ButtonComponent {
  gameStore: GameStore;
  gameSource: GameSource;
  hintsSection: HintsSection;

  level: number;
  round: number;
  count: number;

  constructor(
    gameSource: GameSource,
    level: number,
    round: number,
    hintsSection: HintsSection,
  ) {
    super('button', 'check-button', 'Check');
    this.gameStore = gameStore;
    this.gameSource = gameSource;
    this.level = level;
    this.round = round;
    this.count = 0;
    this.hintsSection = hintsSection;

    // this.disableBtn();
    this.addListener('click', () => {
      if (this.getElement().textContent === 'Check') {
        this.check();
      } else {
        this.toNextSentence();
      }
    })

  }

  private check() {
    this.setTextContent('Continue');
  }

  private toNextSentence = () => {
    this.count++;
    this.gameSource.removeWords();
    this.gameSource.addWords(this.count);
    this.hintsSection.updateHints();

    if (this.gameStore.getOption('imageHint')) {
      this.gameSource.showBackgroundImg(this.count);
    }
  }
}