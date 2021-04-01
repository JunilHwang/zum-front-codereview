/*
 * Title: Header
 * Description: Common web site header
 * Author : Seokhyeon Jang (coolman555@me.com)
 */

import "./Header.css";

export default {
  el: "#header",
  render() {
    return /*html*/ `
    <header>
      <!-- Logo Section Start -->
      <div class="head">
        <div class="container">
          <div class="head-logo">
            <img src="/img/logo_zum.png" width="68" height="24" alt="ZUM">
            <img src="/img/img_hub_zum.png" width="64" height="24" alt="허브줌">
          </div>
        </div>
      </div>
      <!-- Logo Section End -->

      <!-- Menu Section Start -->
      <div class="head">
        <div class="container">
          <nav class="menu">
            <ul style="overflow:none">
              <li class="${window.location.hash === "#/" ? "active" : ""
      }"><a href="#/">홈</a></li>
              <li class="${window.location.hash === "#/LifePage" ? "active" : ""
      }"><a href="#/LifePage">라이프</a></li>
              <li class="${window.location.hash === "#/FoodPage" ? "active" : ""
      }"><a href="#/FoodPage">푸드</a></li>
              <li class="${window.location.hash === "#/TravelPage" ? "active" : ""
      }"><a href="#/TravelPage">여행</a></li>
              <li class="${window.location.hash === "#/CulturePage" ? "active" : ""
      }"><a href="#/CulturePage">컬쳐</a></li>
              <li class="${window.location.hash === "#/FavoritesPage" ? "active" : ""
      }"><a href="#/FavoritesPage">즐겨찾기</a></li>
            </ul>
          </nav>
        </div>
      </div>
      <!-- Menu Section End -->
    </header>
      `;
  },
};
