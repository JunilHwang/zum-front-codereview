import Observable from './basic-observable';

abstract class LocalStore extends Observable {
  public setLocalStorage<T>(key: string, value: T) {
    const stringifyValue = JSON.stringify(value);
    localStorage.setItem(key, stringifyValue);
    const nextState = { [key]: value };
    this.setState(nextState);
  }

  public getLocalStorage(key: string, initial: any) {
    const item = localStorage.getItem(key) as string;
    const parseItem: any = JSON.parse(item);
    if (!parseItem) {
      this.setInitialLocalStorage(key, initial);
      return initial;
    } else {
      const nextState = { [key]: parseItem };
      this.setState(nextState);
      return parseItem;
    }
  }

  public setInitialLocalStorage(key: string, initial: any) {
    const stringifyInitial = JSON.stringify(initial);
    localStorage.setItem(key, stringifyInitial);
    const nextState = { [key]: initial };
    this.setState(nextState);
  }
}

export default LocalStore;
