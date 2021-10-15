import Component from './core/Component';
import api from './api';
import { setContents, setFavorites, store } from './store';
import ContentList from './components/ContentsList';

export default class App extends Component {
  constructor(...args) {
    super(...args);
    this.initState();
  }

  template() {
    const { life, food, travel, culture } = store.getState().contents;
    const renderList = ['life', 'food', 'travel', 'culture'];
    return `
      ${[life, food, travel, culture]
        .map(
          (contents, index) => `
        <h3>#${renderList[index]}</h3>
        ${ContentList(contents, 3)}
      `,
        )
        .join('')}
    `;
  }

  initState() {
    api.getAllContents().then(res => {
      store.dispatch(setContents(res));
    });
  }

  setEvent() {
    const { $el } = this;
    // dispatch -> action -> reducer -> state
  }
}
