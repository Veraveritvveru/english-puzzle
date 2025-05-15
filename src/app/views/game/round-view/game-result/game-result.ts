import './game-result.scss';
import BaseComponent from "../../../../components/base-component";
import { ImageData } from '../../../../utils/types';
import { getWordsCount } from '../../../../utils/utils';
import { ChoosenSentensesData } from '../../../../utils/types';
import { WordComponent } from '../../../../components/word/word-component';

// const URL = 'https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/images/';

export class GameResult extends BaseComponent {
  imageData: ImageData;
  sentencesData: ChoosenSentensesData;

  constructor(imageData: ImageData, sentencesData: ChoosenSentensesData) {
    super({ tagName: 'div', classNames: ['game-result'] });
    this.imageData = imageData;
    this.sentencesData = sentencesData;

    this.drawResultBlock();
  }

  drawResultBlock() {
    const sentencesArr = this.sentencesData.sentences;
    const lineArr = [];

    for (let i = 0; i <= 9; i++) {
      const sentenceLine = new BaseComponent({ tagName: 'div', classNames: ['sentence-line'] });
      this.append(sentenceLine);
      lineArr.push(sentenceLine);

      const wordsCount = getWordsCount(this.sentencesData.sentences);
      
      for (let j = 0; j < wordsCount[i]; j++) {
        const emptyWord = new WordComponent({ isEmpty: true }); 
        const widthArr = emptyWord.setWordsWidth(sentencesArr[i]);
        emptyWord.getElement().style.width = `${widthArr[j]}px`;
        sentenceLine.append(emptyWord);
      }
    }
  }
}