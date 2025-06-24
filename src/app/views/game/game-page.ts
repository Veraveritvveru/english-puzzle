import './game-page.scss';
import BaseComponent from "../../components/base-component";
import Router from "../../router/router";
import { SelectMenu } from './select-menu/select-menu';

export class GamePage extends BaseComponent {
  router: Router;

  constructor(router: Router) {
    super({ tagName: 'section', classNames: ['game-page'] });
    this.router = router;

    const selectMenu = new SelectMenu(this);
    this.append(selectMenu);
  }
}