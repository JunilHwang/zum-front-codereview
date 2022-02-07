import { ListenerStorage } from '@src/components/component';
import router from '@src/routes/router';

import Component from '../component';

type DataObject = { [propsName: string]: any };

ListenerStorage.setListener('toArticleDetail', (e: Event) => {
  console.log(e.target);
  console.log(e.currentTarget);
});

export default class ArticleContainer extends Component {
  constructor(name: string, state: DataObject, props: DataObject) {
    super(name, state, props);

    this.setTemplate((state: DataObject) => {
      if (Object.keys(state).length > 0) {
        const articleList = state.data;
        return `
            <ul onClick="toArticleDetail">
                ${articleList
                  .map(
                    (data: DataObject) =>
                      `<ArticleRow data=${JSON.stringify(data)}></ArticleRow>`,
                  )
                  .join('')}
               </ul>
            `;
      } else {
        return '';
      }
    });
  }
}
