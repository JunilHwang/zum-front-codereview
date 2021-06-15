import Component from "../components/Component";
import PostBrowse from "../components/PostBrowse";
import {setLinkEvent} from "../common/Router";
import {fetchPosts} from "../common/Api";
import {Post} from "../common/interface";
import {TYPE} from "./Write";

export default class Browse extends Component {
    init() {
        this.state = {
            isLoading: true,
            isError: false,
            post: {},
        }
        this.loadData();
    }

    loadData(): void {
        const {index}: { index: number } = window.history.state;
        fetchPosts(index).then((post: Post) => {
            this.setState({
                post,
                isLoading: false,
            });
            this.setEvent();
        }).catch(() => {
            this.setState({
                isLoading: false,
                isError: true,
            })
        });
    }

    template() {
        if (this.state.isError) {
            return `Error...`
        } else if (this.state.isLoading) {
            return `Loading...`
        } else {
            return `
                <h1>게시글 조회</h1>
                <div id="form"></div>
                <div class="link-container">
                    <button id="buttonWrite" class="link" route="/write">수정</button>
                    <button id="buttonDelete" class="link" route="/">삭제</button>
                    <button id="buttonList" class="link" route="/">목록</button>
                </div>`
        }
    }

    mount() {
        if (this.state.isLoading) return;
        const form: HTMLElement = this.target.querySelector('#form');
        const {post} = this.state;
        new PostBrowse(form, {post});
    }

    setEvent() {
        const buttonWrite: HTMLElement = this.target.querySelector('#buttonWrite');
        setLinkEvent(buttonWrite, {
            type: TYPE.EDIT,
            index: this.state.post.index
        });

        const buttonDelete: HTMLElement = this.target.querySelector('#buttonDelete');
        setLinkEvent(buttonDelete);

        const buttonList: HTMLElement = this.target.querySelector('#buttonList');
        setLinkEvent(buttonList);
    }
}