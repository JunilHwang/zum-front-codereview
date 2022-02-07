import { createElement as h, Component, withRouter } from '@/core';
import { request } from '@/core';
import { urlFor } from '@/helper';

class WritePage extends Component {
  constructor(props) {
    super(props);

    const locationState = this.props.location.state;
    if (locationState.id) {
      request(
        urlFor({
          type: 'api/read',
          payload: { id: locationState.id }
        }))
        .then(this.fillForm.bind(this))
        .catch(console.error);
    }
    this.state = {
      id: locationState.id || null,
      title: '',
      content: '',
      author: '',
    };
    this.postArticle = this.postArticle.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  fillForm(article) {
    this.setState({
      title: article.title,
      content: article.content,
      author: article.author,
    });
  }

  postArticle(event) {
    event.preventDefault();

    fetch(this.props.action + (this.state.id ? '/' + this.state.id : ''), {
      method: this.state.id ? 'PUT' : this.props.method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: this.state.title,
        content: this.state.content,
        author: this.state.author,
      })})
      .then(res => res.json())
      .then(({ id }) => {
        this.props.history.bust(urlFor({ type: 'api/list' }));
        this.props.history.bust(urlFor({ type: 'api/read', payload: { id, }}));

        this.props.history.push(urlFor({ type: 'read', payload: { id, }}));
      })
      .catch(err => {
        // TODO
        console.error(err);
      });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
      h('div', null,
        h('form', {
          action: this.props.action,
          method: this.props.method,
          onSubmit: this.postArticle,
        }, h('div', null,
            h('input', {
              name: 'title',
              placeholder: '제목',
              required: 'required',
              onChange: this.handleChange,
              value: this.state.title,
            })
          ),
          h('div', null,
            h('textarea', {
              name: 'content',
              placeholder: '내용',
              required: 'required',
              onChange: this.handleChange,
              value: this.state.content,
            })
          ),
          h('div', null,
            h('input', {
              name: 'author',
              placeholder: '작성자',
              required: 'required',
              onChange: this.handleChange,
              value: this.state.author,
            })
          ),
          h('div', null,
            h('button', {type: 'submit'}, '전송')
          )
        )
      )
    );
  }
}

WritePage.defaultProps = {
  action: urlFor({ type: 'api/write' }),
  method: 'POST',
};

const WritePageWithRouter = withRouter(WritePage);
export { WritePageWithRouter as WritePage };
