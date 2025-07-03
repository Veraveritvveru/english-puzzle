import ButtonComponent from "../../../../components/button/button";
import GameSource from "../../round-view/game-source/game-source";
import HintsSection from "../../round-view/hints-section/hints-section";
import { GameStore, gameStore } from "../../../../store/game-store";
import { levelsArr } from "../../../../utils/utils";
import { SelectMenu } from "../../select-menu/select-menu";

export default class CheckContinue extends ButtonComponent {
  gameStore: GameStore;
  gameSource: GameSource;
  hintsSection: HintsSection;
  selectMenu: SelectMenu;

  level: number;
  round: number;
  count: number;

  constructor(
    gameSource: GameSource,
    level: number,
    round: number,
    hintsSection: HintsSection,
    selectMenu: SelectMenu,
  ) {
    super('button', 'check-button', 'Check');
    this.gameStore = gameStore;
    this.gameSource = gameSource;
    this.selectMenu = selectMenu;
    this.level = level;
    this.round = round;
    this.count = 0;
    this.hintsSection = hintsSection;

    // this.disableBtn();
    this.addListener('click', () => {
      if (this.getElement().textContent === 'Check') {
        this.check();
      } else {
        this.continue();
      }
    })

  }

  private check() {
    this.setTextContent('Continue');
  }

  private toNextSentence() {
    this.count++;
    this.gameSource.removeWords();
    this.gameSource.addWords(this.count);
    this.hintsSection.updateHints();
    if (this.gameStore.getOption('imageHint')) {
      this.gameSource.showBackgroundImg(this.count);
    }
  }

  private toNextRound() {
    this.element.dispatchEvent(new CustomEvent('next-round', {
      bubbles: true,
      detail: { level: this.level, round: this.round + 1 },
    }));
  }

  private toNextLevel() {
    this.level++;
    this.round = 1;

    this.element.dispatchEvent(new CustomEvent('next-level', {
      bubbles: true,
      detail: { level: this.level, round: this.round },
    }));

    this.selectMenu.getElement().dispatchEvent(new CustomEvent('update-state', {
      bubbles: true,
      detail: { level: this.level, round: this.round },
    }));
  }

  private continue() {
    this.toNextSentence();

    if (this.count === 9) {
      this.toNextRound()
    }

    if (this.count === 9 && this.round >= levelsArr[this.level - 1].roundsCount) {
      this.toNextLevel()
    }
  }
}