import './select-component.scss';
import BaseComponent from "../base-component";

export default class SelectComponent extends BaseComponent {
  selectBody: BaseComponent;
  selectTitle: BaseComponent;

  constructor(selectName: 'level' | 'round', selectCount: number) {
    super({ tagName: 'div', classNames: ['select', selectName] });
    this.selectTitle = new BaseComponent({ tagName: 'div', classNames: ['select__title'], textContent: `${selectName[0].toUpperCase()}${selectName.slice(1)} 1` });
    this.append(this.selectTitle);

    this.selectBody = new BaseComponent({ tagName: 'div', classNames: ['select__body'] });
    this.append(this.selectBody);
    this.updateSelectBody(selectName, selectCount);
  }

  public showSelectBody(event: Event): void {
    if (event.target === this.selectTitle.getElement()) {
      this.selectBody.toggleClass('select-active');
    }
  }

  public updateSelectBody(selectName: 'level' | 'round', count: number): void {
    this.selectBody.getElement().innerHTML = '';

    for (let i = 1; i <= count; i++) {
      const selectItem = new BaseComponent({
        tagName: 'div',
        classNames: ['select__item'],
        textContent: `${selectName[0].toUpperCase()}${selectName.slice(1)} ${i}`,
      });
      selectItem.setAttributes({ id: `${selectName}${i}` });
      this.selectBody.append(selectItem);
    }
  }
}