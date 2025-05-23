import './hints-section.scss';
import BaseComponent from "../../../../components/base-component";
import HintComponent from "../../../../components/hint/hint";
import { ChoosenSentensesData } from "../../../../utils/types";
import { gameStore, GameStore } from '../../../../store/game-store';
import PronounceHint from './pronounce/pronounce';
import ImageHint from './image-hint/image-hint';

export default class HintsSection extends BaseComponent {
  sentenceData: ChoosenSentensesData;
  gameStore: GameStore;
  translateSentence: BaseComponent | undefined;
  translateBtn: HintComponent | undefined;
  playBtn: BaseComponent;
  hintsButtons: BaseComponent;
  pronounceHint: PronounceHint | undefined;
  imageHint: ImageHint | undefined;
  level: number;
  round: number;
  count: number = 0;


  constructor(sentenceData: ChoosenSentensesData, level: number, round: number) {
    super({ tagName: 'div', classNames: ['hints-section'] });
    this.sentenceData = sentenceData;
    this.gameStore = gameStore;
    this.level = level;
    this.round = round;

    this.playBtn = new BaseComponent({
      tagName: 'span',
      classNames: ['material-symbols-outlined', 'play-btn', 'hidden'],
      textContent: 'play_circle'
    });

    this.hintsButtons = new BaseComponent({ tagName: 'div', classNames: ['hints__buttons'] });
    this.append(this.playBtn, this.hintsButtons);

    this.drawPronounceHint()
    this.drawTranslateHint();
    this.drawImageHint();
  }

  drawTranslateHint() {
    // const translateBlock = new BaseComponent({ tagName: 'div', classNames: ['translate-block'] });
    this.translateSentence = new BaseComponent({ tagName: 'p', classNames: ['translate__sentense'] });
    this.translateBtn = new HintComponent({ className: 'translate', iconName: 'subtitles_off' });
    this.append(this.translateSentence);
    this.hintsButtons.append(this.translateBtn);

    this.translateBtn.addListener('click', () => {
      this.translateToggle();
    });

    if (this.gameStore.getOption('translateHint')) {
      this.translateBtn?.onHint();
      this.translateSentence?.setTextContent(this.sentenceData.translates[this.count]);
    } else {
      this.translateBtn?.offHint();
    }
  }

  translateToggle() {
    const currentState = this.gameStore.getOption('translateHint');
    this.gameStore.saveOption('translateHint', !currentState);

    if (!currentState) {
      this.translateBtn?.onHint();
      this.translateSentence?.setTextContent(this.sentenceData.translates[this.count]);
    } else {
      this.translateBtn?.offHint();
      if (this.translateSentence) this.translateSentence.getElement().innerHTML = '';
    }
  }


  drawPronounceHint() {
    const audioSrc = this.sentenceData.audios[this.count];
    this.pronounceHint = new PronounceHint(audioSrc);
    this.hintsButtons.append(this.pronounceHint);

    this.pronounceHint.addListener('click', () => {
      this.pronounceToggle();
    });

    this.playBtn.addListener('click', () => {
      if (this.gameStore.getOption('pronounceHint')) {
        this.pronounceHint?.audio.play();
      }
    })

    if (this.gameStore.getOption('pronounceHint')) {
      this.pronounceHint.onHint();
      this.playBtn.removeClass('hidden');
    } else {
      this.pronounceHint.offHint();
    }
  }

  pronounceToggle() {
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

  drawImageHint() {
    const imageHint = new ImageHint();
    this.hintsButtons.append(imageHint);
  }
}



// export class Hints extends BaseComponent {
//   private translationHintField: BaseComponent | undefined;

//   private translationIcon: BaseComponent | undefined;

//   private puzzleIcon: BaseComponent | undefined;

//   private audioHintIcon: BaseComponent<HTMLElement> | undefined;

//   private audioIcon: BaseComponent<HTMLElement>;

//   constructor(gameProps: GameProps, addBackgroundImg: () => void) {
//     super({
//       tagName: 'section',
//       classNames: 'hints',
//     });


//     this.drawBackgroundImgHint(addBackgroundImg);
//     this.drawAudioHint();
//   }


//   drawBackgroundImgHint(addBackgroundImg: () => void) {
//     const backgroundImgHint = new Button(
//       {
//         classNames: ['hint'],
//       },
//       () => {
//         localStorageService.toggleData('puzzleHint', 'on');
//         this.setBackgroundImgHintState();
//         addBackgroundImg();
//       },
//     );

//     this.puzzleIcon = new BaseComponent({
//       tagName: 'span',
//       classNames: 'material-symbols-outlined',
//     });

//     this.setBackgroundImgHintState();

//     backgroundImgHint.insertChild(this.puzzleIcon.getElement());

//     this.insertChildren([backgroundImgHint]);
//   }



//   setBackgroundImgHintState() {
//     if (localStorageService.getData('puzzleHint')) {
//       this.puzzleIcon?.setTextContent('extension');
//     } else {
//       this.puzzleIcon?.setTextContent('extension_off');
//     }
//   }

//   setAudioHintState() {
//     if (localStorageService.getData('audioHint')) {
//       this.audioHintIcon?.setTextContent('volume_up');
//       this.getElement().prepend(this.audioIcon.getElement());
//     } else {
//       this.audioHintIcon?.setTextContent('volume_off');
//       this.audioIcon.destroy();
//     }
//   }
// }