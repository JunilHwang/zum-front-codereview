import Header from './components/common/header';
import PostListContainer from './containers/PostListContainer';
import WriteEditorContainer from './containers/WriteEditorContainer';
import PostContainer from './containers/PostContainer';
import Component from './core/Component';
import NotFound from './components/common/NotFound';

/** @jsx h */
// eslint-disable-next-line no-unused-vars
const h = (type, props, ...children) => {
  return { type, props, children };
};

const App = () => {
  return (
    <div id="wrap">
      {Header()}
      <div class="spacer"></div>
      <div id="PostListWrap">{PostListContainer()}</div>
    </div>
  );
};

export default App();

const $entry = document.getElementById('root');

// 스택 형태로 routes 를 생성
const routes = [
  { path: '', component: App },
  { path: 'write', component: WriteEditorContainer },
  { path: ':postId', component: PostContainer },
  { path: 'update', component: WriteEditorContainer },
  { path: 'error', component: NotFound },
];

new Component($entry, routes);
