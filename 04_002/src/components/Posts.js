/* @jsx h */
function h(type, props={}, ...children){
  return { type, props, children };
}
import Component from "../core/Component";
import { selector } from "./../store/store";


export default class Posts extends Component{
  miniWindow;
  organizePosts(){
    this.state = selector();
    // path에 따라서 state를 정제??하기
    const contents = [...this.state.contents];
    const posts = contents.filter((item) => item.category === this.path); 
    return posts
  }
  // btnCards(){
  //   const postCard = document.querySelector('.cards');
  //   postCard.addEventListener('click', (event) => {
  //     console.log(event);
  //     event.target.getAttribute('card') // index 순서가 들어가있음.
  //   })
  // }

  render(){
    const posts = this.organizePosts();
    this.miniWindow = false;

    this.$target = (
      <div class="posts">
        <h3>{this.path}</h3>
        <div class="cards">

        {
          posts.map(({title, author, cont, like}, index)=> {
            const liked = like?"liked! 🎇":"did't liked";
            return(<button class="post-card" card={index}>
              <button>{liked}</button>
              <span>{title}</span>
              <span>{author}</span>
              <p>{cont}</p>
            </button>)
          })
        }
        </div>
      </div>
    );
    this.$target = this.createElement(this.$target);
    this.where.appendChild(this.$target);
  }
}