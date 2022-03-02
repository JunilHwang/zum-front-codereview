import {
  createElement as h,
  Component,
  Link,
  withInitFetch,
  withRouter,
  compose,
} from '@/core';
import { urlFor } from '@/helper';
import { Articles } from './Articles';

const initialState = {
  sort: 'desc',
  limit: 10,
  page: 0,
  searchField: 'title',
  keyword: '',
  articles: [],
};
class ListPage extends Component {
  static sortByTimestamp(articles, sort) {
    return articles.sort(sort === 'asc' ?
      (a, b) => a.timestamp - b.timestamp :
      (a, b) => b.timestamp - a.timestamp);
  }

  static getLastPage(length, limit) {
    const page = Math.floor(length / limit-1);
    return page < 0 ? 0 : page;
  }

  static queryLastPage(length, page, limit) {
    const isLastPage = page * limit >= length;
    return isLastPage ? ListPage.getLastPage(length, limit) : -1;
  }

  constructor(props) {
    super(props);

    this.state = {
      ...initialState,
    };
  }

  nextPage() {
    this.setState({
      page: this.state.page + 1,
    });
  }

  prevPage() {
    this.setState({
      page: this.state.page - 1 < 0 ? 0 : this.state.page - 1,
    });
  }

  componentDidUpdate(prevState, prevProps) {
    if (this.props.fetchedData !== prevProps.fetchedData) {
      this.setState({
        articles: this.props.fetchedData,
      });
      this.filterKeyword();
    }
  }

  resort(event) {
    event.preventDefault();

    this.setState({
      sort: this.state.sort === 'asc' ? 'desc' : 'asc',
    });
  }

  refresh(event) {
    event.preventDefault();

    this.props.history.bust(urlFor({ type: 'api/list' }));
    this.props.fetch();
  }

  reset(event) {
    event.preventDefault();

    this.setState({
      ...initialState,
      articles: this.props.fetchedData,
    });
  }

  search(state) {
    this.setState({
      ...state,
    });
    this.filterKeyword();
  }

  updateKeyword({ target }) {
    this.search({ keyword: target.value });
  }

  updateLimit({ target }) {
    const {page, articles} = this.state;
    const newLimit = parseInt(target.value);
    const lastPage = ListPage.queryLastPage(articles.length, page, newLimit);

    this.search({
      page: lastPage < 0 ? page : lastPage,
      limit: newLimit,
    });
  }

  updateSearchField({ target }) {
    this.search({ searchField: target.value });
  }

  filterKeyword() {
    const keyword = this.state.keyword;
    const filtered = this.props.fetchedData
      .filter(article => {
        if (keyword === '') return true;
        const field = this.state.searchField;
        switch (field) {
          case 'title':
            return article.title.includes(keyword)
          case 'author':
          default:
            return article[field] === keyword;
        }
      });

    const lastPage = ListPage.queryLastPage(
      filtered.length,
      this.state.page,
      this.state.limit
    );
    this.setState({
      page: lastPage < 0 ? this.state.page : lastPage,
      articles: filtered,
    });
  }

  render() {
    const {page, limit} = this.state;
    const baseIndex = page * limit;
    /** @type {Article[]} */
    const articles = ListPage.sortByTimestamp(
      this.state.articles.slice(baseIndex, baseIndex + limit),
      this.state.sort,
    );

    return (
      h('div', null,
        h(Articles, {
          articles,
          resort: this.resort.bind(this),
          search: this.search.bind(this),
        }),
        h('div', null,
          h('select', {
            onChange: this.updateLimit.bind(this),
            value: this.state.limit,
          }, [5, 10, 30, 50, 100].map((n, i) => (
                h('option', {
                    key: n,
                    name: 'limit',
                    value: n,
                    selected: n === this.state.limit,
                  },
                  n, '개 보기'
                )
            ))
          ),
          h('span', null, this.state.page + 1, '페이지'),
          h('button', {
            onClick: this.prevPage.bind(this),
            disabled: !Boolean(this.state.page),
          }, '이전'),
          h('button', {
            onClick: this.nextPage.bind(this),
            disabled: this.state.articles.length <= (this.state.page + 1) * this.state.limit,
          }, '다음'),
          h('button', {onClick: this.refresh.bind(this)}, '새로고침'),
          h('button', {onClick: this.reset.bind(this)}, '초기화'),
          h('select', {
              onChange: this.updateSearchField.bind(this),
              value: this.state.searchField,
            },
            [
              {field: 'title', name: '제목'},
              {field: 'author', name: '작성자'}
            ].map(({ field, name }) => (
              h('option', {
                key: field,
                value: field,
                selected: this.state.searchField === field
              }, name)
            ))
          ),
          h('input', {
            name: 'keyword',
            placeholder: '검색어',
            onInput: this.updateKeyword.bind(this),
            value: this.state.keyword,
          }),
          h(Link, {to: urlFor({ type: 'write' })}, '작성'),
        ),
      )
    );
  }
}

const ListPageWithFetch = compose(
  withRouter,
  withInitFetch(urlFor({ type: 'api/list' }))
)(ListPage);

export { ListPageWithFetch as ListPage };
