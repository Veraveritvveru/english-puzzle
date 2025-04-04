import './form.scss';

import BaseComponent from "../base-component";
import { Button } from '../button/button';
import { InputComponent } from '../input/input';
import { ErrorMessage } from '../../utils/form-validation';

const INPUT_FIELDS_ARR = ['First Name', 'Surname'];
const ID_ARR = ['firstName', 'surname'];

const regExp = /^[a-zA-Z]+$/;

export class FormComponent extends BaseComponent {
  submitBtn: Button;

  constructor(formName: string) {
    super({ tagName: 'form', classNames: ['login__form'] });

    this.setAttributes({ name: formName })
    this.drawTitle();
    this.drawInputs();
    this.submitBtn = new Button('submit', 'Log in');
    this.append(this.submitBtn);

    this.addListener('submit', (event) => {
      if (!this.validateForm()) {
        event.preventDefault();
      }
    })
  }

  drawTitle() {
    const loginTitle = new BaseComponent({
      tagName: 'h2',
      classNames: ['login__title'],
      textContent: 'Login',
    })
    this.append(loginTitle);
  }

  drawInputs() {
    const inputs = INPUT_FIELDS_ARR.map((elem, i) => {
      const div = new BaseComponent({ tagName: 'div', classNames: ['input__wrapper'] });

      const label = new BaseComponent({
        tagName: 'label',
        classNames: ['input-label'],
        textContent: elem,
        attributes: { for: ID_ARR[i] }
      });

      const input = new InputComponent({ type: 'text', id: ID_ARR[i], className: ID_ARR[i] });
      input.setAttributes({
        required: '',
        autocomplete: 'off',
        minlength: "3",
      });

      const error = new ErrorMessage(input);

      input.addListener('input', () => {
        if (this.validateInput(input.getValue())) {
          error.setClasses(['hidden']);
          this.submitBtn.removeAttribute('disabled');
        } else {
          error.removeClass('hidden');
          this.submitBtn.setAttributes({disabled: ''});
        }
      });

      div.append(label, input, error);
      return div;
    })
    this.append(...inputs);
  }

  validateForm() {
    const inputs = this.element.querySelectorAll('input');

    for (const input of inputs) {
      const value = input.value.trim();
      if (value.length <= 3 || !regExp.test(value)) {
        return false;
      }
    }
    return true;
  }

  validateInput(value: string) {
    return value.length > 3 && regExp.test(value);
  }
}

