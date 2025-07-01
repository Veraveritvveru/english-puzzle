import ButtonComponent from "../../../../components/button/button";
export default class CheckContinue extends ButtonComponent {
  level: number;
  round: number;

  constructor(level: number, round: number) {
    super('button', 'check-button', 'Check');
    this.level = level;
    this.round = round;

    this.disableBtn();
  }
}