interface BaseComponentParams {
  tagName: string;
  classNames?: string[];
  textContent?: string;
  attribute?: string;
}

export class BaseComponent<T extends HTMLElement = HTMLElement> {
  protected element: T;

  constructor(params: BaseComponentParams) {
    this.element = document.createElement(params.tagName) as T;
    this.setTextContent(params.textContent ?? '');
  }

  getElement(): HTMLElement {
    return this.element;
  }

  setClasses(classNames: string[]): void {
    if (classNames.length > 0) {
      classNames.forEach((className) => this.element.classList.add(className));
    }
  }

  removeClass(classNames: string[]): void {
    if (classNames.length > 0) {
      classNames.forEach((className) => this.element.classList.add(className));
    }
  }

  toggleClass(className: string): void {
    this.element.classList.toggle(className);
  }

  setTextContent(content: string): void {
    if (typeof content === 'string' && content !== '')
      this.element.textContent = content;
  }


  setAttribute(attribute: string, value: string) {
    this.element.setAttribute(attribute, value);
  }

  removeAttribute(attribute: string) {
    this.element.removeAttribute(attribute);
  }

  addListener(event: string, listener: EventListener, options = false): void {
    this.element.addEventListener(event, listener, options);
  }

  removeListener(event: string, listener: EventListener, options = false): void {
    this.element.removeEventListener(event, listener, options);
  }

  appendToParent(parent: HTMLElement | BaseComponent): void {
    if (parent instanceof HTMLElement || parent instanceof BaseComponent) {
      parent.append(this.element);
    }
  }

  append(...children: Array<HTMLElement | BaseComponent>): void {
    children.forEach((child) => {
      if (child instanceof HTMLElement) {
        this.element.append(child);
      } else if (child instanceof BaseComponent) {
        this.element.append(child.element);
      }
    })
  }

  remove(): void {
    this.element.remove();
  }
}