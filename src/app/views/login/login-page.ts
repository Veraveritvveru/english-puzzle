import './login-page.scss';

import BaseComponent from '../../components/base-component';
import FormComponent from '../../components/form/form-components';

export class LoginPage extends BaseComponent {

  constructor() {
    super({ tagName: 'main', classNames: ['login'] });
    const form = new FormComponent();
    this.append(form);
  }
}

