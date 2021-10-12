export default class {
  constructor(params) {
    this.params = params;
  }
  setTitle(title) {
    document.title = title;
  }

  async getHtml(category) {

    if (category === "ranking") {
        let rankingTemplate = "<div class='top'>";
      return await fetch(`http://localhost:8080/ranking_data`)
        .then((res) => res.json())
        .then((datas) => {
          let array = ["food", "life", "travel", "culture"];
          array.map((ele) => {
           rankingTemplate += datas[ele].map((el)=>{

              return `<div class="cards" value="card" id=${el.idx} data>
            <div class="card_image" data><img id=${ele}/${el.idx} src="${el.imageUrl}" data /></div>
            <div class="card_title" data><span id=${ele}/${el.idx} data>${el.title}<span>
            </div>
            <div class="card_content"><span>${el.summaryContent}<span></div>
            <div class="card_bottom">
            <div class="card_media"><span>${el.mediaName}<span></div>
            <div class="card_button">
            <div class="cardLike"  id=like/${ele}/${el.idx} value="likeOff/${ele}/${el.idx}"><i class="far fa-bookmark" id=like/${ele}/${el.idx}/i></i></div>
            <div class="cardLikeOff" style="display:none" id=likeOff/${ele}/${el.idx}><i class="fas fa-bookmark" id=likeOff/${ele}/${el.idx}/i></i></div>
            </div>
            </div>
        </div>`;
            });
          });
          rankingTemplate += "</div>"
         

          let template = '<div class="bottom" datas>';
          let ranking = datas.ranking.map((el,index) => {
            return `<div class="rankingCard"  id=${el.idx} datas>
            <div class="card_left" datas id=${el.idx}><div id=${el.idx} datas>${index+1}</div></div>
            <div class="card_right" datas id=${el.idx}>
            <div class="ranking_title" datas id=${el.idx}>${el.title}</div>
            <div class="author" datas id=${el.idx}><span id=${el.idx} datas>${el.mediaName}<span></div>
            </div>
           </div>`;
          });

          ranking.forEach((el) => (template += el));
          template += "</div>";

          return rankingTemplate+template;
        });
    } else if (category === "like"){
        let likeArr =  localStorage.getItem("like");
       return await 
        fetch(`http://localhost:8080/${category}_data`, {
            method: 'POST', 
            body: likeArr, 
            headers: {
                "Content-type": "application/json; charset=UTF-8" 
            }
          }).then(res => res.json())
          .then(datas => {
            let fetchdata = datas.map((el) => {
                return ` <div class="cards" data><a>
                <div class="card_image" data><img  id=${el.category}/${el.idx} src="${el.imageUrl}" data></div>
                <div class="card_title" data><span id=${el.category}/${el.idx}  data>${el.title}<span></div>
                <div class="card_content" data><span id=${el.category}/${el.idx} } data>${el.summaryContent}<span></div>
                <div class="card_bottom">
                <div class="card_media"><span>${el.mediaName}<span></div>
                <div class="card_button">
                <div class="cardLike" style="display:none" id=like/${el.category}/${el.idx} value="likeOff/${el.category}/${el.idx}"><i class="far fa-bookmark" id=like/${category}/${el.idx}/i></i></div>
                <div class="cardLikeOff"  id=likeOff/${el.category}/${el.idx}><i class="fas fa-bookmark" id=likeOff/${el.category}/${el.idx}/i></i></div>
                </a></div>
                      </div>
                  </div>`;
              });
              let template = "<div>";
              fetchdata.forEach((el) => (template = template + el));
              template = template + '</div>'
              return template;

          }
            
            )
          .catch(error => console.error('Error:', error));
   
    }
    
    else {
      return await fetch(`http://localhost:8080/${category}_data`)
        .then((res) => res.json())
        .then((datas) => {
          let fetchdata = datas.map((el) => {
            return ` <div class="cards" data>
            <div class="card_image" data><img  id=${category}/${el.idx} src="${el.imageUrl}" data></div>
            <div class="card_title" data><span id=${category}/${el.idx}  data>${el.title}<span></div>
            <div class="card_content" data><span id=${category}/${el.idx}  data>${el.summaryContent || '책 보러가기'}<span></div>
            <div class="card_bottom">
            <div class="card_media"><span>${el.mediaName}<span></div>
            <div class="card_button">
            
             <div class="cardLike"  id=like/${category}/${el.idx} value="likeOff/${category}/${el.idx}"><i class="far fa-bookmark" id=like/${category}/${el.idx}/i></i></div>
            <div class="cardLikeOff" style="display:none" id=likeOff/${category}/${el.idx}><i class="fas fa-bookmark" id=likeOff/${category}/${el.idx}/i></i></div>
            </div>
                  </div>
              </div>`;
          });
          let template = "<div>";
          fetchdata.forEach((el) => (template = template + el));
          template = template + '</div>'
          return template;
        });
    }
  }

  async getDetailHtml(category, idx){
   return ""
  }
}




//like btn 수정 전
{/* <div class="cardLike" style="display:none" id=like/${category}/${el.idx} value="likeOff/${category}/${el.idx}"><i class="far fa-bookmark cardLike" ></i></div>
                <div  class="cardLikeOff"  id=likeOff/${category}/${el.idx}><i class="fas fa-bookmark"></i></div>
                </div> */}