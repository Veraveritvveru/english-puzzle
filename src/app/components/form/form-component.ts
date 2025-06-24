import './form-component.scss';
import BaseComponent from "../base-component";
import InputComponent from '../input/input';
import ErrorMessage from './error-message/error-message';
import ButtonComponent from '../button/button';
import Router from '../../router/router';
import { user } from '../../store/user-store';
import { PAGES } from '../../router/pages';

const INPUT_FIELDS_ARR = ['First Name', 'Surname'];
const ID_ARR = ['firstName', 'surName'];

const regExp: RegExp = /^[a-zA-Z]+$/;

export default class FormComponent extends BaseComponent {
  inputsWrappers: BaseComponent[];
  inputs: InputComponent[] = [];
  router: Router;

  constructor(router: Router) {
    super({ tagName: 'form', classNames: ['login__form'], attributes: { novalidate: '' } });
    this.router = router;
    this.setAttributes({ name: 'loginForm' })
    this.drawTitle();
    this.inputsWrappers = this.drawInputs();
    this.drawSubmitButton();

    this.addListener('submit', (event) => {
      event.preventDefault();

      const userData = {
        firstName: this.inputs[0].getValue(),
        surname: this.inputs[1].getValue(),
      };

      user.saveUser(userData);
      this.router.navigate(PAGES.start);
    })
  }

  private drawTitle(): void {
    const loginTitle = new BaseComponent({
      tagName: 'h2',
      classNames: ['form__title'],
      textContent: 'Login',
    })
    this.append(loginTitle);
  }

  private drawInputs(): BaseComponent[] {
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
      this.inputs.push(input);

      const error = new ErrorMessage(elem);

      input.addListener('input', () => {
        if (this.validateInput(input.getValue())) {
          error.hideMessage();
        } else {
          error.showMessage();
        }
      });

      div.append(label, input, error);
      return div;
    })

    this.append(...inputs);
    return inputs;
  }

  private validateInput(value: string): boolean {
    return value.length >= 3 && regExp.test(value);
  }

  private drawSubmitButton(): void {
    const submitBtn = new ButtonComponent('submit', 'login-btn', 'Login');
    submitBtn.disableBtn();
    this.append(submitBtn);

    this.addListener('input', () => {
      if (this.inputs.every((input) => this.validateInput(input.getValue()))) {
        submitBtn.enableBtn();
      }
    });
  }

}
