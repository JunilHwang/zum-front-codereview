/** @jsx jsx */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import jsx from '@/core/jsx';
import Component from '@/core/component';
import './style.css';
import Button from '@/components/common/button';
import postStore from '@/store/post-store';
import Dropdown from '@/components/common/dropdown';
import { useHistory } from '@/core/routerHooks';
import { IRouterState } from '@/core/types';

const postNumbers = [30, 50, 100];
const descendings = [1, 0];
const getPostNumber = (postNumber: number) => {
  return `${postNumber}개`;
};
const getDescending = (descending: 1 | 0) => {
  const obj = { 1: '내림차순', 0: '오름차순' };
  return obj[descending];
};

interface IProps {
  postNumber: number;
  isDescending: number;
}

class PostListHeader extends Component {
  props: IProps;
  history: IRouterState;

  constructor(target: HTMLElement, props: IProps) {
    super(target, props);
    this.props = props;
    this.history = useHistory();
  }

  public markup(): string {
    return (
      <div class="post-list-header flex">
        <div class="dropdown-post-number-container" component></div>
        <div class="dropdown-descending-container" component></div>
        <div class="init-container" component />
        <div class="refresh-container" component />
        <div class="create-container" component />
      </div>
    );
  }

  public appendComponent(target: HTMLElement): void {
    const $button = target.querySelector('.create-container') as HTMLElement;
    const $initButton = target.querySelector('.init-container') as HTMLElement;
    const $refreshbutton = target.querySelector('.refresh-container') as HTMLElement;
    const $dropdownPostNumber = target.querySelector('.dropdown-post-number-container') as HTMLElement;
    const $dropdownDescending = target.querySelector('.dropdown-descending-container') as HTMLElement;
    new Button($button, { text: '글쓰기', href: '/write' });
    new Button($initButton, { text: '초기화', class: 'white js-init' });
    new Button($refreshbutton, { text: '새로고침', class: 'white js-refresh' });
    new Dropdown($dropdownPostNumber, {
      dropdowns: postNumbers,
      changeText: getPostNumber,
      selectedDropdown: this.props.postNumber,
      eventHandler: (postNumber: number) => postStore.setPostNumber(postNumber),
    });
    new Dropdown($dropdownDescending, {
      dropdowns: descendings,
      changeText: getDescending,
      selectedDropdown: this.props.isDescending,
      eventHandler: (descending: number) => postStore.setDescending(descending),
    });
  }

  public setDelegation(): void {
    this.addDelegation('click', '.js-init', () => postStore.setOptionInit());
    this.addDelegation('click', '.js-refresh', () => this.getData());
  }

  public async getData() {
    try {
      const { pathname, query } = this.history;
      const { searchType, searchContent } = query;
      const pageId = query.pageId || 1;
      if (pathname === '/search' && searchType && searchContent) {
        await postStore.getSearchPostList(searchType, searchContent, pageId, true);
      } else {
        await postStore.getPostList(pageId, true);
      }
    } catch (err) {
      console.error(err);
    }
  }
}

export default PostListHeader;
