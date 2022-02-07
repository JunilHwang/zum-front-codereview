export class Cache {
  set(key, value) {
    const item = {
      type: typeof value,
      value,
    };
    return localStorage.setItem(key, JSON.stringify(item));
  }

  get(key) {
    if (Cache.prototype.has.call(this, key)) {
      const cache = localStorage.getItem(key);
      try {
        const item = JSON.parse(cache);
        if (item.type === typeof item.value) {
          return item.value;
        }
      } catch (e) {}
    }
    return null
  }

  has(key) {
    return localStorage.getItem(key) !== null;
  }

  clear() {
    return localStorage.clear();
  }

  delete(key) {
    return localStorage.removeItem(key);
  }
}

export function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  return [date.getFullYear(), date.getMonth()+1, date.getDate()].join('/');
}

export function compose(...funcs) {
  return function (...args) {
    const init = funcs.pop()(...args);
    return funcs
      .reverse()
      .reduce((acc, f) => f(acc), init);
  };
}
