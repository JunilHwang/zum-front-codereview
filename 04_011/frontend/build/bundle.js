/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/common/NotFound.js":
/*!*******************************************!*\
  !*** ./src/components/common/NotFound.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _header__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./header */ "./src/components/common/header.js");

/** @jsx h */
// eslint-disable-next-line no-unused-vars

const h = (type, props, ...children) => {
  return {
    type,
    props,
    children
  };
};

const NotFound = () => {
  return h("div", {
    id: "wrap"
  }, (0,_header__WEBPACK_IMPORTED_MODULE_0__["default"])(), h("div", {
    class: "spacer"
  }), h("div", {
    id: "notFound"
  }, h("div", null, h("h1", null, "Page Not Found : 404"), h("p", null, "\uD398\uC774\uC9C0\uB97C \uCC3E\uC744\uC218 \uC5C6\uC2B5\uB2C8\uB2E4."), h("p", null, "\uC798\uBABB\uB41C \uACBD\uB85C\uB97C \uC785\uB825\uD588\uAC70\uB098 \uC0AD\uC81C\uB41C \uAC8C\uC2DC\uBB3C \uC785\uB2C8\uB2E4."))));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NotFound);

/***/ }),

/***/ "./src/components/common/header.js":
/*!*****************************************!*\
  !*** ./src/components/common/header.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/** @jsx h */
// eslint-disable-next-line no-unused-vars
const h = (type, props, ...children) => {
  return {
    type,
    props,
    children
  };
};

const Header = () => {
  return h("header", null, h("div", {
    class: "logo"
  }, h("a", {
    href: "#"
  }, "Zum-Board")), h("div", {
    class: "rightBox"
  }, "\uC624\uB978\uCABD\uBC15\uC2A4"));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Header);

/***/ }),

/***/ "./src/components/post/Post.js":
/*!*************************************!*\
  !*** ./src/components/post/Post.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/** @jsx h */
// eslint-disable-next-line no-unused-vars
const h = (type, props, ...children) => {
  return {
    type,
    props,
    children
  };
};

const PostTop = post => {
  const {
    postId,
    title,
    author,
    wrDate
  } = post;
  return h("div", null, h("div", {
    id: "PostHeader"
  }, h("h1", null, title), h("div", {
    class: "rightBox"
  }, h("button", {
    id: "listmoveButton"
  }, h("a", {
    href: "#"
  }, "\uBAA9\uB85D")), h("button", {
    id: "updateButton"
  }, h("a", {
    href: "#update"
  }, "\uC218\uC815")), h("button", {
    id: "deleteButton"
  }, h("a", {
    href: "#"
  }, "\uC0AD\uC81C")))), h("div", {
    id: "PostHead"
  }, "\uD3EC\uC2A4\uD2B8 \uBC88\uD638 : ", `${postId}`, " ", h("br", null), "\uC791\uC131\uC790 : ", author, " ", h("br", null), "\uC791\uC131\uC77C : ", wrDate));
};

const Post = (post, done) => {
  return h("div", {
    id: "PostBlock",
    class: "common"
  }, h("div", {
    id: "PostTop"
  }, post && done ? PostTop(post) : ''), h("div", {
    id: "PostContent"
  }, post && done ? post.body : ''));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Post);

/***/ }),

/***/ "./src/components/post/PostList.js":
/*!*****************************************!*\
  !*** ./src/components/post/PostList.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PageNum": () => (/* binding */ PageNum),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../modules */ "./src/modules/index.js");
/* harmony import */ var _modules_PostListModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../modules/PostListModule */ "./src/modules/PostListModule.js");


/** @jsx h */
// eslint-disable-next-line no-unused-vars

const h = (type, props, ...children) => {
  if (Array.isArray(...children)) {
    const arrConv = Object.values(children[0]);
    children = arrConv;
  }

  return {
    type,
    props,
    children
  };
};

const PostListTop = () => {
  return h("div", {
    id: "PostListTop"
  }, h("div", {
    id: "top"
  }, h("h1", null, "\uAC8C\uC2DC\uD310"), h("div", {
    id: "searchBlock"
  }, h("input", {
    id: "searchBar",
    type: "search",
    name: "postsearch",
    placeholder: "\uAC80\uC0C9\uD560 \uB0B4\uC6A9\uC744 \uC785\uB825\uD574\uC8FC\uC138\uC694,,,"
  }), h("button", {
    id: "searchButton"
  }, "\uAC80\uC0C9")), h("div", {
    class: "rightBox"
  }, h("button", {
    id: "refreshButton"
  }, "\uC0C8\uB85C\uACE0\uCE68"))), h("div", {
    id: "PostListTopMenu"
  }, h("select", {
    id: "datedSelector",
    name: "publishDate"
  }, h("option", {
    value: "none"
  }, "\uC791\uC131\uC77C"), h("option", {
    value: "latest"
  }, "\uCD5C\uC2E0\uAE00 ( \uC624\uB984\uCC28\uC21C )"), h("option", {
    value: "first"
  }, "\uC791\uC131\uC21C\uC11C ( \uB0B4\uB9BC\uCC28\uC21C )")), h("select", {
    id: "pagenateSelector",
    name: "pagenateSelector"
  }, h("option", {
    value: "none"
  }, "\uAC8C\uC2DC\uBB3C \uC218 ( \uAE30\uBCF8: 30\uAC1C )"), h("option", {
    value: "5th"
  }, "5\uAC1C\uC529 \uBCF4\uAE30"), h("option", {
    value: "10th"
  }, "10\uAC1C\uC529 \uBCF4\uAE30"), h("option", {
    value: "15th"
  }, "15\uAC1C\uC529 \uBCF4\uAE30"), h("option", {
    value: "20th"
  }, "20\uAC1C\uC529 \uBCF4\uAE30")), h("button", {
    id: "defaultButton"
  }, "\uC124\uC815 \uCD08\uAE30\uD654"), h("button", null, h("a", {
    href: "#write"
  }, "\uC0C8 \uAE00 \uC791\uC131\uD558\uAE30"))));
};

const PostItem = item => {
  const {
    postId,
    title,
    author,
    wrDate
  } = item;
  return h("div", {
    id: "PostItem"
  }, h("h3", null, h("a", {
    href: '#' + postId
  }, h("span", null, `${postId}.`), h("span", null, title))), h("div", null, h("p", null, h("span", {
    class: "authorTag"
  }, author), h("span", null, wrDate))));
};

const PageNum = (state = 1) => {
  return h("h4", null, `${state}`);
};

