import zumStore from "../../store/index";
import zumAjax from "../../lib/zum-ajax";
import { zumLink } from "../../lib/zum-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./index.css";

export default {
    el: "#app",
    components: [Header, Footer],
    data() {
        return {
            idx: null,
            category: null,
            url: null,
            detail: null,
            content: 'Loading...',
            update: false
        }
    },
    beforeCreate() {
        (<any>this).setState({ category: (<any>this).component.methods.getParameterByName('category') });
        (<any>this).setState({ idx: (<any>this).component.methods.getParameterByName('idx') });
        (<any>this).setState({ url: (<any>this).component.methods.getParameterByName('url') });

        // Value check
        if (!(<any>this).state.url || !(<any>this).state.idx) {
            alert("게시물을 찾을수 없습니다.");
            zumLink('#/');
        }

        // if category exist
        if ((<any>this).state.category !== 'undefined' && (<any>this).state.category !== null && (<any>this).state.category !== undefined) {
            zumAjax.get(`http://localhost:3000/api/content/${(<any>this).state.category}/${(<any>this).state.idx}`, {
                success: (res) => {
                    (<any>this).setState({ detail: JSON.parse(res.target.response) });
                    document.title = `ZUM 허브 - ${(<any>this).state.detail.title}`;
                },
                error: (err) => {
                    console.error(err);
                },
            });
        } else {
            //else category not exist
            for (const item of ['life', 'food', 'travel', 'culture']) {
                zumAjax.get(`http://localhost:3000/api/content/${item}/${(<any>this).state.idx}`, {
                    success: (res) => {
                        if (res.target.response !== '') {
                            (<any>this).setState({ detail: JSON.parse(res.target.response) });
                            (<any>this).setState({ category: item });
                            document.title = `ZUM 허브 - ${(<any>this).state.detail.title}`;
                        }
                    },
                    error: (err) => {
                        console.error(err);
                    },
                });
            }
        }

        // get article 
        zumAjax.get(`http://localhost:3000/api/detail/${encodeURIComponent((<any>this).state.url)}`, {
            success: (res) => {
                if (res.target.response !== '') {
                    (<any>this).setState({ content: res.target.response });
                }
            },
            error: (err) => {
                console.error(err);
                alert("요청된 시간이 초과되었습니다.");
                zumLink('#/');
            },
        });
    },
    methods: {
        // Move to List page
        goList() {
            switch ((<any>this).state.category) {
                case 'life':
                    zumLink('#/LifePage');
                    break;
                case 'food':
                    zumLink('#/FoodPage');
                    break;
                case 'travel':
                    zumLink('#/TravelPage');
                    break;
                case 'culture':
                    zumLink('#/CulturePage');
                    break;
            }
        },
        // Add bookmark in the store
        bookmark() {
            zumStore.commit.bookmarker((<any>this).state.detail);
            (<any>this).setState({ update: !(<any>this).state.update });
        },
        // Get url to params by js
        getParameterByName(params) {
            params = params.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            const results = new RegExp(`[\\?&]${params}=([^&#]*)`).exec(location.hash);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        }
    },
    render() {
        return /*html*/ `
    <div id="header"></div>
      <!-- Page Title Start -->
      <div class="title">
        <p>${(<any>this).state.detail ? (<any>this).state.detail.title : null}</p>
      </div>
      <!-- Page Title End -->

      <!-- 3 col Pic Gallery Start -->
      <div class="container contents">
        ${(<any>this).state.content}

        <!-- BTN Actions Start -->
        <div class="bottom-action">
            by ${(<any>this).state.detail ? (<any>this).state.detail.mediaName : null}
            <button @click="goList()">목록</button>
            <button class="${zumStore.state.bookmark.find(_ => _.idx === Number((<any>this).state.idx)) ? 'bottom-active' : ''}" @click="bookmark()">즐겨찾기☆</button>
        </div>
        <!-- BTN Actions End -->
      </div>
      <!-- 3 col Pic Gallery End -->
    <div id="footer"></div>
    `;
    },
};
