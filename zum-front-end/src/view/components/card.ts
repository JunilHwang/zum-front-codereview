/*
 * Title: Card Component
 * Description: Card Component for subpage
 * Author : Seokhyeon Jang (coolman555@me.com)
 */

import zumStore from "../../store/index";
import "./card.css";

export default {
  el: "#card",
  data() {
    return {
      update: false
    }
  },
  methods: {
    // Add bookmark in the store
    bookmark(data) {
      zumStore.commit.bookmarker((<any>this).component.list.find(element => element.idx === data));
      (<any>this).setState({ update: !(<any>this).state.update });
    },
  },
  render() {
    return /*html*/ `
      ${(<any>this).component.list
        .map((item) => {
          return /* html */ `
            <div class="card">
              <a href="#/DetailPage?category=${(<any>this).component.category}&idx=${item.idx}&url=${item.url}">
                <img src="https://thumb.zumst.com/270x200/${item.imageUrl}" width="100%" height="200" alt="${item.title}"/>
                <div class="card-title">${item.title}</div>
                <div class="card-summary">${item.summaryContent}</div>
              </a>
              <div class="card-action">by${item.mediaName} <button class="${zumStore.state.bookmark.find(_ => _.idx === item.idx) ? 'card-active' : ''}" @click="bookmark(${item ? item.idx : null})" >즐겨찾기☆</button></div>
            </div>
          `;
        })
        .join("")}
      `;
  },
};