const PostList = (itemList, done, state) => {
  const {
    value,
    datedSelector,
    pagenateSelector,
    authorFilter
  } = state;
  const pagenateList = [];
  let outputList = [];

  if (itemList) {
    let pages = 1; // 기본값 1

    let itemPerPage = 30;
    const pageItem = itemList.length; // 초기 : null, 셀렉트시에 들어옴

    const parsePageSelector = () => {
      switch (pagenateSelector) {
        case '5th':
          return itemPerPage = 5;

        case '10th':
          return itemPerPage = 10;

        case '15th':
          return itemPerPage = 15;

        case '20th':
          return itemPerPage = 20;

        default:
          return itemPerPage = 30;
      }
    };

    const parseDatedSelector = () => {
      if (datedSelector === 'none') {
        return itemList;
      } else {
        const result = itemList.concat().sort((postA, postB) => {
          switch (datedSelector) {
            case 'latest':
              if (postA.wrDate > postB.wrDate) {
                return -1;
              }

              if (postA.wrDate < postB.wrDate) {
                return 1;
              }

              return 0;

            case 'first':
              if (postA.wrDate > postB.wrDate) {
                return 1;
              }

              if (postA.wrDate < postB.wrDate) {
                return -1;
              }

              return 0;

            default:
              return 0;
          }
        });
        return result;
      }
    };

    const parseSearchSelector = list => {
      const postIdSearch = (target, v) => {
        if (target) {
          return target.includes(v);
        } else {
          return false;
        }
      };

      const titleSearch = (target, v) => {
        if (target) {
          return target.includes(v);
        } else {
          return false;
        }
      };

      const bodySearch = (target, v) => {
        if (target) {
          return target.includes(v);
        } else {
          return false;
        }
      };

      const result = list.filter(post => {
        const postId = JSON.stringify(post.postId);
        const {
          title,
          body
        } = post;
        return postIdSearch(postId, value) || titleSearch(title, value) || bodySearch(body, value);
      });
      return result;
    };

    const parseAuthorSelector = list => {
      const authorSearch = (target, v) => {
        if (target) {
          return target.includes(v);
        } else {
          return false;
        }
      };

      const result = list.filter(post => {
        const author = post.author;
        return authorSearch(author, authorFilter);
      });
      return result;
    };

    parsePageSelector();
    outputList = parseDatedSelector();

    if (value) {
      outputList = parseSearchSelector(outputList);
    }

    if (authorFilter) {
      outputList = parseAuthorSelector(outputList);
    }

    pages = Math.ceil(pageItem / itemPerPage);

    for (let i = 0; i < pages; i++) {
      pagenateList.push(outputList.slice(i * itemPerPage, (i + 1) * itemPerPage));
    }
  } // 정렬 과정중에 비어있게 된 배열들을 제거해줌.


  const validList = pagenateList.filter(list => {
    if (list.length === 0) {
      return false;
    } else {
      return true;
    }
  }); // store 에 페이지 length 를 기록.

  _modules__WEBPACK_IMPORTED_MODULE_0__.store.postList.dispatch((0,_modules_PostListModule__WEBPACK_IMPORTED_MODULE_1__.pageLength)({
    number: validList.length
  })); // 기본값 : [30, 30, 17], 3
  // 2차원 배열상( 상태로 관리되는 가상 페이지네이션 배열 ) 에서 페이지 에 뿌려줄 item을 지정
  // [[array(30)] [array(30)] [array(17)]] page = 1 이면 [0] 의 배열을 map 으로 엘리먼트를 생성한다 !

  if (validList.length === 0) {
    done = false;
  }

  if (outputList.length === 0) {
    done = false;
  }

  const getPage = list => {
    if (!state.page) {
      state.page = 1;
      _modules__WEBPACK_IMPORTED_MODULE_0__.store.postList.dispatch((0,_modules_PostListModule__WEBPACK_IMPORTED_MODULE_1__.pageInit)());
    } else if (state.page > list.length) {
      state.page = 1;
      _modules__WEBPACK_IMPORTED_MODULE_0__.store.postList.dispatch((0,_modules_PostListModule__WEBPACK_IMPORTED_MODULE_1__.pageInit)());
    }

    return list[state.page - 1].map(item => PostItem(item));
  };

  const posts = outputList && done ? getPage(validList) : h("div", null, "\uB85C\uB529\uC911...");
  return h("div", null, PostListTop(), h("div", {
    id: "pagenation"
  }, h("div", {
    id: "PostItemBlock"
  }, posts)), h("div", {
    id: "pageBtnWrap"
  }, h("button", {
    id: "prevPage"
  }, "\uC774\uC804 \uD398\uC774\uC9C0"), h("div", {
    id: "nowPage"
  }, PageNum(state.page)), h("button", {
    id: "nextPage"
  }, "\uB2E4\uC74C \uD398\uC774\uC9C0")));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PostList);

/***/ }),

/***/ "./src/components/write/WriteEditor.js":
/*!*********************************************!*\
  !*** ./src/components/write/WriteEditor.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _containers_SubmitButtonContainer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../containers/SubmitButtonContainer */ "./src/containers/SubmitButtonContainer.js");

/** @jsx h */
// eslint-disable-next-line no-unused-vars

const h = (type, props, ...children) => {
  return {
    type,
    props,
    children
  };
};

const WriteEditor = Instance => {
  return h("div", {
    id: "writeEditorBlock",
    class: "common"
  }, h("div", null, h("form", null, h("input", {
    type: "text",
    id: "titleInput",
    name: "titleInput",
    placeholder: "\uC81C\uBAA9\uC744 \uC785\uB825\uD558\uC138\uC694",
    minlength: "0",
    maxlength: "20"
  }), h("input", {
    type: "text",
    id: "authorInput",
    name: "author",
    placeholder: "\uC791\uC131\uC790",
    minlength: "0",
    maxlength: "8"
  }), h("input", {
    type: "text",
    id: "editorInput",
    name: "editor",
    placeholder: "\uB0B4\uC6A9\uC744 \uC785\uB825\uD558\uC138\uC694",
    minlength: "0",
    maxlength: "100"
  }))), h("div", null, (0,_containers_SubmitButtonContainer__WEBPACK_IMPORTED_MODULE_0__["default"])(Instance)));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WriteEditor);

/***/ }),

/***/ "./src/components/write/submitButton.js":
/*!**********************************************!*\
  !*** ./src/components/write/submitButton.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/** @jsx h */
// eslint-disable-next-line no-unused-vars
const h = (type, props, ...children) => {
  return {
    type,
    props,
    children
  };
};

const submitButton = () => {
  return h("div", {
    id: "submitButtonBlock"
  }, h("button", {
    id: "submitButton"
  }, "\uC791\uC131"));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (submitButton);

/***/ }),

/***/ "./src/containers/PostContainer.js":
/*!*****************************************!*\
  !*** ./src/containers/PostContainer.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _components_common_header__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/common/header */ "./src/components/common/header.js");
/* harmony import */ var _components_post_Post__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/post/Post */ "./src/components/post/Post.js");
/* harmony import */ var _core_Component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/Component */ "./src/core/Component.js");
/* harmony import */ var _modules__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../modules */ "./src/modules/index.js");
/* harmony import */ var _modules_PostModule__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../modules/PostModule */ "./src/modules/PostModule.js");
/** @jsx h */




 // eslint-disable-next-line no-unused-vars

const h = (type, props, ...children) => {
  return {
    type,
    props,
    children
  };
};

const compPost = new _core_Component__WEBPACK_IMPORTED_MODULE_2__["default"]();

const PostContainer = () => {
  const $elem = {
    PostWrap: document.querySelector('#PostWrap'),
    deleteButton: document.querySelector('#deleteButton')
  };
  const dispatch = _modules__WEBPACK_IMPORTED_MODULE_3__.store.post.dispatch;

  const getState = () => {
    return _modules__WEBPACK_IMPORTED_MODULE_3__.store.post.getState();
  };

  let setState = {};
  const hashPath = Number(window.location.hash.replace('#', ''));

  async function getPost(postId) {
    try {
      const res = await fetch(`http://localhost:5000/api/${postId}`);

      if (res.status === 404) {
        return location.href = '#error';
      }

      const body = await res.json();
      return dispatch((0,_modules_PostModule__WEBPACK_IMPORTED_MODULE_4__.readPost)(body));
    } catch (error) {
      return alert(error);
    }
  }

  async function deletePost(postId) {
    try {
      const res = await fetch(`http://localhost:5000/api/${postId}`, {
        method: 'DELETE'
      });

      if (res.status === 404) {
        return location.href = '#error';
      }

      compPost.refresh();
      location.href = '#';
    } catch (error) {
      return alert(error);
    }
  }

  const onDelete = target => {
    target.onclick = () => {
      deletePost(hashPath);
    };
  };

  const onLoad = () => {
    if (getState().post) {
      setState = getState();
      compPost.render((0,_components_post_Post__WEBPACK_IMPORTED_MODULE_1__["default"])(setState.post, true), $elem.PostWrap);
      $elem.deleteButton = document.querySelector('#deleteButton');
      onDelete($elem.deleteButton);
    }
  };

  compPost.oceanEffect(() => {
    getPost(hashPath);
    _modules__WEBPACK_IMPORTED_MODULE_3__.store.post.subscribe(onLoad);
  }, $elem.PostWrap);
  return h("div", {
    id: "Wrap"
  }, (0,_components_common_header__WEBPACK_IMPORTED_MODULE_0__["default"])(), h("div", {
    class: "spacer"
  }), h("div", {
    id: "PostWrap"
  }, (0,_components_post_Post__WEBPACK_IMPORTED_MODULE_1__["default"])()));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PostContainer);

/***/ }),

/***/ "./src/containers/PostListContainer.js":
/*!*********************************************!*\
  !*** ./src/containers/PostListContainer.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "clickEvent": () => (/* binding */ clickEvent),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _components_post_PostList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/post/PostList */ "./src/components/post/PostList.js");
/* harmony import */ var _modules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules */ "./src/modules/index.js");
/* harmony import */ var _modules_PostListModule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../modules/PostListModule */ "./src/modules/PostListModule.js");
/* harmony import */ var _core_Component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/Component */ "./src/core/Component.js");




/** @jsx h */
// eslint-disable-next-line no-unused-vars

const h = (type, props, ...children) => {
  return {
    type,
    props,
    children
  };
};

