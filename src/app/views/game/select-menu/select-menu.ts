import BaseComponent from "../../../components/base-component";
import SelectComponent from "../../../components/select/select-component";
import { levelsArr } from "../../../utils/utils";
import RoundView from "../round-view/round-view";

export class SelectMenu extends BaseComponent {
  roundView: RoundView | null;
  currentLevel: number;
  currentRound: number;
  selectLevel: SelectComponent;
  selectRound: SelectComponent;
  page: BaseComponent;

  constructor(page: BaseComponent) {
    super({ tagName: 'div', classNames: ['select-menu'] });

    this.currentLevel = 1;
    this.currentRound = 1;
    this.page = page;
    this.selectLevel = new SelectComponent('level', 6);
    this.selectRound = new SelectComponent('round', levelsArr[this.currentLevel - 1].roundsCount);

    this.append(this.selectLevel, this.selectRound);

    this.selectLevel.addListener('click', (event: Event) => {
      this.selectLevel.showSelectBody(event);
    });

    this.selectLevel.selectBody.addListener('click', (event: Event) => {
      this.chooseLevel(event);
    });

    this.selectRound.addListener('click', (event: Event) => {
      this.selectRound.showSelectBody(event);
    });
    this.selectRound.selectBody.addListener('click', (event: Event) => {
      this.chooseRound(event);
    });

    document.addEventListener('update-state', (event: Event) => {
      const customEvent = event as CustomEvent;
      const data = customEvent.detail;
      this.setCurrentState(data.level, data.round);
    });

    this.roundView = null;
    this.firstRender();
  }

  private firstRender(): void {
    this.roundView = new RoundView(this.currentLevel, this.currentRound, this);
    this.page.append(this.roundView);
  }

  public updateTitle(level: number, round: number) {
    this.selectLevel.selectTitle.getElement().innerHTML = `Level ${level}`;
    this.selectRound.selectTitle.getElement().innerHTML = `Round ${round}`;
  }

  public chooseLevel(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target) throw new Error('No choosed level');

    const choosedLevelId = target.getAttribute('id');
    this.currentLevel = Number(choosedLevelId?.at(-1));

    this.selectRound.updateSelectBody('round', levelsArr[this.currentLevel - 1].roundsCount);
    this.updateTitle(this.currentLevel, 1);
    this.selectLevel.selectBody.removeClass('select-active');
    this.drawCurrentRound(this.currentLevel, 1);
  }

  public chooseRound(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target) throw new Error('No choosed round');

    this.currentRound = Number(target.getAttribute('id')?.slice(5));
    if (!isNaN(this.currentRound)) this.updateTitle(this.currentLevel, this.currentRound);
    this.selectRound.selectBody.removeClass('select-active');
    this.drawCurrentRound(this.currentLevel, this.currentRound);
  }

  public drawCurrentRound(givenLevel: number, givenRound: number): void {
    const { level, round } = this.getCorrectRound(givenLevel, givenRound);
    this.roundView?.remove();
    this.roundView = new RoundView(level, round, this);
    this.page.append(this.roundView);
  }


  private getCorrectRound(level: number, round: number): { level: number; round: number } {
    if (round > levelsArr[level - 1].roundsCount && level === 6) {
      this.updateTitle(1, 1);

      return { level: 1, round: 1 };
    }
    if (round > levelsArr[level - 1].roundsCount) {
      this.updateTitle(level + 1, 1);
      return { level: level + 1, round: 1 };
    }
    this.updateTitle(level, round);

    return { level, round };
  }

  public setCurrentState(level: number, round: number) {
    if (level === 7) {
      this.currentLevel = 1
    } else {
      this.currentLevel = level;
    }
    this.currentRound = round;

    if (this.currentLevel <= 6) {
      this.selectRound.updateSelectBody('round', levelsArr[this.currentLevel - 1].roundsCount);
    } else {
      this.selectRound.updateSelectBody('round', levelsArr[0].roundsCount);
    }
  }
}
