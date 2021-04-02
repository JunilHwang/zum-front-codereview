// // 웹팩빌드시 사용
// import "../stylesheets/style.css";

("use strict");
window.onload = () => {
  const title = document.querySelector(".title");
  const container = document.querySelector(".content");
  const bestLife = document.querySelector(".best__life");
  const bestFood = document.querySelector(".best__food");
  const bestTrip = document.querySelector(".best__trip");
  const bestCulture = document.querySelector(".best__culture");

  // ranking rendering

  const listItems = () => {
    title.innerHTML = `<div class="title__ranking"><span>실시간 TOP12</span></div>`;
    return fetch("/api/best")
      .then((response) => response.json())
      .then((json) => json);
  };

  const displayItems = (items) => {
    const container = document.querySelector(".content__best");
    container.innerHTML = items
      .map((item, index) => createHomeString(item, index))
      .join("");
  };

  const createHomeString = (item, index) => {
    return `  
 
   <a href="${item.url}">
  
    <div class="content__best__title">

        <p class="ranking__number">${index + 1}</p>
        <div>  
            <h2>${item.title}</h2>
            <h3> by ${item.mediaName}</h3>
        </div>
 
    </div>
    </a>
 `;
  };

  listItems()
    .then((item) => displayItems(item))
    .catch((error) => console.log(error));

  const dataApi = (data) => {
    return fetch(`/api/content/${data}`)
      .then((response) => response.json())
      .then((json) => json);
  };

  // 메인페이지 best

  const mainBest = (best, bestName) => {
    return dataApi(`${best}`)
      .then((item) => item.slice(0, 4))
      .then((json) => setState(bestName, json));
  };

  mainBest("life", bestLife);
  mainBest("food", bestFood);
  mainBest("trip", bestTrip);
  mainBest("culture", bestCulture);

  // 서브페이지 랜더링
  const state = (data) => {
    switch (data) {
      case "life":
        title.innerHTML = `<div class="title__life"><span >라이프</span></div>`;
        dataApi(data).then((json) => setState(container, json));
        break;
      case "food":
        title.innerHTML = `<div class="title__food"><span >음식</span></div>`;
        dataApi(data).then((json) => setState(container, json));
        break;
      case "trip":
        title.innerHTML = `<div class="title__trip"><span >여행</span></div>`;
        dataApi(data).then((json) => setState(container, json));
        break;
      case "culture":
        title.innerHTML = `<div class="title__culture"><span >문화</span></div>`;
        dataApi(data).then((json) => setState(container, json));
        break;
      case "favorite":
        title.innerHTML = `<div class="title__favorite"><span >즐겨찾기</span></div>`;
      default:
        break;
    }
  };

  const setState = (name, newState) => {
    name.innerHTML = newState.map((item) => render(item)).join("");
  };

  const render = (item) => {
    return ` 
  <div class="content__section">
    <a href="${item.url}">
      <img
          src="${item.imageUrl}"
          alt=""
      />
      <div class="content__title">
        <h2>${item.title}</h2>
        <p>${item.summaryContent}</p>
        <h3> by ${item.mediaName}</h3>
      </div>
  </a>

</div>
  `;
  };

  // 새로고침 없이 router 처리

  const listBtn = document.querySelector(".navbar__list");

  listBtn.addEventListener("click", (event) => {
    const targetName = event.target.id;
    const pathName = event.target.getAttribute("route");

    if (!targetName) {
      return;
    } else if (targetName === "ranking") {
      listItems()
        .then((item) => displayItems(item))
        .catch(console.log);
      location.href = "/";
    } else {
      historyRouterPush(pathName);
      state(targetName);
    }
  });

  const historyRouterPush = (pathName) => {
    window.history.pushState({}, pathName, window.location.origin + pathName);
  };

  const reloadPage = () => {
    const pathName = window.location.pathname;
    const pathNameItem = document.querySelector(`[route="${pathName}"]`);
    if (pathName.id === "ranking") {
      location.href = "/";
    } else {
      state(pathNameItem.id);
    }
  };

  window.onpopstate = () => {
    reloadPage();
  };

  reloadPage();
};
