type LevelData = {
  level: number,
  round: number,
}

export class GameStore {
  storage: Storage;

  constructor() {
    this.storage = window.localStorage;
  }

  public getOption(key: string) {
    const option = this.storage.getItem(key);
    if (option !== null) {
      return JSON.parse(option);
    }
  }

  public saveOption(key: string, value: boolean) {
    this.storage.setItem(key, JSON.stringify(value));
  }

  public removeOption(key: string) {
    this.storage.removeItem(key);
  }

  toggleOption(key: string, data: boolean): void {
    if (this.getOption(key)) {
      this.removeOption(key);
    } else {
      this.saveOption(key, data);
    }
  }

  public saveLevelData(key: string, levelData: LevelData) {
    this.storage.setItem(key, JSON.stringify(levelData));
  }

  public getLevelData(key: string): LevelData | undefined {
    const levelData = this.storage.getItem(key);
    if (levelData !== null) {
      return JSON.parse(levelData);
    }
  }
}

export const gameStore = new GameStore();