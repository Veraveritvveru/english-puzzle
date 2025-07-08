import BaseComponent from '../../../../components/base-component';
import WordComponent from '../../../../components/word/word-component';
import GameResult from '../game-result/game-result';

function createPlaceholder(from: HTMLElement, element: HTMLElement) {
  if (from.lastElementChild === element) {
    return;
  }
  const placeholder = new BaseComponent({ tagName: 'div', classNames: ['placeholder'] });
  placeholder.setAttributes({ 'id': `${element.getAttribute('id')}` })
  placeholder.getElement().style.width = `${element.offsetWidth}px`;

  from.replaceChild(placeholder.getElement(), element);
}

function dropOnEmptyPlace(to: HTMLElement, element: HTMLElement) {
  const place = to.querySelector('.placeholder');
  if (place) {
    const nextElem = place.nextElementSibling;
    place.remove();
    to.insertBefore(element, nextElem);
  } else {
    to.append(element);
  }
}

function getAfterElement(line: HTMLDivElement, offsetX: number) {
  const wordsInLine = Array.from(line.querySelectorAll('online'));
  const placeholders = Array.from(line.querySelectorAll('.placeholder'));
  const lineInner = [...wordsInLine, ...placeholders];

  const res: { offset: number; element?: HTMLElement } = lineInner.reduce(
    (closest, piece) => {
      const wordsSize = piece.getBoundingClientRect();
      const offset = offsetX - wordsSize.left - wordsSize.width / 2;

      if (offset < 0 && offset > closest.offset) {
        return { offset, element: piece };
      }
      return closest;
    },
    { offset: 0 }
  );
  if (res.element) {
    return res.element;
  }
  return null;
}

export default class DragAndDrop {
  gameResult: GameResult;
  gameSource: HTMLDivElement;
  sentencesLines: NodeListOf<HTMLElement>;
  shuffledWordsElements: WordComponent[];

  currentDraggble: HTMLElement | null = null;

  count: number;

  constructor(
    gameResult: GameResult,
    gameSource: HTMLDivElement,
    shuffledWordsElements: WordComponent[],
    count: number,
  ) {
    this.gameResult = gameResult;
    this.gameSource = gameSource;
    this.sentencesLines = this.gameResult.getElement().querySelectorAll('.sentence-line');
    this.shuffledWordsElements = shuffledWordsElements;
    this.count = count;

    this.bindEvents();
  }

  public bindEvents(): void {
    this.shuffledWordsElements.forEach((word) => {
      word.addListener('dragstart', this.dragStart);
      word.addListener('dragend', this.dragEnd);
      word.addListener('click', this.click);
    });

    this.sentencesLines[this.count].addEventListener('dragover', this.dragOverLine);
    this.sentencesLines[this.count].addEventListener('drop', this.dropOnLine);

    this.gameSource.addEventListener('dragover', this.dragOverSource);
    this.gameSource.addEventListener('drop', this.dropOnSource);
  }

  private dragStart = (event: Event): void => {
    const draggable = event.currentTarget as HTMLElement;
    this.currentDraggble = draggable;
    draggable.classList.add('dragging');
  }

  private dragEnd = (): void => {
    if (this.currentDraggble) this.currentDraggble.classList.remove('dragging');
    this.checkSentence();
  }

  private dragOverSource = (event: Event): void => {
    event.preventDefault();
  }

  private dragOverLine = (event: Event): void => {
    event.preventDefault();
  }

  private dropOnLine = (event: MouseEvent): void => {
    event.preventDefault();
    if (!this.currentDraggble) return;

    const parent = this.currentDraggble.parentElement;
    const targetLine = this.sentencesLines[this.count] as HTMLDivElement;

    if (parent) {
      if (parent.classList.contains('sentence-line')) {
        const afterElem = getAfterElement(targetLine, event.clientX);
        if (afterElem === null) {
          targetLine.append(this.currentDraggble);
        } else {
          targetLine.insertBefore(this.currentDraggble, afterElem);
        }
        return;
      }
    }

    createPlaceholder(this.gameSource, this.currentDraggble);

    dropOnEmptyPlace(targetLine, this.currentDraggble);
    this.currentDraggble.classList.add('online');
    this.currentDraggble.classList.remove('dragging');

    this.currentDraggble = null;
  }


  private dropOnSource = (event: Event): void => {
    event.preventDefault();
    if (!this.currentDraggble) return;

    if (this.currentDraggble.parentElement?.classList.contains('game-source')) return;

    createPlaceholder(this.sentencesLines[this.count], this.currentDraggble);

    dropOnEmptyPlace(this.gameSource, this.currentDraggble);
  }

  private click = (event: Event): void => {
    const clickedWord = event.currentTarget as HTMLElement;
    const parent = clickedWord.parentElement;
    if (!parent) return;

    if (parent.classList.contains('game-source')) {
      createPlaceholder(this.gameSource, clickedWord);

      dropOnEmptyPlace(this.sentencesLines[this.count], clickedWord);
      clickedWord.classList.add('online');
    } else {
      createPlaceholder(this.sentencesLines[this.count], clickedWord);

      dropOnEmptyPlace(this.gameSource, clickedWord);
    }
    this.checkSentence();
  }

  checkSentence() {
    const wordsInSource = this.gameSource.querySelectorAll('.word');
    const checkButton = document.querySelector('.check-button');
    if (wordsInSource.length === 0) {
      checkButton?.removeAttribute('disabled');
    } else {
      checkButton?.setAttribute('disabled', '');
    }
  }
}
