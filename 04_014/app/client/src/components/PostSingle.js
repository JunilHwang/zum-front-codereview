import { router, store } from "../../csr.js";
import Component from '../lib/Component.js'

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
    const index  = router.index
    const data = store.state.data.filter(ele => ele.id  === Number(index))[0]

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
    const  index  = router.index
    const data = store.state.data.filter(ele => ele.id  === Number(index))[0]

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
  

  setEvent(){
    this.el.removeEventListener("click", this.firstBonder)
    this.el.addEventListener("click", this.firstBonder)
  }
  
  async eventHandler({ target }){
    const { action } = target.dataset; 

    if(action === "edit"){
      const url = window.origin + "/post-edit?index=" + router.index
      router.setPathCur('/post-edit');
      history.replaceState({ state : store.state}, '', url);
    }

    if(action === "list"){
      const id = store.cacheHandler.getCacheId();
      router.setPathCur('/');
      history.replaceState({ state : store.state }, '', window.origin + '/list?' + id )
    }

    if(action === "delete"){
      // delete request 
      const index  = router.index
      const id = store.state.data.filter(ele => ele.id  === Number(index))[0].id

      const result = await fetch(
        `/post/delete?id=${id}`, 
        { method : 'delete',}
      ).then(result => result.json());
      
      if(result){ 
        store.cacheHandler.clearCache(result);
        router.setPathCur('/');
        history.replaceState({}, '', window.origin);
        alert('게시글이 삭제 되었습니다')
      }
    }
  }

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
