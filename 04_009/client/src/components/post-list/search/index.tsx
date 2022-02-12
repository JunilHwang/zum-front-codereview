/** @jsx jsx */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import jsx from '@/core/jsx';
import Component from '@/core/component';
import './style.css';
import Input from '@/components/common/input';
import Button from '@/components/common/button';
import { TSearchType } from '@/types/IPost';
import { useHistory } from '@/core/routerHooks';
import { IRouterState } from '@/core/types';
import Dropdown from '@/components/common/dropdown';

const searchTypes: TSearchType[] = ['title', 'content', 'user'];
const getSearchType = (searchType: TSearchType) => {
  const obj = { title: '제목', content: '내용', user: '닉네임' };
  return obj[searchType];
};

interface IState {
  searchContent: string;
  searchType: TSearchType;
}

class Search extends Component {
  state: IState;
  history: IRouterState;

  constructor(target: HTMLElement) {
    super(target);
    this.state = { searchContent: '', searchType: 'title' };
    this.onSearchHandler = this.onSearchHandler.bind(this);
    this.history = useHistory();
  }

  public markup(): string {
    return (
      <form class="form-search">
        <div class="input-container" component></div>
        <div class="dropdown-container" component />
        <div class="btn-container" component></div>
      </form>
    );
  }

  public appendComponent(target: HTMLElement): void {
    const $input = target.querySelector('.input-container') as HTMLElement;
    const $button = target.querySelector('.btn-container') as HTMLElement;
    const $dropdown = target.querySelector('.dropdown-container') as HTMLElement;
    new Input($input, { type: 'text', value: this.state.searchContent, placeholder: '검색할 내용을 입력하세요' });
    new Button($button, { type: 'submit', text: '검색' });
    new Dropdown($dropdown, {
      dropdowns: searchTypes,
      changeText: getSearchType,
      selectedDropdown: this.state.searchType,
      eventHandler: (searchType: TSearchType) => this.setState({ searchType }),
    });
  }

  public setDelegation(): void {
    this.addDelegation('input', '.input-container', (e: Event) => {
      this.setState({ searchContent: (e.target as HTMLInputElement).value });
    });
    this.addDelegation('submit', '.form-search', this.onSearchHandler);
  }

  private onSearchHandler(e: Event) {
    e.preventDefault();
    const { searchType, searchContent } = this.state;
    this.history.push(`/search?searchType=${searchType}&searchContent=${searchContent}`);
  }
}

export default Search;
