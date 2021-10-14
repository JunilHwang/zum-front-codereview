const homeTemplate = require('./pages/home.hbs');
const lifeTemplate = require('./pages/life.hbs');
const foodTemplate = require('./pages/food.hbs');
const tourTemplate = require('./pages/tour.hbs');
const cultureTemplate = require('./pages/culture.hbs');
const favoriteTemplate = require('./pages/favorite.hbs');

const bestData = require('./json/best.json');
const lifeData = require('./json/life.json');
const foodData = require('./json/food.json');
const tourData = require('./json/tour.json');
const cultureData = require('./json/culture.json');

const Home = homeTemplate();
const Life = lifeTemplate();
const Food = foodTemplate();
const Tour = tourTemplate();
const Culture = cultureTemplate();
const Favorite = favoriteTemplate();

const routes = {
  '/': Home,
  '/home': Home,
  '/life': Life,
  '/food': Food,
  '/tour': Tour,
  '/culture': Culture,
  '/favorite': Favorite,
};

// state를 기반으로 렌더링
const bestState = bestData.map(
  (el, id) => `
  <a class="best-div" href=${el.url}>
    <div class="best-num">${id + 1}</div>
    <div class="best-content">
	    <p class="best-title">${el.title}</p>
	    <p class="best-media">${el.mediaName}</p>
    </div>
  </a>
  `
);

const lifeTop = lifeData.map((el, id) => {
  if (id < 4)
    return `
  <a class="article-div" href=${el.url}>
    <img src=${el.imageUrl} />
    <p class="article-title">${el.title}</p>
    <p class="article-content">${el.summaryContent}</p>
    <p class="article-media">${el.mediaName}</p>
  </a>
  `;
});

const foodTop = foodData.map((el, id) => {
  if (id < 4)
    return `
  <a class="article-div" href=${el.url}>
    <img src=${el.imageUrl} />
    <p class="article-title">${el.title}</p>
    <p class="article-content">${el.summaryContent}</p>
    <p class="article-media">${el.mediaName}</p>
  </a>
  `;
});

const tourTop = tourData.map((el, id) => {
  if (id < 4)
    return `
  <a class="article-div" href=${el.url}>
    <img src=${el.imageUrl} />
    <p class="article-title">${el.title}</p>
    <p class="article-content">${el.summaryContent}</p>
    <p class="article-media">${el.mediaName}</p>
  </a>
  `;
});

const cultureTop = cultureData.map((el, id) => {
  if (id < 4)
    return `
  <a class="article-div" href=${el.url}>
    <img src=${el.imageUrl} />
    <p class="article-title">${el.title}</p>
    <p class="article-content">${el.summaryContent}</p>
    <p class="article-media">${el.mediaName}</p>
  </a>
  `;
});

const lifeState = lifeData.map((el, id) => {
  const newId = id + 1;

  // id가 4의 배수일 때 뒤에 br 태그를 추가하여 줄바꿈
  if (newId % 4 === 0) {
    return `
  <a class="article-div" href=${el.url}>
    <img class="article-img" src=${el.imageUrl} />
    <p class="article-title">${el.title}</p>
    <p class="article-content">${el.summaryContent}</p>
    <p class="article-media">${el.mediaName}</p>
  </a>
  <br />
  `;
  } else {
    return `
  <a class="article-div" href=${el.url}>
    <img class="article-img" src=${el.imageUrl} />
    <p class="article-title">${el.title}</p>
    <p class="article-content">${el.summaryContent}</p>
    <p class="article-media">${el.mediaName}</p>
  </a>
  `;
  }
});

const foodState = foodData.map((el, id) => {
  const newId = id + 1;

  // id가 4의 배수일 때 뒤에 br 태그를 추가하여 줄바꿈
  if (newId % 4 === 0) {
    return `
  <a class="article-div" href=${el.url}>
    <img class="article-img" src=${el.imageUrl} />
    <p class="article-title">${el.title}</p>
    <p class="article-content">${el.summaryContent}</p>
    <p class="article-media">${el.mediaName}</p>
  </a>
  <br />
  `;
  } else {
    return `
  <a class="article-div" href=${el.url}>
    <img class="article-img" src=${el.imageUrl} />
    <p class="article-title">${el.title}</p>
    <p class="article-content">${el.summaryContent}</p>
    <p class="article-media">${el.mediaName}</p>
  </a>
  `;
  }
});

const tourState = tourData.map((el, id) => {
  const newId = id + 1;

  // id가 4의 배수일 때 뒤에 br 태그를 추가하여 줄바꿈
  if (newId % 4 === 0) {
    return `
  <a class="article-div" href=${el.url}>
    <img class="article-img" src=${el.imageUrl} />
    <p class="article-title">${el.title}</p>
    <p class="article-content">${el.summaryContent}</p>
    <p class="article-media">${el.mediaName}</p>
  </a>
  <br />
  `;
  } else {
    return `
  <a class="article-div" href=${el.url}>
    <img class="article-img" src=${el.imageUrl} />
    <p class="article-title">${el.title}</p>
    <p class="article-content">${el.summaryContent}</p>
    <p class="article-media">${el.mediaName}</p>
  </a>
  `;
  }
});

const cultureState = cultureData.map((el, id) => {
  const newId = id + 1;

  // id가 4의 배수일 때 뒤에 br 태그를 추가하여 줄바꿈
  if (newId % 4 === 0) {
    return `
  <a class="article-div" href=${el.url}>
    <img class="article-img" src=${el.imageUrl} />
    <p class="article-title">${el.title}</p>
    <p class="article-content">${el.summaryContent}</p>
    <p class="article-media">${el.mediaName}</p>
  </a>
  <br />
  `;
  } else {
    return `
  <a class="article-div" href=${el.url}>
    <img class="article-img" src=${el.imageUrl} />
    <p class="article-title">${el.title}</p>
    <p class="article-content">${el.summaryContent}</p>
    <p class="article-media">${el.mediaName}</p>
  </a>
  `;
  }
});

function initialRoutes(mode, el) {
  renderHTML(el, routes['/']);

  if (mode === 'history') {
    window.onpopstate = () => renderHTML(el, routes[window.location.pathname]);
  }
}

function historyRouterPush(pathName, el) {
  window.history.pushState({}, pathName, window.location.origin + pathName);
  renderHTML(el, routes[pathName]);
}

// 무한 스크롤
function infiniteScroll() {
  window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= '960px') {
      createPost();
    }
  });
}

function createPost() {
  const post = document.createElement('div');
  post.innerHTML = ``;
  $app.appendChild(post);
}

function renderHTML(el, route) {
  el.innerHTML = route;

  if (route === routes['/home']) {
    el.innerHTML = lifeTop + foodTop + tourTop + cultureTop + bestState;
  } else if (route === routes['/life']) {
    el.innerHTML = lifeState;
  } else if (route === routes['/food']) {
    el.innerHTML = foodState;
  } else if (route === routes['/tour']) {
    el.innerHTML = tourState;
  } else if (route === routes['/culture']) {
    el.innerHTML = cultureState;
  }
}

module.exports = {
  initialRoutes,
  historyRouterPush,
};
