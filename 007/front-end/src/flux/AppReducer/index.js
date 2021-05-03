import { Reducer } from '../../core';

export default class AppReducer extends Reducer {
  initTypes() {
    this.types = {
      INIT_TOP_TWELVE_CONTENTS: this.initTopTwelveContents,
      INIT_CONTENTS: this.initContents,
      SET_DETAIL_HTML: this.setDetailHTML,
      LOADING: null,
      SUCCESS: null,
      FAIL: null,
    };
  }

  initTopTwelveContents(state, payload) {
    const { contents } = payload;

    return { ...state, topTwelveContents: contents };
  }

  initContents(state, payload) {
    const { contents } = payload;
    const [
      lifeContents,
      foodContents,
      travelContents,
      cultureContents,
    ] = contents;

    return {
      ...state,
      contents: {
        lifeContents,
        foodContents,
        travelContents,
        cultureContents,
      },
      topFourContents: [
        lifeContents.slice(0, 4),
        foodContents.slice(0, 4),
        travelContents.slice(0, 4),
        cultureContents.slice(0, 4),
      ],
    };
  }

  setDetailHTML(state, payload) {
    const { detailHTML, url } = payload;

    return { ...state, detailHTML, detailUrl: url };
  }
}
