// template
const homeTemplate = require('./pages/home.js')
const aboutTemplate = require('./pages/about.js')

const Home = homeTemplate()
const About = aboutTemplate()

const routes = {
  '/': Home,
  '/home': Home,
  '/about': About
}

// entry point
function initialRoutes (mode, el) {
  renderHTML(el, routes['/'])

  if (mode === 'history') {
    window.onpopstate = () => renderHTML(el, routes[window.location.pathname])
  } else {
    window.addEventListener('hashchange', () => {
      return renderHTML(el, getHashRoute())
    })
  }
}

// set browser history
function historyRouterPush (pathName, el) {
  window.history.pushState({}, pathName, window.location.origin + pathName)
  renderHTML(el, routes[pathName])
}

// get hash history route
function getHashRoute () {
  let route = '/'

  Object.keys(routes).forEach(hashRoute => {
    if (window.location.hash.replace('#', '') === hashRoute.replace('/', '')) {
      route = routes[hashRoute]
    }
  })

  return route
}

// set hash history
function hashRouterPush (pathName, el) {
  renderHTML(el, getHashRoute())
}

// render
function renderHTML (el, route) {
  el.innerHTML = route
}

module.exports = {
  initialRoutes,
  historyRouterPush,
  hashRouterPush
}