import BaseComponent from "../../../../components/base-component";
import ButtonComponent from "../../../../components/button/button";
import WordComponent from "../../../../components/word/word-component";
import GameResult from "../../round-view/game-result/game-result";
import GameSource from "../../round-view/game-source/game-source";
import CheckContinue from "../check-continue/check-contionue";
import GameButtons from "../game-buttons";
import { ImageData } from "../../../../utils/types";

export default class AutoComplete extends ButtonComponent {
  gameResult: GameResult;
  gameSource: GameSource;
  currentLine: BaseComponent;
  currentWords: WordComponent[];
  checkContinue: CheckContinue;
  parentContainer: GameButtons;
  imageData: ImageData;

  level: number;
  round: number;
  count: number;

  constructor(
    gameResult: GameResult,
    gameSource: GameSource,
    checkContinue: CheckContinue,
    parentContainer: GameButtons,
    imageData: ImageData,
    level: number,
    round: number,
  ) {
    super('button', 'auto-complete', 'Auto-complete');
    this.gameResult = gameResult;
    this.gameSource = gameSource;
    this.checkContinue = checkContinue;
    this.parentContainer = parentContainer;
    this.imageData = imageData;

    this.level = level;
    this.round = round;
    this.count = 0;

    this.currentLine = this.gameResult.sentenceLines[this.count];
    this.currentWords = this.gameSource.originalWordsElements;

    this.addListener('click', () => {
      this.complete(this.parentContainer.getCurrentCount());
    });
  }

  private complete = (count: number) => {
    const lines = document.querySelectorAll('.sentence-line');
    const currentLine = lines[count];
    if (!currentLine) return;

    const words = this.gameSource.originalWordsElements;
    let xPosition = 0;

    for (let i = 0; i < words.length; i++) {
      currentLine.append(words[i].getElement());
      words[i].setClasses(['online']);
      words[i].getElement().style.pointerEvents = 'none';

      words[i].setBackgroundImgInBody(this.imageData.imageSrc, xPosition, count * 10);
      xPosition += words[i].getElement().offsetWidth;
      words[i].setBackgroundImgInRight(this.imageData.imageSrc, xPosition - 6, count * 10);
    }

    this.checkContinue.setTextContent('Continue');
    this.checkContinue.getElement().removeAttribute('disabled');
    this.disableBtn();

    if (count === 9) {
      this.checkContinue.endOfRound();
    }
  }
}