const compPostList = new _core_Component__WEBPACK_IMPORTED_MODULE_3__["default"]();
const clickEvent = () => {
  const $elem = {
    authorTag: document.querySelectorAll('.authorTag'),
    PostListBlock: document.querySelector('#PostListBlock')
  };
  const dispatch = _modules__WEBPACK_IMPORTED_MODULE_1__.store.postList.dispatch;

  const getState = () => {
    return _modules__WEBPACK_IMPORTED_MODULE_1__.store.postList.getState();
  };

  let setState = {};

  $elem.PostListBlock.onclick = event => {
    let span = event.target.closest('span');
    if (!span) return;
    if (!$elem.PostListBlock.contains(span)) return;
    if (event.target.className != 'authorTag') return;
    dispatch(_modules_PostListModule__WEBPACK_IMPORTED_MODULE_2__.authorSelect({
      value: event.target.firstChild.data
    }));
    setState = getState();
    compPostList.render((0,_components_post_PostList__WEBPACK_IMPORTED_MODULE_0__["default"])(setState.postList, true, setState), $elem.PostListBlock);
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
    nextPage: document.querySelector('#nextPage')
  };
  const dispatch = _modules__WEBPACK_IMPORTED_MODULE_1__.store.postList.dispatch;

  const getState = () => {
    return _modules__WEBPACK_IMPORTED_MODULE_1__.store.postList.getState();
  };

  let setState = {};

  const onChangeField = value => {
    if (!value) {
      return;
    } else {
      dispatch(_modules_PostListModule__WEBPACK_IMPORTED_MODULE_2__.changeField(value));
    }
  };

  const onSetState = () => {
    return getState();
  }; // 마운트 될때 전달받은 itemList를 store에서 불러옴


  const onLoad = () => {
    if (!itemList) {
      setState = getState();
      dispatch(_modules_PostListModule__WEBPACK_IMPORTED_MODULE_2__.readPostList(setState.postList));
      compPostList.render((0,_components_post_PostList__WEBPACK_IMPORTED_MODULE_0__["default"])(setState.postList, true, setState), $elem.PostListBlock);
    } else {
      setState = getState();
      dispatch(_modules_PostListModule__WEBPACK_IMPORTED_MODULE_2__.readPostList(itemList));
      compPostList.render((0,_components_post_PostList__WEBPACK_IMPORTED_MODULE_0__["default"])(itemList, true, setState), $elem.PostListBlock);
    }
  };

  compPostList.oceanEffect(() => {
    const changeEvent = () => {
      $elem.searchBar.onchange = e => {
        onChangeField({
          value: e.target.value
        });
        setState = getState();

        if (!itemList) {
          (0,_components_post_PostList__WEBPACK_IMPORTED_MODULE_0__["default"])(setState.postList, true, setState);
        } else {
          (0,_components_post_PostList__WEBPACK_IMPORTED_MODULE_0__["default"])(itemList, true, setState);
        }
      };
    };

    const searchEvent = () => {
      $elem.searchButton.onclick = () => {
        setState = getState();

        if (!itemList) {
          compPostList.render((0,_components_post_PostList__WEBPACK_IMPORTED_MODULE_0__["default"])(setState.postList, true, setState), $elem.PostListBlock);
        } else {
          compPostList.render((0,_components_post_PostList__WEBPACK_IMPORTED_MODULE_0__["default"])(itemList, true, setState), $elem.PostListBlock);
        }
      };
    };

    const datedEvent = () => {
      $elem.datedSelector.onchange = () => {
        let selectorValue = $elem.datedSelector.options[$elem.datedSelector.selectedIndex].value;
        dispatch(_modules_PostListModule__WEBPACK_IMPORTED_MODULE_2__.datedSelect({
          selector: selectorValue
        }));
        setState = getState();

        if (!itemList) {
          compPostList.render((0,_components_post_PostList__WEBPACK_IMPORTED_MODULE_0__["default"])(setState.postList, true, setState), $elem.PostListBlock);
        } else {
          compPostList.render((0,_components_post_PostList__WEBPACK_IMPORTED_MODULE_0__["default"])(itemList, true, setState), $elem.PostListBlock);
        }
      };
    };

    const pagenationEvent = () => {
      $elem.pagenateSelector.onchange = () => {
        let selectorValue = $elem.pagenateSelector.options[$elem.pagenateSelector.selectedIndex].value;
        dispatch(_modules_PostListModule__WEBPACK_IMPORTED_MODULE_2__.pagenationSelect({
          selector: selectorValue
        }));
        setState = getState();

        if (!itemList) {
          compPostList.render((0,_components_post_PostList__WEBPACK_IMPORTED_MODULE_0__["default"])(setState.postList, true, setState), $elem.PostListBlock);
        } else {
          compPostList.render((0,_components_post_PostList__WEBPACK_IMPORTED_MODULE_0__["default"])(itemList, true, setState), $elem.PostListBlock);
        }
      };
    };

    const pageEvent = () => {
      $elem.prevPage.onclick = () => {
        if (getState().page === 1) {
          return alert('이전 페이지가 없습니다 !');
        } else {
          _modules__WEBPACK_IMPORTED_MODULE_1__.store.postList.dispatch(_modules_PostListModule__WEBPACK_IMPORTED_MODULE_2__.pageDecrease());
          setState = getState();

          if (!itemList) {
            compPostList.render((0,_components_post_PostList__WEBPACK_IMPORTED_MODULE_0__["default"])(setState.postList, true, setState), $elem.PostListBlock);
          } else {
            compPostList.render((0,_components_post_PostList__WEBPACK_IMPORTED_MODULE_0__["default"])(itemList, true, setState), $elem.PostListBlock);
          }
        }
      };

      $elem.nextPage.onclick = () => {
        const pageLength = getState().pageLength;

        if (getState().page >= pageLength) {
          return alert('마지막 페이지 입니다 !');
        } else {
          _modules__WEBPACK_IMPORTED_MODULE_1__.store.postList.dispatch(_modules_PostListModule__WEBPACK_IMPORTED_MODULE_2__.pageIncrease());
          setState = getState();

          if (!itemList) {
            compPostList.render((0,_components_post_PostList__WEBPACK_IMPORTED_MODULE_0__["default"])(setState.postList, true, setState), $elem.PostListBlock);
          } else {
            compPostList.render((0,_components_post_PostList__WEBPACK_IMPORTED_MODULE_0__["default"])(itemList, true, setState), $elem.PostListBlock);
          }
        }
      };
    };

    const defaultEvent = () => {
      $elem.defaultButton.onclick = () => {
        if (!itemList) {
          dispatch(_modules_PostListModule__WEBPACK_IMPORTED_MODULE_2__.refreshStore(getState().postList));
        } else {
          dispatch(_modules_PostListModule__WEBPACK_IMPORTED_MODULE_2__.refreshStore(itemList));
        }

        if (getState().postList) {
          // 전부다 초기화
          dispatch(_modules_PostListModule__WEBPACK_IMPORTED_MODULE_2__.changeField('')); // 스토어 내 value 값 초기화

          $elem.searchBar.value = ''; // 검색바 비우기

          $elem.datedSelector.value = 'none'; // 셀렉터 초기화

          $elem.pagenateSelector.value = 'none'; // 셀렉터 초기화

          if (!itemList) {
            compPostList.render((0,_components_post_PostList__WEBPACK_IMPORTED_MODULE_0__["default"])(getState().postList, true, getState()), $elem.PostListBlock);
          } else {
            compPostList.render((0,_components_post_PostList__WEBPACK_IMPORTED_MODULE_0__["default"])(itemList, true, getState()), $elem.PostListBlock);
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
        dispatch(_modules_PostListModule__WEBPACK_IMPORTED_MODULE_2__.changeField('')); // 스토어 내 value 값 초기화

        $elem.searchBar.value = ''; // 검색바 비우기

        $elem.datedSelector.value = 'none'; // 셀렉터 초기화

        $elem.pagenateSelector.value = 'none'; // 셀렉터 초기화

        if (!itemList) {
          dispatch(_modules_PostListModule__WEBPACK_IMPORTED_MODULE_2__.refreshStore(setState.postList));
        } else {
          dispatch(_modules_PostListModule__WEBPACK_IMPORTED_MODULE_2__.refreshStore(itemList));
        }
      };
    };

    onLoad();
    _modules__WEBPACK_IMPORTED_MODULE_1__.store.postList.subscribe(onSetState);
    changeEvent();
    searchEvent();
    datedEvent();
    pagenationEvent();
    defaultEvent();
    refreshEvent();
    pageEvent();
  }, $elem.PostListBlock);

  if (!itemList) {
    return h("div", {
      id: "PostListBlock",
      class: "common"
    }, (0,_components_post_PostList__WEBPACK_IMPORTED_MODULE_0__["default"])(setState.postList, done, setState));
  } else {
    return h("div", {
      id: "PostListBlock",
      class: "common"
    }, (0,_components_post_PostList__WEBPACK_IMPORTED_MODULE_0__["default"])(itemList, done, setState));
  }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PostListContainer);

/***/ }),

