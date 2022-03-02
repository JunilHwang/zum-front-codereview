interface RecentChangedKeys<S> {
  prevKeys: (keyof S)[];
  currKeys: (keyof S)[];
  largeKeySet: Set<keyof S>;
}

/**
 * [Publisher]
 * - Store 역할을 하는 개체를 생성할 때 사용
 */
class Publisher<S = any> {
  private _state: S;
  private _prevState: S;
  private _notExec: boolean = false;

  private _recentChangedKeys: RecentChangedKeys<S> = { prevKeys: [], currKeys: [], largeKeySet: new Set() };
  private readonly _observers: Set<Function> = new Set();

  constructor(initState: S, private readonly setStateCallback?: () => void) {
    this._state = initState;
    this._prevState = initState;
  }

  get state() {
    return this._state;
  }

  get recentChangedKeys() {
    return this._recentChangedKeys;
  }

  private set state(newState: S) {
    this._state = { ...newState };
    this.setStateCallback && this.setStateCallback();
    this.updateRecentChangedKeys();

    if (this._notExec) this._notExec = false;
    else this.exec();
  }

  setState(newState: S, options?: { notExec?: boolean }): void {
    if (options && typeof options.notExec !== "undefined") this._notExec = options.notExec;
    this._prevState = { ...this._state };
    this.state = { ...this._state, ...newState }; // setter state에서 확정
  }

  /**
   * 🧚🏻 exec
   * - 이 Publisher에 등록된 함수 실행 (Subscriber들의 func)
   */
  exec(): void {
    this._observers.forEach((func: Function) => func());
  }

  /**
   * 🧚🏻 add
   * - 이 Publisher에 함수 등록 (Subscriber의 func)
   */
  add(func: Function): void {
    this._observers.add(func);
  }

  /**
   * 🧚🏻 clear
   * - 이 Publisher에 등록된 함수 제거 (단일)
   */
  remove(func: Function): void {
    this._observers.delete(func);
  }

  /**
   * 🧚🏻 clear
   * - 이 Publisher에 등록된 함수 제거 (모두)
   */
  clear(): void {
    this._observers.clear();
  }

  /**
   * 🧚🏻 clearLargeKeySet
   * - this._recentChangedKeys.largeKeySet 초기화
   */
  clearLargeKeySet() {
    this._recentChangedKeys.largeKeySet.clear();
  }

  /**
   * 👾 updateRecentChangedKeys
   * - this._recentChangedKeys 업데이트
   */
  private updateRecentChangedKeys(): void {
    const isInitPublisherState = Object.values(this._recentChangedKeys).every((arrValue) => !arrValue.length);

    if (!isInitPublisherState) this._recentChangedKeys.prevKeys = [...this._recentChangedKeys.currKeys];
    this._recentChangedKeys.currKeys = this.getRecentKeys() ?? [];

    const { largeKeySet, currKeys } = this._recentChangedKeys;
    const keyList = [...largeKeySet, ...currKeys];
    keyList.forEach((v) => this._recentChangedKeys.largeKeySet.add(v));
  }

  /**
   * 👾 getRecentKeys
   * - 최근에 Publisher의 state에서 변경된 key들 반환
   */
  private getRecentKeys(): (keyof S)[] | null {
    if (!this._state || !this._prevState) return null;
    const arrState = Object.entries(this._state);
    const arrPrevState = Object.entries(this._prevState);

    const result = [];

    for (let i = 0; i < arrState.length; i++) {
      const [key, value] = arrState[i];
      const [prevKey, prevValue] = arrPrevState[i];
      const isDiff = key === prevKey && JSON.stringify(value) !== JSON.stringify(prevValue);
      if (isDiff) result.push(key as keyof S);
    }

    return result;
  }
}

export default Publisher;
