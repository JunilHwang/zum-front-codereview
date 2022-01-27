/* @jsx h */
function h(type, props={}, ...children){
  return { type, props, children };
}

import Component from "../core/Component";

export default class Detail extends Component{
  eventHandler(){
    const controll = document.querySelector('.post-controller');

    controll.addEventListener('click', (event) => {
      const button = event.target.getAttribute('click');
      switch(button){
        case "modified":
          console.log("수정하겠습니다");
          break;
        case "delete":
          console.log("삭제하겠습니다");
          break;
        case "list":
          console.log("목록 창으로 가겠습니다");
          break;
        // default:
        //   window.confirm("예상하지 못한 동작")
        //   && console.log("뒤로가기")
      }
    });
  }

  render(){
    const { author, cont, date, index, title} = this.$state;

    this.$target = (
      <div class="post">

        <div class="post-content">
          <span>{index}</span>
          <h3>{title}</h3>
          <span>{author}</span>
          <p>{cont}</p>
          <span>{date}</span>
        </div>

        <div class="post-controller">
          <button click="modified">수정</button>
          <button click="delete">삭제</button>
          <button click="list">목록</button>
        </div>
        
      </div>
    );

    this.$target = this.createElement(this.$target);
    this.where.appendChild(this.$target);
    this.eventHandler();
  }
}