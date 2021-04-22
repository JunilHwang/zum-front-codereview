interface State {
  [key: string]: any;
}

interface Action {
  type: string;
  payload?: any;
}

type Reducer = (state: State, action: Action) => State;

type Observer = (state: State) => any;

interface Store {
  state: State;
  observers: Observer[];
  reducer: Reducer;
  observe: (observer: Observer) => void;
  publish: () => void;
  dispatch: (action: Action) => void;
}

let store: Store | null = null;

const baseStore: Store = {
  state: {},
  observers: [],
  reducer: {} as Reducer,

  observe(observer: Observer) {
    this.observers.push(observer);
  },

  publish() {
    this.observers.forEach((observer) => observer(this.state));
  },

  dispatch(action: Action) {
    this.state = this.reducer(this.state, action);
    this.publish();
  },
};

const createStore = (reducer: Reducer, initialState: State) => {
  if (store) return;

  const newStore = Object.assign<Store, {}>(Object.create(baseStore), {
    reducer,
    state: initialState,
    observers: [],
  });

  return (store = newStore);
};

const useStore = () => {
  if (!store) throw new Error('Store must be created');
  return store;
};

export { createStore, useStore, State, Action, Reducer };
