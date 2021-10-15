type Cache = {
  [key: string]: any;
};

const myCache = (() => {
  let _cache: Cache = {};

  const get = (key: string) => {
    if (!_cache[key]) return { cache: null };

    return { cache: _cache[key] };
  };

  const set = <T>(key: string, data: T) => {
    _cache[key] = data;
  };

  return { get, set };
})();

export { myCache };
