import store from './redux/store.js';

const { getBestData, getCategoryData } = require('./api');

const setInitialStoreData = async () => {
  const bestData = await getBestData();
  const lifeCategoryData = await getCategoryData('life');
  const foodCategoryData = await getCategoryData('food');
  const tripCategoryData = await getCategoryData('trip');
  const cultureCategoryData = await getCategoryData('culture');

  store.dispatch({ type: 'GET_BEST_DATA', payload: bestData });
  store.dispatch({
    type: 'GET_CATEGORY_DATA',
    payload: { life: lifeCategoryData },
  });
  store.dispatch({
    type: 'GET_CATEGORY_DATA',
    payload: { food: foodCategoryData },
  });
  store.dispatch({
    type: 'GET_CATEGORY_DATA',
    payload: { trip: tripCategoryData },
  });
  store.dispatch({
    type: 'GET_CATEGORY_DATA',
    payload: { culture: cultureCategoryData },
  });

  const data = await store.getState();
  return data;
};

export default setInitialStoreData;
