import Component from '../lib/Component.js'
import viewRouter from './router';

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

  template(){

    let index; data;

    if(viewRouter.index){
      index = viewRouter.index 
      data = this.state.data.filter(ele => ele.id  === Number(index))[0]
    }
    data = null;

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