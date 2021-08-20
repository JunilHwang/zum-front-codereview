const createStore = (initialState, reducer) => {
  let state = initialState;

  const events = {};

  //특정 액션발생시 실행할 함수를 구독
  const subscribe = (actionType, eCallBack) => {
    if (!events[actionType]) {
      events[actionType] = [];
    }
    events[actionType].push(eCallBack);
  };

  //특정 액션 발생시 함수 실행하는 함수
  const publish = (actionType, params) => {
    if (!events[actionType]) return;
    events[actionType].map(func => func(params));
  };

  //특정 액션 발생시 리듀서에 상태와 액션을 전달하여 상태업데이트
  const dispatch = (action, params) => {
    state = reducer(state, action);
    publish(action.type, params);
  };

  const getState = () => JSON.parse(JSON.stringify(state))
  
  return {
    getState,
    subscribe,
    dispatch,
  };
};

const Store = {
  createStore,
};

export default Store;
