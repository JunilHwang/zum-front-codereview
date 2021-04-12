import Component from '../../../core/Component';
import API from '../../../api/API';
import style from './style.scss';
import Loading from '../../../lib/loading';
export default class SubPersonal extends Component {
  constructor(target, url, keyword) {
    super(target, url, keyword);
  }
  setup() {
    this.$count = 0;
    this.$options = {
      root: null,
      rootMargins: '0px',
      threshold: 0.5,
    };
  }

  template(res, keyword) {
    const data = [];
    for (let i = 0; i < 12; i++) {
      data.push(res[Math.floor(Math.random() * 40)]);
    }
    return `
    <div class="category_contents">
      <ul class="category_list">
      ${data
        .map(
          (item, index) =>
            `
          <li class="category_li">
          <div class="category_item">
            <a href=${item.url} target="_self">
              <span class="category_thumb"><img src=${
                item.imageUrl
              } alt="세부이미지"></span>
              <strong class="category_title">${item.title}</strong>
              <span class="category_text">${item.summaryContent.slice(
                0,
                30
              )}</span>
            </a>
            <span class="category_author">by ${item.mediaName}</span>
          </div>
        </li>
          `
        )
        .join('')}
        
      </ul>
    </div>
  `;
  }
  getObserver() {}
  render() {
    const loading = new Loading();
    const api = new API();
    const timer = setTimeout(loading.fail, 5000);
    const mainElement = document.querySelector('.main_container');
    const subElement = document.createElement('div');
    subElement.classList.add('sub_container');
    loading.open();
    api.getResult(this.$url).then((res) => {
      if (timer) {
        loading.close();
        mainElement.innerHTML = this.template(res, this.$keyword);
        const Element = document.querySelector('.category_contents');
        clearTimeout(timer);
        this.$observer = new IntersectionObserver((entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.$observer.unobserve(Element);
              const div = document.createElement('div');

              div.innerHTML = this.template(res, this.$keyword);
              const $li = Element.appendChild(div);
              this.$observer.observe($li);
            }
          });
        }, this.$options);
        this.$observer.observe(Element);
      }
    });
  }
}
