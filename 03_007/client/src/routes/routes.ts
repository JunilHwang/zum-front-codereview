import { Main, Sub, Detail, Bookmark } from '@/pages';
import paths from './paths';
import { subPaths } from './paths';

export const getView = (url: string, outer: HTMLElement, data?: {}) => {
  if (url === paths.root) new Main(outer, data);
  else if (url === paths.detail) new Detail(outer, data);
  else if (url === paths.bookmark) new Bookmark(outer, data);
  else if (subPaths.includes(url)) new Sub(outer, data);
};

const routes = (url: string, outer: HTMLElement, data?: {}) => {
  history.pushState(data, '', url);
  getView(url, outer, data);
};
export default routes;
