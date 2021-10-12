import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Detail");
  }
  

  async getDetailHtml(category, idx) {
   return await fetch(`http://localhost:8080/detail`, {
      method: 'POST', 
      body: JSON.stringify({category, idx}), 
      headers: {
          "Content-type": "application/json; charset=UTF-8" ,
          "Accept" : "application/json"
      }
    })
  .then((res) => res.json())
  .then((datas) => {
    let data = datas[0]
    let content = data.zumContent.join('<br><br>')
    let imgs = data.zumImg.map(el => {
      return `<img src=${el}></img>`
    })
     return `<div class="detailPage">
     <div class ="detail_top"><div>${data.title}</div></div>
     <div class ="detail_middle">${imgs.join("")}</div>
     <div class ="detail_bottom">${content}</div>
     </div>`
  })

}
  }

