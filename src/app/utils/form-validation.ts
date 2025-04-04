import './form-validation.scss';

import BaseComponent from "../components/base-component";
import { InputComponent } from '../components/input/input';

export class ErrorMessage extends BaseComponent {
  constructor(input: InputComponent) {
    super({ tagName: 'div', classNames: ['error', 'hidden'], textContent: `Your ${input} should contain A-Z, a-z, and '-'. The minimum length is 3 characters` });
  }

  showMessage() {
    this.removeClass('hidden');
  }

  hideMessage() {
    this.setClasses(['hidden']);
  }
}

export function isValidPattern(value: string, pattern: string) {
  const regExp = new RegExp(pattern);
  console.log(regExp.test(value));
  return regExp.test(value);
}

export function isTooShort(input: InputComponent): boolean {
  return input.getElement().validity.tooShort;
}
