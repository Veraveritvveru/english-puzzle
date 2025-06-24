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
}

export const gameStore = new GameStore();