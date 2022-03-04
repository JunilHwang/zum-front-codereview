import Component from '../lib/Component.js'
import viewRouter from './router';

export class PostSinglePage extends Component{
  
  child; 

  constructor({ name, state }){
    super({ name, state })
    // this.root = root;
    this.child = [];
    this.child.push( new Header({ name : 'header', state }))
    this.child.push( new Contents({ name : 'contents', state }))
    this.child.push( new BottomButton({ name : 'bottombutton', state }))

  }
}


export class Header extends Component{
  

  template(){
    // console.log(viewRouter, this.state)

    const index = viewRouter.index 
    const data = this.state.data.filter(ele => ele.id  === Number(index))[0]

    return `
      <header id="header">
        <div class='single-header'>
          <span>글번호</span>
          <span>제목</span>
          <span>작성자</span>
          <span>날짜</span>
        </div>
        ${ 
          !data || data.length === 0 
            ? ""
            :`<div class='single-content'>
              <span>${ data.id }</span>
              <span>${ data.title }</span>
              <span>${ data.writer }</span>
              <span>${ data.date.split('T')[0] }</span>
            </div>`
        }
      </header>
    `
  }

}

export class Contents extends Component{


  template(){
    const index = viewRouter.index 
    const data = this.state.data.filter(ele => ele.id  === Number(index))[0];

    return `
      <div id="contents">
        ${ !data || data.length === 0 
          ? "<div> 게시글이 존재하지 않습니다.</div>" 
          : `<textarea cols="50" rows="20" name ='content' readonly>${data.content}</textarea>`
        }
      </div>
    `;  
  }
}

export class BottomButton extends Component{
  
  template(){
    return `
      <div id="bottombutton">
      <button data-action="list">목록</button>
        <button data-action="edit">수정</button>
        <button data-action="delete">삭제</button>
      </div>
    `;
  }

}
