const cacheMap = new Map();

function saveData(key, information) {
  cacheMap.set(key, information);
}

function getData(key) {
  return cacheMap.get(key) ? cacheMap.get(key) : null;
}

module.exports = { saveData, getData };
