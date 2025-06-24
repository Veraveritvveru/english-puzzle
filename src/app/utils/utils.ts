import { wordCollectionLevel1 as level1 } from "../data/wordCollectionLevel1";
import { wordCollectionLevel2 as level2 } from "../data/wordCollectionLevel2";
import { wordCollectionLevel3 as level3 } from "../data/wordCollectionLevel3";
import { wordCollectionLevel4 as level4 } from "../data/wordCollectionLevel4";
import { wordCollectionLevel5 as level5 } from "../data/wordCollectionLevel5";
import { wordCollectionLevel6 as level6 } from "../data/wordCollectionLevel6";
import { SentenceData, RoundsData, ChoosenSentensesData } from "./types";

export const levelsArr = [
  level1,
  level2,
  level3,
  level4,
  level5,
  level6,
]

export function getRoundData(level: number, round: number): RoundsData {
  return {
    levelData: levelsArr[level - 1].rounds[round - 1].levelData,
    words: levelsArr[level - 1].rounds[round - 1].words as SentenceData[],
  }
}

export function getSentences(words: [SentenceData]) {
  return words.map((item) => item.textExample);
}

export function getWordsCount(arr: string[]): number[] {
  return arr.map((sentence) => sentence.split(' ').length);
}

export function getWordsArr(sentenceObj: ChoosenSentensesData, num: number): string[] {
  return sentenceObj.sentences[num].split(' ');
}