/***/ "./src/containers/SubmitButtonContainer.js":
/*!*************************************************!*\
  !*** ./src/containers/SubmitButtonContainer.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _components_write_submitButton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/write/submitButton */ "./src/components/write/submitButton.js");
/* harmony import */ var _modules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules */ "./src/modules/index.js");
/* harmony import */ var _modules_writeModule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../modules/writeModule */ "./src/modules/writeModule.js");



/** @jsx h */
// eslint-disable-next-line no-unused-vars

const h = (type, props, ...children) => {
  return {
    type,
    props,
    children
  };
};

const SubmitButtonContainer = Instance => {
  const $elem = {
    submitButtonBlock: document.querySelector('#submitButtonBlock'),
    submitButton: document.querySelector('#submitButton')
  };
  const dispatch = _modules__WEBPACK_IMPORTED_MODULE_1__.store.editor.dispatch;
  const hashPath = window.location.hash.replace('#', '');

  const getState = () => {
    return _modules__WEBPACK_IMPORTED_MODULE_1__.store.editor.getState();
  };

  let setState = {};

  const onPublish = payload => {
    if (!payload) {
      return;
    } else if (hashPath === 'update') {
      dispatch(_modules_writeModule__WEBPACK_IMPORTED_MODULE_2__.updatePost(payload));
    } else {
      const {
        title,
        author,
        body
      } = payload;
      dispatch(_modules_writeModule__WEBPACK_IMPORTED_MODULE_2__.writePost({
        title,
        author,
        body
      }));
    }
  };

  Instance.oceanEffect(() => {
    const clickEvent = () => {
      $elem.submitButton.onclick = () => {
        setState = getState();
        onPublish(getState());

        if (setState) {
          if (hashPath === 'update') {
            postUpdate(setState);
          } else {
            postWrite(setState);
          }
        }
      };
    };

    async function postWrite(state) {
      try {
        const res = await fetch(`http://localhost:5000/api/`, {
          method: 'POST',
          headers: {
            'content-Type': 'application/json'
          },
          body: JSON.stringify(state)
        });
        const body = await res.json();

        if (res.status === 404) {
          return location.href = '#error';
        } else if (res.ok) {
          Instance.refresh();
          const postId = body[body.length - 1].postId;
          return location.href = `#${postId}`;
        }
      } catch (error) {
        return alert(error);
      }
    }

    async function postUpdate(state) {
      try {
        const res = await fetch(`http://localhost:5000/api/${state.postId}`, {
          method: 'PATCH',
          headers: {
            'content-Type': 'application/json'
          },
          body: JSON.stringify(state)
        });

        if (res.status === 404) {
          return location.href = '#error';
        } else if (res.ok) {
          Instance.refresh();
          return location.href = `#${setState.postId}`;
        }
      } catch (error) {
        return alert(error);
      }
    }

    _modules__WEBPACK_IMPORTED_MODULE_1__.store.editor.subscribe(onPublish);
    clickEvent();
  }, $elem.submitButtonBlock);
  return h("div", {
    id: "submitButtonWrap"
  }, (0,_components_write_submitButton__WEBPACK_IMPORTED_MODULE_0__["default"])());
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SubmitButtonContainer);

/***/ }),

/***/ "./src/containers/WriteEditorContainer.js":
/*!************************************************!*\
  !*** ./src/containers/WriteEditorContainer.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _components_common_header__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/common/header */ "./src/components/common/header.js");
/* harmony import */ var _components_write_WriteEditor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/write/WriteEditor */ "./src/components/write/WriteEditor.js");
/* harmony import */ var _core_Component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/Component */ "./src/core/Component.js");
/* harmony import */ var _modules__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../modules */ "./src/modules/index.js");
/* harmony import */ var _modules_writeModule__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../modules/writeModule */ "./src/modules/writeModule.js");





/** @jsx h */
// eslint-disable-next-line no-unused-vars

const h = (type, props, ...children) => {
  return {
    type,
    props,
    children
  };
};

const compWrite = new _core_Component__WEBPACK_IMPORTED_MODULE_2__["default"]();

const WriteEditorContainer = () => {
  const $elem = {
    writeEditorWrap: document.querySelector('#writeEditorWrap'),
    writeEditorBlock: document.querySelector('#writeEditorBlock'),
    titleinput: document.querySelector('#titleInput'),
    authorInput: document.querySelector('#authorInput'),
    editorInput: document.querySelector('#editorInput')
  };
  const dispatch = _modules__WEBPACK_IMPORTED_MODULE_3__.store.editor.dispatch;
  const mount = _modules_writeModule__WEBPACK_IMPORTED_MODULE_4__.initialize;
  const hashPath = window.location.hash.replace('#', '');

  const getState = () => {
    return _modules__WEBPACK_IMPORTED_MODULE_3__.store.post.getState();
  };

  let setState = {};

  const onFix = () => {
    setState = getState();
    return setState.post;
  };

  const onChangeField = payload => {
    if (!payload) {
      return;
    } else {
      dispatch(_modules_writeModule__WEBPACK_IMPORTED_MODULE_4__.changeField(payload));
    }
  };

  compWrite.oceanEffect(() => {
    if (hashPath === 'update') {
      if (onFix()) {
        dispatch(_modules_writeModule__WEBPACK_IMPORTED_MODULE_4__.setOriginalPost(onFix()));
      }

      setState = getState();
      $elem.titleinput.value = setState.post.title;
      $elem.authorInput.value = setState.post.author;
      $elem.editorInput.value = setState.post.body;
    } else if (hashPath === 'write') {
      dispatch(mount);
    }

    const changeEvent = () => {
      $elem.titleinput.onchange = e => {
        onChangeField({
          key: 'title',
          value: e.target.value
        });
      };

      $elem.authorInput.onchange = e => {
        onChangeField({
          key: 'author',
          value: e.target.value
        });
      };

      $elem.editorInput.onchange = e => {
        onChangeField({
          key: 'body',
          value: e.target.value
        });
      };
    };

    _modules__WEBPACK_IMPORTED_MODULE_3__.store.editor.subscribe(onChangeField);
    changeEvent();
  }, $elem.writeEditorWrap);
  return h("div", {
    id: "Wrap"
  }, (0,_components_common_header__WEBPACK_IMPORTED_MODULE_0__["default"])(), h("div", {
    class: "spacer"
  }), h("div", {
    id: "writeEditorWrap"
  }, (0,_components_write_WriteEditor__WEBPACK_IMPORTED_MODULE_1__["default"])(compWrite)));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WriteEditorContainer);

/***/ }),

/***/ "./src/core/Component.js":
/*!*******************************!*\
  !*** ./src/core/Component.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _containers_PostListContainer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../containers/PostListContainer */ "./src/containers/PostListContainer.js");

 // 생성자 함수

