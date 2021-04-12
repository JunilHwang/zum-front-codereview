import Component from '../../core/Component';
import Store from '../../store';
import spinner from './spinner.scss';
import SubComponent from '../common/SubComponent/SubComponent';
import API from '../../api/API';
import routers from '../../lib/routers';
import Loading from '../../lib/loading';
export default class Home extends Component {
  constructor(target) {
    super(target);
    this.$state = {
      loading: 'none',
    };
  }
  setup() {
    this.$rankUrl = 'http://localhost:3000/api/best';
    this.$loadingElement = document.querySelector('.loading_container');
  }
  template(res) {
    for (let i = 0; i < res.length; i++) {
      const str = res[i].url.replace('https://hub.zum.com/', '');
      res[i].url = `http://localhost:8080/${str}`;
    }

    return `
        <h1 class="ranking_comment">실시간 TOP 12</h1>
        <ul class="ranking_content">
        ${res
          .map(
            (item, index) => `
       <li class="ranking_item" route="/${item.url.replace(
         'http://localhost:8080/',
         ''
       )}">
       <a href="${item.url}"class="ranking_link" id="rank_${index}" >
       <div class="ranking_index">${index + 1}</div>
        <div class="item_content">
          <div class="item_title">${item.title}</div>
          <div class="item_media">by ${item.mediaName}</div>
        </div>
        </a>
       </li>
        `
          )
          .join('')}
       </ul>
  
    `;
  }
  setState(newState) {
    this.$state = { ...this.$state, ...newState };
  }
  render() {
    const loading = new Loading();
    const timer = setTimeout(loading.fail, 5000);
    const api = new API();
    loading.open();
    api.getResult(this.$rankUrl).then((res) => {
      if (timer) {
        loading.close();
        this.$target.innerHTML = this.template(res);
        this.$subComponent = new SubComponent(
          document.querySelector('.sub_container')
        );
        clearTimeout(timer);
      }
      this.setEvent();
    });
  }
  clickListener(e) {
    e.preventDefault();
    const data = e.target.closest('li');
    console.log(this.$target);
    if (data) {
      const route = new routers(this.$target, 1);
      const pathName = data.getAttribute('route');
      route.historyRouterPush(pathName, this.$target);
    }
  }
  setEvent() {
    const liElement = document.querySelector('.ranking_content');
    if (liElement !== null) {
      liElement.addEventListener('click', this.clickListener.bind(this));
    }
  }
}
