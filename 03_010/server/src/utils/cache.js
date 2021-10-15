const createLocalCache = () => {
  let _cache = {};

  const get = (key) => {
    if (!_cache[key]) return { cache: null };

    return { cache: _cache[key] };
  };

  const set = (key, data) => {
    _cache[key] = data;
  };

  return { get, set };
};

module.exports = createLocalCache;
