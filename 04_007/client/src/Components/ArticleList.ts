import { returnListArticle, typeArticleDB } from '@backend/Types';
import SingleList from './SingleList';
import Loading from './Loading';
import { reRender } from '..';

const ReactComponent: string = (function () {
  class ArticleList extends HTMLElement {
    constructor() {
      super();
      this.render = this.render.bind(this);
    }

    connectedCallback() {
      const endpoint = window.location.hostname;
      const render = this.render;
      let HTML = this;

      async function fetchArticles() {
        let data, result: returnListArticle;
        const searchParams = new URLSearchParams(window.location.search);
        HTML.innerHTML = `<${Loading}></${Loading}>`;
        try {
          data = await fetch(`http://${endpoint}:3333/article?${searchParams.toString()}`);
          result = await data.json();
        } catch (error) {
          alert(error);
          console.error(error);
          return;
        }
        sessionStorage.setItem('cache_list', JSON.stringify(result));
        render(result);
      }
      if (!sessionStorage.getItem('cache_list')) return fetchArticles();
      else {
        console.log('cache hit');
        this.render(JSON.parse(sessionStorage.getItem('cache_list')));
      }
    }

    render(data: returnListArticle) {
      this.innerHTML = `
        <style>
          .board {
            padding: 0 3rem;
            margin-top: 3rem;
            display: grid;
            grid-template-rows: auto;
            grid-gap: 1.2rem;
          }

          .board__bold {
            font-weight: bold;
          }

          .single__article {
            display: grid;
            grid-template-columns: 1fr 8fr 2fr 2fr;
            font-size: 2.5rem;
            cursor: pointer;
          }

          .single__right {
            justify-self: right;
          }

          .single__link {
            cursor: pointer;
            font-size: inherit;
          }

          .board__noarticle {
            margin-top: 3rem;
            position: relative;
            text-align: center;
            font-size: 3rem;
          }
        </style>
        <div class="board">  
          <div class="single__article">
            <div class=board__bold>글번호</div>
            <div class=board__bold>제목</div>
            <div class="board__bold single__right">작성자</div>
            <div class="board__bold single__right">작성일</div>
          </div>
          ${data.result
            .map(({ articleid, username, articlename, created_at }: typeArticleDB) => {
              return `<${SingleList} articleid="${articleid}" username="${username}" articlename="${articlename}" created-at="${created_at}"></${SingleList}>`;
            })
            .join('')}
          ${!data.result?.length ? `<div class="board__noarticle">게시글이 없습니다.</div>` : ''}
        </div>
      `;
      document.querySelector('.board').addEventListener('click', (event: any) => {
        let endpoint;
        const searchParams = new URLSearchParams(window.location.search);
        if (event.target.className === 'single__link') {
          const articleid: string = event.target.parentElement.previousElementSibling.textContent;
          endpoint = `${window.location.origin}${window.location.pathname}?articleid=${articleid}`;
          window.history.pushState({}, '', endpoint);
          reRender();
          return;
        }

        const classes = [...event.target.classList];
        const idx = classes.findIndex((className: string) => className === 'single__username');
        if (idx !== -1) {
          searchParams.set('username', event.target.textContent);
          endpoint = `${window.location.origin}${
            window.location.pathname
          }?${searchParams.toString()}`;
          window.history.pushState({}, '', endpoint);
          sessionStorage.removeItem('cache_list');
          reRender();
          return;
        }
      });
    }
  }

  const runOnce = `reactdom-${ArticleList.name}${Math.floor(Math.random() * 100000000)}`;
  window.customElements.define(runOnce, ArticleList);
  return runOnce;
})();

export default ReactComponent;
