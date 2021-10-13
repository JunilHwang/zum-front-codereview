import createStore from './createStore.js';

// Action
const GET_CATEGORY_DATA = 'GET_CATEGORY_DATA';
const GET_BEST_DATA = 'GET_BEST_DATA';
const GET_DETAIL_DATA = 'GET_DETAIL_DATA';

const initialState = {
  best: [],
  category: { life: [], food: [], trip: [], culture: [] },
  detail: { title: '', media: '', article: '', category: '' },
};

// Reducer
const fetchData = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CATEGORY_DATA':
      return { ...state, category: { ...state.category, ...action.payload } };
    case 'GET_BEST_DATA':
      return { ...state, best: action.payload };
    case 'GET_DETAIL_DATA':
      return { ...state, detail: action.payload };
    default:
      return { ...state };
  }
};

const store = createStore(fetchData);

export default store;
