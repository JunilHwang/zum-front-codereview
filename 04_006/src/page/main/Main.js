import Component from "../../cors/Component";
export default class Main extends Component {


  setup() {
    this.$state = {
      data: [{}],  //게시글 get 데이터
      currentP: 1, //현재페이지
      countBtn: 5, //마지막 페이지
      searchData: [{}], //검색데이터
      searchBool: false //검색유무확인

    };
  }
  template() {
    let lastPageNum = this.$state.currentP * this.$state.countBtn
    let firstPageNum = lastPageNum - this.$state.countBtn
    var tableDatas = this.$state.data.slice(firstPageNum, lastPageNum)
    var total = Math.ceil((this.$state.data.length) / this.$state.countBtn)
    if (this.$state.searchBool) {
      tableDatas = this.$state.searchData.slice(firstPageNum, lastPageNum)
      total = Math.ceil((this.$state.searchData.length) / this.$state.countBtn)
    }
    let count = Array.from({ length: total }, (a, b) => b + 1)


    return `
    <div class = "main">
    <h1>메인 페이지</h1>  
    <div class = "main_top">
    <input type="text" class = "search" value="" placeholder = "게시물 검색"/> 
    <button id = "searchBtn">검색</button>
    <input type="number"  class ="showNum" value="" placeholder = "게시물 갯수 입력"/> 
    <button id = "check">확인</button>
    </div>
    <div class = "main_middle">
    <table border="1">
    <th>글번호</th>
    <th>제목</th>
    <th>작성자</th>
    <th>작성일<button id = "down">내림</button><button id =  "up">올림</button></th>
    ${tableDatas.map((e) =>
      `<tr><td>${e.id}</td>
      <td><button id = "titleBtn" index = "${e.id}" >${e.title}</button></td>
      <td><button id = "writerBtn" index = "${e.writer}" >${e.writer}</button></td>
      <td>${e.date}</td></tr>`
    ).join("")}
    </table></br>
      ${count.map(e =>
      `<button id = "pageBtn" index = "${e}" > ${e}</button>`
    ).join("")}
      </div>
      <div class = "main_bottom">
      <button id = "writeBtn">작성</button>
      <button id = "initBtn">초기화</button>
      <button id = "resetBtn">새로고침(데이터갱신)</button>
      </div>
      </br>
      </div>
    `
  }

  //뒤로가기 시 불필요한 api요청 막음
  setMountEvent() {//수정 후
    let dataCheck = localStorage.getItem('data')
    const { data, cacheCheck } = this.$props
    if (!data) {
      console.log("데이터존재")
    } else {
      console.log("데이터없음,캐시갱신")
      fetch("http://localhost:3001/")//게시글 데이터 조회
        .then((response) => {
          if (response.status === 404) {
            alert(response.statusText)
            return 0
          } else if (response.status === 200) {
            return response.json()
          }
        })
        .then((e) => {
          localStorage.setItem("data", JSON.stringify(e.data))
        }).catch((e) => {
          alert(e)
          console.log(e)
        })
      cacheCheck(false)
    }
    this.setState({
      data: JSON.parse(dataCheck)
    })
  }



  setEvent() {
    const { historyRouter } = this.$props;

    this.$target.querySelector('.main_top').addEventListener('click', (e) => {
      var target = e.target
      if (target.id === "searchBtn") {
        let data = this.$target.querySelector('.search').value
        let search = []
        this.$state.data.map((e) => {
          if (e.title.includes(data)) {
            search.push(e)
          }
        })
        this.setState({ searchData: search, searchBool: true, currentP: 1 })
      }
      else if (target.id === "check") {
        this.setState({ countBtn: this.$target.querySelector('.showNum').value })
      }
    })

    //이벤트 위임
    this.$target.querySelector('.main_middle').addEventListener('click', (e) => {
      var target = e.target
      if (target.id === "up") {
        this.setState({ data: this.$state.data.sort((a, b) => new Date(a.date) - new Date(b.date)) })
      }
      else if (target.id === "down") {
        this.setState({ data: this.$state.data.sort((a, b) => new Date(b.date) - new Date(a.date)) })
      }
      else if (target.id === "pageBtn") {
        this.setState({ currentP: e.target.getAttribute("index") })
      }
      else if (target.id === "titleBtn") {
        const pk = e.target.getAttribute("index")
        let url = '/detail?id=' + pk
        fetch("http://localhost:3001" + url)
          .then((response) => {
            if (response.status === 404) {
              alert(response.statusText)
              return 0
            } else if (response.status === 200) {
              return response.json()
            }
          })
          .then((e) => {
            historyRouter(e.data, null, url)
          }).catch((e) => {
            window.alert("조회불가")
            historyRouter(null, null, "/")
          })
      }
      else if (target.id === "writerBtn") {
        let data = e.target.getAttribute("index")
        let search = []
        this.$state.data.map((e) => {
          if (e.writer == data) {
            search.push(e)
          }
        })
        this.setState({ searchData: search, searchBool: true, currentP: 1 })
      }

    })

    this.$target.querySelector('.main_bottom').addEventListener('click', (e) => {
      var target = e.target
      if (target.id === "writeBtn") {
        historyRouter(null, null, "/write")
      }
      else if (target.id === "initBtn") {
        this.setState({ searchBool: false })
      }
      else if (target.id === "resetBtn") {
        location.reload()
        this.setState({ data: JSON.parse(localStorage.getItem('data')) })
      }
    })
  }
}
