import HintComponent from "../../../../../components/hint/hint";
import { GameStore, gameStore } from "../../../../../store/game-store";
import GameSource from "../../game-source/game-source";
import { ChoosenSentensesData } from "../../../../../utils/types";

export default class TranslateHint extends HintComponent {
  sentenceData: ChoosenSentensesData;
  gameStore: GameStore;
  gameSource: GameSource;
  count: number;

  constructor(sentenceData: ChoosenSentensesData, gameSource: GameSource, count: number) {
    super({ className: 'translate', iconName: 'subtitles_off' });
    this.gameStore = gameStore;
     this.sentenceData = sentenceData;
    // this.imageSrc = imageSrc;
    this.gameSource = gameSource;
    this.count = count;

    this.addListener('click', () => {
      this.translateToggle();
    });

    if (this.gameStore.getOption('translateHint')) {
      this.onHint();
      this.setTextContent(this.sentenceData.translates[this.count]);
    } else {
      this.offHint();
    }
  }

  translateToggle() {
    const currentState = this.gameStore.getOption('translateHint');
    this.gameStore.saveOption('translateHint', !currentState);

    if (!currentState) {
      this.onHint();
      this.setTextContent(this.sentenceData.translates[this.count]);
    } else {
      this.offHint();
      this.getElement().innerHTML = '';
    }
  }
}