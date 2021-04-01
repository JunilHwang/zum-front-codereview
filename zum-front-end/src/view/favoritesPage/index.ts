import zumStore from "../../store/index";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/card";
import "./index.css";

export default {
  el: "#app",
  components: [Header, Footer, Card],
  data() {
    return {
      list: [],
      limit: 1,
      offset: 12,
    };
  },
  beforeCreate() {
    document.title = "ZUM허브 - 즐겨찾기";

    (<any>this).setState({
      list: zumStore.state.bookmark.slice(0, (<any>this).state.offset),
    });

    // infinity scroll
    let lastKnownScrollPosition = 0;
    document.onscroll = (e) => {
      lastKnownScrollPosition = window.scrollY;
      window.requestAnimationFrame(() => {
        if (
          lastKnownScrollPosition >=
          document.documentElement.scrollHeight -
          document.documentElement.clientHeight -
          5 &&
          (<any>this).state.list.length < zumStore.state.bookmark.length
        ) {
          // data add
          (<any>this).setState({
            list:
              zumStore.state.bookmark.slice(0, (<any>this).state.offset * (<any>this).state.offset),
          });

          // limit count add
          (<any>this).setState({
            limit: (<any>this).state.limit + 1,
          });

          // max card 40
          if (
            (<any>this).state.list.length + (<any>this).state.offset >
            40
          ) {
            (<any>this).setState({
              offset:
                (<any>this).state.list.length +
                (<any>this).state.offset -
                40,
            });
          }
        }
      });
    }
  },
  render() {
    return /*html*/ `
    <div id="header"></div>
      <!-- Page Title Start -->
      <div class="title">
        <p>즐겨찾기</p>
      </div>
      <!-- Page Title End -->

      <!-- 3 col Pic Gallery Start -->
      <div class="container contents">
        <div id="card"></div>
      </div>
      <!-- 3 col Pic Gallery End -->
    <div id="footer"></div>
    `;
  },
};
