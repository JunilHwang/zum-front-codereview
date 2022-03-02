/** @jsx jsx */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import jsx from '@/core/jsx';
import Component from '@/core/component';
import { IPost, TSearchType } from '@/types/IPost';
import postStore from '../../store/post-store';
import './style.css';
import { useHistory } from '@/core/routerHooks';
import { IRouterState } from '@/core/types';
import { parseTime } from '@/utils/parser';
import Search from './search';
import PostListHeader from './post-list-header';
import Pagination from '../common/pagination';

interface IState {
  postList?: IPost[];
  postNumber: number;
  isDescending: number;
  pageCount: 1;
}

class PostList extends Component {
  state: IState;
  history: IRouterState;

  constructor(target: HTMLElement) {
    super(target);
    this.state = { postList: undefined, postNumber: 30, isDescending: 1, pageCount: 1 };
    this.history = useHistory();
  }

  public markup(): string {
    const { postList } = this.state;
    return (
      <div class="post-list-wrapper">
        <div class="post-list-header-container" component />
        <div class="content-search" component />
        {postList && postList.length ? (
          <frag>
            <ul class="post-list">
              <li class="post-title" key="0">
                <div class="title">제목</div>
                <div class="user">닉네임</div>
                <div class="date">작성일</div>
              </li>

              {postList.map(({ title, user, date, id }) => (
                <li key={id} class="post-item">
                  <a class="title" href={`/${id}`}>
                    {title}
                  </a>
                  <a class="user" href={`/search?searchType=user&searchContent=${user}`}>
                    {user}
                  </a>
                  <div class="date">{parseTime(date)}</div>
                </li>
              ))}
            </ul>
            <div class="pagination-container" component />
          </frag>
        ) : (
          // TODO: 스타일
          <div>글 목록이 존재하지 않습니다</div>
        )}
      </div>
    );
  }

  public appendComponent(target: HTMLElement): void {
    const { postNumber, isDescending, pageCount } = this.state;
    const $header = target.querySelector('.post-list-header-container') as HTMLElement;
    const $search = target.querySelector('.content-search') as HTMLElement;
    const $pagination = target.querySelector('.pagination-container') as HTMLElement;
    new PostListHeader($header, { postNumber, isDescending });
    new Search($search);
    new Pagination($pagination, { pageCount, showCount: 5 });
  }

  public async componentDidMount() {
    try {
      const { pathname, query } = this.history;
      const { searchType, searchContent } = query;
      const pageId = query.pageId || 1;
      if (pathname === '/search' && searchType && searchContent) {
        this.getSearchPostList(searchType, searchContent, pageId);
      } else {
        this.getPostList(pageId);
      }
    } catch (err) {
      console.error(err);
    }
  }

  private async getSearchPostList(searchType: TSearchType, searchContent: string, pageId: number) {
    await postStore.getSearchPostList(searchType, searchContent, pageId);
    postStore.subscribe(() => {
      const { postList, pageCount } = postStore.getCashSearchPostList(searchType, searchContent, pageId);
      this.setState({ postList, pageCount });
    });
  }

  private async getPostList(pageId: number) {
    await postStore.getPostList(pageId);
    postStore.subscribe(() => {
      const { postList, pageCount } = postStore.getCashPostList(pageId);
      this.setState({
        postList,
        pageCount,
        isDescending: postStore.state.isDescending,
        postNumber: postStore.state.postNumber,
      });
    });
  }

  public async componentDidUpdate(state: IState, nextState: IState) {
    const { pathname, query } = this.history;
    const { searchType, searchContent } = query;
    const pageId = query.pageId || 1;
    if (state.isDescending !== nextState.isDescending || state.postNumber !== nextState.postNumber) {
      if (pathname === '/search' && searchType && searchContent) {
        await postStore.getSearchPostList(searchType, searchContent, pageId);
      } else {
        await postStore.getPostList(pageId);
      }
    }
  }
}

export default PostList;
