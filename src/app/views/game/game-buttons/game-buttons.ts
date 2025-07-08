import './game-buttons.scss';
import BaseComponent from '../../../components/base-component';
import CheckContinue from './check-continue/check-contionue';
import AutoComplete from './autoComplete/autoComplete';
import GameSource from '../round-view/game-source/game-source';
import GameResult from '../round-view/game-result/game-result';
import HintsSection from '../round-view/hints-section/hints-section';
import { SelectMenu } from '../select-menu/select-menu';

export default class GameButtons extends BaseComponent {
  checkContinue: CheckContinue;
  autoComplete: AutoComplete;
  gameSource: GameSource;
  gameResult: GameResult;
  hintsSection: HintsSection;
  selectMenu: SelectMenu;
  
  constructor(
    hintsSection: HintsSection,
    gameResult: GameResult,
    gameSource: GameSource,
    selectMenu: SelectMenu,
    level: number,
    round: number
  ) {
    super({ tagName: 'div', classNames: ['game-buttons'] });
    this.gameResult = gameResult;
    this.gameSource = gameSource;
    this.hintsSection = hintsSection;
    this.selectMenu = selectMenu;

    this.checkContinue = new CheckContinue(this.gameResult, this.gameSource, level, round, this.hintsSection, this.selectMenu);
    this.autoComplete = new AutoComplete(this.gameResult, this.gameSource, this.checkContinue, level, round);
    this.append(this.autoComplete, this.checkContinue);
  }
}