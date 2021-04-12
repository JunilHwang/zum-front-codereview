import Component from '../../../core/Component';
import style from './style.scss';
import API from '../../../api/API';
import routers from '../../../lib/routers';
import DetailContent from '../DetailContent/DetailContent';
export default class SubComponent extends Component {
  constructor(target) {
    super(target);
  }
  setup() {
    this.$urlList = [
      'http://localhost:3000/api/content/life',
      'http://localhost:3000/api/content/food',
      'http://localhost:3000/api/content/travel',
      'http://localhost:3000/api/content/culture',
    ];
    this.$keyword = ['#라이프', '#푸드', '#여행', '#컬쳐'];
  }
  template(res, keyword, keywordIndex) {
    const separateArray = res.slice(0, 4);
    for (let i = 0; i < separateArray.length; i++) {
      const str = separateArray[i].url.replace('https://hub.zum.com/', '');
      separateArray[i].url = `http://localhost:8080/${str}`;
    }
    return `
      <div class="sub_contents">
        <h4>${keyword[keywordIndex]}</h4>
        <ul class="sub_list">
        ${separateArray
          .map(
            (item, index) =>
              `
            <li route="/${item.url.replace(
              'http://localhost:8080/',
              ''
            )}" keyword=${keyword[keywordIndex]}>
            <div class="sub_item" >
              <a href=${item.url} target="_self" id="sub_${index}" >
                <span class="thumb"><img src=${item.imageUrl}></span>
                <strong class="sub_title">${item.title}</strong>
                <span class="sub_text">${item.summaryContent.slice(
                  0,
                  30
                )}</span>
              </a>
              <span class="author">by ${item.mediaName}</span>
            </div>
          </li>
            `
          )
          .join('')}
          
        </ul>
      </div>
    `;
  }
  render() {
    const api = new API();
    const mainElement = document.querySelector('.main_container');
    const subElement = document.createElement('div');
    subElement.classList.add('sub_container');

    for (let i = 0; i < this.$urlList.length; i++) {
      api
        .getResult(this.$urlList[i])
        .then((res) => {
          if (document.querySelectorAll('.div_class').length < 4) {
            const divElement = document.createElement('div');
            divElement.classList.add('div_class');
            divElement.innerHTML += this.template(res, this.$keyword, i);
            mainElement.append(divElement);
          }
        })
        .then(() => {
          this.setEvent();
        });
    }
  }
  clickListener(e) {
    e.preventDefault();
    const data = e.target.closest('li');
    if (data) {
      const pathName = data.getAttribute('route');
      const ele = new DetailContent(
        this.$target,
        pathName,
        data.getAttribute('keyword'),
        2
      );
    }
  }
  setEvent() {
    const liElement = document.querySelectorAll('.sub_contents');
    for (let i = 0; i < liElement.length; i++) {
      if (liElement[i] !== null) {
        liElement[i].addEventListener('click', this.clickListener.bind(this));
      }
    }
  }
  setState() {}
}
