import './start-page.scss';

import BaseComponent from "../../components/base-component";
import Router from "../../router/router";
import HeaderComponent from '../../components/header/header';
import { user } from '../../store/user-store';
import { PAGES } from '../../router/pages';
import ButtonComponent from '../../components/button/button';

const rulesText = `Click on words, collect phrases.
Words can be drag and drop. Select tooltips on the menu.`

export default class StartPage extends BaseComponent {
  router: Router;
  startPageContent: BaseComponent;
  header: HeaderComponent;

  constructor(router: Router, header: HeaderComponent) {
    super({ tagName: 'section', classNames: ['start-page'] });
    this.router = router;
    this.header = header;
    header.showLogoutBtn();
    this.startPageContent = new BaseComponent({tagName: 'div', classNames: ['start-page__content']});    
    this.append(this.startPageContent);
    this.drawGreeting();
    this.drawRules();
    this.drawStartBtn();
  }

  private drawGreeting(): void {
    const greeting = new BaseComponent({ tagName: 'h2', classNames: ['start-page__greeting'] });
    this.startPageContent.append(greeting);
    greeting.setTextContent(`Hello, ${user.getFullName()}!`);;
    }

  private drawRules(): void {
    const rulesWrapper = new BaseComponent({ tagName: 'div', classNames: ['rules-wrapper'] })
    const rules = new BaseComponent({ tagName: 'p', classNames: ['rules-text'], textContent: rulesText });
    this.startPageContent.append(rulesWrapper);
    rulesWrapper.append(rules);
  }

  private drawStartBtn(): void {
    const startBtn = new ButtonComponent('button', 'start-btn', 'Start');
    this.startPageContent.append(startBtn);

    startBtn.addListener('click', () => {
      this.router.navigate(PAGES.game);
    })
  }
}