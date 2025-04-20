import './button.scss';
import BaseComponent from "../base-component";

type typeBtn = 'submit';

export class Button extends BaseComponent {
   constructor(typeName: typeBtn, textContent?: string) {
      super({
         tagName: 'button',
         classNames: ['button'],
         attributes: { type: typeName },
         textContent: textContent,
      })
   }

   public disableBtn(): void {
      this.setAttributes({disabled: ''})
   }

   public enableBtn(): void {
      this.removeAttribute('disabled');
   }
}