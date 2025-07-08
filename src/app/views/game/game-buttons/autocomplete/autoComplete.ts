import BaseComponent from "../../../../components/base-component";
import ButtonComponent from "../../../../components/button/button";
import WordComponent from "../../../../components/word/word-component";
import GameResult from "../../round-view/game-result/game-result";
import GameSource from "../../round-view/game-source/game-source";
import CheckContinue from "../check-continue/check-contionue";

export default class AutoComplete extends ButtonComponent {
  gameResult: GameResult;
  gameSource: GameSource;
  currentLine: BaseComponent;
  currentWords: WordComponent[];
  checkContinue: CheckContinue;
  level: number;
  round: number;
  count: number;

  constructor(
    gameResult: GameResult,
    gameSource: GameSource,
    checkContinue: CheckContinue,
    level: number,
    round: number
  ) {
    super('button', 'auto-complete', 'Auto-complete');
    this.gameResult = gameResult;
    this.gameSource = gameSource;
    this.checkContinue = checkContinue;

    this.level = level;
    this.round = round;
    this.count = 0;

    this.currentLine = this.gameResult.sentenceLines[this.count];
    this.currentWords = this.gameSource.originalWordsElements;

    this.addListener('click', () => {
      this.complete();
    });
  }

  private complete = () => {
    const lines = document.querySelectorAll('.sentence-line');
    const currentLine = lines[this.count];
    if (!currentLine) return;

    const words = this.gameSource.originalWordsElements;

    for (let i = 0; i < words.length; i++) {
      currentLine.append(words[i].getElement());
      words[i].setClasses(['online']);
    }
  }
}