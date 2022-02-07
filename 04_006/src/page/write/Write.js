import Component from "../../cors/Component";

export default class Write extends Component {



  template() {

    return `
        <div class = "write">
        <h1>작성 페이지</h1>    
        <input type="text" class="title" value="" placeholder = "제목"/>
        </br></br>
        <input type="text" class="contents" value="" placeholder = "내용"/>
        </br></br>
        <input type="text" class="writer" value= "" placeholder = "작성자"/>
        </br></br>
        <button class = "submit">전송</button>
        </write>
        `
  }

  setEvent() {
    let { cacheCheck } = this.$props
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let date = today.getDate();

    this.$target.querySelector('.submit').addEventListener('click', () => {
      let data = {
        title: this.$target.querySelector('.title').value,
        writer: this.$target.querySelector('.writer').value,
        contents: this.$target.querySelector('.contents').value,
        date: year + "." + month + "." + date
      }
      fetch("http://localhost:3001/write", //데이터 전송
        {
          method: "post",
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
          cacheCheck(true)//데이터변경알림
          history.back()
        }).catch((e) => {
          alert(e)
        })
    }
    )
  }

}
