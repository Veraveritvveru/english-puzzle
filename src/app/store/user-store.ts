export type UserType = {
  firstName: string;
  surname: string;
};

export class User {
  storage: Storage;

  constructor() {
    this.storage = window.localStorage;
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

}

export const user = new User();