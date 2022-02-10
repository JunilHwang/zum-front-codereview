import { returnListArticle, typeArticleDB, typeModifyArticle } from '@backend/Types';
import Loading from './Loading';
import { reRender } from '..';

export const MAGICNUM = {
  MAX_USERNAME_LENGTH: 32,
  MAX_ARTICLENAME_LENGTH: 128,
  MAX_ARTICLETEXT_LENGTH: 1048576,
  MAX_ARTICLETEXT_QUERY_LENGTH: 128,
  MAX_SAFE_QUERY_LENGTH: Math.floor(Math.sqrt(Number.MAX_SAFE_INTEGER)),
};

const ReactComponent: string = (function () {
  class ArticleDetail extends HTMLElement {
    constructor() {
      super();
      this.render = this.render.bind(this);
      this.addEvent = this.addEvent.bind(this);
      this.notfound = this.notfound.bind(this);
      //this.connectedCallback = this.connectedCallback.bind(this);
    }

    connectedCallback() {
      const addevent = this.addEvent;
      const render = this.render;
      const notfound = this.notfound;
      let HTML = this;
      const searchParams = new URLSearchParams(window.location.search);
      const articleid = searchParams.get('articleid');

      const endpoint = window.location.hostname;
      async function fetchArticles() {
        let data, result: typeArticleDB;
        HTML.innerHTML = `<${Loading}></${Loading}>`;
        try {
          data = await fetch(`http://${endpoint}:3333/article/${articleid}`);
          result = await data.json();
        } catch (error) {
          alert(error);
          console.error(error);
          return;
        }

        if (data.status === 404 || data.status === 400) {
          notfound();
          return;
        }

        if (sessionStorage.getItem('cache_list')) {
          const cache: returnListArticle = JSON.parse(sessionStorage.getItem('cache_list'));
          cache.result.push(result as never);
        }
        render(result);
        addevent();
      }
      if (!sessionStorage.getItem('cache_list')) return fetchArticles();

      const cache: returnListArticle = JSON.parse(sessionStorage.getItem('cache_list'));
      const article = cache.result.findIndex(
        ({ articleid: articlecheck }: typeArticleDB) => articlecheck === Number(articleid)
      );
      if (article === -1) return fetchArticles();

      console.log('cache hit');
      this.render(cache.result[article]);
      addevent();
    }

    addEvent() {
      document.querySelector('.article__metadata').addEventListener('click', (event: any) => {
        const searchParams = new URLSearchParams(window.location.search);
        let endpoint;
        switch (event.target?.id) {
          // 수정
          case 'article-btn-modify':
            const editMode = searchParams.get('editmode');
            if (editMode === '1') {
              searchParams.delete('editmode');

              const payload: typeModifyArticle = {
                articleid: Number(searchParams.get('articleid')),
                articlename: (document.querySelector('#article-title-input') as HTMLInputElement)
                  ?.value,
                articletext: (document.querySelector('#article-textarea') as HTMLTextAreaElement)
                  ?.value,
              };
              const { articleid, articlename, articletext } = payload;

              if (!articleid || !articlename || !articletext) {
                alert('값을 모두 입력해주세요.');
                return;
              }
              if (isNaN(articleid) || articleid < 0 || articleid > Number.MAX_SAFE_INTEGER) {
                alert('글번호는 정수만 입력해주세요.');
                return;
              }
              if (articlename.length > MAGICNUM.MAX_ARTICLENAME_LENGTH) {
                alert(`제목은 ${MAGICNUM.MAX_ARTICLENAME_LENGTH}자 이내로 입력해주세요.`);
                return;
              }
              if (articletext.length > MAGICNUM.MAX_ARTICLETEXT_LENGTH) {
                alert('내용이 너무 깁니다.');
                return;
              }

              event.target.innerHTML += `<${Loading}></${Loading}>`;
              fetch(`http://${window.location.hostname}:3333/article/${articleid}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
              })
                .then((res) => {
                  if (res.status !== 204) {
                    alert(`수정에 실패했습니다. 오류 코드 : ${res.status}`);
                    return;
                  }
                  sessionStorage.removeItem('cache_list');
                  endpoint = `${window.location.origin}${
                    window.location.pathname
                  }?${searchParams.toString()}`;
                  window.history.pushState({}, '', endpoint);
                  this.connectedCallback();
                  return;
                })
                .catch((err) => {
                  alert(err);
                  return;
                });
            } else {
              searchParams.set('editmode', '1');
              endpoint = `${window.location.origin}${
                window.location.pathname
              }?${searchParams.toString()}`;
              window.history.pushState({}, '', endpoint);
              this.connectedCallback();
            }
            break;

          // 삭제
          case 'article-btn-delete':
            const articleid = searchParams.get('articleid');
            event.target.innerHTML += `<${Loading}></${Loading}>`;
            fetch(`http://${window.location.hostname}:3333/article/${articleid}`, {
              method: 'DELETE',
            })
              .then((res) => {
                if (res.status !== 204) {
                  alert(`삭제에 실패했습니다. 오류 코드 : ${res.status}`);
                  return;
                }
                sessionStorage.removeItem('cache_list');
                endpoint = `${window.location.origin}${window.location.pathname}`;
                window.history.pushState({}, '', endpoint);
                reRender();
                return;
              })
              .catch((err) => {
                alert(err);
                return;
              });
            break;
          // 목록
          case 'article-btn-list':
            endpoint = `${window.location.origin}${window.location.pathname}`;
            window.history.pushState({}, '', endpoint);
            reRender();
            break;
        }
      });
    }

    notfound() {
      this.innerHTML = `
        <style>
          .article__notfound {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 5rem;
            font-size: 4rem;
            text-align: center;
          }
        </style>
        <div class="article__notfound">404 Not Found</div>
        <div class="article__notfound">요청하신 게시물을 찾을 수 없습니다.</div>
      `;
    }

    render({ articleid, username, articlename, articletext, created_at }: typeArticleDB) {
      const searchParams = new URLSearchParams(window.location.search);
      const editMode = searchParams.get('editmode') === '1';
      this.innerHTML = `
        <style>
          .article__detail {
            padding: 3rem;
          }

          .article__detail__title {
            font-size: 3rem;
            font-weight: bold;
            margin-bottom: 2rem;
          }
          
          .article__metadata {
            display: grid;
            grid-template-columns: 1fr 2fr 2fr 1fr 0.3fr 0.3fr 0.3fr;
            grid-gap: 1rem;
            align-items: center;
            margin-bottom: 2rem;
          }

          .article__metadata > div {
            font-size: 2rem;
            color: darkslategray;
          }

          .article__detail__text {
            white-space: pre-wrap;
            font-size: 1.8rem;
            line-height: 2.8rem;
          }

          .article__searchbutton {
            width: 5rem;
            height: 3.5rem;
            border-radius: 0.5rem;
            font-size: 1.5rem;
            border: 1px solid #777;
            justify-self: center;
          }

          .article__searchbutton:active {
            background-color: lightgray;
          }

          #article-textarea {
            width: 100%;
            min-height: 20rem;
            height: auto;
            resize: vertical;
            padding: 1rem;
          }

          #article-title-input {
            width: 100%;
            font-size: 3rem;
            font-weight: bold;
            margin-bottom: 2rem;
            padding-left: 1rem;
          }
        </style>
        <div class="article__detail">
          <!-- 여기서부터 조건부 렌더링 -->
          ${
            editMode
              ? `<input id="article-title-input" type="text" value="${articlename}">`
              : `<h1 class="article__detail__title">${articlename}</h1>`
          }
          <div class="article__metadata">
            <div>글번호: ${articleid}</div>
            <div>작성자: ${username}</div>
            <div>작성일: ${new Date(created_at).toLocaleDateString()}</div>
            <div></div>
            <button id="article-btn-modify" class=article__searchbutton>${
              editMode ? '완료' : '수정'
            }</button>
            <button id="article-btn-delete" class=article__searchbutton>삭제</button>
            <button id="article-btn-list" class=article__searchbutton>목록</button>
          </div>
          ${
            editMode
              ? `<textarea class="article__detail__text" id="article-textarea">${articletext}</textarea>`
              : `<div class="article__detail__text">${articletext}</div>`
          }
        </div>
      `;
    }
  }

  const runOnce = `reactdom-${ArticleDetail.name}${Math.floor(Math.random() * 100000000)}`;
  window.customElements.define(runOnce, ArticleDetail);
  return runOnce;
})();

export default ReactComponent;
