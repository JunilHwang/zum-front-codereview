/* @jsx h */
function h(type, props={}, ...children){
  return { type, props, children };
}

import Component from "../core/Component";
import { selector } from "../store/store";
import { routing } from './Router';

/**
 * @organizePosts : TopPosts에서 각 카테고리 별로 index가 가까운 컨텐츠를 찾는다. 
 * @btnDetail : 버튼을 클릭하면 라우팅할 수 있도록 한다. 
 */

export default class TopPosts extends Component{
  organizePosts(){
    const {category, contents} = this.$state;
    // 메소드 filter -> find 변경
    // 각 카테고리별로 처음 나오는 것만 가져가기
    const topContents = category.map((cate) => contents.find((item) => item.category == cate))

    return topContents;
  }

  btnDetail(state){
    const postCard = document.querySelector('.cards');
    const $afterApp = document.querySelector('.post-container'); // app에다가 자꿈 ㅏㄴ들어ㅣㅏ러미ㅏㄹ

    postCard.addEventListener('click', (event) => {
      $afterApp.innerHTML = '';
      
      const path = 'detail' // path이름 설정하기
      // history pushState는 비동기 메소드다 
      history.pushState(path, null, path); // url 설정하기  
      
      const index = event.target.getAttribute('card'); // card에는 순서가 들어가있음.
      // index가 가끔 안넘어가는 경우가 생김.
      routing($afterApp, path, state[index]);
    });
  }

  render(){
    this.$state = selector();

    const topConts = this.organizePosts();
    const topRealTime = this.$state.contents.slice(0, 12); // 12 개만

    this.$target = (
      <div class="top-post">
        <h2>Top 4</h2>
        <div class="--top cards">
        {
          topConts.map(({category, title, author, cont, like}, index)=> {
            const liked = like?"liked! 🎇":"did't liked";
            return(<button class="post-card" card={index}>
              <h5>{category}</h5>
              <span>{liked}</span>
              <span>{title}</span>
              <span>{author}</span>
              <p>{cont}</p>
            </button>)
          })
        }
        </div>

        <h3>실시간 Top 12</h3>
        <ol class="--bottom">
          {
            topRealTime.map(({title, author})=> {
              return(<li>
                <h5>{title}</h5>
                <p>{author}</p>
              </li>)
            })
          }
        </ol>
      </div>
    );

    this.$target = this.createElement(this.$target);
    this.where.appendChild(this.$target);

    this.btnDetail(topConts); // 버튼 누르면 detail페이지로 갈 수 있도록 하기 !
  }
}