import {
  createElement as h,
  Component,
  withRouter,
  withInitFetch,
  compose,
  formatTimestamp,
  request,
  Redirect
} from '@/core';
import { urlFor } from '@/helper';

class ReadPage extends Component {
  editArticle(event) {
    event.preventDefault();

    const id = this.props.match.params.id;
    this.props.history.bust(urlFor({ type: 'api/read', payload: { id, }}));

    this.props.history.push(urlFor({ type: 'write' }), { id, });
  }

  backToList(event) {
    event.preventDefault();

    this.props.history.push(urlFor({ type: 'list' }));
  }

  deleteArticle(event) {
    event.preventDefault();

    const id = this.props.match.params.id;
    request(
      urlFor({
        type: 'api/delete',
        payload: {
          id,
        }}),
        {method: 'DELETE'})
      .then(() => {
        this.props.history.bust(urlFor({ type: 'api/list' }));
        this.props.history.bust(urlFor({ type: 'api/read', payload: { id, }}));

        this.props.history.push(urlFor({ type: 'list' }));
      })
      .catch(console.error);
  }

  render() {
    if (this.props.error) {
      return h(Redirect, {to: '/error'});
    }

    /** @type {Article | null} */
    const article = this.props.fetchedData;
    if (!article) {
      return '로드중...';
    }
    return (
      h('div', null,
        h('div', null, '글번호: ', article.id),
        h('h1', null, article.title),
        h('div', null, '작성자: ', article.author),
        h('div', null, '작성일: ', formatTimestamp(article.timestamp)),
        h('div', null,
          h('article', null, article.content)
        ),
        h('div', null,
          h('button', {onClick: this.editArticle.bind(this)}, '수정'),
          h('button', {onClick: this.deleteArticle.bind(this)}, '삭제'),
          h('button', {onClick: this.backToList.bind(this)}, '목록'),
        )
      )
    );
  }
}

const ReadPageWithRouter = compose(
  withRouter,
  withInitFetch(props => urlFor({
    type: 'api/read', payload: { id: props.match.params.id }
  })),
)(ReadPage);

export { ReadPageWithRouter as ReadPage };