const Component = function () {
  let $root = {};
  let _routes = [];
  let setBody = [];
  let mount = false;

  function Component($entry, initRoutes) {
    // 라우터를 entry 컴포넌트에서 실행 시키고,
    // 대부분의 로직들은 entry 에 종속적이게 된다.
    if ($entry) {
      $root = $entry;
      _routes = initRoutes;
      this.router(this);
    }
  } // hash 방식의 라우터 메서드


  Component.prototype.router = function (entryInstance) {
    const router = function () {
      // 해쉬 URI 값을 취득해서 해쉬태그를 제거한다.
      // 그 값이 Number 만 들어온 경우, :postId 로 인식하게 해줌.
      const hashPath = window.location.hash.replace('#', '');
      const isNum = Number(hashPath); // postId 로 라우팅 되는 게시물 1개 보기일때, Post 관련 컴포넌트를 렌더링

      if (isNum) {
        // 경로상으로 들어온 number 형태 postId 는 Post 에서 취득해서
        // 실제 데이터를 렌더링 한다.
        const uiComponent = _routes.find(route => route.path === ':postId').component;

        entryInstance.render(uiComponent());
        entryInstance.compDidMount(uiComponent);
      } else {
        try {
          const uiComponent = _routes.find(route => route.path === hashPath).component || '';
          entryInstance.render(uiComponent()); // PostList 컴포넌트가 실행될때, setBody에 값이 캐싱되어 있으면
          // 컨테이너 컴포넌트로 배열을 전달한다.

          if (hashPath === '') {
            if (setBody.length > 0) {
              (0,_containers_PostListContainer__WEBPACK_IMPORTED_MODULE_0__["default"])(setBody, true);
            }
          }

          entryInstance.compDidMount(uiComponent);
        } catch (error) {
          console.error(error);
          location.href = '#error';
        }
      }
    }; // 주소 변경시 router가 실행됨.


    window.addEventListener('hashchange', router); // 새로고침 직전에 렌더링되었던 페이지를 다시 렌더링한다.

    window.addEventListener('DOMContentLoaded', router);
  }; // render 된후 엘리먼트 취득이나 상태 처리등
  // 반환 되는 JSX 가상DOM을 제외한 로직 실행을 위한 메서드


  Component.prototype.compDidMount = function (fn) {
    return fn();
  };

  Component.prototype.render = function (virtualDOM, $elem = $root) {
    const oldRealNode = $elem.firstElementChild;

    const createRealNode = virtualDOM => {
      if (typeof virtualDOM === 'string') {
        return document.createTextNode(virtualDOM);
      }

      const elem = document.createElement(virtualDOM.type);
      Object.entries(virtualDOM.props || {}).filter(([attr, value]) => value).forEach(([attr, value]) => elem.setAttribute(attr, value));
      const children = virtualDOM.children.map(createRealNode); // elem에 변환된 children dom을 추가한다.

      children.forEach(child => elem.appendChild(child));
      return elem;
    };

    function updateElement(oldNode, newNode, parent = $root) {
      if (!newNode && oldNode) {
        return oldNode.remove();
      }

      if (newNode && !oldNode) {
        return parent.appendChild(newNode);
      }

      if (newNode instanceof Text && oldNode instanceof Text) {
        if (oldNode.nodeValue === newNode.nodeValue) return;
        oldNode.nodeValue = newNode.nodeValue;
        return;
      }

      if (newNode.nodeName !== oldNode.nodeName) {
        const index = [...parent.childNodes].indexOf(oldNode);
        return oldNode.remove(), parent.appendChild(newNode, index); // undefined를 반환할 것이다.
      }

      updateAttributes(oldNode, newNode);
      const newChildren = [...newNode.childNodes];
      const oldChildren = [...oldNode.childNodes];
      const maxLength = Math.max(newChildren.length, oldChildren.length);

      for (let i = 0; i < maxLength; i++) {
        updateElement(oldChildren[i], newChildren[i], oldNode);
      }
    }

    function updateAttributes(oldNode, newNode) {
      const oldProps = [...oldNode.attributes];
      const newProps = [...newNode.attributes];

      for (const {
        name,
        value
      } of newProps) {
        if (value === oldNode.getAttribute(name)) continue;
        oldNode.setAttribute(name, value);
      }

      for (const {
        name
      } of oldProps) {
        if (newNode.getAttribute(name) !== undefined) continue;
        oldNode.removeAttribute(name);
      }
    }

    let newRealNode = createRealNode(virtualDOM);
    updateElement(oldRealNode, newRealNode, $elem); // 처음 render 될때 API를 불러오고 나면 다시 호출되지 않도록 함.

    if (mount === false) {
      this.getPostList();
    } else {
      return;
    }

    return mount = true;
  };
  /*
  Component.prototype.getElem = function (beforeMount) {
    const arr = Object.entries(beforeMount);
      for (let i = 0; i < arr.length; i++) {
      arr[i][1] = document.querySelector(arr[i][1]);
    }
      const conv = Object.fromEntries(arr);
    this.this.afterMountElem = conv;
  };
  */
  // useEffect 와 비슷한 기능의 메서드


  Component.prototype.oceanEffect = function (fn, $elemOnCh = $root) {
    // [] 를 인자로 받으면 root 아래 elem 이 render 된 후
    // $elem 를 인자로 받으면 target elem 이 render 된 후
    if (!$elemOnCh) {
      return;
    } else if ($elemOnCh === $root) {
      if (!$root.firstElementChild) {
        return;
      } else {
        $root.firstChild.addEventListener('change', fn());
      }
    } else {
      $elemOnCh.addEventListener('change', fn());
    }
  };

  Component.prototype.getPostList = async function () {
    try {
      const res = await fetch(`http://localhost:5000/api/`);
      const body = await res.json();

      if (res.status === 404) {
        return location.href = '#error';
      }

      if (body) {
        // PostList 에 Props 전달
        (0,_containers_PostListContainer__WEBPACK_IMPORTED_MODULE_0__["default"])(body, res.ok); // 배열 스택에 저장

        setBody = body; // PostList가 재 렌더링 된후 엘리먼트가 있을때 add 이벤트

        this.compDidMount(_containers_PostListContainer__WEBPACK_IMPORTED_MODULE_0__.clickEvent);
      }
    } catch (error) {
      return alert(error);
    }
  };

  Component.prototype.refresh = async function () {
    try {
      const res = await fetch(`http://localhost:5000/api/`);
      const body = await res.json();

      if (res.status === 404) {
        return location.href = '#error';
      } // PostList 에 Props 전달


      (0,_containers_PostListContainer__WEBPACK_IMPORTED_MODULE_0__["default"])(body, res.ok); // 배열 스택에 저장

      setBody = body;
    } catch (error) {
      return alert(error);
    }
  };

  return Component;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Component);

/***/ }),

/***/ "./src/core/Store.js":
/*!***************************!*\
  !*** ./src/core/Store.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createStore": () => (/* binding */ createStore)
/* harmony export */ });
/*
export const combineReducers = (fnObj) => {
  console.log(fnObj.postListModule(), 'fnObj.postListModule');
  return fnObj;
};
*/
const createStore = reducer => {
  let state;
  const listeners = new Set();

  const getState = () => ({ ...state
  });

  const dispatch = action => {
    state = reducer(state, action);
    publish();
  };

  const subscribe = fn => listeners.add(fn);

  const publish = () => listeners.forEach(fn => fn());

  return {
    getState,
    dispatch,
    subscribe
  };
};

/***/ }),

/***/ "./src/modules/PostListModule.js":
/*!***************************************!*\
  !*** ./src/modules/PostListModule.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "readPostList": () => (/* binding */ readPostList),
/* harmony export */   "changeField": () => (/* binding */ changeField),
/* harmony export */   "authorSelect": () => (/* binding */ authorSelect),
/* harmony export */   "datedSelect": () => (/* binding */ datedSelect),
/* harmony export */   "pagenationSelect": () => (/* binding */ pagenationSelect),
/* harmony export */   "refreshStore": () => (/* binding */ refreshStore),
/* harmony export */   "pageIncrease": () => (/* binding */ pageIncrease),
/* harmony export */   "pageDecrease": () => (/* binding */ pageDecrease),
/* harmony export */   "pageLength": () => (/* binding */ pageLength),
/* harmony export */   "pageInit": () => (/* binding */ pageInit),
/* harmony export */   "default": () => (/* binding */ postListModule)
/* harmony export */ });
const READ_POSTLIST = 'postList/READ_POSTLIST';
const CHANGE_FIELD = 'postList/CHANGE_FIELD';
const DATED_SELECT = 'postList/DATED_SELECT';
const PAGENATE_SECLET = 'postList/PAGENATE_SECLET';
const AUTHOR_FILTER = 'postList/AUTHOR_FILTER';
const REFRESH_STORE = 'postList/REFRESH_STORE';
const PAGE_INCREASE = 'postList/PAGE_INCREASE';
const PAGE_DECREASE = 'postList/PAGE_DECREASE';
const PAGE_LENGTH = 'postList/PAGE_LENGTH';
const PAGE_INIT = 'postList/PAGE_INIT';
const readPostList = postList => ({
  type: READ_POSTLIST,
  payload: postList
});
const changeField = ({
  value
}) => ({
  type: CHANGE_FIELD,
  value
});
const authorSelect = ({
  value
}) => ({
  type: AUTHOR_FILTER,
  value
});
const datedSelect = ({
  selector
}) => ({
  type: DATED_SELECT,
  selector
});
const pagenationSelect = ({
  selector
}) => ({
  type: PAGENATE_SECLET,
  selector
});
const refreshStore = postList => ({
  type: REFRESH_STORE,
  payload: postList
});
const pageIncrease = () => ({
  type: PAGE_INCREASE
});
const pageDecrease = () => ({
  type: PAGE_DECREASE
});
const pageLength = ({
  number
}) => ({
  type: PAGE_LENGTH,
  number
});
const pageInit = () => ({
  type: PAGE_INIT
});
const initialState = {
  value: null,
  postList: null,
  datedSelector: 'none',
  pagenateSelector: 'none',
  authorFilter: null,
  page: 1,
  diff: 1,
  pageLength: 3
};
function postListModule(state = initialState, action = {}) {
  switch (action.type) {
    case READ_POSTLIST:
      return { ...state,
        postList: action.payload
      };

    case CHANGE_FIELD:
      return { ...state,
        value: action.value
      };

    case AUTHOR_FILTER:
      return { ...state,
        authorFilter: action.value
      };

    case DATED_SELECT:
      return { ...state,
        datedSelector: action.selector
      };

    case PAGENATE_SECLET:
      return { ...state,
        pagenateSelector: action.selector
      };

    case REFRESH_STORE:
      return { ...initialState,
        postList: action.payload
      };

    case PAGE_INCREASE:
      return { ...state,
        page: state.page + state.diff
      };

    case PAGE_DECREASE:
      return { ...state,
        page: state.page - state.diff
      };

    case PAGE_LENGTH:
      return { ...state,
        pageLength: action.number
      };

    case PAGE_INIT:
      return { ...state,
        page: initialState.page
      };

    default:
      return state;
  }
}

