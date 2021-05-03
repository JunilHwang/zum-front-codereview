import { Store } from '../../core';

export default class AppStore extends Store {
  initState() {
    this.state = {
      contents: {
        lifeContents: [],
        foodContents: [],
        travelContents: [],
        cultureContents: [],
      },
      topFourContents: [],
      topTwelveContents: [],
      detailHTML: '',
      detailUrl: '',
    };
  }
}
