import { TState } from './types';

abstract class Observable {
  observers: Function[];
  state: TState;

  constructor() {
    this.observers = [];
    this.state = {};
  }

  public setState(changeState: TState, cb?: Function) {
    if (!this.checkNeedUpdate(changeState)) return;
    requestAnimationFrame(() => {
      this.state = { ...this.state, ...changeState };
      this.notify();
      cb?.();
    });
  }

  private checkNeedUpdate(changeState: TState) {
    // eslint-disable-next-line no-restricted-syntax
    for (const key in changeState) {
      if (!Object.is(changeState[key], this.state[key])) return true;
    }
    return false;
  }

  public subscribe(observer: Function) {
    observer();
    this.observers.push(observer);
  }

  public unsubscribe(observer: Function) {
    this.observers = [...this.observers].filter((subscriber) => subscriber !== observer);
  }

  public unsubscribeAll() {
    this.observers = [];
  }

  private notify() {
    this.observers.forEach((observer) => observer());
  }
}

export default Observable;
