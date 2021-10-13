import store from '../../lib/redux/store';

import Banner from './Banner.js';
import CardList from './CardList.js';
import TopContents from './TopContents.js';

const MainContainer = () => {
  const { best, category } = store.getState();

  return `
    <main>
      ${Banner()}
      ${CardList(category)}
      ${TopContents(best)}
    </main>`;
};

export default MainContainer;
