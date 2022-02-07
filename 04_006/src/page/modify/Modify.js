import Component from "../../cors/Component";


export default class Modify extends Component {

  setup() {
    this.$state = {
      modify: history.state, //수정할 데이터 
    };
  }
  template() {

    return `
        <div class = "modify">
        <h1>수정 페이지</h1>    
        <input type="text" class="title" value=""/>
        </br></br>
        <input type="text" class="contents" value=""/>
        </br></br>
        <input type="text" class="writer" value=""/>
        </br></br>
        <button class = "submit">전송</button>
        </div>
        `
  }

  setMountEvent() {
    this.$target.querySelector('.title').value = this.$state.modify.title
    this.$target.querySelector('.contents').value = this.$state.modify.contents
    this.$target.querySelector('.writer').value = this.$state.modify.writer
  }

  setEvent() {
    const { cacheCheck, historyRouter } = this.$props
    this.$target.querySelector('.submit').addEventListener('click', () => {
      let data = {
        title: this.$target.querySelector('.title').value,
        writer: this.$target.querySelector('.writer').value,
        contents: this.$target.querySelector('.contents').value,
      }

      fetch("http://localhost:3001/modify" + window.location.search, //데이터 수정
        {
          method: "put",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data)
        })
        .then((response) => {
          if (response.status === 404) {
            alert(response.statusText)
            return 0
          } else if (response.status === 200) {
            return response.json()
          }
        })
        .then((e) => {
          alert(e.msg)
          cacheCheck(true)
          historyRouter(null, null, "/")
        }).catch((e) => {
          alert(e)
        })
    })
  }
}
