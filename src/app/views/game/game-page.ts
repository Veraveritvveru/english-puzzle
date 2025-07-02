import './game-page.scss';
import BaseComponent from "../../components/base-component";
import Router from "../../router/router";
import { SelectMenu } from './select-menu/select-menu';

export default class GamePage extends BaseComponent {
  router: Router;

  constructor(router: Router) {
    super({ tagName: 'section', classNames: ['game-page'] });
    this.router = router;

    const selectMenu = new SelectMenu(this);

    this.element.addEventListener('next-round', (event) => {
      const customEvent = event as CustomEvent;
      const { level } = customEvent.detail;
      const { round } = customEvent.detail;
      selectMenu.drawCurrentRound(level, round);
    })
    
    this.append(selectMenu);
  }
}