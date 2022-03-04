import { router, store } from "../../csr.js";
import Component from '../lib/Component.js'

export class PostEditPage extends Component{
  
  child; 

  constructor({ name, state }){
    super({ name, state })
    // this.root = root;
    this.child = [];
    this.child.push( new Contents({ name : 'contents', state }))

  }

}



export class Contents extends Component{

  setEvent(){
    this.el.querySelector('#form').removeEventListener("submit", this.firstBonder)
    this.el.querySelector('#form').addEventListener("submit", this.firstBonder)
  }
  
  async eventHandler(e){
    e.preventDefault();

    let payload = {};
    e.target.querySelectorAll('input').forEach(ele => {
      payload[ele.name] = ele.value
    });

    payload.content = e.target.querySelector('textarea').value;

    // console.log(payload)
    const result = await fetch( '/post/edit', {
      method : 'post',
      headers : { 'content-type' : 'application/json' },
      body : JSON.stringify(payload)
    })
    .then(res => res.json())
    
    if(!result) return alert("일시적 오류 발생")
    

    store.cacheHandler.clearCache(result);
    
    let routerId = router.index 
    if(location.search === '?new') routerId= result.data[0].id 

    router.setIndex(routerId)
    router.setPathCur('/post-single');

    // location.replace('/post-single?index='+router.index);

    history.replaceState(
      { state : result }, 
      '', 
      window.origin + '/post-single?index=' + router.index 
      )
  }


  template(){
    let index, data;
    if(location.search !== '?new'){
      // console.log(router)
      index = router.index
      data = store.state.data.filter(ele => ele.id  === Number(index))[0]
    }
    else data = null; 

    return `
      <div id="contents">
        <form action='/api/post' method='post' id='form'>
          <fieldset>
            <p name=${data ? data.id: ""}> 제 목
              <input 
              data-action='title'
              type='text',
              name = 'title'
              value=${ data ? data.title : ""}
              >
            </p>
            <p> 작성자
              <input
              data-action='writer'
              type='text'
              name='writer'
              value=${ data? data.writer : ""}
              >
            </p> 
            <textarea data-action = 'contents' cols="50" rows="20" name ='content'>${ data ? data.content : ""}</textarea>
            <input style="display:none;" name=id value = ${ data ? data.id : ""} >
            <button data-action='submit'>제출</button>
          </fieldset>
        </form>
      </div>
    `;  
  }
  
}
