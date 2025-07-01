import './game-buttons.scss';
import BaseComponent from '../../../components/base-component';
import CheckContinue from './check-continue/check-contionue';
import AutoComplete from './autoComplete/autoComplete';
import GameSource from '../round-view/game-source/game-source';
import { GameResult } from '../round-view/game-result/game-result';

export default class GameButtons extends BaseComponent {
  checkContinue: CheckContinue;
  autoComplete: AutoComplete;
  gameSource: GameSource;
  gameResult: GameResult;

  constructor(gameResult: GameResult, gameSource: GameSource, level: number, round: number) {
    super({ tagName: 'div', classNames: ['game-buttons'] });
    this.gameResult = gameResult;
    this.gameSource = gameSource;

    this.checkContinue = new CheckContinue(level, round);
    this.autoComplete = new AutoComplete(this.gameResult, this.gameSource, this.checkContinue, level, round);
    this.append(this.autoComplete, this.checkContinue);
  }
}