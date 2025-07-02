import HintComponent from "../../../../../components/hint/hint";
import { gameStore, GameStore } from "../../../../../store/game-store";

export default class PronounceHint extends HintComponent {
  gameStore: GameStore;
  audio: HTMLAudioElement;

  constructor(audioSrc: string) {
    super({ className: 'pronounce', iconName: 'voice_over_off' });
    this.gameStore = gameStore;

    this.audio = new Audio(`https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/${audioSrc}`);
  }

  public onHint(): void {
    this.span.setTextContent('');
    this.span.setTextContent('record_voice_over');
  }

  public updateSrc(newSrc: string): void {
    this.audio.src = `https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/${newSrc}`;
  }

}