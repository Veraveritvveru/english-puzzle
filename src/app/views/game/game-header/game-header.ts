import BaseComponent from "../../../components/base-component";
import HintsSection from "../round-view/hints-section/hints-section";

export class GameHeader extends BaseComponent {
  constructor() {
    super({tagName: 'div', classNames: ['game-header']});
    const hintsSection = new HintsSection();
    this.append(hintsSection);
  }
}