/***/ }),

/***/ "./src/modules/PostModule.js":
/*!***********************************!*\
  !*** ./src/modules/PostModule.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "readPost": () => (/* binding */ readPost),
/* harmony export */   "default": () => (/* binding */ postModule)
/* harmony export */ });
const READ_POST = 'post/READ_POST';
const readPost = post => ({
  type: READ_POST,
  payload: post
});
const initialState = {
  post: null
};
function postModule(state = initialState, action = {}) {
  switch (action.type) {
    case READ_POST:
      return { ...state,
        post: action.payload
      };

    default:
      return state;
  }
}

/***/ }),

/***/ "./src/modules/index.js":
/*!******************************!*\
  !*** ./src/modules/index.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "store": () => (/* binding */ store)
/* harmony export */ });
/* harmony import */ var _core_Store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Store */ "./src/core/Store.js");
/* harmony import */ var _PostListModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PostListModule */ "./src/modules/PostListModule.js");
/* harmony import */ var _PostModule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PostModule */ "./src/modules/PostModule.js");
/* harmony import */ var _writeModule__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./writeModule */ "./src/modules/writeModule.js");




const store = {
  postList: (0,_core_Store__WEBPACK_IMPORTED_MODULE_0__.createStore)(_PostListModule__WEBPACK_IMPORTED_MODULE_1__["default"]),
  editor: (0,_core_Store__WEBPACK_IMPORTED_MODULE_0__.createStore)(_writeModule__WEBPACK_IMPORTED_MODULE_3__["default"]),
  post: (0,_core_Store__WEBPACK_IMPORTED_MODULE_0__.createStore)(_PostModule__WEBPACK_IMPORTED_MODULE_2__["default"])
};

/***/ }),

/***/ "./src/modules/writeModule.js":
/*!************************************!*\
  !*** ./src/modules/writeModule.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "initialize": () => (/* binding */ initialize),
