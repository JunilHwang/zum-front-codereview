import { ADD_BOOKMARK, REMOVE_BOOKMARK } from './action';
import {
  getBookmarkFromLocalStorage,
  saveBookmarkInLocalStorage,
} from './storage';
import bookmarkReducer from './reducer';

const initialState = {
  likeContents: [],
};

const Store = (state = initialState) => {
  let globalState = {
    state,
    observed: [],
    reducers: {},
  };

  const setInitiallikeContents = () => {
    const getItems = getBookmarkFromLocalStorage();
    if (getItems) {
      globalState.state.likeContents = getItems;
    }
  };

  const nofifyObserved = () => {
    const { observed } = globalState;
    for (let callback of observed) {
      callback();
    }
  };

  const setState = (newState) => {
    globalState = { ...globalState, ...newState };
  };

  const combineReducers = (newReducerObj) => {
    setState({ reducers: { ...globalState.reducers, ...newReducerObj } });
  };

  const dispatch = ({ type, payload }) => {
    if (type === ADD_BOOKMARK || type === REMOVE_BOOKMARK) {
      const { bookmarkReducer } = globalState.reducers;
      const {
        state: { likeContents },
      } = globalState;
      globalState.state.likeContents = bookmarkReducer(likeContents, {
        type,
        payload: payload,
      });
    }
    saveBookmarkInLocalStorage(globalState.state.likeContents);
    nofifyObserved();
  };

  const subscribeStore = (callback) => {
    const { observed } = globalState;
    observed.push(callback);
    setState({ observed: [...new Set(observed)] });
  };

  const unsubscribeStore = ({ callback, option }) => {
    const { observed } = globalState;
    option
      ? setState({ observed: [] })
      : setState({ observed: observed.filter((fun) => fun !== callback) });
  };

  const getState = () => {
    return globalState;
  };

  setInitiallikeContents();
  combineReducers({ bookmarkReducer: bookmarkReducer });

  return {
    combineReducers,
    dispatch,
    subscribeStore,
    unsubscribeStore,
    nofifyObserved,
    getState,
  };
};

export default Store;
