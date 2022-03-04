import Component from "../lib/Component";

export class NoutFoundPage extends Component{
  
  constructor({ name, state }){
    super({ name, state })
  }

  template(){
    return `
    <div id="notfoundpage">NOT FOUND PAGE 
        <p>요청하신 페이지를 찾을 수 없습니다. </p>
        <button>홈으로 돌아가기</button>
    </div>
    `;
  }

  setEvent(){
    this.el.querySelector('button').removeEventListener("click", this.firstBonder)
    this.el.querySelector('button').addEventListener("click", this.firstBonder)
  }

  eventHandler(){
    console.log('work')
    return location.replace('/')
  }

}
