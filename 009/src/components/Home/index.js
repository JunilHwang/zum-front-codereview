import { Component } from '@/core/Component'
import { api } from '@/core/Api'

import './index.scss';

class Home extends Component {
  template() {
    return `<div class="Home" id="Home">
              <div class="Home__wrap">
                <div class="Home__title">라이프</div>
                <div id="Life"></div>
              </div>
              <div class="Home__wrap">
                <div class="Home__title">푸드</div>
                <div id="Food"></div>
              </div>
              <div class="Home__wrap">
                <div class="Home__title">여행</div>
                <div id="Travel"></div>
              </div>
              <div class="Home__wrap">
                <div class="Home__title">컬쳐</div>
                <div id="Culture"></div>
              </div>
              <div class="Home__ranking">
                <div class="Home__ranking --title">실시간 TOP 12</div>
                <div class="Home__ranking__list" id="Rank"></div>
              </div>
            </div>`
  }

  async init() {
    const best = await this.getBest()
    const life = await this.getCategory('life')
    const food = await this.getCategory('food')
    const travel = await this.getCategory('travel')
    const culture = await this.getCategory('culture')

    this.setState({ best, life, food, travel, culture })
  }
  mounted() { }

  async getBest() {
    const { data } = await api.call('/api/best')
    return data
  }
  async getCategory(type) {
    const { data } = await api.call(`/api/content/${type}?limit=4`)
    return data
  }

  watch({ best, life, food, travel, culture }) {
    this.renderBest(best)
    this.renderCard(life, 'Life')
    this.renderCard(food, 'Food')
    this.renderCard(travel, 'Travel')
    this.renderCard(culture, 'Culture')
    this.setEvent()
  }

  renderBest(best) {
    let dom = '';

    best.forEach((item, index) => {
      dom += `<div class="Home__ranking__list --box">
                <div class="Home__ranking__list --info" data-url=${item.url}>
                  <div class="Home__ranking__list --rank">${index + 1}</div>
                  <span class="Home__ranking__list --title">${item.title}</span>
                  <span class="Home__ranking__list --author">by${item.mediaName}</span>
                </div>
              </div>`
    })

    document.getElementById('Rank').innerHTML = dom
  }
  renderCard(state, target) {
    let dom = '';

    state.forEach(item => {
      dom += `<div class="Home__card">
                <div class="Home__card__item" data-url=${item.url}>
                  <img src=${item.imageUrl} width="248" height="160" />
                  <div class="Home__card__item --title">${item.title}</div>
                  <div class="Home__card__item --contents">${item.summaryContent}</div>
                  <div class="Home__card__media">by ${item.mediaName}</div>
                </div>
              </div>`
    })

    document.getElementById(target).innerHTML = dom
  }

  setEvent() {
    const cardEl = document.querySelector('#Home')
    const bestEl = document.querySelector('#Rank')

    cardEl.addEventListener('click', event => {
      const url = event?.target?.parentElement.getAttribute('data-url')
      url && (window.location.href = url)
    })

    bestEl.addEventListener('click', event => {
      const url = event?.target?.parentElement.getAttribute('data-url')
      url && (window.location.href = url)
    })
  }
}

export default Home