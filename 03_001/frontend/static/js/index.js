import Home from "./views/Home.js";
import Life from "./views/Life.js";
import Travel from "./views/Travel.js";
import Food from "./views/Food.js";
import Culture from "./views/Culture.js";
import Like from "./views/Like.js";
import DetailPage from "./views/DetailPage.js";





const navigateTo = (url) => {
history.pushState(null, null, url);
  router();
};


const router = async () => {
  const routes = [
    { path: "/", view: Home },
    { path: "/life", view: Life },
    { path: "/life/:id", view: DetailPage },
    { path: "/food", view: Food },
    { path: "/travel", view: Travel },
    { path: "/culture", view: Culture },
    { path: "/likes", view: Like },
  ];

  const matchRoute = routes.map((route) => {
      let arr = location.pathname.split('/')
      if(arr.length === 2){
        return {
            route: route,
            isMatch: location.pathname === route.path,
          };
      }else{
          return{
              route : route,
              isMatch : route.path==="/life/:id"
          }
      }
      
   
  });


  let match = matchRoute.find((el) => el.isMatch === true);

  if (!match) {
    match = {
      route: routes[0],
      isMatch: true,
    };
  }
  const view = new match.route.view();

    if(match.route.path !== '/life/:id'){      
        document.querySelector("#app").innerHTML = await view.getTemplate();
        let cardLikeBtn = document.querySelectorAll(".cardLike");
        let cardLikeOffBtn = document.querySelectorAll(".cardLikeOff");
        let LocalStorageLike = JSON.parse(localStorage.getItem("like"));
      
        for (let likeBtn of cardLikeBtn) {
          likeBtn.addEventListener("click", function (e) {
            let Num = e.target.id.replace("/i", "");
            document.getElementById(`${Num}`).style.display = "none";
            document.getElementById(
              `${Num.replace("like", "likeOff")}`
            ).style.display = "";
      
            if (!localStorage.getItem("like")) {
              localStorage.setItem("like", JSON.stringify([Num]));
            } else if (!LocalStorageLike.includes(Num)) {
              LocalStorageLike.push(Num);
              localStorage.setItem("like", JSON.stringify(LocalStorageLike));
            }
          });
        }
      
       
        for (let likeOffBtn of cardLikeOffBtn) {
          likeOffBtn.addEventListener("click", function (e) {
            let Num = e.target.id.replace("/i", "");
      
            let filtered = LocalStorageLike.filter(
              (el) => el !== Num.replace("likeOff", "like")
            );
            localStorage.setItem("like", JSON.stringify(filtered));
            document.getElementById(`${Num}`).style.display = "none";
            document.getElementById(
              `${Num.replace("likeOff", "like")}`
            ).style.display = "";
            if (match.route.path === "/likes") {
            alert("즐겨찾기가 해제됩니다.");
              window.location.reload();
            }
          });
        }
      
        LocalStorageLike.map((el) => {
          if (document.getElementById(`${el}`)) {
            let likeOff = el.replace("like", "likeOff");
            document.getElementById(`${likeOff}`).style.display = "";
            document.getElementById(`${el}`).style.display = "none";
          }
        });
    }else{
const [empty, category, idx] = location.pathname.split('/')
        document.querySelector("#app").innerHTML = await view.getDetailHtml(category, idx);
        window.scrollTo({top:0, left:0, behavior:'auto'});
    }

  
};


document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href); 

    }else if(e.target.matches("[data]")){
        e.preventDefault();
        let url = `http://localhost:8080/${e.target.id}`
        navigateTo(url)

    }else if(e.target.matches("[datas]")){
        navigateTo(`http://localhost:8080/ranking/${e.target.id}`)

    }
  });

  router();
});
