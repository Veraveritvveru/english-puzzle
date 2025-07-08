import './game-source.scss';
import BaseComponent from "../../../../components/base-component";
import { ChoosenSentensesData, ImageData } from '../../../../utils/types';
import WordComponent from "../../../../components/word/word-component";
import { getWordsArr } from "../../../../utils/utils";
import GameResult from '../game-result/game-result';
import DragAndDrop from './drag-n-drop';

export default class GameSource extends BaseComponent<HTMLDivElement> {
  sentencesData: ChoosenSentensesData;
  imageData: ImageData;
  widthArr: number[] | undefined;
  gameResult: GameResult;
  dragAndDrop: DragAndDrop

  shuffledWordsElements: WordComponent[] = [];
  originalWordsElements: WordComponent[] = [];
  count: number;

  constructor(
    sentencesData: ChoosenSentensesData,
    imageData: ImageData,
    gameResult: GameResult,
    count: number,
  ) {
    super({ tagName: 'div', classNames: ['game-source'] });

    this.sentencesData = sentencesData;
    this.imageData = imageData;
    this.count = count;
    this.gameResult = gameResult;
    this.addWords(this.count);

    this.dragAndDrop = new DragAndDrop(
      this.gameResult,
      this.getElement(),
      this.shuffledWordsElements,
      this.count,
    )
  }

  public addWords(currentSentenceNum: number): void {
    const currentSentence = this.sentencesData.sentences[currentSentenceNum];
    const wordsInSentenceArr = getWordsArr(this.sentencesData, currentSentenceNum);

    wordsInSentenceArr.forEach((wordText, index) => {
      const isFirst = index === 0;
      const isLast = index === wordsInSentenceArr.length - 1;

      const word = new WordComponent({ isFirst, isLast });
      this.widthArr = word.setWordsWidth(currentSentence);

      word.getElement().style.width = `${this.widthArr[index]}px`;
      this.append(word);
      word.setTextContent(wordText);
      word.setAttributes({ 'id': `${index}` })
      this.shuffledWordsElements.push(word);
      this.originalWordsElements.push(word);
    })

    this.shuffleWords(this.shuffledWordsElements);
  }

  private shuffleWords(wordsElemArr: WordComponent[]): void {
    for (let i = wordsElemArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [wordsElemArr[i], wordsElemArr[j]] = [wordsElemArr[j], wordsElemArr[i]]
    }
    this.updateDOMOrder(wordsElemArr);
  }

  public updateDOMOrder(wordsElemArr: WordComponent[]): void {
    this.element.innerHTML = '';
    wordsElemArr.forEach((word) => this.append(word));
  }

  public removeWords(): void {
    this.shuffledWordsElements = [];
    this.originalWordsElements = [];
    this.getElement().innerHTML = '';
  }

  public showBackgroundImg(count: number): void {
    const imageSrc = this.imageData.imageSrc;
    let lengthCount = 0;

    for (let i = 0; i < this.originalWordsElements.length; i++) {
      if (this.widthArr) {
        this.originalWordsElements[i].setBackgroundImgInBody(imageSrc, lengthCount, count * 10);
        lengthCount += this.widthArr[i];
        this.originalWordsElements[i].setBackgroundImgInRight(imageSrc, lengthCount - 6, count * 10);
      }
    }
  }

  public hideBackgroundImg(): void {
    for (let i = 0; i < this.originalWordsElements.length; i++) {
      if (this.widthArr) {
        this.originalWordsElements[i].setBackgroundImgInBody('', 0, 0);
        this.originalWordsElements[i].setBackgroundImgInRight('', 0, 0);
      }
    }
  }

  public addDragAndDrop(count: number): void {
    this.dragAndDrop = new DragAndDrop(
      this.gameResult,
      this.getElement(),
      this.shuffledWordsElements,
      count,
    )
    this.dragAndDrop.bindEvents();
  }
}