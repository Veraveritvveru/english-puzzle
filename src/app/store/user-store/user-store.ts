export type UserType = {
  firstName: string;
  surname: string;
};

export class User {
  storage: Storage;

  constructor() {
    this.storage = window.localStorage;
    // this.store = store;
    // if (savedUser) {
    //   this.setName(savedUser.firstName, savedUser.lastName, false);
    // }
  }
  
  public saveUser(value: UserType) {
    this.storage.setItem('user', JSON.stringify(value));
  }

  public getUser() {
    const user = this.storage.getItem('user');
    if (user !== null) {
      return JSON.parse(user);
    }
  }

  public getFullName() {
    const firstName = Object.values(this.getUser())[0];
    const surName = Object.values(this.getUser())[1];
    return `${firstName} ${surName}`;
  }

  public isEmpty() {
    for (const prop in this.getUser()) {
      return false;
    }
    return true;
  }

  public clearUser() {
    this.storage.clear()
  }

  // public isEmpty(): boolean {
  //   return this.user.firstName === '' && this.user.surname === '';
  // }

  // public setUser(key: string, value: UserType) {
  //   this.storage.setItem(key, JSON.stringify(value));
  //   this.user = this.storage.getItem(key);
  //   console.log(this.user);
  // }

  // public getFullName(): string {
  //   return `${this.user.firstName} ${this.user.surname}`;
  // }

  // public clear(): void {
  //   this.user.firstName = '';
  //   this.user.surname = '';
  // }

  // public getUser(): UserType | null{
  //   const data = this.get(STORE_USER);
  //   if (isUserType(data)) {
  //     return data;
  //   }
  //   return null
  // }

  // private get(key: string): unknown{
  //   try {
  //     const storedDataString = this.storage.getItem(
  //       `${this.storeKey}-${key}`,
  //     );
  //     if (storedDataString) {
  //       return JSON.parse(storedDataString);
  //     }
  //     return null;
  //   } catch (err: unknown) {
  //     return null;
  //   }
  // }
}

export const user = new User();



//   public setUser(user: User): void{
//     const data: UserType = {
//       firstName: user.firstName,
//       lastName: user.lastName
//     }
//     this.set<UserType>(STORE_USER, data);
//   }

//   public getOptions(): OptionsType | null {
//     const data = this.get(STORE_OPTIONS);
//     if (isOptionsType(data)) {
//       return data;
//     }
//     return null
//   }

//   public setOptions(options: OptionsType): void {
//     this.set<OptionsType>(STORE_OPTIONS, options);
//   }

//   public getLastLesson(): string | null {
//     const data = this.get(STORE_LAST_LESSON);
//     if (typeof data === "string") {
//       return data;
//     }
//     return null
//   }

//   public setLastLesson(value: string): void {
//     this.set<string>(STORE_LAST_LESSON, value);
//   }

//   public getHistory(): LessonType[] {
//     const data = this.get(STORE_HISTORY);
//     if (Array.isArray(data) && isLessonType(data)) {
//       return data;
//     }
//     return [];
//   }

//   public setHistory(value: LessonType[]): void {
//     this.set<LessonType[]>(STORE_HISTORY, value);
//   }

//   public removeUser(): void {
//     this.storage.removeItem(`${this.storeKey}-${STORE_USER}`);
//     this.storage.removeItem(`${this.storeKey}-${STORE_OPTIONS}`);
//     this.storage.removeItem(`${this.storeKey}-${STORE_LAST_LESSON}`);
//     this.storage.removeItem(`${this.storeKey}-${STORE_HISTORY}`);
//   }

//   private set<T>(key: string, value: T): void {
//     this.storage.setItem(
//       `${this.storeKey}-${key}`,
//       JSON.stringify(value),
//     );
//   }

//   private get(key: string): unknown{
//     try {
//       const storedDataString = this.storage.getItem(
//         `${this.storeKey}-${key}`,
//       );
//       if (storedDataString) {
//         return JSON.parse(storedDataString);
//       }
//       return null;
//     } catch (err: unknown) {
//       return null;
//     }
//   }

  
  
// }




// export type LocalData = {
//   [key: string]: string;
// };

// export class LocalStorage {
//   static save(key: string, data: LocalData) {
//     const JSONdata = JSON.stringify(data);
//     window.localStorage.setItem(key, JSONdata);
//   }

//   static get(key: string): LocalData | null {
//     const data = localStorage.getItem(key);
//     if (nonNullable(data)) {
//       return JSON.parse(data);
//     }

//     return null;
//   }

//   static clear() {
//     window.localStorage.clear();
//   }
// }
