import zumStore from "../../store/index";
import zumAjax from "../../lib/zum-ajax";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TopRank from "../components/topRank";
import "./index.css";

export default {

  el: "#app",

  components: [Header, Footer, TopRank],

  data() {
    return {
      life: [],
      food: [],
      travel: [],
      culture: [],
      update: false,
    };
  },
  beforeCreate() {
    document.title = "ZUM 허브 - 일상을 읽다";

    zumAjax.get("http://localhost:3000/api/content/food?limit=0&offset=1", {
      success: (res) => {
        (<any>this).setState({ food: JSON.parse(res.target.response) });
      },
      error: (err) => {
        console.error(err);
      },
    });

    zumAjax.get("http://localhost:3000/api/content/life?limit=0&offset=1", {
      success: (res) => {
        (<any>this).setState({ life: JSON.parse(res.target.response) });
      },
      error: (err) => {
        console.error(err);
      },
    });

    zumAjax.get("http://localhost:3000/api/content/travel?limit=0&offset=1", {
      success: (res) => {
        (<any>this).setState({ travel: JSON.parse(res.target.response) });
      },
      error: (err) => {
        console.error(err);
      },
    });

    zumAjax.get("http://localhost:3000/api/content/culture?limit=0&offset=1", {
      success: (res) => {
        (<any>this).setState({ culture: JSON.parse(res.target.response) });
      },
      error: (err) => {
        console.error(err);
      },
    });
  },
  methods: {
    bookmark(data) {
      const { state } =<any>this;
      if (state.life[0].idx === data) {
        zumStore.commit.bookmarker(state.life[0]);
      } else if (state.food[0].idx === data) {
        zumStore.commit.bookmarker(state.food[0]);
      } else if (state.travel[0].idx === data) {
        zumStore.commit.bookmarker(state.travel[0]);
      } else if (state.culture[0].idx === data) {
        zumStore.commit.bookmarker(state.culture[0]);
      }
      (<any>this).setState({ update: !state.update });
    },
  },
  render() {
    const { state } = <any>this;
    return /*html*/ `
    <div id="header"></div>
      <div class="container contents">
        <!-- Top Rank 4 Start -->
        <div class="row">
          <!-- Food Top Rank Start -->
          <div class="col-4">
            <a href="#/DetailPage?category=food&idx=${state.food[0] ? state.food[0].idx : null}&url=${state.food[0] ? state.food[0].url : null}">
              <div class="img">
                <img src="https://thumb.zumst.com/400x200/${state.food[0]
        ? state.food[0].imageUrl
        : null
      }" width="100%" height="200" alt="${state.food[0] ? state.food[0].title : null
      }"/>
                <div class="img-caption">
                  <div class="img-caption--tag"><span>음식</span></div>
                  <div class="img-caption--title">${state.food[0]
        ? state.food[0].title
        : null
      }</div>
                  <div class="img-caption--action">by ${state.food[0]
        ? state.food[0].mediaName
        : null
      } <button class="${zumStore.state.bookmark.find(_ => _.idx === (state.food[0] ? state.food[0].idx : null)) ? 'card-active' : ''}" @click="bookmark(
        ${state.food[0] ? state.food[0].idx : null}
      )" >즐겨찾기☆</button></div>
                </div>
              </div>
            </a>
          </div>
          <!-- Food Top Rank End -->

          <!-- Travel Top Rank Start -->
          <div class="col-8">
            <a href="#/DetailPage?category=travel&idx=${state.travel[0] ? state.travel[0].idx : null}&url=${state.travel[0] ? state.travel[0].url : null}">
              <div class="img">
                <img src="https://thumb.zumst.com/400x200/${state.travel[0] !== undefined
        ? state.travel[0].imageUrl
        : null
      }" width="100%" height="200" alt="${state.travel[0] ? state.travel[0].title : null
      }"/>
                <div class="img-caption">
                  <div class="img-caption--tag"><span>여행</span></div>
                  <div class="img-caption--title">${state.travel[0]
        ? state.travel[0].title
        : null
      }</div>
                  <div class="img-caption--action">by ${state.travel[0]
        ? state.travel[0].mediaName
        : null
      } <button class="${zumStore.state.bookmark.find(_ => _.idx === (state.travel[0] ? state.travel[0].idx : null)) ? 'card-active' : ''}" @click="bookmark(
        ${state.travel[0] ? state.travel[0].idx : null}
      )" >즐겨찾기☆</button></div>
                </div>
              </div>
            </a>
          </div>
          <!-- Travel Top Rank End -->
        </div>
        <div class="row">
          <!-- Life Top Rank Start -->
          <div class="col-8">
            <a href="#/DetailPage?category=life&idx=${state.life[0] ? state.life[0].idx : null}&url=${state.life[0] ? state.life[0].url : null}">
              <div class="img">
                  <img src="https://thumb.zumst.com/800x200/${state.life[0] !== undefined
        ? state.life[0].imageUrl
        : null
      }" width="100%" height="200" alt="${state.life[0] ? state.life[0].title : null
      }"/>
                  <div class="img-caption">
                    <div class="img-caption--tag"><span>라이프</span></div>
                    <div class="img-caption--title">${state.life[0]
        ? state.life[0].title
        : null
      }</div>
                    <div class="img-caption--action">by ${state.life[0]
        ? state.life[0].mediaName
        : null
      } <button class="${zumStore.state.bookmark.find(_ => _.idx === (state.life[0] ? state.life[0].idx : null)) ? 'card-active' : ''}" @click="bookmark(
        ${state.life[0] ? state.life[0].idx : null}
      )" >즐겨찾기☆</button></div>
                  </div>
                </div>
              </a>
          </div>
          <!-- Life Top Rank End -->
          <div class="col-4">
            <a href="#/DetailPage?category=culture&idx=${state.culture[0] ? state.culture[0].idx : null}&url=${state.culture[0] ? state.culture[0].url : null}">
              <div class="img">
              <img src="https://thumb.zumst.com/400x200/${state.culture[0] !== undefined
        ? state.culture[0].imageUrl
        : null
      }" width="100%" height="200" alt="${state.culture[0] ? state.culture[0].title : null
      }"/>
                <div class="img-caption">
                  <div class="img-caption--tag"><span>문화</span></div>
                  <div class="img-caption--title">${state.culture[0]
        ? state.culture[0].title
        : null
      }</div>
                  <div class="img-caption--action">by ${state.culture[0]
        ? state.culture[0].mediaName
        : null
      } <button class="${zumStore.state.bookmark.find(_ => _.idx === (state.culture[0] ? state.culture[0].idx : null)) ? 'card-active' : ''}" @click="bookmark(
      ${state.culture[0] ? state.culture[0].idx : null}
    )" >즐겨찾기☆</button></div>
                </div>
              </div>
            </a>
          </div>
          <!-- Life Top Rank End -->
        </div>
        <!-- Top Rank 4 End -->

        <hr/>

        <!-- RealTime Rank 12 Start -->
        <h4 class="pb-1">실시간 TOP12</h4>
        <div id="topRank" class="row"></div>
        <!-- RealTime Rank 12 End -->
      </div>
    <div id="footer"></div>
    `;
  },
};
