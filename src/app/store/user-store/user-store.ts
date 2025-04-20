type UserType = {
  firstName: string;
  surname: string;
};

class User {
  user: UserType;
  storage: Storage;

  constructor(userData: UserType = { firstName: '', surname: '' }) {
    this.user = userData;
    this.storage = window.localStorage;

    // this.store = store;
    // const savedUser = this.store.getUser();
    // if (savedUser) {
    //   this.setName(savedUser.firstName, savedUser.lastName, false);
    // }
  }
  
  // public getUser(): UserType {
  //   return this.user;
  // }

  public isEmpty(): boolean {
    return this.user.firstName === '' && this.user.surname === '';
  }

  public setUser(key: string, value: UserType) {
    this.storage.setItem(key, JSON.stringify(value));
    console.log(this.storage);
  }

  public getFullName(): string {
    return `${this.user.firstName} ${this.user.surname}`;
  }

  public clear(): void {
    this.user.firstName = '';
    this.user.surname = '';
  }

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

// class Store {
//   public user: User;
//   public game: Game;

//   constructor() {
//     this.user = new User();
//     this.game = new Game();
//   }
// }


// class Game {

// }

// const store = new Store();



// export default class User {
//   public firstName = '';

//   public lastName = '';

//   private store: Store;

//   constructor(store: Store) {
//     this.store = store;
//     const savedUser = this.store.getUser();
//     if (savedUser) {
//       this.setName(savedUser.firstName, savedUser.lastName, false);
//     }
//   }

//   public setName(firstName: string, lastName: string, toStore = true): void {
//     this.firstName = firstName;
//     this.lastName = lastName;
//     if (toStore) {
//       this.store.setUser(this);
//     }
//   }
  
//   public getFullName(): string {
//     return `${this.firstName} ${this.lastName}`;
//   }
  
//   public isEmpty(): boolean {
//     return this.firstName === '' && this.lastName === '';
//   }

//   public clear(): void {
//     this.firstName = '';
//     this.lastName = '';
//   }
// }




// export default class Store {
//   private storage;

//   private storeKey;

//   constructor( ) {
//     this.storage = window.localStorage;
//     this.storeKey = STORE_NAME;
//   }

//   public getUser(): UserType | null{
//     const data = this.get(STORE_USER);
//     if (isUserType(data)) {
//       return data;
//     }
//     return null
//   }

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