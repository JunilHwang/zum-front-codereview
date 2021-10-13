import { renderApp } from '../../app';

const useState = defaultState => {
  let state = defaultState;

  const getState = () => {
    return state;
  };

  const setState = newState => {
    state = newState;
    renderApp();
  };

  return [getState, setState];
};

export default useState;
