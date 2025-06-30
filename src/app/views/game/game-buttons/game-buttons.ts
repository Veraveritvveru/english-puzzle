import './game-buttons.scss';
import BaseComponent from '../../../components/base-component';
import CheckContinue from './check-continue/check-contionue';
import AutoComplete from './autocomplete/autocomplete';

export default class GameButtons extends BaseComponent {
  checkContinue: CheckContinue;
  autoComplete: AutoComplete;

  constructor() {
    super({tagName: 'div', classNames: ['game-buttons'] });

    this.checkContinue = new CheckContinue();
    this.autoComplete = new AutoComplete();
    this.append(this.autoComplete, this.checkContinue);
  }
}