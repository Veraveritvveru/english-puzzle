import ButtonComponent from "../../../../components/button/button";
import GameSource from "../../round-view/game-source/game-source";
import HintsSection from "../../round-view/hints-section/hints-section";
import { GameStore, gameStore } from "../../../../store/game-store";
import { levelsArr } from "../../../../utils/utils";
import { SelectMenu } from "../../select-menu/select-menu";
import GameResult from "../../round-view/game-result/game-result";

export default class CheckContinue extends ButtonComponent {
  gameStore: GameStore;
  gameSource: GameSource;
  hintsSection: HintsSection;
  selectMenu: SelectMenu;
  gameResult: GameResult;


  level: number;
  round: number;
  count: number;

  idArray: number[] | undefined;
  line: HTMLElement | undefined;

  constructor(
    gameResult: GameResult,
    gameSource: GameSource,
    level: number,
    round: number,
    hintsSection: HintsSection,
    selectMenu: SelectMenu,
  ) {
    super('button', 'check-button', 'Check');
    this.gameResult = gameResult;
    this.gameStore = gameStore;
    this.gameSource = gameSource;
    this.selectMenu = selectMenu;
    this.level = level;
    this.round = round;
    this.count = 0;
    this.hintsSection = hintsSection;

    this.disableBtn();
    this.addListener('click', () => {
      if (this.getElement().textContent === 'Check') {
        this.check();
      } else {
        this.continue();
      }
    })

  }

  private check = () => {
    this.line = this.gameResult.sentenceLines[this.count].getElement();
   
    const words = Array.from(this.line.children) as HTMLElement[];

    this.idArray = Array.from(this.line.children).map((word) => {
      return +word.id;
    });
    const sortedArr = [...this.idArray].sort((a, b) => +a - +b);

    if (sortedArr.join('') === this.idArray.join('')) {
      words.forEach((child, id) => {
        this.hightlightWord(child, 'correct');
        child.style.pointerEvents = 'none';
        setTimeout(() => {
          this.removeHighlight(words[id]);
        }, 2500)
      });

      this.gameSource.showBackgroundImg(this.count);
      this.setTextContent('Continue');
      this.idArray = [];
    } else {
      console.log('not ok');
      // this.showMistake();
    }
  }

  private toNextSentence() {
    this.count += 1;
    this.gameSource.removeWords();
    this.gameSource.addWords(this.count);
    this.hintsSection.updateHints();

    if (this.gameStore.getOption('imageHint')) {
      this.gameSource.showBackgroundImg(this.count);
    }

    this.gameSource.addDragAndDrop(this.count);
  }

  private toNextRound() {

    this.count = 0;
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
    const autoCompleteBtn = document.querySelector('.auto-complete');
    autoCompleteBtn?.removeAttribute('disabled');
    
    if (this.count === 9) {
      this.toNextRound()
    }

    if (this.count === 9 && this.round >= levelsArr[this.level - 1].roundsCount) {
      this.toNextLevel()
    }

    this.toNextSentence();

    this.disableBtn();
    this.setTextContent('Check');
  }

  hightlightWord(word: HTMLElement, value: string) {
    word.classList.add(`word_${value}`);
  }

  removeHighlight(word: HTMLElement) {
    word.classList.remove('word_correct');
    word.classList.remove('word_wrong');
  }
}