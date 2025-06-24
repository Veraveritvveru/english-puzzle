import './header.scss';
import BaseComponent from "../base-component";
import { user } from '../../store/user-store';
import Router from '../../router/router';
import { PAGES } from '../../router/pages';
import ButtonComponent from '../button/button';

export default class HeaderComponent extends BaseComponent {
  wrapper: BaseComponent;
  public logoutBtn: BaseComponent;
  router: Router;

  constructor(router: Router) {
    super({ tagName: 'header', classNames: ['header'] });
    this.router = router;
    this.wrapper = new BaseComponent({ tagName: 'div', classNames: ['wrapper', 'header-wrapper'] });
    this.append(this.wrapper);
    this.drawLogo();
    this.logoutBtn = new ButtonComponent('button', 'logout-btn', 'Log out')
    this.logoutBtn.setClasses(['hidden']);
    this.wrapper.append(this.logoutBtn);
    this.logOutHandler();
  }

  private drawLogo(): void {
    const title = new BaseComponent({ tagName: 'h1', classNames: ['title'], textContent: 'English Puzzle' });
    this.wrapper.append(title);
  }

  public showLogoutBtn(): void {
    this.logoutBtn.removeClass('hidden');
  }

  logOutHandler() {

    this.logoutBtn.addListener('click', () => {
      console.log('click on log out');
      this.router.navigate(PAGES.login);
      user.clearUser();
    })
  }
}