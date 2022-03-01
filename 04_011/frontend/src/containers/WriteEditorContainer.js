import Header from '../components/common/header';
import WriteEditor from '../components/write/WriteEditor';
import Component from '../core/Component';
import { store } from '../modules';
import * as WM from '../modules/writeModule';

/** @jsx h */
// eslint-disable-next-line no-unused-vars
const h = (type, props, ...children) => {
  return { type, props, children };
};

const compWrite = new Component();

const WriteEditorContainer = () => {
  const $elem = {
    writeEditorWrap: document.querySelector('#writeEditorWrap'),
    writeEditorBlock: document.querySelector('#writeEditorBlock'),
    titleinput: document.querySelector('#titleInput'),
    authorInput: document.querySelector('#authorInput'),
    editorInput: document.querySelector('#editorInput'),
  };

  const dispatch = store.editor.dispatch;
  const mount = WM.initialize;
  const hashPath = window.location.hash.replace('#', '');
  const getState = () => {
    return store.post.getState();
  };
  let setState = {};

  const onFix = () => {
    setState = getState();

    return setState.post;
  };

  const onChangeField = (payload) => {
    if (!payload) {
      return;
    } else {
      dispatch(WM.changeField(payload));
    }
  };

  compWrite.oceanEffect(() => {
    if (hashPath === 'update') {
      if (onFix()) {
        dispatch(WM.setOriginalPost(onFix()));
      }
      setState = getState();
      $elem.titleinput.value = setState.post.title;
      $elem.authorInput.value = setState.post.author;
      $elem.editorInput.value = setState.post.body;
    } else if (hashPath === 'write') {
      dispatch(mount);
    }

    const changeEvent = () => {
      $elem.titleinput.onchange = (e) => {
        onChangeField({ key: 'title', value: e.target.value });
      };

      $elem.authorInput.onchange = (e) => {
        onChangeField({ key: 'author', value: e.target.value });
      };

      $elem.editorInput.onchange = (e) => {
        onChangeField({ key: 'body', value: e.target.value });
      };
    };

    store.editor.subscribe(onChangeField);
    changeEvent();
  }, $elem.writeEditorWrap);

  return (
    <div id="Wrap">
      {Header()}
      <div class="spacer"></div>
      <div id="writeEditorWrap">{WriteEditor(compWrite)}</div>
    </div>
  );
};

export default WriteEditorContainer;
