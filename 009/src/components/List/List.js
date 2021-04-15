import { Component } from '@/core/Component'
import { api } from '@/core/Api'
import RouteStore from '@/store/route'

import './List.scss'

class List extends Component {
  $category
  template() {
    return `<div class="List">
              <div class="List__wrap" id="List"></div>
            </div>`
  }
  async init() {
    this.$category = RouteStore.$route()
    await this.getCategory()
  }
  async getCategory() {
    const { data } = await api.call(`/api/content${this.$category}`)
    this.setState({ data })
  }
  mounted() { }
  watch() {
    this.renderCard()
  }

  renderCard() {
    const { data } = this.$observeState()
    let dom = ''

    data.forEach(item => {
      dom += `<div class="Home__card">
                <div class="Home__card__item" data-url=${item.url}>
                  <img src=${item.imageUrl} width="248" height="160" />
                  <div class="Home__card__item --title">${item.title}</div>
                  <div class="Home__card__item --contents">${item.summaryContent}</div>
                  <div class="Home__card__media">by ${item.mediaName}</div>
                </div>
              </div>`
    })

    document.querySelector('.List__wrap').innerHTML = dom
  }

  setEvent() {
    const cardEl = document.querySelector('#List')

    cardEl.addEventListener('click', event => {
      const url = event?.target?.parentElement.getAttribute('data-url')
      url && (window.location.href = url)
    })
  }

  getCategoryText(path) {
    const categoryMap = {
      '/life': 'life',
      '/food': 'food',
      '/travel': 'travel',
      '/culture': 'culture'
    }
    return categoryMap[path]
  }
}

export default List