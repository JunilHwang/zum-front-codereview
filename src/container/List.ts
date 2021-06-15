import Component from "../components/Component";
import PostList from "../components/PostList";
import {setLinkEvent} from "../common/Router";
import {fetchPosts} from "../common/Api";
import {Post} from "../common/interface";
import {TYPE} from "./Write";

export default class List extends Component {
    init() {
        this.state = {
            isLoading: true,
            isError: false,
            posts: [],
        }
        this.loadData();
    }

    loadData() {
        fetchPosts().then((posts: Array<Post>) => {
            this.setState({
                posts,
                isLoading: false
            });
            this.setEvent();
        }).catch(() => {
            this.setState({
                isLoading: false,
                isError: true,
            });
        });
    }

    template() {
        if (this.state.isError) {
            return `Error...`
        } else if (this.state.isLoading) {
            return `Loading...`
        } else {
            return `
                <h1>게시글 목록</h1>
                <div id="list"></div>
                <div class="link-container">
                    <button id="buttonWrite" class="link button_write" route="/write">게시글 작성</button>
                </div>`
        }
    }

    mount() {
        if (this.state.isLoading) return;
        this.drawList();
    }

    drawList() {
        const list: HTMLElement = this.target.querySelector('#list');
        const {posts} = this.state;
        new PostList(list, {posts});
    }

    setEvent() {
        const buttonWrite: HTMLElement = this.target.querySelector('#buttonWrite');
        if (!!buttonWrite) setLinkEvent(buttonWrite, {type: TYPE.WRITE});
    }
}