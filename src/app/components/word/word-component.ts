import './word.scss';
import BaseComponent from "../base-component";

interface WordProps {
  isEmpty: boolean;
  textContent?: string;
  isFirst?: boolean;
  isLast?: boolean;
}

const fieldWidth = 700;

export class WordComponent extends BaseComponent {
  private wordBody;

  constructor(word: WordProps) {
    super({ tagName: 'div', classNames: ['empty'] });

    if (!word.isEmpty) {
      const leftSpan = new BaseComponent({ tagName: 'span', classNames: ['left'] });
      this.wordBody = new BaseComponent({
        tagName: 'span',
        classNames: ['word-body'],
        textContent: word.textContent,
      });
      const rightSpan = new BaseComponent({ tagName: 'span', classNames: ['right'] });

      if (word.isFirst) {
        this.append(this.wordBody, rightSpan)
      } else if (word.isLast) {
        this.append(leftSpan, this.wordBody)
      } else {
        this.append(leftSpan, this.wordBody, rightSpan);
      }

      this.removeClass('empty');
      this.setClasses(['word']);
    }
  }

  setWordsWidth(sentense: string) {
    const sentenseLength = sentense.split(' ').join('').length;
    const oneLetterWidth = fieldWidth / sentenseLength;
    const wordsWithArr = sentense.split(' ').map((word) => word.length * oneLetterWidth);
    return wordsWithArr;
  }

  public setTextContent(content: string): void {
    this.wordBody?.setTextContent(content);
  }
}

// interface WordProps {
//   isEmpty: boolean;
//   textContent?: string;
//   isFirst?: boolean;
//   isLast?: boolean;
// }

// export class WordComponent extends BaseComponent {
//   private spanText;

//   private spanRight;

//   constructor(props: TaggedElementProps, word?: WordProps) {
//     super({ tagName: 'div', ...props });
//     if (!word?.isEmpty) {
//       const spanLeft = new BaseComponent({ tagName: 'span', classNames: 'left' });
//       this.spanText = new BaseComponent({
//         tagName: 'span',
//         classNames: 'text',
//         textContent: word?.textContent,
//       });
//       this.spanRight = new BaseComponent({ tagName: 'span', classNames: 'right' });

//       if (word?.isFirst) {
//         this.insertChildren([this.spanText, this.spanRight]);
//       } else if (word?.isLast) {
//         this.insertChildren([spanLeft, this.spanText]);
//       } else {
//         this.insertChildren([spanLeft, this.spanText, this.spanRight]);
//       }
//     }
//   }

//   setBackgroundImgForSpanText(urlImg: string | undefined, lengthCount: number, y: number) {
//     this.spanText?.setBackgroundImg(urlImg, lengthCount, y);
//   }

//   setBackgroundImgForSpanRight(urlImg: string | undefined, lengthCount: number, y: number) {
//     this.spanRight?.setBackgroundImg(urlImg, lengthCount, y);
//   }
// }