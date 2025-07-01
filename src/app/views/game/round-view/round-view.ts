import './round-view.scss';
import BaseComponent from "../../../components/base-component";
import { GameStore, gameStore } from '../../../store/game-store';
import { GameResult } from "./game-result/game-result";
import GameSource from "./game-source/game-source";
import { getRoundData } from '../../../utils/utils';
import { ImageData, ChoosenSentensesData } from '../../../utils/types';
import GameButtons from '../game-buttons/game-buttons';
import HintsSection from './hints-section/hints-section';

export default class RoundView extends BaseComponent {
  level: number;
  round: number;
  imageData: ImageData;
  sentencesData: ChoosenSentensesData;

  gameStore: GameStore;
  gameResult: GameResult;
  gameSource: GameSource;
  gameButtons: GameButtons;
  hintsSection: HintsSection;

  constructor(level: number, round: number) {
    super({ tagName: 'div', classNames: ['round-view'] });
    this.level = level;
    this.round = round;
    this.gameStore = gameStore;

    this.imageData = this.getImageData();
    this.sentencesData = this.getSentencesData();
    this.hintsSection = new HintsSection(this.sentencesData);

    this.gameResult = new GameResult();
    this.gameSource = new GameSource(this.sentencesData, this.imageData, this.gameResult, 0);
    this.gameButtons = new GameButtons(this.hintsSection, this.gameResult, this.gameSource, this.level, this.round);
    this.append(this.hintsSection, this.gameResult, this.gameSource, this.gameButtons);
  }

  private getImageData(): ImageData {
    const roundData = getRoundData(this.level, this.round);
    return {
      name: roundData.levelData.name,
      imageSrc: roundData.levelData.imageSrc,
    }
  }

  private getSentencesData(): ChoosenSentensesData {
    const roundData = getRoundData(this.level, this.round);
    return {
      sentences: roundData.words.map((elem) => elem.textExample),
      translates: roundData.words.map((elem) => elem.textExampleTranslate),
      audios: roundData.words.map((elem) => elem.audioExample),
    }
  }
}
