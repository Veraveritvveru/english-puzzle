import './game-result.scss';
import BaseComponent from "../../../../components/base-component";
import { ImageData } from '../../../../utils/types';

export default class GameResult extends BaseComponent {
  sentenceLines: BaseComponent[] = [];
  imageData: ImageData;

  constructor(imageData: ImageData) {
    super({ tagName: 'div', classNames: ['game-result'] });
    this.imageData = imageData;

    this.drawResultBlock();
  }

  private drawResultBlock(): void {
    for (let i = 0; i <= 9; i++) {
      const sentenceLine = new BaseComponent({ tagName: 'div', classNames: ['sentence-line'] });
      this.append(sentenceLine);
      this.sentenceLines.push(sentenceLine);
    }
  }
}