import { getRequest } from '@src/utils/api';

import '@src/stylesheets/ListView.css';

type DataObject = { [propsName: string]: any };

const ListView = (() => {
  return async () => {
    const response = await getRequest(`${process.env.API_URL}/api/article`);
    const articleList = response.data;
    return `
    <section class="articles" id="articles-section" onClick="test">
        <ArticleContainer data=${JSON.stringify({
          data: articleList,
        })}></ArticleContainer>
    </section>`;
  };
})();

export default ListView;
