import './word-component.scss';
import BaseComponent from "../base-component";

interface WordProps {
  textContent?: string;
  isFirst?: boolean;
  isLast?: boolean;
}

const fieldWidth = 700;

export default class WordComponent extends BaseComponent {
  public wordBody;
  public rightSpan;

  constructor(word: WordProps) {
    super({ tagName: 'div', classNames: ['word'] });

    this.setAttributes({ 'draggable': 'true' });
    const leftSpan = new BaseComponent({ tagName: 'span', classNames: ['left'] });
    this.wordBody = new BaseComponent({
      tagName: 'span',
      classNames: ['word-body'],
      textContent: word.textContent,
    });
    this.rightSpan = new BaseComponent({ tagName: 'span', classNames: ['right'] });

    if (word.isFirst) {
      this.append(this.wordBody, this.rightSpan)
    } else if (word.isLast) {
      this.append(leftSpan, this.wordBody)
    } else {
      this.append(leftSpan, this.wordBody, this.rightSpan);
    }

    this.setClasses(['word']);
  }

  public setWordsWidth(sentense: string): number[] {
    const sentenseLength = sentense.split(' ').join('').length;
    const oneLetterWidth = fieldWidth / sentenseLength;
    const wordsWithArr = sentense.split(' ').map((word) => word.length * oneLetterWidth);
    return wordsWithArr;
  }

  public setTextContent(content: string): void {
    this.wordBody?.setTextContent(content);
  }

    public setBackgroundImgInBody(imgSrc: string | undefined, lengthCount: number, y: number): void {
    this.wordBody?.setBackgroundImg(imgSrc);
    if (this.wordBody) {
      this.wordBody.getElement().style.backgroundPosition = `${-lengthCount}px ${y}%`;
    }
  }

  public setBackgroundImgInRight(imgSrc: string | undefined, lengthCount: number, y: number): void {
    this.rightSpan?.setBackgroundImg(imgSrc);
    if (this.rightSpan) {
      this.rightSpan.getElement().style.backgroundPosition = `${-lengthCount}px ${y}%`;
    }
  }
}
