import { observable } from '@/core/observer';

export const createStore = (reducer: Function) => {
  // reducer 가 반환하는 객체의 상태변화를 감지
  let state = observable(reducer());

  // immutable 한 frozenState 생성
  const frozenState = new Proxy(state, {
    get(target: object, key: string | symbol, receiver: any): any {
      return Reflect.get(target, key);
    },
    set(
      target: object,
      key: string | symbol,
      value: any,
      receiver: any,
    ): boolean {
      return true;
    },
  });

  // dispatch 로 state 값 변경
  const dispatch = (action: Object) => {
    const newState = reducer(state, action);
    for (const [key, value] of Object.entries(newState)) {
      if (!Reflect.get(state, key)) continue;
      Reflect.set(state, key, value);
    }
  };

  const getState = () => frozenState;

  return { getState, dispatch };
};
export default createStore;
