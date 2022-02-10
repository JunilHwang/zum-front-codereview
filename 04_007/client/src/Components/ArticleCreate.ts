import { typeNewArticle } from '@backend/Types';
import { MAGICNUM } from './ArticleDetail';
import { reRender } from '..';

const ReactComponent: string = (function () {
  class ArticleCreate extends HTMLElement {
    constructor() {
      super();
      this.render = this.render.bind(this);
      this.addEvent = this.addEvent.bind(this);
    }

    connectedCallback() {
      this.render();
      this.addEvent();
    }

    addEvent() {
      document.querySelector('.create__metadata').addEventListener('click', (event: any) => {
        let endpoint;
        switch (event.target?.id) {
          // 수정
          case 'create-btn-create':
            const payload: typeNewArticle = {
              username: (document.querySelector('#create-username-input') as HTMLInputElement)
                ?.value,
              articlename: (document.querySelector('#create-title-input') as HTMLInputElement)
                ?.value,
              articletext: (document.querySelector('#create-textarea') as HTMLTextAreaElement)
                ?.value,
            };
            const { username, articlename, articletext } = payload;

            if (!username || !articlename || !articletext) {
              alert('값을 모두 입력해주세요.');
              return;
            }
            if (username.length > MAGICNUM.MAX_USERNAME_LENGTH) {
              alert(`제목은 ${MAGICNUM.MAX_USERNAME_LENGTH}자 이내로 입력해주세요.`);
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

            fetch(`http://${window.location.hostname}:3333/article`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(payload),
            })
              .then((res) => {
                if (res.status !== 201) {
                  alert(`작성에 실패했습니다. 오류 코드 : ${res.status}`);
                  return;
                }
                return res.json();
              })
              .then((res) => {
                sessionStorage.removeItem('cache_list');
                endpoint = `${window.location.origin}${window.location.pathname}?articleid=${res.id}`;
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
          case 'create-btn-list':
            endpoint = `${window.location.origin}${window.location.pathname}`;
            window.history.pushState({}, '', endpoint);
            reRender();
            break;
        }
      });
    }

    render() {
      this.innerHTML = `
        <style>
          .create__detail {
            padding: 3rem;
          }

          .create__detail__title {
            font-size: 3rem;
            font-weight: bold;
            margin-bottom: 2rem;
          }
          
          .create__metadata {
            display: flex;
            align-items: center;
            margin-bottom: 1rem;
          }

          .create__searchbutton {
            margin-left: 1rem;
            width: 5rem;
            height: 3.5rem;
            border-radius: 0.5rem;
            font-size: 1.5rem;
            border: 1px solid #777;
            justify-self: center;
          }

          .create__searchbutton:active {
            background-color: lightgray;
          }

          #create-username-input {
            flex-grow: 1;
            height: 3.5rem;
            padding-left: 1rem;
            font-size: 1.5rem;
            border-radius: 0.5rem;
            border: 1px solid #777;
          }

          #create-title-input {
            width: 100%;
            height: 3.5rem;
            padding-left: 1rem;
            font-size: 1.5rem;
            border-radius: 0.5rem;
            border: 1px solid #777;
            margin-bottom: 1rem;
          }

          #create-textarea {
            width: 100%;
            font-size: 1.5rem;
            min-height: 60rem;
            height: auto;
            resize: vertical;
            padding: 1rem;
            border-radius: 0.5rem;
          }
          
        </style>
        <div class="create__detail">
          <!-- 여기서부터 조건부 렌더링 -->
          <div class="create__detail__title">새로운 글 작성</div>
          <div class="create__metadata">
            <input id="create-username-input" type="text" value="" placeholder="작성자" />
            <button id="create-btn-create" class=create__searchbutton>글쓰기</button>
            <button id="create-btn-list" class=create__searchbutton>목록</button>
          </div>
          <input id="create-title-input" type="text" value="" placeholder="글 제목">
          <textarea class="create__detail__text" id="create-textarea" placeholder="글 내용"></textarea>
        </div>
      `;
    }
  }

  const runOnce = `reactdom-${ArticleCreate.name}${Math.floor(Math.random() * 100000000)}`;
  window.customElements.define(runOnce, ArticleCreate);
  return runOnce;
})();

export default ReactComponent;
