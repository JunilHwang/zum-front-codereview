function Observer(value) {
  let listeners = []

  function notify(state) {
    listeners.forEach(function (listener) { listener(state); })

  }
  function updateState(state) {
    if (arguments.length && state !== value) {
      value = state;
      notify(state);
    }
    return value
  }

  updateState.subscribe = function (listener) {
    listeners.push(listener)
  }

  return updateState
}

export default Observer