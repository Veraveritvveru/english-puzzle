import BaseComponent from "../../../components/base-component";
import SelectComponent from "../../../components/select/select-component";
import { levelsArr } from "../../../utils/utils";
import { RoundView } from "../round-view/round-view";

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
    this.selectRound = new SelectComponent('round', levelsArr[0].roundsCount);
    this.append(this.selectLevel, this.selectRound);

    this.selectLevel.addListener('click', (event) => {
      this.selectLevel.showSelectBody(event);
    });
    this.selectLevel.selectBody.addListener('click', (event) => {
      this.chooseLevel(event);
    });

    this.selectRound.addListener('click', (event) => {
      this.selectRound.showSelectBody(event);
    });
    this.selectRound.selectBody.addListener('click', (event) => {
      this.chooseRound(event);
    });

    this.roundView = null;
    this.firstRender();
  }

  private firstRender(): void {
    this.roundView = new RoundView(this.currentLevel, this.currentRound);
    this.page.append(this.roundView);

  }

  public chooseLevel(event: Event): void {
    const choosedLevel = event.target as HTMLElement;
    if (!choosedLevel) throw new Error('No choosed level');

    const choosedLevelId = choosedLevel.getAttribute('id');
    this.currentLevel = Number(choosedLevelId?.at(-1));

    this.selectRound.updateSelectBody('round', levelsArr[this.currentLevel - 1].roundsCount);
    this.selectLevel.selectTitle.getElement().innerHTML = `Level ${this.currentLevel}`;
    this.selectLevel.selectBody.removeClass('select-active');
    this.drawCurrentRound(this.currentLevel, 1);
  }

  public chooseRound(event: Event): void {
    const choosedRound = event.target as HTMLElement;
    if (!choosedRound) throw new Error('No choosed round');
    this.currentRound = Number(choosedRound.getAttribute('id')?.slice(5));
    this.selectRound.selectTitle.getElement().innerHTML = `Round ${this.currentRound}`;
    this.selectRound.selectBody.removeClass('select-active');
    this.drawCurrentRound(this.currentLevel, this.currentRound);
  }

  public drawCurrentRound(currentLevel: number, currentRound: number): void  {
    this.roundView?.remove();
    this.roundView = new RoundView(currentLevel, currentRound);
    this.page.append(this.roundView);
  }
}
