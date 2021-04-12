export function createStore(reducer) {
    let state = {};
    let callback = null;
    const getState = () => {
        return { ...state };
    };
    const dispatch = (action) => {
        state = reducer(state, action);
        callback();
        // console.log({ ...state });
    };
    const subscribe = (cb) => {
        callback = cb;
    };
    return {
        getState,
        dispatch,
        subscribe,
    };
}
