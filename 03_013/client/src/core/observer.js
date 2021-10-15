/* eslint-disable no-param-reassign */
// 함수는 보통 1초에 60번 실행함(정확히는 모니터 주사율에 맞춰 실행)
// 모니터 주사율이 60FPS라면 1초에 60번, 140FPS라면 1초에 140번
// 1초는 1000ms, 1프레임은 16ms, 한번에 반복문을 도는데는 1ms

let currentObserver = null;
// state 변경을 여러번 반복하면 observer 콜백을 수 없이 호출 -> 렌더링 하므로 리소스 낭비
// 따라서 requestAnimationFrame은 1프레임에 1회만 호출되도록 강제함
const debounceFrame = callback => {
  let currentCallback = -1;
  return () => {
    cancelAnimationFrame(currentCallback);
    // 1프레임(16ms)이 경과하기 전에 여러번 호출됐다면 마지막 호출된 것만 실행
    currentCallback = requestAnimationFrame(callback);
  };
};

export const observe = fn => {
  currentObserver = debounceFrame(fn);
  fn();
  currentObserver = null;
};

export const observable = state => {
  const observerMap = {};

  // * Proxy 사용
  return new Proxy(state, {
    get(target, name) {
      observerMap[name] = observerMap[name] || new Set();
      if (currentObserver) observerMap[name].add(currentObserver);
      return target[name];
    },
    set(target, name, value) {
      if (target[name] === value) return true;
      if (JSON.stringify(target[name]) === JSON.stringify(value)) return true;

      target[name] = value;
      observerMap[name].forEach(fn => fn());
      return true;
    },
  });

  // * Object.definedProperty 사용(IE 대응)
  // Object.keys(state).forEach(key => {
  //   let _value = state[key];
  //   const observers = new Set();

  //   Object.defineProperty(state, key, {
  //     get() {
  //       if (currentObserver) observers.add(currentObserver);
  //       return _value;
  //     },
  //     set(value) {
  //       if (_value === value) return; // 원시형
  //       if (JSON.stringify(_value) === JSON.stringify(value)) return; // 참조형
  //       _value = value;
  //       observers.forEach(fn => fn()); // 상태 변경시 옵저버가 리렌더 실행
  //     },
  //   });
  // });
};
