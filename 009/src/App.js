import { Component } from '@/core/Component'
import { Router } from '@/router'

import Header from '@/components/Header/Header'
import List from '@/components/List/List'
import Home from '@/components/Home'

import '@/styles/index.scss'

const ROUTES = [
  { path: '/', target: 'Child', view: Home },
  { path: '/ranking', target: 'Child', view: List },
  { path: '/life', target: 'Child', view: List },
  { path: '/food', target: 'Child', view: List },
  { path: '/travel', target: 'Child', view: List },
  { path: '/culture', target: 'Child', view: List }
]

class App extends Component {

  template() {
    return `<div>
              <div data-loading></div>
              <div data-component="Header"></div>
              <div data-router class="router">
                <div data-component="Child"></div>
              </div>
            </div>`
  }
  mounted() {
    new Header('Header')
    new Router(ROUTES)
  }

}

new App('app')
