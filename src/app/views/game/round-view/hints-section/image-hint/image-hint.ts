import HintComponent from "../../../../../components/hint/hint";
import { gameStore, GameStore } from "../../../../../store/game-store";
import GameSource from "../../game-source/game-source";

export default class ImageHint extends HintComponent {
  gameStore: GameStore;
  gameSource: GameSource;
  imageSrc: string;
  count: number;

  constructor(imageSrc: string, gameSource: GameSource, count: number) {
    super({ className: 'image', iconName: 'extension_off' });
    this.gameStore = gameStore;
    this.imageSrc = imageSrc;
    this.gameSource = gameSource;
    this.count = count;

    this.addListener('click', () => {
      this.imageToggle();
    });

    if (this.gameStore.getOption('imageHint')) {
      this.onHint();
      this.gameSource.showBackgroundImg(count);
    } else {
      this.offHint();
      this.gameSource.hideBackgroundImg();
    }
  }

  private imageToggle() {
    const currentState = this.gameStore.getOption('imageHint');
    this.gameStore.saveOption('imageHint', !currentState);

    if (!currentState) {
      this.onHint();
      this.gameSource.showBackgroundImg(this.count);
    } else {
      this.offHint();
      this.gameSource.hideBackgroundImg();
    }
  }

  public updateImage(newCount: number): void {
    this.gameSource.showBackgroundImg(newCount);
  }
}