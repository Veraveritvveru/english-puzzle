import './hints-section.scss';
import BaseComponent from '../../../../components/base-component';
import PronounceHint from './pronounce-hint/pronounce-hint';
import { ChoosenSentensesData } from '../../../../utils/types';
import { GameStore, gameStore } from '../../../../store/game-store';

export default class HintsSection extends BaseComponent {
  pronounceHint: PronounceHint | undefined;
  sentenceData: ChoosenSentensesData;
  hintsButtons: BaseComponent;
  playBtn: BaseComponent;
  gameStore: GameStore;
  audioSrc: string | undefined;

  count: number = 0;

  constructor(sentenceData: ChoosenSentensesData,) {
    super({ tagName: 'div', classNames: ['hints-section'] });
    this.hintsButtons = new BaseComponent({ tagName: 'div', classNames: ['hints__buttons'] });
    this.sentenceData = sentenceData;
    this.gameStore = gameStore;
    this.playBtn = new BaseComponent({
      tagName: 'span',
      classNames: ['material-symbols-outlined', 'play-btn', 'hidden'],
      textContent: 'play_circle'
    });
    this.append(this.playBtn, this.hintsButtons);
    this.drawPronounceHint(this.count);
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

  public updateHints(): void {
    this.count++;
    this.pronounceHint?.updateSrc(this.sentenceData.audios[this.count]);

  }

}