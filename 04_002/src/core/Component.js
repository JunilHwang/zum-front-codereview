/* @jsx h */
function h(type, props={}, ...children){ // props값이 없을 수 있으므로 default값 설정
  return { type, props, children };
}
/**
 * @createElement : 객체형태를 html로 (Obejct)
 */
class Component{
  where // 렌더링할 위치
  $target; // 렌더링하고싶은 dom
  $state; // 데이터
  path // url history
  constructor(where, path='/', state={}){
    this.where = where;
    this.path = path;
    this.$state = state;

    this.render();
  }

  createElement(node) {
    if (typeof node === 'string'|| typeof node == 'number'){
      return document.createTextNode(node);
    }

    const { type, props, children} = node;
    // 1 Tag 
    const $element = document.createElement(type);
    // 2 Attribute
    Object.keys(props).map((attr)=> {
      if(typeof props[attr] === "string"||typeof props[attr] === "number"){
        $element.setAttribute(attr, props[attr]);
      }else{
        $element.setAttribute(attr, undefined);
      }
    });
    // 3 Children
    children.map((child)=> {
      if(Array.isArray(child)){
        child.forEach((ch)=>{
          $element.appendChild(this.createElement(ch));
        })
      }else{
        $element.appendChild(this.createElement(child));
      }
    });
    
    return $element; // type: object
  }

  setState(newData){
    this.$state = {...this.$state, ...newData}; // 데이터 바꾸고나면
    this.render(); // 렌더링
  }

  eventHandler(){
    // Component마다 필요한 이벤트 작성
  }

  render(){
    this.where.innerHTML = ''; // dom 초기화 수정 필요
    this.$target = (
      <div>
        something
      </div>
    );
    
    this.$target = this.createElement(this.$target); 
    this.where.appendChild(this.$target); 
    // this.eventHandler(); // 이벤트 등록
  }
}

// 웹 컴포넌트 만드는 방법
// const temp = customElements.define('temp', Temp);
export default Component;