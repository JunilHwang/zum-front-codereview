import Component from "../../cors/Component";

export default class Detail extends Component {

  setup() {
    this.$state = {
      detail: history.state, //상세 데이터
    };
  }


  template() {
    return `
    <div class = "detail">
    <h1>상세 페이지</h1>
        제목 :  ${this.$state.detail[0].title}</br>
        내용 : ${this.$state.detail[0].contents}<br/>
        작성자 : ${this.$state.detail[0].writer} <br/>
        작성시간 : ${this.$state.detail[0].date}<br/>

    <div class = "detail_button">
     <button id = "upBtn">수정</button>
     <button id = "delBtn">삭제</button>
     <button id = "backBtn">목록</button>
    </div>
    </div>
    `
  }


  setEvent() {
    const { historyRouter, cacheCheck } = this.$props;

    //이벤트 위임
    this.$target.querySelector('.detail_button').addEventListener('click', (e) => {
      var target = e.target
      if (target.id === "upBtn") {
        let url = '/modify' + window.location.search
        historyRouter(this.$state.detail[0], null, url)

      } else if (target.id === "delBtn") {
        fetch("http://localhost:3001/detail" + window.location.search, { method: "delete" }) //게시글 삭제
          .then((response) => {
            if (response.status === 404) {
              alert(response.statusText)
              return 0
            } else if (response.status === 200) {
              return response.json()
            }
          }).then((e) => {
            alert(e.msg)
            cacheCheck(true) //데이터 변경 알림
            historyRouter(null, null, "/") //url 변경
          }).catch((e) => {
            alert(e)
          })
      }
      else if (target.id === "backBtn") {
        historyRouter(null, null, "/")
      }
    })
  }
}


