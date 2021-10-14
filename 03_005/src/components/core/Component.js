

export default class Component {
    // protected : _변수
    // private : #변수
    _state; // 내부에서만 쓰이는 변수 (바뀌는 부분)
    _props; // 부모로부터 상속받는 데이터
    _target; // 적용할 html 코드
    _url = 'http://localhost:3000';

    constructor(target, props) {    // 1. element, state를 받아서
        this._props = props
        this._target = target;      // 2. target에 해당 element를 담아줌
        this.init();                // 3. 내가 원하는 값으로 한번 초기화해줌
        this.render();
        this.setEvent();            // 이벤트는 이벤트위임으로 처리하기 때문에 처음에만 걸어주자.
    }

    init() {} // 필요한 데이터 처음에 일괄적으로 넣어줄 때 사용함

    template() { // 템플릿 리턴해줌
        return '';
    }

    renderChildren() {} // 만들어진 html에 자식 component를 마운트 해줌

    async render() { // 해당 Component를 렌더링해줌
        if (typeof(this.template()) == 'object') {
            this._target.innerHTML = await this.template();
        } else {
            this._target.innerHTML = this.template();
        }
        this.renderChildren();
    }

    // event 제어 함수 (필요할 때만 구현함)
    setEvent() {} 

    // state가 변경되면 변경 된 값으로 새로 렌더링함
    setState(newState) {
        this._state = { ...this._state, ...newState }; // 4-2. state를 받아준 상태값으로 초기화 해줌
        this.render(this._state);                     
    }
}