import BaseComponent from "../../base-component";

export default class ErrorMessage extends BaseComponent {
  constructor(inputFieldName: string) {
    super({ tagName: 'div', classNames: ['error', 'hidden'], textContent: `Your ${inputFieldName} should contain A-Z, a-z, and '-'. The minimum length is 3 characters` });
  }

  public showMessage(): void {
    this.removeClass('hidden');
  }

  public hideMessage(): void {
    this.setClasses(['hidden']);
  }
}
