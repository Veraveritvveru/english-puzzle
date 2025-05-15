import './hint.scss';
import ButtonComponent from "../button/button";

type typeHint = 'translate' | 'pronounce' | 'audio';

export default class HintComponent extends ButtonComponent {
  constructor(className: typeHint) {
    super('button');
    this.setClasses([className, 'material-symbols-outlined']);
    this.setTextContent('home');
  }
}