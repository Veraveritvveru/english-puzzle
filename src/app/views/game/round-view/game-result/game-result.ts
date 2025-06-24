import './game-result.scss';
import BaseComponent from "../../../../components/base-component";

export class GameResult extends BaseComponent {
  sentenceLines: BaseComponent[] = [];

  constructor() {
    super({ tagName: 'div', classNames: ['game-result'] });

    this.drawResultBlock();
  }

  drawResultBlock() {
    for (let i = 0; i <= 9; i++) {
      const sentenceLine = new BaseComponent({ tagName: 'div', classNames: ['sentence-line'] });
      this.append(sentenceLine);
      this.sentenceLines.push(sentenceLine);
    }
  }
}