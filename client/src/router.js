
const Links=[
    `<MainPage data-component="MainPage"></MainPage>`,
    `<SubPage data-component="SubPage"></SubPage>`,
    `<FavoritePage data-component="FavoritePage"></FavoritePage>`,
    `<DetailPage data-component="DetailPage"></DetailPage>`
]

const routes = {
  '/': Links[0],
  '/Home': Links[0],
  '/Life': Links[1],
  '/Food': Links[1],
  '/Trip': Links[1],
  '/Culture': Links[1],
  '/Favorite': Links[2],
  '/0000': Links[3],
}

// entry point
function initialRoutes (el) {
  renderHTML(el, routes['/']);

  window.addEventListener('hashchange', () => {
    return renderHTML(el, getHashRoute());
  })
  
}

// get hash history route
function getHashRoute () {
  let route = '/';

  Object.keys(routes).map(hashRoute => {
    if (window.location.hash.replace('#', '') === hashRoute.replace('/', '')) {
      route = routes[hashRoute];
    }
  })
  if(route==='/'){
    route=routes['/0000'];
  }
  return route;
}

// render
function renderHTML (el, route) {
  el.innerHTML = route;
}

export {
  initialRoutes
}