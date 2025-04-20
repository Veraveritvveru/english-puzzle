import BaseComponent from "../../components/base-component";
import Router from "../../router/router";

export class StartPage extends BaseComponent {
   router: Router;

   constructor(router: Router) {
      super({tagName: 'section', classNames: ['start-page']});
      this.router = router;
      const title = new BaseComponent({tagName: 'p', classNames: ['start-page__title']});
      const greeting = new BaseComponent({tagName: 'h2', classNames: ['start-page__greeting']});
      const startBtn = new BaseComponent({tagName: 'div', classNames: ['start-btn'], textContent: 'Start'})
      this.drawRules();
      this.drawLogoutBtn();
      this.append(title, greeting, startBtn);
   }

   drawRules() {
      const rulesWrapper = new BaseComponent({tagName: 'div', classNames: ['rules-wrapper']})
      const rules = new BaseComponent({tagName: 'p', classNames: ['rules-text'], textContent: 'heer are rules'});
      this.append(rulesWrapper);
      rulesWrapper.append(rules);
   }

   drawLogoutBtn() {
      const logoutBtn = new BaseComponent({tagName: 'div', classNames: ['logout-btn'], textContent: 'log out'});
      this.append(logoutBtn);
   }
}