/* harmony export */   "changeField": () => (/* binding */ changeField),
/* harmony export */   "writePost": () => (/* binding */ writePost),
/* harmony export */   "setOriginalPost": () => (/* binding */ setOriginalPost),
/* harmony export */   "updatePost": () => (/* binding */ updatePost),
/* harmony export */   "default": () => (/* binding */ editorModule)
/* harmony export */ });
const INITIALIZE = 'write/INITIALIZE';
const CHANGE_FIELD = 'write/CHANGE_FIELD';
const WRITE_POST = 'write/WRITE_POST';
const SET_ORIGINAL_POST = 'write/SET_ORIGINAL_POST';
const UPDATE_POST = 'write/UPDATE_POST';
const initialize = () => ({
  type: INITIALIZE
});
const changeField = ({
  key,
  value
}) => ({
  type: CHANGE_FIELD,
  payload: {
    key,
    value
  }
});
const writePost = ({
  title,
  author,
  body
}) => ({
  type: WRITE_POST,
  payload: {
    title,
    author,
    body
  }
});
const setOriginalPost = post => ({
  type: SET_ORIGINAL_POST,
  post
});
const updatePost = ({
  postId,
  title,
  author,
  body
}) => ({
  type: UPDATE_POST,
  payload: {
    postId,
    title,
    author,
    body
  }
});
const initialState = {
  title: '',
  author: '',
  body: '',
  post: null,
  postId: null
};
function editorModule(state = initialState, action = {}) {
  switch (action.type) {
    case INITIALIZE:
      return { ...initialState
      };

    case CHANGE_FIELD:
      return { ...state,
        [action.payload.key]: action.payload.value
      };

    case WRITE_POST:
      return { ...state,
        post: action.payload
      };

    case SET_ORIGINAL_POST:
      return { ...state,
        title: action.post.title,
        author: action.post.author,
        body: action.post.body,
        postId: action.post.postId
      };

    case UPDATE_POST:
      return { ...state,
        post: action.payload
      };

    default:
      return state;
  }
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/Header.css":
/*!******************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/Header.css ***!
  \******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "header {\r\n  position: fixed;\r\n  width: 100%;\r\n  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);\r\n  z-index: 5;\r\n\r\n  color: white;\r\n  background: #3b85c2;\r\n  padding-left: 3rem;\r\n  padding-right: 3rem;\r\n  width: 100%;\r\n  margin: 0 auto;\r\n  height: 6rem;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n}\r\n\r\n.logo {\r\n  font-size: 1.125rem;\r\n  font-weight: 800;\r\n  letter-spacing: 1px;\r\n}\r\n\r\n.logo a {\r\n  color: white;\r\n}\r\n", "",{"version":3,"sources":["webpack://./src/css/Header.css"],"names":[],"mappings":"AAAA;EACE,eAAe;EACf,WAAW;EACX,2CAA2C;EAC3C,UAAU;;EAEV,YAAY;EACZ,mBAAmB;EACnB,kBAAkB;EAClB,mBAAmB;EACnB,WAAW;EACX,cAAc;EACd,YAAY;EACZ,aAAa;EACb,mBAAmB;EACnB,8BAA8B;AAChC;;AAEA;EACE,mBAAmB;EACnB,gBAAgB;EAChB,mBAAmB;AACrB;;AAEA;EACE,YAAY;AACd","sourcesContent":["header {\r\n  position: fixed;\r\n  width: 100%;\r\n  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);\r\n  z-index: 5;\r\n\r\n  color: white;\r\n  background: #3b85c2;\r\n  padding-left: 3rem;\r\n  padding-right: 3rem;\r\n  width: 100%;\r\n  margin: 0 auto;\r\n  height: 6rem;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n}\r\n\r\n.logo {\r\n  font-size: 1.125rem;\r\n  font-weight: 800;\r\n  letter-spacing: 1px;\r\n}\r\n\r\n.logo a {\r\n  color: white;\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/Post.css":
/*!****************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/Post.css ***!
  \****************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "#PostBlock {\r\n  padding: 2rem 2rem 0.5rem 2rem;\r\n  background-color: white;\r\n}\r\n\r\n#PostHead {\r\n  border-bottom: 1px solid;\r\n  padding-bottom: 3rem;\r\n  margin-bottom: 3rem;\r\n}\r\n\r\n#PostContent {\r\n  font-size: 1rem;\r\n  padding-bottom: 2rem;\r\n}\r\n", "",{"version":3,"sources":["webpack://./src/css/Post.css"],"names":[],"mappings":"AAAA;EACE,8BAA8B;EAC9B,uBAAuB;AACzB;;AAEA;EACE,wBAAwB;EACxB,oBAAoB;EACpB,mBAAmB;AACrB;;AAEA;EACE,eAAe;EACf,oBAAoB;AACtB","sourcesContent":["#PostBlock {\r\n  padding: 2rem 2rem 0.5rem 2rem;\r\n  background-color: white;\r\n}\r\n\r\n#PostHead {\r\n  border-bottom: 1px solid;\r\n  padding-bottom: 3rem;\r\n  margin-bottom: 3rem;\r\n}\r\n\r\n#PostContent {\r\n  font-size: 1rem;\r\n  padding-bottom: 2rem;\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/PostList.css":
/*!********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/PostList.css ***!
  \********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "#PostItemBlock {\r\n  padding-top: 1rem;\r\n  padding-bottom: 1rem;\r\n}\r\n\r\n#PostItem:first-child {\r\n  padding-top: 0;\r\n}\r\n\r\n#PostItem + #PostItem {\r\n  border-top: 1px solid black;\r\n  margin-top: 0.5rem;\r\n  padding-top: 0.5rem;\r\n}\r\n\r\n#PostItem h3 {\r\n  margin-bottom: 0.5rem;\r\n  margin-top: 0;\r\n}\r\n\r\n#PostItem h2:hover {\r\n  color: #555555;\r\n}\r\n\r\n#PostItem span {\r\n  font-size: 15px;\r\n  margin-right: 0.5rem;\r\n}\r\n\r\n#PostItem p span {\r\n  margin-left: 0.5rem;\r\n}\r\n\r\n#PostListBlock {\r\n  margin-top: 10rem;\r\n  margin-bottom: 2rem;\r\n  padding: 2rem 2rem 0.5rem 2rem;\r\n  background-color: white;\r\n}\r\n\r\n#searchBar {\r\n  width: 15rem;\r\n  height: 2rem;\r\n}\r\n\r\n#searchButton {\r\n  margin-left: 1rem;\r\n}\r\n\r\n.authorTag:hover {\r\n  cursor: pointer;\r\n}\r\n\r\n#pageBtnWrap {\r\n  display: flex;\r\n  flex-direction: row;\r\n  justify-content: space-evenly;\r\n  align-items: center;\r\n}\r\n", "",{"version":3,"sources":["webpack://./src/css/PostList.css"],"names":[],"mappings":"AAAA;EACE,iBAAiB;EACjB,oBAAoB;AACtB;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,2BAA2B;EAC3B,kBAAkB;EAClB,mBAAmB;AACrB;;AAEA;EACE,qBAAqB;EACrB,aAAa;AACf;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,eAAe;EACf,oBAAoB;AACtB;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,iBAAiB;EACjB,mBAAmB;EACnB,8BAA8B;EAC9B,uBAAuB;AACzB;;AAEA;EACE,YAAY;EACZ,YAAY;AACd;;AAEA;EACE,iBAAiB;AACnB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,6BAA6B;EAC7B,mBAAmB;AACrB","sourcesContent":["#PostItemBlock {\r\n  padding-top: 1rem;\r\n  padding-bottom: 1rem;\r\n}\r\n\r\n#PostItem:first-child {\r\n  padding-top: 0;\r\n}\r\n\r\n#PostItem + #PostItem {\r\n  border-top: 1px solid black;\r\n  margin-top: 0.5rem;\r\n  padding-top: 0.5rem;\r\n}\r\n\r\n#PostItem h3 {\r\n  margin-bottom: 0.5rem;\r\n  margin-top: 0;\r\n}\r\n\r\n#PostItem h2:hover {\r\n  color: #555555;\r\n}\r\n\r\n#PostItem span {\r\n  font-size: 15px;\r\n  margin-right: 0.5rem;\r\n}\r\n\r\n#PostItem p span {\r\n  margin-left: 0.5rem;\r\n}\r\n\r\n#PostListBlock {\r\n  margin-top: 10rem;\r\n  margin-bottom: 2rem;\r\n  padding: 2rem 2rem 0.5rem 2rem;\r\n  background-color: white;\r\n}\r\n\r\n#searchBar {\r\n  width: 15rem;\r\n  height: 2rem;\r\n}\r\n\r\n#searchButton {\r\n  margin-left: 1rem;\r\n}\r\n\r\n.authorTag:hover {\r\n  cursor: pointer;\r\n}\r\n\r\n#pageBtnWrap {\r\n  display: flex;\r\n  flex-direction: row;\r\n  justify-content: space-evenly;\r\n  align-items: center;\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/Write.css":
/*!*****************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/Write.css ***!
  \*****************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "#writeEditorBlock {\r\n  padding-top: 5rem;\r\n  padding-bottom: 5rem;\r\n}\r\n\r\n#titleInput {\r\n  font-size: 3rem;\r\n  outline: none;\r\n  padding-bottom: 0.5rem;\r\n  border: none;\r\n  border-bottom: 1px solid;\r\n  margin-bottom: 1rem;\r\n  width: 100%;\r\n}\r\n\r\n#editorInput {\r\n  font-size: 14px;\r\n  outline: none;\r\n  padding-bottom: 0.5rem;\r\n  border: none;\r\n  border-bottom: 1px solid;\r\n  margin-bottom: 2rem;\r\n  width: 100%;\r\n  height: 10rem;\r\n}\r\n\r\n#authorInput {\r\n  outline: none;\r\n  padding-bottom: 0.5rem;\r\n  border: none;\r\n  border-bottom: 1px solid;\r\n  margin-bottom: 1rem;\r\n  font-size: 14px;\r\n  height: 2rem;\r\n}\r\n", "",{"version":3,"sources":["webpack://./src/css/Write.css"],"names":[],"mappings":"AAAA;EACE,iBAAiB;EACjB,oBAAoB;AACtB;;AAEA;EACE,eAAe;EACf,aAAa;EACb,sBAAsB;EACtB,YAAY;EACZ,wBAAwB;EACxB,mBAAmB;EACnB,WAAW;AACb;;AAEA;EACE,eAAe;EACf,aAAa;EACb,sBAAsB;EACtB,YAAY;EACZ,wBAAwB;EACxB,mBAAmB;EACnB,WAAW;EACX,aAAa;AACf;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,YAAY;EACZ,wBAAwB;EACxB,mBAAmB;EACnB,eAAe;EACf,YAAY;AACd","sourcesContent":["#writeEditorBlock {\r\n  padding-top: 5rem;\r\n  padding-bottom: 5rem;\r\n}\r\n\r\n#titleInput {\r\n  font-size: 3rem;\r\n  outline: none;\r\n  padding-bottom: 0.5rem;\r\n  border: none;\r\n  border-bottom: 1px solid;\r\n  margin-bottom: 1rem;\r\n  width: 100%;\r\n}\r\n\r\n#editorInput {\r\n  font-size: 14px;\r\n  outline: none;\r\n  padding-bottom: 0.5rem;\r\n  border: none;\r\n  border-bottom: 1px solid;\r\n  margin-bottom: 2rem;\r\n  width: 100%;\r\n  height: 10rem;\r\n}\r\n\r\n#authorInput {\r\n  outline: none;\r\n  padding-bottom: 0.5rem;\r\n  border: none;\r\n  border-bottom: 1px solid;\r\n  margin-bottom: 1rem;\r\n  font-size: 14px;\r\n  height: 2rem;\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/button.css":
/*!******************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/button.css ***!
  \******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "button {\r\n  border: none;\r\n  border-radius: 4px;\r\n  font-size: 1rem;\r\n  font-weight: bold;\r\n  padding: 0.25rem 1rem;\r\n  color: white;\r\n  outline: none;\r\n  cursor: pointer;\r\n  background: rgb(22, 96, 165);\r\n}\r\n\r\nbutton + button {\r\n  margin: 0 0.5rem 0 0.5rem;\r\n}\r\n\r\n#submitButtonBlock {\r\n  margin-top: 1rem;\r\n  margin-bottom: 3rem;\r\n}\r\n\r\n#submitButtonBlock + #submitButtonBlock {\r\n  margin-left: 0.5rem;\r\n}\r\n\r\nbutton a {\r\n  color: white;\r\n}\r\n", "",{"version":3,"sources":["webpack://./src/css/button.css"],"names":[],"mappings":"AAAA;EACE,YAAY;EACZ,kBAAkB;EAClB,eAAe;EACf,iBAAiB;EACjB,qBAAqB;EACrB,YAAY;EACZ,aAAa;EACb,eAAe;EACf,4BAA4B;AAC9B;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,gBAAgB;EAChB,mBAAmB;AACrB;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,YAAY;AACd","sourcesContent":["button {\r\n  border: none;\r\n  border-radius: 4px;\r\n  font-size: 1rem;\r\n  font-weight: bold;\r\n  padding: 0.25rem 1rem;\r\n  color: white;\r\n  outline: none;\r\n  cursor: pointer;\r\n  background: rgb(22, 96, 165);\r\n}\r\n\r\nbutton + button {\r\n  margin: 0 0.5rem 0 0.5rem;\r\n}\r\n\r\n#submitButtonBlock {\r\n  margin-top: 1rem;\r\n  margin-bottom: 3rem;\r\n}\r\n\r\n#submitButtonBlock + #submitButtonBlock {\r\n  margin-left: 0.5rem;\r\n}\r\n\r\nbutton a {\r\n  color: white;\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/main.css":
/*!****************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/main.css ***!
  \****************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_Header_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! -!../../node_modules/css-loader/dist/cjs.js!./Header.css */ "./node_modules/css-loader/dist/cjs.js!./src/css/Header.css");
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_top_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! -!../../node_modules/css-loader/dist/cjs.js!./top.css */ "./node_modules/css-loader/dist/cjs.js!./src/css/top.css");
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_PostList_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! -!../../node_modules/css-loader/dist/cjs.js!./PostList.css */ "./node_modules/css-loader/dist/cjs.js!./src/css/PostList.css");
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_Post_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! -!../../node_modules/css-loader/dist/cjs.js!./Post.css */ "./node_modules/css-loader/dist/cjs.js!./src/css/Post.css");
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_Write_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! -!../../node_modules/css-loader/dist/cjs.js!./Write.css */ "./node_modules/css-loader/dist/cjs.js!./src/css/Write.css");
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_button_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! -!../../node_modules/css-loader/dist/cjs.js!./button.css */ "./node_modules/css-loader/dist/cjs.js!./src/css/button.css");
// Imports








