import zumAjax from "../../lib/zum-ajax";
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
      category: 'travel',
      limit: 1,
      offset: 12,
    };
  },
  beforeCreate() {
    document.title = "ZUM허브 - 여행";

    zumAjax.get("http://localhost:3000/api/content/travel", {
      success: (res) => {
        (<any>this).setState({ list: JSON.parse(res.target.response) });
      },
      error: (err) => {
        console.error(err);
      },
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
          (<any>this).state.list.length < 40
        ) {
          zumAjax.get(
            `http://localhost:3000/api/content/travel?limit=${(<any>this).state.limit
            }&offset=${(<any>this).state.offset}`,
            {
              success: (res) => {
                // data add
                (<any>this).setState({
                  list: [
                    ...(<any>this).state.list,
                    ...JSON.parse(res.target.response),
                  ],
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
              },
              error: (err) => {
                console.error(err);
              },
            }
          );
        }
      });
    }
  },
  render() {
    return /*html*/ `
    <div id="header"></div>
      <!-- Page Title Start -->
      <div class="title">
        <p>여행</p>
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
