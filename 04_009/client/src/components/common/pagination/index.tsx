/** @jsx jsx */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import jsx from '@/core/jsx';
import Component from '@/core/component';
import './style.css';
import { useHistory } from '@/core/routerHooks';
import { IRouterState } from '@/core/types';

interface IProps {
  pageCount: number;
  showCount: number;
}

const checkCurrentLastPage = (pageId: number, showCount: number) => pageId % showCount === 0;

const renderPage = (startPage: number, pageCount: number, showCount: number, pageId: number) => {
  const items = [];
  for (let page = startPage; page < startPage + showCount && page <= pageCount; page++) {
    items.push(
      <button type="button" key={page} class={`pagination ${pageId === page ? 'active' : ''}`} data-page={page}>
        {page}
      </button>,
    );
  }
  return items;
};

// TODO: 계산 깔끔하게
class Pagination extends Component {
  props: IProps;
  history: IRouterState;

  constructor(target: HTMLElement, props: IProps) {
    super(target, props);
    this.state = { startPage: 1 };
    this.props = props;
    this.history = useHistory();
    this.pushPrevPage = this.pushPrevPage.bind(this);
    this.pushNextPage = this.pushNextPage.bind(this);
    this.pushPagination = this.pushPagination.bind(this);
  }

  public markup(): string {
    const { startPage } = this.state;
    const { pageCount, showCount } = this.props;
    const { pageId = 1 } = this.history.query;
    return (
      <div class="pagination-wrapper">
        {startPage > 1 && (
          <button type="button" key="prev" class="btn-pagination js-prev">
            이전
          </button>
        )}
        {renderPage(startPage, pageCount, showCount, +pageId)}
        {startPage + showCount <= pageCount && (
          <button type="button" key="next" class="btn-pagination js-next">
            다음
          </button>
        )}
      </div>
    );
  }

  public componentDidMount(): void {
    const { showCount } = this.props;
    const { pageId = 1 } = this.history.query;
    const temp = Math.floor(Number(pageId) / showCount);
    this.setState({ startPage: (checkCurrentLastPage(+pageId, showCount) ? temp - 1 : temp) * showCount + 1 });
  }

  public setDelegation(): void {
    this.addDelegation('click', '.js-prev', this.pushPrevPage);
    this.addDelegation('click', '.js-next', this.pushNextPage);
    this.addDelegation('click', '.pagination', this.pushPagination);
  }

  private pushPrevPage() {
    const { startPage } = this.state;
    this.pushPage(startPage - 1);
  }
  private pushNextPage() {
    const { showCount } = this.props;
    const { startPage } = this.state;
    this.pushPage(startPage + showCount);
  }
  private pushPagination(e: Event) {
    const pageId = (e.target as HTMLElement).dataset.page as string;
    this.pushPage(pageId);
  }
  private pushPage(pageId: string | number) {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('pageId', String(pageId));
    this.history.push(`${this.history.pathname}?${String(searchParams)}`);
  }
}

export default Pagination;
