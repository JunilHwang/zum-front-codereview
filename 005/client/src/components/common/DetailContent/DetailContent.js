import Component from '../../../core/Component';
import API from '../../../api/API';
import Loading from '../../../lib/loading';

export default class DetailContent extends Component {
  constructor(target, url, keyword, step) {
    super(target, url, keyword, step);
  }
  setup() {
    this.$obj = {
      '#라이프': 'life',
      '#푸드': 'food',
      '#여행': 'travel',
      '#컬쳐': 'culture',
    };
    this.$apiUrl = this.$url.replace(/\/[a-zA-Z]\//g, '');

    if (this.$step === 1) {
      this.$newUrl = `http://localhost:3000/api/content/rank${this.$apiUrl}`;
    } else if (this.$step === 2) {
      this.$apiUrl = this.$url
        .replace(/\/[a-zA-Z]\//g, '')
        .match(/[0-9]/g)
        .join('');
      this.$newUrl = `http://localhost:3000/api/content/${
        this.$obj[this.$keyword]
      }/${this.$apiUrl}`;
    }
  }
  template(res) {
    return `
    <div class="detail_container">
    
        <div>${res.title}</div>
        <div>${res.media}</div>

      <div>${res.body}</div>
      <div>${res.date}</div>
      <div>${res.link}</div>
    </div>
    `;
  }
  render() {
    const loading = new Loading();
    const api = new API();
    const timer = setTimeout(loading.fail, 5000);
    loading.open();
    api.getResult(this.$newUrl).then((res) => {
      if (timer) {
        loading.close();
        const target = document.querySelector('.main_container');
        target.innerHTML = this.template(res);
        clearTimeout(timer);
      }
    });
  }
}
