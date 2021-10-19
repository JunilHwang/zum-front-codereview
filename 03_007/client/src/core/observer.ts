import { isObjectEqual } from '@/utils';

let currentEvent: Function | null = null;
export const observe = (func: Function) => {
  // 함수를 실행함
  currentEvent = func;
  func();
  currentEvent = null;
};

export const observable = (obj: object) => {
  let events = new Set();

  return new Proxy(obj, {
    get(target: object, key: string | symbol, receiver: any): any {
      // add currentEvent to events
      currentEvent && events.add(currentEvent);
      return Reflect.get(obj, key);
    },
    set(
      target: object,
      key: string | symbol,
      value: any,
      receiver: any,
    ): boolean {
      // 이전 값과 현재 값이 같으면 return
      const _value = Reflect.get(obj, key);
      if (_value === value) return true;
      if (isObjectEqual(_value, value)) return true;

      // 값 수정
      Reflect.set(obj, key, value);

      // 구독하고 있는 target 에 변화가 있을 때 등록해놓은 함수 실행
      events.forEach(fn => {
        fn instanceof Function && fn();
      });
      return true;
    },
  });
};