var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_Header_css__WEBPACK_IMPORTED_MODULE_2__["default"]);
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_top_css__WEBPACK_IMPORTED_MODULE_3__["default"]);
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_PostList_css__WEBPACK_IMPORTED_MODULE_4__["default"]);
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_Post_css__WEBPACK_IMPORTED_MODULE_5__["default"]);
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_Write_css__WEBPACK_IMPORTED_MODULE_6__["default"]);
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_button_css__WEBPACK_IMPORTED_MODULE_7__["default"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@charset \"utf-8\";\r\n\r\n* {\r\n  box-sizing: inherit;\r\n  list-style: none;\r\n  text-decoration: none;\r\n}\r\n\r\na {\r\n  color: black;\r\n}\r\n\r\nbody {\r\n  padding: 0;\r\n  margin: 0;\r\n  box-sizing: border-box; /* 엘리먼트의 box-sizing 값을 border-box 로 설정 */\r\n  min-height: 100%;\r\n  background-color: #abd6f3;\r\n}\r\n\r\n#wrap {\r\n  margin: 0 auto;\r\n}\r\n\r\n#root {\r\n  min-height: 100%;\r\n}\r\n\r\n.spacer {\r\n  height: 6rem;\r\n}\r\n\r\n.common {\r\n  padding-left: 1rem;\r\n  padding-right: 1rem;\r\n  width: 1024px;\r\n  margin: 0 auto;\r\n}\r\n\r\n.rightBox {\r\n  height: 100%;\r\n  display: flex;\r\n  align-items: center;\r\n}\r\n\r\n#notFound {\r\n  display: flex;\r\n  justify-content: center;\r\n}\r\n", "",{"version":3,"sources":["webpack://./src/css/main.css"],"names":[],"mappings":"AAAA,gBAAgB;;AAShB;EACE,mBAAmB;EACnB,gBAAgB;EAChB,qBAAqB;AACvB;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,UAAU;EACV,SAAS;EACT,sBAAsB,EAAE,wCAAwC;EAChE,gBAAgB;EAChB,yBAAyB;AAC3B;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,kBAAkB;EAClB,mBAAmB;EACnB,aAAa;EACb,cAAc;AAChB;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,uBAAuB;AACzB","sourcesContent":["@charset \"utf-8\";\r\n\r\n@import url('./Header.css');\r\n@import url('./top.css');\r\n@import url('./PostList.css');\r\n@import url('./Post.css');\r\n@import url('./Write.css');\r\n@import url('./button.css');\r\n\r\n* {\r\n  box-sizing: inherit;\r\n  list-style: none;\r\n  text-decoration: none;\r\n}\r\n\r\na {\r\n  color: black;\r\n}\r\n\r\nbody {\r\n  padding: 0;\r\n  margin: 0;\r\n  box-sizing: border-box; /* 엘리먼트의 box-sizing 값을 border-box 로 설정 */\r\n  min-height: 100%;\r\n  background-color: #abd6f3;\r\n}\r\n\r\n#wrap {\r\n  margin: 0 auto;\r\n}\r\n\r\n#root {\r\n  min-height: 100%;\r\n}\r\n\r\n.spacer {\r\n  height: 6rem;\r\n}\r\n\r\n.common {\r\n  padding-left: 1rem;\r\n  padding-right: 1rem;\r\n  width: 1024px;\r\n  margin: 0 auto;\r\n}\r\n\r\n.rightBox {\r\n  height: 100%;\r\n  display: flex;\r\n  align-items: center;\r\n}\r\n\r\n#notFound {\r\n  display: flex;\r\n  justify-content: center;\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/top.css":
/*!***************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/top.css ***!
  \***************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "#PostListTop #top {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  margin-bottom: 2rem;\r\n}\r\n\r\n#PostListTopMenu {\r\n  display: flex;\r\n  justify-content: flex-end;\r\n  align-items: center;\r\n}\r\n\r\n#PostListTop #top h1 {\r\n  font-size: 2rem;\r\n  font-weight: bold;\r\n  line-height: 1.5;\r\n  margin: 0;\r\n}\r\n\r\n#PostListTop #top button {\r\n  height: fit-content;\r\n}\r\n\r\n#PostTop #PostHeader {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  margin-bottom: 2rem;\r\n}\r\n\r\n#PostTop h1 {\r\n  font-size: 1.5rem;\r\n  font-weight: bold;\r\n  line-height: 1.5;\r\n  margin: 0;\r\n}\r\n\r\n#PostTop #top button {\r\n  height: fit-content;\r\n}\r\n", "",{"version":3,"sources":["webpack://./src/css/top.css"],"names":[],"mappings":"AAAA;EACE,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;EACnB,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,yBAAyB;EACzB,mBAAmB;AACrB;;AAEA;EACE,eAAe;EACf,iBAAiB;EACjB,gBAAgB;EAChB,SAAS;AACX;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;EACnB,mBAAmB;AACrB;;AAEA;EACE,iBAAiB;EACjB,iBAAiB;EACjB,gBAAgB;EAChB,SAAS;AACX;;AAEA;EACE,mBAAmB;AACrB","sourcesContent":["#PostListTop #top {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  margin-bottom: 2rem;\r\n}\r\n\r\n#PostListTopMenu {\r\n  display: flex;\r\n  justify-content: flex-end;\r\n  align-items: center;\r\n}\r\n\r\n#PostListTop #top h1 {\r\n  font-size: 2rem;\r\n  font-weight: bold;\r\n  line-height: 1.5;\r\n  margin: 0;\r\n}\r\n\r\n#PostListTop #top button {\r\n  height: fit-content;\r\n}\r\n\r\n#PostTop #PostHeader {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  margin-bottom: 2rem;\r\n}\r\n\r\n#PostTop h1 {\r\n  font-size: 1.5rem;\r\n  font-weight: bold;\r\n  line-height: 1.5;\r\n  margin: 0;\r\n}\r\n\r\n#PostTop #top button {\r\n  height: fit-content;\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
var __webpack_exports__ = {};
/*!********************!*\
  !*** ./src/App.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _components_common_header__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/common/header */ "./src/components/common/header.js");
/* harmony import */ var _containers_PostListContainer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./containers/PostListContainer */ "./src/containers/PostListContainer.js");
/* harmony import */ var _containers_WriteEditorContainer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./containers/WriteEditorContainer */ "./src/containers/WriteEditorContainer.js");
/* harmony import */ var _containers_PostContainer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./containers/PostContainer */ "./src/containers/PostContainer.js");
/* harmony import */ var _core_Component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./core/Component */ "./src/core/Component.js");
/* harmony import */ var _components_common_NotFound__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/common/NotFound */ "./src/components/common/NotFound.js");






/** @jsx h */
// eslint-disable-next-line no-unused-vars

const h = (type, props, ...children) => {
  return {
    type,
    props,
    children
  };
};

const App = () => {
  return h("div", {
    id: "wrap"
  }, (0,_components_common_header__WEBPACK_IMPORTED_MODULE_0__["default"])(), h("div", {
    class: "spacer"
  }), h("div", {
    id: "PostListWrap"
  }, (0,_containers_PostListContainer__WEBPACK_IMPORTED_MODULE_1__["default"])()));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App());
const $entry = document.getElementById('root'); // 스택 형태로 routes 를 생성

const routes = [{
  path: '',
  component: App
}, {
  path: 'write',
  component: _containers_WriteEditorContainer__WEBPACK_IMPORTED_MODULE_2__["default"]
}, {
  path: ':postId',
  component: _containers_PostContainer__WEBPACK_IMPORTED_MODULE_3__["default"]
}, {
  path: 'update',
  component: _containers_WriteEditorContainer__WEBPACK_IMPORTED_MODULE_2__["default"]
}, {
  path: 'error',
  component: _components_common_NotFound__WEBPACK_IMPORTED_MODULE_5__["default"]
}];
new _core_Component__WEBPACK_IMPORTED_MODULE_4__["default"]($entry, routes);
})();

// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
/*!**************************!*\
  !*** ./src/css/main.css ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./main.css */ "./node_modules/css-loader/dist/cjs.js!./src/css/main.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map