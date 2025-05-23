import HintComponent from "../../../../../components/hint/hint";
import { gameStore, GameStore } from "../../../../../store/game-store";

export default class ImageHint extends HintComponent {
  gameStore: GameStore;

  constructor() {
    super({ className: 'image', iconName: 'extension_off' });
    this.gameStore = gameStore;

    this.addListener('click', () => {
      this.imageToggle();
    });

    if (this.gameStore.getOption('imageHint')) {
      this.onHint();
    } else {
      this.offHint();
    }
  }


  imageToggle() {
    const currentState = this.gameStore.getOption('imageHint');
    this.gameStore.saveOption('imageHint', !currentState);

    if (!currentState) {
      this.onHint();
    } else {
      this.offHint();
    }
  }

}
