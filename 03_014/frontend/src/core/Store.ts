import { State } from "@src/utils/types";

/*
  * Publisher
    - [X] 직접 state를 수정해도, setState를 사용해도 구독자 함수들(Publisher.(Set)_observers 안에있는 함수) 실행
      - 외부에서 execObservers()를 실행해도 구독자 함수들(Publisher.(Set)_observers 안에있는 함수) 실행

    - 참고사항
      - 해당 class를 활용하여 store 생성하기.
      - setter 내에서 this.state에다가 대입하지말기!! (무한 재귀함, setter의 이름을 보면 알수있음)

  * Subscriber
    - 참고사항
      - 해당 class를 활용하여 컴포넌트에서 사용하기
*/

// [1] Publisher
class Publisher {
  private _state: State = {};
  private _observers: Set<Function> = new Set();

  constructor(state: State = {}) {
    this._state = state;
  }

  get state() {
    return this._state;
  }

  set state(newState: State) {
    this._state = { ...this.state, ...newState };
    this.execObservers();
  }

  setState(newState: State): void {
    this.state = { ...this.state, ...newState };
  }

  // notify..?
  execObservers(): void {
    this._observers.forEach((func: Function) => func());
  }

  addSubscribe(subscriberFunc: Function): void {
    this._observers.add(subscriberFunc);
  }

  removeSubscribe(subscriberFunc: Function): void {
    this._observers.delete(subscriberFunc);
  }

  clearSubscribe(): void {
    this._observers.clear();
  }
}

// [2] Subscriber
class Subscriber {
  subscriberFunc?: Function = undefined;
  constructor(funcForPublish?: Function) {
    this.subscriberFunc = funcForPublish;
  }

  publisherSubscriptions(publisher: Publisher): void {
    this.subscriberFunc && publisher.addSubscribe(this.subscriberFunc);
  }

  removePublisherSubscriptions(publisher: Publisher): void {
    this.subscriberFunc && publisher.removeSubscribe(this.subscriberFunc);
  }
}

// ----

// [+] type
type StoreOptions = {
  subscriber?: Subscriber;
  store?: Publisher;
};

export type { StoreOptions };
export { Publisher, Subscriber };
