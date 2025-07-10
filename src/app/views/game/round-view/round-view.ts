import './round-view.scss';
import BaseComponent from "../../../components/base-component";
import { GameStore, gameStore } from '../../../store/game-store';
import GameResult from "./game-result/game-result";
import GameSource from "./game-source/game-source";
import { getRoundData } from '../../../utils/utils';
import { ImageData, ChoosenSentensesData } from '../../../utils/types';
import GameButtons from '../game-buttons/game-buttons';
import HintsSection from './hints-section/hints-section';
import { SelectMenu } from '../select-menu/select-menu';

export default class RoundView extends BaseComponent {
  level: number;
  round: number;
  count: number;
  imageData: ImageData;
  sentencesData: ChoosenSentensesData;

  gameStore: GameStore;
  gameResult: GameResult;
  gameSource: GameSource;
  gameButtons: GameButtons;
  hintsSection: HintsSection;
  selectMenu: SelectMenu;

  constructor(level: number, round: number, selectMenu: SelectMenu) {
    super({ tagName: 'div', classNames: ['round-view'] });
    this.level = level;
    this.round = round;
    this.gameStore = gameStore;
    this.selectMenu = selectMenu;
    this.count = 0;

    this.imageData = this.getImageData();
    this.sentencesData = this.getSentencesData();
  
    this.gameResult = new GameResult(this.imageData);
    this.gameSource = new GameSource(this.sentencesData, this.imageData, this.gameResult, this.count);
    
    this.hintsSection = new HintsSection(this.sentencesData, this.gameSource, this.imageData, this.count);
    this.gameButtons = new GameButtons(
      this.hintsSection,
      this.gameResult,
      this.gameSource,
      this.selectMenu,
      this.imageData,
      this.level,
      this.round);
      
    this.append(this.hintsSection, this.gameResult, this.gameSource, this.gameButtons);
  }

  private getImageData(): ImageData {
    const roundData = getRoundData(this.level, this.round);
    return {
      name: roundData.levelData.name,
      imageSrc: roundData.levelData.imageSrc,
      author: roundData.levelData.author,
      year: roundData.levelData.year,
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
