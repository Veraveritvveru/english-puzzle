import BaseComponent from "../../../components/base-component";
import { GameStore, gameStore } from '../../../store/game-store';

export default class RoundView extends BaseComponent {
  level: number;
  round: number;

  gameStore: GameStore;

  constructor(level: number, round: number) {
    super({ tagName: 'div', classNames: ['round-view'] });
    this.level = level;
    this.round = round;
    this.gameStore = gameStore;
  }
}