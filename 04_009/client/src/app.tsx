import Router from './core/router';
import { ClassContructor, IRoute } from './core/types';
import NotFoundPage from './pages/not-found-page';
import PostListPage from './pages/post-list-page';
import PostModifyPage from './pages/post-modify-page';
import PostPage from './pages/post-page';
import PostWritePage from './pages/post-write-page';
import postStore from './store/post-store';
import { addLoader } from './utils/loader';

class App {
  target: HTMLElement;
  loaderTarget: HTMLElement;
  routes: IRoute[];
  NotFoundPage: ClassContructor;

  constructor(target: HTMLElement, loaderTarget: HTMLElement) {
    this.target = target;
    this.loaderTarget = loaderTarget;
    this.routes = [
      { path: '/', component: PostListPage },
      { path: '/write', component: PostWritePage },
      { path: '/modify/:postId', component: PostModifyPage },
      { path: '/search', component: PostListPage },
      { path: '/:postId', component: PostPage },
    ];
    this.NotFoundPage = NotFoundPage;
    this.init();
    this.render();
  }

  init() {
    addLoader(this.loaderTarget);
  }

  render() {
    new Router(this.target, this.routes, this.NotFoundPage, [postStore]);
  }
}

export default App;
