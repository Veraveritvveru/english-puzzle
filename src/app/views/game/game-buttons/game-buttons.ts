import './game-buttons.scss';
import BaseComponent from '../../../components/base-component';
import CheckContinue from './check-continue/check-contionue';
import AutoComplete from './autoComplete/autoComplete';
import GameSource from '../round-view/game-source/game-source';
import GameResult from '../round-view/game-result/game-result';
import HintsSection from '../round-view/hints-section/hints-section';
import { SelectMenu } from '../select-menu/select-menu';
import { ImageData } from '../../../utils/types';

export default class GameButtons extends BaseComponent {
  checkContinue: CheckContinue;
  autoComplete: AutoComplete;
  gameSource: GameSource;
  gameResult: GameResult;
  hintsSection: HintsSection;
  selectMenu: SelectMenu;
  imageData: ImageData;
  count: number;
  
  constructor(
    hintsSection: HintsSection,
    gameResult: GameResult,
    gameSource: GameSource,
    selectMenu: SelectMenu,
    imageData: ImageData,
    level: number,
    round: number,
  ) {
    super({ tagName: 'div', classNames: ['game-buttons'] });
    this.gameResult = gameResult;
    this.gameSource = gameSource;
    this.hintsSection = hintsSection;
    this.selectMenu = selectMenu;
    this.imageData = imageData;
    this.count = 0;

    this.checkContinue = new CheckContinue(this,
      this.gameResult,
      this.gameSource,
      level,
      round,
      this.hintsSection,
      this.selectMenu,
    );
    this.autoComplete = new AutoComplete(
      this.gameResult,
      this.gameSource,
      this.checkContinue,
      this,
      imageData,
      level,
      round,
    );
    
      this.append(this.autoComplete, this.checkContinue);
  }

  public incrementCount(): void {
    this.count++;
  }

  public getCurrentCount(): number {
    return this.count;
  }
}