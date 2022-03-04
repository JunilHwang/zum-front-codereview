import  Component  from "../lib/Component.js";
import { PostListPage } from "./PostListPage.js";
import { PostSinglePage } from "./PostSingle.js";
import { NoutFoundPage } from './NotFoundPage.js';
import { PostEditPage } from './PostEditPage.js'

class App extends Component{

  constructor({ name, state }){
    super({ name, state })
    this.components.push(new PostListPage({ name : 'postlistpage' , state}));
    this.components.push(new PostSinglePage({ name :'postsingle', state }));
    this.components.push(new PostEditPage({ name :'posteditpage', state }));
    this.components.push(new NoutFoundPage({ name :'notfoundpage', state }));
  }

}

export default new App({ name : 'app'})