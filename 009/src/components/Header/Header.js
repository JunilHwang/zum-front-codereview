import { Component } from '@/core/Component';
import RouteStore from '@/store/route';
import LOGO from '@/assets/images/zum-logo.png'

import './Header.scss'
class Header extends Component {
  $store
  $activePath = '/'
  $routeEl = document.querySelector('.Header__nav__wrap')
  $titleEl = document.querySelector('.Header__title')

  template() {
    return `<header class="Header">
              <div class="Header__logo">
                <div class="Header__logo__wrap">
                  <img src=${LOGO} width="68" />
                  <span>zum-과제</span>
                </div>
              </div>
              <nav class="Header__nav">
                <ul class="Header__nav__wrap"></ul>
              </nav>
              <div class="Header__title"></div>
            </header>`
  }
  init() {
    RouteStore.$route.subscribe(path => {
      this.$activePath = path
      this.renderNav()
      this.renderTitle()
    })
  }
  renderNav() {
    let dom = `
              <li class="Header__nav__wrap ${this.$activePath === '/' && '-active'}">
                <a href="/" router-link>HOME</a>
              </li>
              <li class="Header__nav__wrap ${this.$activePath === '/life' && '-active'}">
                <a href="/life" router-link>라이프</a>
              </li>
              <li class="Header__nav__wrap ${this.$activePath === '/food' && '-active'}">
                <a href="/food" router-link>푸드</a>
              </li>
              <li class="Header__nav__wrap ${this.$activePath === '/travel' && '-active'}">
                <a href="/travel" router-link>여행</a>
              </li>
              <li class="Header__nav__wrap ${this.$activePath === '/culture' && '-active'}">
                <a href="/culture" router-link>문화</a>
              </li>
              `
    this.$routeEl.innerHTML = dom
  }
  renderTitle() {
    const titleMap = {
      '/': 'HOME',
      '/life': '라이프',
      '/food': '푸드',
      '/travel': '여행',
      '/culture': '문화'
    }

    this.$titleEl.innerHTML = `<span class="Header__title -text">${titleMap[this.$activePath]}</span>`
  }
}

export default Header