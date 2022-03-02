/* @jsx h */
function h(type, props={}, ...children){
  return { type, props, children };
}

import Component from "../core/Component";
// import { dispatch, selector } from "./../store/test";


export default class Header extends Component{
  // eventHandler(){
  //   const btn = document.querySelector('.btn-plus');
  //   btn.addEventListener('click', () => {
  //     dispatch({type: 'plus', payload: 1});
  //     console.log("called");
  //     this.getState();
  //   });
  // }

  // getState(){
  //   let temp = selector();
  //   // 만약 바뀐 state가 현재의 this.state와 다르다면
  //   if(temp != this.state){
  //     console.log("state가 변경됐습니다");
  //     this.setState(temp)
  //   }else{
  //     console.log("변한거 없음");
  //   }
  // }

  // setState(newData){
  //   this.state = {...this.state, ...newData}; // 데이터 바꾸고나면
  //   this.reRender(); // 렌더링
  // }

  render(){
    this.$target = (
      <div class="header">
        <div class="header-nav">
          <mark>
            <a href="/">새로고침</a>
          </mark>
          <nav>
            <a routeTo="life" href="/life">Life</a>
            <a routeTo="food" href="/food">Food</a>
            <a routeTo="travel" href="/travel">Travel</a>
            <a routeTo="culture" href="/culture">Culture</a>
            <a routeTo="favorite" href="/favorite">Favorite</a>
          </nav>
        </div>
        <div class="header-search">
          <button>초기화</button>
          <form>
            <input type="text" placeholder="검색하세요" />
            <input type="submit" value="검색" />
          </form>
        </div>
      </div>
    );
    this.$target = this.createElement(this.$target);
    this.where.appendChild(this.$target);
    this.eventHandler();
  }

  // reRender(){
  //   // 이것만 바꾸면 되지 않을까.... 
  //   const tmepTarget = document.querySelector('.changed');
  //   tmepTarget.innerHTML = `${this.state.a}`;
  // }
}