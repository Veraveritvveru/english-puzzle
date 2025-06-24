export type RoundsData = {
  levelData: {
    id: string,
    name: string,
    imageSrc: string,
    cutSrc: string,
    author: string,
    year: string,
  },
  words: SentenceData[]
}

export type SentenceData = {
  audioExample: string,
  textExample: string,
  textExampleTranslate: string,
  id: number,
  word: string,
  wordTranslate: string,
}

export type ImageData = {
  name: string,
  imageSrc: string,
}

export type ChoosenSentensesData = {
  sentences: string[],
  translates: string[],
  audios: string[],
}
