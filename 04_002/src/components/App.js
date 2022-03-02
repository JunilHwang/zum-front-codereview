/* @jsx h */
function h(type, props={}, ...children){
  return { type, props, children };
}
import Header from "./Header";
import {Router} from "./Router";


const App = () => {
  const $app = document.querySelector(`.app`);
  history.pushState('/app', null, '/'); // path 초기화

  new Header($app);
  // 초기에 $app에다가 하니까 논리적으로 안맞아서 새롭게 routing할 공간을 만들었다.
  new Router($app); 
}

export default App;