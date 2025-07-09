import ButtonComponent from "../../../../components/button/button";
import GameSource from "../../round-view/game-source/game-source";
import HintsSection from "../../round-view/hints-section/hints-section";
import { GameStore, gameStore } from "../../../../store/game-store";
import { levelsArr } from "../../../../utils/utils";
import { SelectMenu } from "../../select-menu/select-menu";
import GameResult from "../../round-view/game-result/game-result";
import GameButtons from "../game-buttons";
import ImageHint from "../../round-view/hints-section/image-hint/image-hint";

export default class CheckContinue extends ButtonComponent {
  gameStore: GameStore;
  gameSource: GameSource;
  hintsSection: HintsSection;
  selectMenu: SelectMenu;
  gameResult: GameResult;
  parentContainer: GameButtons;
  imageHint: ImageHint | undefined;

  level: number;
  round: number;
  count: number;

  idArray: number[] | undefined;
  line: HTMLElement | undefined;

  constructor(
    parentContainer: GameButtons,
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
    this.parentContainer = parentContainer;
    this.imageHint = this.hintsSection.imageHint;

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
      this.showMistake();
    }
  }

  showMistake = () => {
    this.line = this.gameResult.sentenceLines[this.count].getElement();
    const words = Array.from(this.line.children) as HTMLElement[];

    if (this.idArray) {
      const sortedArr = this.idArray.sort((a, b) => +a - +b);
      for (let i = 0; i < words.length; i++) {
        if (+words[i].id !== sortedArr[i]) {
          this.hightlightWord(words[i], 'wrong');
          setTimeout(() => {
            this.removeHighlight(words[i]);
          }, 2500)
        } else {
          this.hightlightWord(words[i], 'correct');
          setTimeout(() => {
            this.removeHighlight(words[i]);
          }, 2500)
        }
      }
    }
  }

  private toNextSentence() {
    this.count += 1;
    this.parentContainer.incrementCount();
    const updatedCount = this.parentContainer.getCurrentCount();
    this.gameSource.removeWords();
    this.gameSource.addWords(this.count);
    this.hintsSection.updateHints();

    if (this.gameStore.getOption('imageHint')) {
      this.gameSource.showBackgroundImg(this.count);
    }

    this.imageHint?.updateCount(updatedCount);
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

  private continue(): void {
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

  private hightlightWord(word: HTMLElement, value: string): void {
    word.classList.add(`word_${value}`);
  }

  private removeHighlight(word: HTMLElement): void {
    word.classList.remove('word_correct');
    word.classList.remove('word_wrong');
  }
}