import { createElement as h, Component, Link, formatTimestamp } from '@/core';

export class Articles extends Component {
  render() {
    /** @type {Article[]} */
    const articles = this.props.articles;
    return (
      h('table', null,
        h('thead', null,
          h('tr', null,
            h('th', null, '글번호'),
            h('th', null, '제목'),
            h('th', null, '작성자'),
            h('th', null,
              h('a', {href: '#', onClick: this.props.resort.bind(this)}, '작성일')
            ),
          )
        ),
        h('tbody', null,
          articles.map(article => (
            h('tr', {key: article.id},
              h('th', null, String(article.id)),
              h('td', null,
                h(Link, {to: `/${article.id}`}, article.title)
              ),
              h('td', null,
                h('a', {
                  href: '#',
                  onClick: (event) => {
                    event.preventDefault();
                    this.props.search({
                      searchField: 'author',
                      keyword: article.author,
                      page: 0,
                    });
                  }
                }, article.author)
              ),
              h('td', null, formatTimestamp(article.timestamp)),
            )
          ))
        )
      )
    );
  }
}
