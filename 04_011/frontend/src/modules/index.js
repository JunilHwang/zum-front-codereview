import { createStore } from '../core/Store';
import postListModule from './PostListModule';
import postModule from './PostModule';
import editorModule from './writeModule';

export const store = {
  postList: createStore(postListModule),
  editor: createStore(editorModule),
  post: createStore(postModule),
};
