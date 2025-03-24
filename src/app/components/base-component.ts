interface BaseComponentParams {
  tagName: string;
  classNames?: string[];
  textContent?: string;
  attributes?: Record<string, string>;
}

export default class BaseComponent<T extends HTMLElement = HTMLElement> {
  protected element: T;

  constructor(params: BaseComponentParams) {
    this.element = document.createElement(params.tagName) as T;

    if (params.classNames) {
      this.setClasses(params.classNames);
    }

    if (params.attributes) {
      this.setAttributes(params.attributes);
    }
    this.setTextContent(params.textContent ?? '');
    

  }

  public getElement(): HTMLElement {
    return this.element;
  }

  public setClasses(classNames: string[]): void {
    if (classNames.length > 0) {
      classNames.forEach((className) => this.element.classList.add(className));
    }
  }

  public publicremoveClass(classNames: string[]): void {
    if (classNames.length > 0) {
      classNames.forEach((className) => this.element.classList.add(className));
    }
  }

  public toggleClass(className: string): void {
    this.element.classList.toggle(className);
  }

  public setTextContent(content: string): void {
    if (typeof content === 'string' && content !== '')
      this.element.textContent = content;
  }


  public setAttributes(attribute: Record<string, string>) {
    Object.entries(attribute).forEach(([attrName, value]) => {
      this.element.setAttribute(attrName, value);
    })
  }

  public removeAttribute(attribute: string) {
    this.element.removeAttribute(attribute);
  }

  public addListener(event: string, listener: EventListener, options = false): void {
    this.element.addEventListener(event, listener, options);
  }

  public removeListener(event: string, listener: EventListener, options = false): void {
    this.element.removeEventListener(event, listener, options);
  }

  public appendToParent(parent: HTMLElement | BaseComponent): void {
    if (parent instanceof HTMLElement || parent instanceof BaseComponent) {
      parent.append(this.element);
    }
  }

  public append(...children: Array<HTMLElement | BaseComponent>): void {
    children.forEach((child) => {
      if (child instanceof HTMLElement) {
        this.element.append(child);
      } else if (child instanceof BaseComponent) {
        this.element.append(child.element);
      }
    })
  }

  public remove(): void {
    this.element.remove();
  }
}