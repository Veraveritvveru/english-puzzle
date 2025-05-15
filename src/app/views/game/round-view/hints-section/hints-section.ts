import BaseComponent from "../../../../components/base-component";
import HintComponent from "../../../../components/hint/hint";

export default class HintsSection extends BaseComponent {
  constructor() {
    super({ tagName: 'div', classNames: ['hints'] });
    const translateHint = new HintComponent('translate');
    const pronounceHint = new HintComponent('pronounce');
    const audioHint = new HintComponent('audio');
    this.append(translateHint, pronounceHint, audioHint);
  }
}