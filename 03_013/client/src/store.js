/* eslint-disable no-param-reassign */
import createStore from './core/Store';

// 스토어 초기값
const initState = {
  contents: {
    culture: [],
    food: [],
    life: [],
    ranking: [],
    travel: [],
  },
  favorites: [],
};

// dispatch에 사용할 type 정의
export const SET_CONTENTS = 'SET_CONTENTS';
export const SET_FAVORITES = 'SET_FAVORITES';

export const store = createStore((state = initState, action = {}) => {
  switch (action.type) {
    case 'SET_CONTENTS':
      return {
        ...state,
        contents: {
          ...state.contents,
          culture: action.payload.culture,
          food: action.payload.food,
          life: action.payload.life,
          ranking: action.payload.ranking,
          travel: action.payload.travel,
        },
      };
    case 'SET_FAVORITES':
      return { ...state, favorites: action.payload };
    default:
      return state;
  }
});

export const setContents = payload => ({ type: SET_CONTENTS, payload });
export const setFavorites = payload => ({ type: SET_FAVORITES, payload });
