const dev = 'http://localhost:3000';
const production = null;

const getTopTwelveContents = function () {
  return fetch(`${dev}/api/best`).then(function (response) {
    return response.json();
  });
};

const getLifeContents = function () {
  return fetch(`${dev}/api/content/life`).then(function (response) {
    return response.json();
  });
};

const getFoodContents = function () {
  return fetch(`${dev}/api/content/food`).then(function (response) {
    return response.json();
  });
};

const getTravelContents = function () {
  return fetch(`${dev}/api/content/travel`).then(function (response) {
    return response.json();
  });
};

const getCultureContents = function () {
  return fetch(`${dev}/api/content/culture`).then(function (response) {
    return response.json();
  });
};

const getDetailHTML = function (url) {
  return fetch(`${dev}/api/detail?url=${url}`).then(function (response) {
    return response.text();
  });
};

export {
  getTopTwelveContents,
  getLifeContents,
  getFoodContents,
  getTravelContents,
  getCultureContents,
  getDetailHTML,
};
