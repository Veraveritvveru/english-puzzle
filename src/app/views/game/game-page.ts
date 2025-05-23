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



// export default class Game extends BaseElement {
//   router: Router;

//   constructor(router: Router) {
//     super({ tag: 'section', className: 'game-page' });

//     const header = new Div({ className: 'game-header' });
//     this.router = router;

//     const selectMenu = new SelectMenu(this);

//     this.element.addEventListener('next-round', (event) => {
//       const customEvent = event as CustomEvent;
//       const { level } = customEvent.detail;
//       const { round } = customEvent.detail;
//       selectMenu.drawRound(level, round);
//     });

//     header.appendChildren(selectMenu, new ExitButton(router));
//     this.append(header);
//   }
// }
