/* @jsx h */
function h(type, props={}, ...children){
  return { type, props, children };
}
import Component from "../core/Component";
import { selector } from "./../store/store";

export default class Favorite extends Component{
  organizePosts(){
    this.state = selector();
    const contents = [...this.state.contents];
    const likedPosts = contents.filter((item) => item.like);
    return likedPosts;
  }
  render(){
    const likedPosts = this.organizePosts();
    this.$target = (
      <div class="posts">
        <h3>{this.path}</h3>
        <div class="cards">
        {
          likedPosts.map(({category, title, author, date, like})=> {
            const liked = like?"liked! 🎇":"did't liked";
            return(<div class="post-card">
              <h5>{category}</h5>
              <span>{liked}</span>
              <span>{title}</span>
              <span>{author}</span>
              <span>{date}</span>
            </div>)
          })
        }
        </div>
      </div>
    );
    this.$target = this.createElement(this.$target);
    this.where.appendChild(this.$target);
  }
}