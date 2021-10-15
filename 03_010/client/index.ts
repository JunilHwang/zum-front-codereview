import './index.scss';

import Router from '@src/lib/Router';
import { routesConfig } from '@src/configs/routes';
import { _ } from '@src/utils/myUtils';
import { pageStore } from '@src/store/pages';

import App from '@src/App';

export const $root = _.$('#root', document);
export const router = new Router(routesConfig, pageStore);

function init() {
  new App($root);
}

init();
