import Component from '../component';

type DataObject = { [propsName: string]: any };

export default class ArticleRow extends Component {
  constructor(name: string, state: DataObject, props: DataObject) {
    super(name, state, props);

    this.setTemplate((state: DataObject) => {
      return `
      <li class="article-row" data-id="${state.id}">
        <div id="article-id">${state.id}</div>
        <div id="article-title">${state.title}</div>
        <div id="article-author">${state.author}</div>
        <div id="article-date">${state.createdAt}</div>
      </li>
      `;
    });
  }
}
