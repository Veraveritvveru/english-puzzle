import './round-view.scss';
import BaseComponent from "../../../components/base-component";
import { GameResult } from "./game-result/game-result";
import { GameSource } from "./game-source/game-source";
import { getRoundData } from '../../../utils/utils';
import { ImageData, ChoosenSentensesData } from '../../../utils/types';

// const URL = 'https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/images/';

export class RoundView extends BaseComponent {
  level: number;
  round: number;

  imageData: ImageData;
  sentencesData: ChoosenSentensesData;
  gameResult: GameResult;

  constructor(level: number, round: number,) {
    super({ tagName: 'div', classNames: ['round-view'] });
    this.level = level;
    this.round = round;

    this.imageData = this.getImageData();
    this.sentencesData = this.getSentencesData();

    this.gameResult = new GameResult(this.imageData, this.sentencesData);
    const gameSource = new GameSource(this.sentencesData);
    this.append( this.gameResult, gameSource);
    this.getSentencesData();
  }

  getImageData = (): ImageData => {
    const roundData = getRoundData(this.level, this.round);
    return {
      name: roundData.levelData.name,
      imageSrc: roundData.levelData.imageSrc,
    }
  }

  getSentencesData(): ChoosenSentensesData {
    const roundData = getRoundData(this.level, this.round);
    return {
      sentences: roundData.words.map((elem) => elem.textExample),
      translates: roundData.words.map((elem) => elem.textExampleTranslate),
      audios: roundData.words.map((elem) => elem.audioExample),
    }
  }
}

// const fieldWidth = 700;

// export default class RoundView extends BaseElement {
//   sentensesData: ChoosenSentensesData;

//   imageData: ImageData;

//   level: number;

//   round: number;

//   constructor(level: number, round: number) {
//     super({ tag: 'section', className: 'round-view' });

//     this.level = level;
//     this.round = round;

//     this.sentensesData = this.getSentensesData();
//     this.imageData = this.getImageData();

//     this.draw(fieldWidth);
//   }

//   private getSentensesData(): ChoosenSentensesData {
//     const roundData = new UserSelect(this.level, this.round);
//     return {
//       sentenses: roundData.getSentenses(),
//       translate: roundData.getTranslate(),
//       audioSrc: roundData.getAudioSrc(),
//     };
//   }

//   private getImageData(): ImageData {
//     const roundData = new UserSelect(this.level, this.round);
//     return {
//       imgSrc: roundData.getImgSrc(),
//       imgTitle: roundData.getImageTitle(),
//       imgAuthor: roundData.getImageAuthorAndYear(),
//     };
//   }

//   async draw(desiredWidth: number) {
//     const sizes: Sizes = await this.getSizes(desiredWidth);
//     const cutElements: CutElements = this.getCutElements(sizes);

//     const elements = this.initElements(sizes, cutElements);

//     this.appendChildren(...elements);
//   }

//   private async getSizes(desiredWidth: number) {
//     const picture = new PicSizes(this.imageData.imgSrc);
//     const sizes = await picture.getSizes();
//     this.imageData.imgSrc = picture.src;

//     const desiredHeight = (desiredWidth / sizes.blockWidth) * sizes.blockHeight;
//     return {
//       blockWidth: desiredWidth,
//       blockHeight: desiredHeight,
//     };
//   }

//   private getCutElements(sizes: Sizes): CutElements {
//     const slicer = new Slicer(
//       sizes,
//       this.sentensesData.sentenses,
//       this.imageData.imgSrc
//     );
//     return slicer.cut();
//   }

//   private addUpdateListener(
//     hints: Hints,
//     sourceBlock: SourceBlock,
//     interactButtons: InteractButtons
//   ) {
//     this.addListener('next-sentense', () => {
//       hints.updateHintsData();
//       sourceBlock.updatePieces();
//       interactButtons.idkButton.updateListener();
//       interactButtons.checkButton.updateCounter();
//       interactButtons.checkAndContinue.transformToCheck();
//     });
//   }

//   private initElements(sizes: Sizes, cutElements: CutElements) {
//     const resultBlock = new ResultBlock(
//       sizes,
//       this.imageData,
//       ...cutElements.lines
//     );
//     const sourceBlock = new SourceBlock(
//       cutElements.pieces,
//       cutElements.lines,
//       sizes
//     );
//     const statistics = new Statistics(
//       this.level,
//       this.round,
//       this.imageData.imgSrc
//     );
//     const interactButtons = new InteractButtons(
//       cutElements.pieces,
//       cutElements.lines,
//       this.level,
//       this.round,
//       statistics
//     );

//     const hints = new Hints(this.sentensesData);

//     const switches = new Switches(
//       hints.translateBlock,
//       hints.audioBlock,
//       this.imageData.imgSrc,
//       cutElements.pieces
//     );

//     this.addUpdateListener(hints, sourceBlock, interactButtons);

//     return [
//       switches,
//       hints,
//       resultBlock,
//       sourceBlock,
//       interactButtons,
//       statistics,
//     ];
//   }
// }



// export default class UserSelect {
//   level: number;

//   round: number;

//   roundData: RoundData;

//   sentensesData: SentenseData[];

//   constructor(level: number, round: number) {
//     this.level = level;
//     this.round = round;

//     this.roundData = this.getData();
//     this.sentensesData = this.roundData.words;
//   }

//   private getData(): RoundData {
//     const level = sources[this.level - 1];
//     return level.rounds[this.round - 1];
//   }

//   getImgSrc(): string {
//     return this.roundData.levelData.imageSrc;
//   }

//   getImageTitle(): string {
//     return this.roundData.levelData.name;
//   }

//   getImageAuthorAndYear(): string {
//     return `${this.roundData.levelData.author}, ${this.roundData.levelData.year}`;
//   }

//   getSentenses(): string[] {
//     return this.sentensesData.map((elem) => elem.textExample);
//   }

//   getTranslate(): string[] {
//     return this.sentensesData.map((elem) => elem.textExampleTranslate);
//   }

//   getAudioSrc(): string[] {
//     return this.sentensesData.map((elem) => elem.audioExample);
//   }
// }
