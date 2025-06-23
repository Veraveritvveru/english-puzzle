import './button.scss';
import BaseComponent from "../base-component";

type typeBtn = 'submit' | 'button';

export default class ButtonComponent extends BaseComponent {
  constructor(typeName: typeBtn, className: string, textContent: string) {
    super({
      tagName: 'button',
      classNames: ['button', className],
      textContent: textContent,
      attributes: { type: typeName },
    })
  }

  public disableBtn(): void {
    this.setAttributes({ disabled: '' })
  }

  public enableBtn(): void {
    this.removeAttribute('disabled');
  }
}