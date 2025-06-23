import './login-page.scss';

import BaseComponent from '../../components/base-component';
import FormComponent from '../../components/form/form-component';
import Router from '../../router/router';

export default class LoginPage extends BaseComponent {
  constructor(router: Router) {
    super({ tagName: 'main', classNames: ['login'] });
    const form = new FormComponent(router);
    this.append(form);
  }
}

