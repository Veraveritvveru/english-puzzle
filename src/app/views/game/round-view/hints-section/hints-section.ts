import './hints-section.scss';
import BaseComponent from '../../../../components/base-component';
import PronounceHint from './pronounce-hint/pronounce-hint';
import { ChoosenSentensesData, ImageData } from '../../../../utils/types';
import { GameStore, gameStore } from '../../../../store/game-store';
import GameSource from '../game-source/game-source';
import ImageHint from './image-hint/image-hint';
import HintComponent from '../../../../components/hint/hint';

export default class HintsSection extends BaseComponent {
  pronounceHint: PronounceHint | undefined;
  imageHint: ImageHint | undefined;
  translateHint: HintComponent | undefined;
  translateSentence: BaseComponent | undefined;
  sentenceData: ChoosenSentensesData;
  hintsButtons: BaseComponent;
  playBtn: BaseComponent;
  gameStore: GameStore;
  audioSrc: string | undefined;
  gameSource: GameSource;
  imageData: ImageData;

  count: number;

  constructor(
    sentenceData: ChoosenSentensesData,
    gameSource: GameSource,
    imageData: ImageData,
    count: number,
  ) {
    super({ tagName: 'div', classNames: ['hints-section'] });
    this.hintsButtons = new BaseComponent({ tagName: 'div', classNames: ['hints__buttons'] });
    this.sentenceData = sentenceData;
    this.imageData = imageData;
    this.gameStore = gameStore;
    this.gameSource = gameSource;
    this.count = count;

    this.playBtn = new BaseComponent({
      tagName: 'span',
      classNames: ['material-symbols-outlined', 'play-btn', 'hidden'],
      textContent: 'play_circle'
    });
    this.append(this.playBtn, this.hintsButtons);

    this.drawPronounceHint(this.count);
    this.drawImageHint();
    this.drawTranslateHint();
  }

  private drawPronounceHint(count: number): void {
    this.audioSrc = this.sentenceData.audios[count];
    this.pronounceHint = new PronounceHint(this.audioSrc);
    this.hintsButtons.append(this.pronounceHint);
    this.pronounceHint.addListener('click', () => {
      this.pronounceToggle();
    });

    this.pronounceHint.audio.onended = () => {
      this.playBtn.setTextContent('play_circle');
    }

    this.playBtn.addListener('click', () => {
      if (this.gameStore.getOption('pronounceHint')) {
        this.pronounceHint?.audio.play();
        this.playBtn.setTextContent('hearing');
      }
    });

    if (this.gameStore.getOption('pronounceHint')) {
      this.pronounceHint.onHint();
      this.playBtn.removeClass('hidden');
    } else {
      this.pronounceHint.offHint();
    }
  }

  private pronounceToggle() {
    const currentState = this.gameStore.getOption('pronounceHint');
    this.gameStore.saveOption('pronounceHint', !currentState);

    if (!currentState) {
      this.pronounceHint?.onHint();
      this.playBtn.removeClass('hidden');

    } else {
      this.pronounceHint?.offHint();
      this.playBtn.setClasses(['hidden']);
    }
  }

  private drawImageHint() {
    const imageSrc = this.imageData.imageSrc;
    this.imageHint = new ImageHint(imageSrc, this.gameSource, this.count);
    this.hintsButtons.append(this.imageHint);
  }

  drawTranslateHint() {
    this.translateSentence = new BaseComponent({ tagName: 'p', classNames: ['translate__sentense'] });
    this.translateHint = new HintComponent({ className: 'translate', iconName: 'subtitles_off' });
    this.append(this.translateSentence);
    this.hintsButtons.append(this.translateHint);

    this.translateHint.addListener('click', () => {
      this.translateToggle();
    });

    if (this.gameStore.getOption('translateHint')) {
      this.translateHint?.onHint();
      this.translateSentence?.setTextContent(this.sentenceData.translates[this.count]);
    } else {
      this.translateHint?.offHint();
    }
  }

  translateToggle() {
    const currentState = this.gameStore.getOption('translateHint');
    this.gameStore.saveOption('translateHint', !currentState);

    if (!currentState) {
      this.translateHint?.onHint();
      this.translateSentence?.setTextContent(this.sentenceData.translates[this.count]);
    } else {
      this.translateHint?.offHint();
      if (this.translateSentence) this.translateSentence.getElement().innerHTML = '';
    }
  }

  public updateHints(): void {
    this.count++;
    this.pronounceHint?.updateSrc(this.sentenceData.audios[this.count]);

    if (this.gameStore.getOption('imageHint')) {
      this.imageHint?.updateImage(this.count);
    }

    if (this.gameStore.getOption('translateHint')) {
      this.translateSentence?.setTextContent('');
      this.translateSentence?.setTextContent(this.sentenceData.translates[this.count]);
    }
  }
}