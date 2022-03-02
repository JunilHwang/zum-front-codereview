import { getUrlInfo } from '@src/utils';
import { getRequest } from '@src/utils/api';

import '@src/stylesheets/ListView.css';

type DataObject = { [propsName: string]: any };

const ListView = (() => {
  return async () => {
    console.log(getUrlInfo(window.location.pathname));
    return ``;
  };
})();

export default ListView;
