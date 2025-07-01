import './hint.scss';
import ButtonComponent from "../button/button";
import BaseComponent from '../base-component';

type hintProps = {
  className: 'translate' | 'pronounce' | 'image';
  iconName: 'subtitles_off' | 'voice_over_off' | 'extension_off';
}

export default class HintComponent extends ButtonComponent {
  span: BaseComponent;
  hintProps: hintProps;

  constructor(hintProps: hintProps) {
    super('button', 'hint', '');
    this.hintProps = hintProps;
    this.setClasses([hintProps.className, 'hint']);

    this.span = new BaseComponent({ tagName: 'span', classNames: ['material-symbols-outlined'] });
    this.append(this.span);
    this.span.setTextContent(hintProps.iconName);
  }

  public offHint() {
    this.span.setTextContent(this.hintProps.iconName);
  }

  public onHint(): void {
    this.span.setTextContent('');
    this.span.setTextContent(`${this.hintProps.iconName.slice(0, -4)}`);
  }
}