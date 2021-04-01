/*
 * Title: Rank component
 * Description: Main page top rank 12 widget component
 * Author : Seokhyeon Jang (coolman555@me.com)
 */

import zumAjax from "../../lib/zum-ajax";
import "./topRank.css";

export default {
  el: "#topRank",
  data() {
    return {
      list: [],
    };
  },
  beforeCreate() {
    zumAjax.get("http://localhost:3000/api/best", {
      success: (res) => {
        (<any>this).setState({ list: JSON.parse(res.target.response) });
      },
      error: (err) => {
        console.error(err);
      },
    });
  },
  render() {
    return /*html*/ `
    ${(<any>this).state.list
        .map((item, rank) => {
          return /*html*/ `
        <div class="col-3">
          <a class="rank-link" href="#/DetailPage?url=${item.url}&idx=${item.idx}">
            <div class="rank">
              <div class="rank-rank rank-${rank + 1}">${rank + 1}</div>
              <div class="rank-contents">
                <div class="rank-contents--title">${item.title}</div>
                <div class="rank-contents--reporter">by ${item.mediaName}</div>
              </div>
            </div>
          </a>
        </div>
        `;
        })
        .join("")}
    `;
  },
};
