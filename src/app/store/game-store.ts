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


// class StorageService<T> {
//   constructor(private storageKeyPrefix: string) {}

//   private getStorageKey(key: string): string {
//     return `${this.storageKeyPrefix}_${key}`;
//   }

//   saveData<K extends keyof T>(key: K, data: T[K]): void {
//     const storageKey = this.getStorageKey(key.toString());
//     localStorage.setItem(storageKey, JSON.stringify(data));
//   }

//   removeData<K extends keyof T>(key: K): void {
//     const storageKey = this.getStorageKey(key.toString());
//     localStorage.removeItem(storageKey);
//   }

//   getData<K extends keyof T>(key: K, validate?: (data: unknown) => data is T[K]): T[K] | null {
//     const storageKey = this.getStorageKey(key.toString());
//     const data = localStorage.getItem(storageKey);

//     if (data === null) {
//       return null;
//     }
//     try {
//       const result: unknown = JSON.parse(data);
//       if (validate) {
//         return validate(result) ? result : null;
//       }
//       return result as T[K];
//     } catch (error) {
//       console.error('Error parsing JSON:', error);
//       return null;
//     }
//   }

//   toggleData<K extends keyof T>(key: K, data: T[K]): void {
//     if (this.getData(key)) {
//       this.removeData(key);
//     } else {
//       this.saveData(key, data);
//     }
//   }
// }

// export type LocalStorageState = {
//   userFullName: UserFullName;
//   translateHint: string;
//   puzzleHint: string;
//   audioHint: string;
//   completedLevels: string[];
//   completedRounds: CompletedRounds[];
// };

// interface UserFullName {
//   firstName: string;
//   surname: string;
// }

// export interface CompletedRounds {
//   level: string;
//   rounds: string[];
// }

// export const localStorageService = new StorageService<LocalStorageState>('PUZZLE_RM');