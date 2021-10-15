type GlobalStateType = {
  [key: string]: { _state: any; _observers: Map<string, Function> };
};

type InitState<T> = {
  key: string;
  value: T;
};

const globalState: GlobalStateType = {};

const subscribe = (
  key: string,
  componentId: string | null,
  observer: Function
) => {
  if (typeof componentId === 'string') {
    globalState[key]._observers.set(componentId, observer);
  } else throw Error('check your componentId');
};

const _notify = (key: string) =>
  globalState[key]._observers.forEach((observer: Function) => observer());

const initState = <T>({ key, value }: InitState<T>): string => {
  if (key in globalState) throw Error('key already exists in globalState');
  globalState[key] = {
    _state: value,
    _observers: new Map(),
  };
  return key;
};

const getState = <T>(key: string): T => {
  if (!(key in globalState)) throw Error('No Key in globalState');
  return globalState[key]._state;
};

const setState =
  <T>(key: string) =>
  (newState: T): void => {
    if (!(key in globalState)) throw Error('No Key in globalState');

    globalState[key]._state = newState;

    _notify(key);
  };

export { subscribe, initState, getState, setState };
