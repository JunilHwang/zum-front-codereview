import PostListContainer from '../containers/PostListContainer';
import { clickEvent } from '../containers/PostListContainer';

// 생성자 함수

const Component = (function () {
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
  }

  // hash 방식의 라우터 메서드
  Component.prototype.router = function (entryInstance) {
    const router = function () {
      // 해쉬 URI 값을 취득해서 해쉬태그를 제거한다.
      // 그 값이 Number 만 들어온 경우, :postId 로 인식하게 해줌.
      const hashPath = window.location.hash.replace('#', '');
      const isNum = Number(hashPath);

      // postId 로 라우팅 되는 게시물 1개 보기일때, Post 관련 컴포넌트를 렌더링
      if (isNum) {
        // 경로상으로 들어온 number 형태 postId 는 Post 에서 취득해서
        // 실제 데이터를 렌더링 한다.

        const uiComponent = _routes.find(
          (route) => route.path === ':postId',
        ).component;

        entryInstance.render(uiComponent());
        entryInstance.compDidMount(uiComponent);
      } else {
        try {
          const uiComponent =
            _routes.find((route) => route.path === hashPath).component || '';
          entryInstance.render(uiComponent());

          // PostList 컴포넌트가 실행될때, setBody에 값이 캐싱되어 있으면
          // 컨테이너 컴포넌트로 배열을 전달한다.
          if (hashPath === '') {
            if (setBody.length > 0) {
              PostListContainer(setBody, true);
            }
          }

          entryInstance.compDidMount(uiComponent);
        } catch (error) {
          console.error(error);
          location.href = '#error';
        }
      }
    };

    // 주소 변경시 router가 실행됨.
    window.addEventListener('hashchange', router);
    // 새로고침 직전에 렌더링되었던 페이지를 다시 렌더링한다.
    window.addEventListener('DOMContentLoaded', router);
  };

  // render 된후 엘리먼트 취득이나 상태 처리등
  // 반환 되는 JSX 가상DOM을 제외한 로직 실행을 위한 메서드
  Component.prototype.compDidMount = function (fn) {
    return fn();
  };

  Component.prototype.render = function (virtualDOM, $elem = $root) {
    const oldRealNode = $elem.firstElementChild;

    const createRealNode = (virtualDOM) => {
      if (typeof virtualDOM === 'string') {
        return document.createTextNode(virtualDOM);
      }

      const elem = document.createElement(virtualDOM.type);

      Object.entries(virtualDOM.props || {})
        .filter(([attr, value]) => value)
        .forEach(([attr, value]) => elem.setAttribute(attr, value));

      const children = virtualDOM.children.map(createRealNode);

      // elem에 변환된 children dom을 추가한다.
      children.forEach((child) => elem.appendChild(child));

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

      for (const { name, value } of newProps) {
        if (value === oldNode.getAttribute(name)) continue;
        oldNode.setAttribute(name, value);
      }

      for (const { name } of oldProps) {
        if (newNode.getAttribute(name) !== undefined) continue;
        oldNode.removeAttribute(name);
      }
    }

    let newRealNode = createRealNode(virtualDOM);

    updateElement(oldRealNode, newRealNode, $elem);

    // 처음 render 될때 API를 불러오고 나면 다시 호출되지 않도록 함.
    if (mount === false) {
      this.getPostList();
    } else {
      return;
    }

    return (mount = true);
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
        return (location.href = '#error');
      }

      if (body) {
        // PostList 에 Props 전달
        PostListContainer(body, res.ok);

        // 배열 스택에 저장
        setBody = body;

        // PostList가 재 렌더링 된후 엘리먼트가 있을때 add 이벤트
        this.compDidMount(clickEvent);
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
        return (location.href = '#error');
      }

      // PostList 에 Props 전달
      PostListContainer(body, res.ok);

      // 배열 스택에 저장
      setBody = body;
    } catch (error) {
      return alert(error);
    }
  };

  return Component;
})();

export default Component;
