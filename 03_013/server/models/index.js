const db = require('../db');

const isValidCategory = category => {
  const categoryList = Object.keys(db);

  if (categoryList.includes(category)) {
    return true;
  }
  return false;
};

const getContents = category => {
  if (category) {
    return db[category];
  }
  return db;
};

module.exports = {
  getContents,
  isValidCategory,
};
