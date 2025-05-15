import BaseComponent from "../../../components/base-component";
import { SelectComponent } from "../../../components/select/select-component";
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

  firstRender() {
    this.roundView = new RoundView(this.currentLevel, this.currentRound);
    this.page.append(this.roundView);
  }

  chooseLevel(event: Event) {
    const choosedLevel = event.target as HTMLElement;
    if (!choosedLevel) throw new Error('No choosed level');

    const choosedLevelId = choosedLevel.getAttribute('id');
    this.currentLevel = Number(choosedLevelId?.at(-1));

    this.selectRound.updateSelectBody('round', levelsArr[this.currentLevel - 1].roundsCount);
    this.drawCurrentRound(this.currentLevel, 1);
  }

  chooseRound(event: Event) {
    const choosedRound = event.target as HTMLElement;
    if (!choosedRound) throw new Error('No choosed round');
    this.currentRound = Number(choosedRound.getAttribute('id')?.slice(5));

    this.drawCurrentRound(this.currentLevel, this.currentRound);
  }

  drawCurrentRound(currentLevel: number, currentRound: number) {
    console.log(currentLevel, currentRound);
    this.roundView?.remove();
    this.roundView = new RoundView(currentLevel, currentRound);
    this.page.append(this.roundView);
  }
}



// const levelCount = sources.length;

// export default class SelectMenu extends Div {
//   levelSelect: BaseSelect;

//   roundSelect: BaseSelect;

//   roundView: RoundView | null;

//   level: number;

//   page: BaseElement;

//   constructor(page: BaseElement) {
//     super({
//       className: 'selection-menu',
//       styles: {
//         alignSelf: 'flex-start',
//       },
//     });

//     this.page = page;
//     this.level = 1;

//     this.levelSelect = new BaseSelect(levelCount);
//     this.roundSelect = new BaseSelect(sources[0].roundsCount);
//     this.roundSelect.addIds(sources[0].roundsCount, 'round');
//     this.levelSelect.addIds(levelCount, 'level');

//     this.roundView = null;

//     this.firstRender();

//     this.levelSelect.dropDown.addListener('click', this.chooseLevel);
//     this.roundSelect.dropDown.addListener('click', this.chooseRound);

//     this.appendChildren(this.levelSelect, this.roundSelect);
//   }

//   private firstRender() {
//     const userLevel = LocalStorage.get('level-data');

//     if (userLevel) {
//       const { level, round } = this.getCorrectRound(
//         +userLevel.level,
//         +userLevel.round + 1
//       );

//       this.level = level;
//       this.roundView = new RoundView(level, round);

//       this.updateValue(`${level}`, `${round}`);
//     } else {
//       this.roundView = new RoundView(1, 1);
//       this.updateValue('1', '1');
//     }

//     this.page.append(this.roundView);
//     this.markPassedLevel();
//     this.markPassedRound();
//   }

//   private updateValue(level: string, round: string) {
//     this.levelSelect.currentOption.setContent(`Level ${level}`);
//     this.roundSelect.currentOption.setContent(`Round ${round}`);
//   }

//   private markPassedLevel() {
//     const passed = LocalStorage.get(`passed-level-${this.level}`);
//     if (passed) {
//       const passedRounds = Object.keys(passed).length;
//       const levelOptions = this.levelSelect.getOptions();

//       if (passedRounds === sources[this.level - 1].roundsCount) {
//         const level = levelOptions.find(
//           (elem) => elem.id === `level-${this.level}`
//         );
//         if (level) level.classList.add('passed');
//       }
//     }
//   }

//   private markPassedRound() {
//     const passed = LocalStorage.get(`passed-level-${this.level}`);
//     if (passed) {
//       const passedRounds = Object.keys(passed);
//       const roundOptions = this.roundSelect.getOptions();

//       passedRounds.forEach((round) => {
//         const option = roundOptions.find(
//           (elem) => elem.id === `round-${round}`
//         );
//         if (option) option.classList.add('passed');
//       });
//     }
//   }

//   private chooseLevel = (event: Event) => {
//     const clickedOption = event.target as HTMLElement;
//     if (!clickedOption) throw new Error('No options');

//     this.level = Number(clickedOption.textContent);
//     const roundCount = sources[this.level - 1].roundsCount;

//     this.markPassedLevel();
//     this.markPassedRound();

//     this.updateRoundList(roundCount);
//     this.drawRound(this.level, 1);
//   };

//   private chooseRound = (event: Event) => {
//     const clickedOption = event.target as HTMLElement;
//     if (!clickedOption) throw new Error('No options');

//     const round = Number(clickedOption.textContent);
//     this.drawRound(this.level, round);
//   };

//   private updateRoundList(roundCount: number) {
//     this.roundSelect.updateOption(roundCount);
//     this.roundSelect.addIds(roundCount, 'round');
//     this.markPassedRound();
//   }

//   drawRound(givenLevel: number, gitvenRound: number) {
//     if (!this.roundView) throw new Error('No RoundView');
//     this.roundView.remove();

//     const { level, round } = this.getCorrectRound(givenLevel, gitvenRound);

//     this.roundView = new RoundView(level, round);

//     this.page.append(this.roundView);
//   }

//   private getCorrectRound(
//     level: number,
//     round: number
//   ): { level: number; round: number } {
//     if (round > sources[level - 1].roundsCount && level === 6) {
//       this.updateValue('1', '1');

//       return { level: 1, round: 1 };
//     }
//     if (round > sources[level - 1].roundsCount) {
//       this.updateValue(`${level + 1}`, '1');
//       return { level: level + 1, round: 1 };
//     }
//     this.updateValue(`${level}`, `${round}`);

//     return { level, round };
//   }
// }

