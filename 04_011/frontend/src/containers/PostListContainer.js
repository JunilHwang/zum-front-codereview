import PostList from '../components/post/PostList';
import { store } from '../modules';
import * as PLM from '../modules/PostListModule';
import Component from '../core/Component';

/** @jsx h */
// eslint-disable-next-line no-unused-vars
const h = (type, props, ...children) => {
  return { type, props, children };
};

const compPostList = new Component();

export const clickEvent = () => {
  const $elem = {
    authorTag: document.querySelectorAll('.authorTag'),
    PostListBlock: document.querySelector('#PostListBlock'),
  };

  const dispatch = store.postList.dispatch;
  const getState = () => {
    return store.postList.getState();
  };
  let setState = {};

  $elem.PostListBlock.onclick = (event) => {
    let span = event.target.closest('span');

    if (!span) return;

    if (!$elem.PostListBlock.contains(span)) return;

    if (event.target.className != 'authorTag') return;

    dispatch(PLM.authorSelect({ value: event.target.firstChild.data }));
    setState = getState();

    compPostList.render(
      PostList(setState.postList, true, setState),
      $elem.PostListBlock,
    );
  };
};

const PostListContainer = (itemList, done) => {
  const $elem = {
    PostListBlock: document.querySelector('#PostListBlock'),
    searchBar: document.querySelector('#searchBar'),
    searchButton: document.querySelector('#searchButton'),
    datedSelector: document.querySelector('#datedSelector'),
    pagenateSelector: document.querySelector('#pagenateSelector'),
    defaultButton: document.querySelector('#defaultButton'),
    refreshButton: document.querySelector('#refreshButton'),
    prevPage: document.querySelector('#prevPage'),
    nowPage: document.querySelector('#nowPage'),
    nextPage: document.querySelector('#nextPage'),
  };

  const dispatch = store.postList.dispatch;
  const getState = () => {
    return store.postList.getState();
  };
  let setState = {};

  const onChangeField = (value) => {
    if (!value) {
      return;
    } else {
      dispatch(PLM.changeField(value));
    }
  };

  const onSetState = () => {
    return getState();
  };

  // 마운트 될때 전달받은 itemList를 store에서 불러옴
  const onLoad = () => {
    if (!itemList) {
      setState = getState();

      dispatch(PLM.readPostList(setState.postList));
      compPostList.render(
        PostList(setState.postList, true, setState),
        $elem.PostListBlock,
      );
    } else {
      setState = getState();
      dispatch(PLM.readPostList(itemList));
      compPostList.render(
        PostList(itemList, true, setState),
        $elem.PostListBlock,
      );
    }
  };

  compPostList.oceanEffect(() => {
    const changeEvent = () => {
      $elem.searchBar.onchange = (e) => {
        onChangeField({ value: e.target.value });

        setState = getState();
        if (!itemList) {
          PostList(setState.postList, true, setState);
        } else {
          PostList(itemList, true, setState);
        }
      };
    };

    const searchEvent = () => {
      $elem.searchButton.onclick = () => {
        setState = getState();
        if (!itemList) {
          compPostList.render(
            PostList(setState.postList, true, setState),
            $elem.PostListBlock,
          );
        } else {
          compPostList.render(
            PostList(itemList, true, setState),
            $elem.PostListBlock,
          );
        }
      };
    };

    const datedEvent = () => {
      $elem.datedSelector.onchange = () => {
        let selectorValue =
          $elem.datedSelector.options[$elem.datedSelector.selectedIndex].value;

        dispatch(PLM.datedSelect({ selector: selectorValue }));

        setState = getState();

        if (!itemList) {
          compPostList.render(
            PostList(setState.postList, true, setState),
            $elem.PostListBlock,
          );
        } else {
          compPostList.render(
            PostList(itemList, true, setState),
            $elem.PostListBlock,
          );
        }
      };
    };

    const pagenationEvent = () => {
      $elem.pagenateSelector.onchange = () => {
        let selectorValue =
          $elem.pagenateSelector.options[$elem.pagenateSelector.selectedIndex]
            .value;

        dispatch(PLM.pagenationSelect({ selector: selectorValue }));

        setState = getState();

        if (!itemList) {
          compPostList.render(
            PostList(setState.postList, true, setState),
            $elem.PostListBlock,
          );
        } else {
          compPostList.render(
            PostList(itemList, true, setState),
            $elem.PostListBlock,
          );
        }
      };
    };

    const pageEvent = () => {
      $elem.prevPage.onclick = () => {
        if (getState().page === 1) {
          return alert('이전 페이지가 없습니다 !');
        } else {
          store.postList.dispatch(PLM.pageDecrease());
          setState = getState();

          if (!itemList) {
            compPostList.render(
              PostList(setState.postList, true, setState),
              $elem.PostListBlock,
            );
          } else {
            compPostList.render(
              PostList(itemList, true, setState),
              $elem.PostListBlock,
            );
          }
        }
      };

      $elem.nextPage.onclick = () => {
        const pageLength = getState().pageLength;
        if (getState().page >= pageLength) {
          return alert('마지막 페이지 입니다 !');
        } else {
          store.postList.dispatch(PLM.pageIncrease());
          setState = getState();

          if (!itemList) {
            compPostList.render(
              PostList(setState.postList, true, setState),
              $elem.PostListBlock,
            );
          } else {
            compPostList.render(
              PostList(itemList, true, setState),
              $elem.PostListBlock,
            );
          }
        }
      };
    };

    const defaultEvent = () => {
      $elem.defaultButton.onclick = () => {
        if (!itemList) {
          dispatch(PLM.refreshStore(getState().postList));
        } else {
          dispatch(PLM.refreshStore(itemList));
        }

        if (getState().postList) {
          // 전부다 초기화
          dispatch(PLM.changeField('')); // 스토어 내 value 값 초기화
          $elem.searchBar.value = ''; // 검색바 비우기
          $elem.datedSelector.value = 'none'; // 셀렉터 초기화
          $elem.pagenateSelector.value = 'none'; // 셀렉터 초기화

          if (!itemList) {
            compPostList.render(
              PostList(getState().postList, true, getState()),
              $elem.PostListBlock,
            );
          } else {
            compPostList.render(
              PostList(itemList, true, getState()),
              $elem.PostListBlock,
            );
          }
        } else {
          return;
        }
      };
    };

    const refreshEvent = () => {
      $elem.refreshButton.onclick = () => {
        compPostList.getPostList();
        setState = getState();

        dispatch(PLM.changeField('')); // 스토어 내 value 값 초기화
        $elem.searchBar.value = ''; // 검색바 비우기
        $elem.datedSelector.value = 'none'; // 셀렉터 초기화
        $elem.pagenateSelector.value = 'none'; // 셀렉터 초기화

        if (!itemList) {
          dispatch(PLM.refreshStore(setState.postList));
        } else {
          dispatch(PLM.refreshStore(itemList));
        }
      };
    };

    onLoad();
    store.postList.subscribe(onSetState);

    changeEvent();
    searchEvent();
    datedEvent();
    pagenationEvent();
    defaultEvent();
    refreshEvent();
    pageEvent();
  }, $elem.PostListBlock);

  if (!itemList) {
    return (
      <div id="PostListBlock" class="common">
        {PostList(setState.postList, done, setState)}
      </div>
    );
  } else {
    return (
      <div id="PostListBlock" class="common">
        {PostList(itemList, done, setState)}
      </div>
    );
  }
};

export default PostListContainer;
