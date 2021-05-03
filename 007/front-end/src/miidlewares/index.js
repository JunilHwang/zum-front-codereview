import {
  getTopTwelveContents,
  getLifeContents,
  getFoodContents,
  getTravelContents,
  getCultureContents,
  getDetailHTML,
} from '../apis';

const sendAPIRequest = store => next => async action => {
  // this.store.dispatch(this.store.createAction('LOADING'));

  try {
    if (action.type === 'INIT_TOP_TWELVE_CONTENTS') {
      const contents = await getTopTwelveContents();
      action = { ...action, payload: { contents } };

      next(action);
    }

    if (action.type === 'INIT_CONTENTS') {
      const contentsSettledPromises = await Promise.allSettled([
        getLifeContents(),
        getFoodContents(),
        getTravelContents(),
        getCultureContents(),
      ]);

      const contents = contentsSettledPromises.map(contentsSettledPromise => {
        return contentsSettledPromise.value;
      });

      action = {
        ...action,
        payload: {
          contents,
        },
      };

      next(action);
    }

    if (action.type === 'SET_DETAIL_HTML') {
      const { url } = action.payload;
      const detailHTML = await getDetailHTML(url);

      action = {
        ...action,
        payload: {
          detailHTML,
          url,
        },
      };

      next(action);
    }
  } catch (e) {
    // this.store.dispatch(this.store.createAction('FAIL'));
    console.log(e);
  }
};

export { sendAPIRequest };
