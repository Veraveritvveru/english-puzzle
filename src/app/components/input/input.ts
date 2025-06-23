import BaseComponent from "../base-component";

interface IInputProps {
  type: string;
  id: string;
  className: string,
}

export default class InputComponent extends BaseComponent<HTMLInputElement> {
  constructor(inputProps: IInputProps) {
    super({ tagName: 'input', classNames: ['input', inputProps.className] });
    this.setAttributes({ type: inputProps.type, id: inputProps.id })
  }

  public getValue(): string {
    return this.element.value;
  }
}
