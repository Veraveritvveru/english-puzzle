import BaseComponent from "../base-component";

const INPUT_FIELDS_ARR = ['First Name', 'Surname'];
const ID_ARR = ['firstName', 'surname'];

export class FormComponent extends BaseComponent {
  constructor() {
    super({ tagName: 'form', classNames: ['login__form'] });

    this.drawInputs();
  }

  drawInputs() {
    const inputs = INPUT_FIELDS_ARR.map((elem, i) => {
      const div = new BaseComponent({tagName: 'div', classNames: [`input__wrapper${i}`]});
      const label = new BaseComponent({
        tagName: 'label',
        classNames: ['input-label'],
        textContent: elem,
        attributes: {for: ID_ARR[i]}
      });
      const input = new BaseComponent({
        tagName: 'input',
        classNames: ['input'],
        attributes: {id: ID_ARR[i]}
       });
    div.append(label, input);
    return div;
    })

    this.append(...inputs)
  }
}