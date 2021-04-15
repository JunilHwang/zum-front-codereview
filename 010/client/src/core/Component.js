
export default class Component {
    zumApi;
    zumMenu;
    constructor (target, props) { //생성자 순서대로 실행된다.
        this.first();
        this.target = target;
        this.props = props // react와 같이 부모에서 자식으로 상태 혹은 메소드를 넘겨주기 위해서.
        // window.onhashchange = () => {
        //     this.onChangeHash();
        // }
        this.setup(); // state 설정\
        this.render();
        this.setEvent();
    }
    async getMenu () {
        const menuUrl = 'http://localhost:3300/api/menu';
           const getMenuApi = await fetch(menuUrl);
           if (getMenuApi.status === 200) {
             const data = await getMenuApi.json()
             return data
           } else {
             throw new Error('Unable to get the currency code')
           }
        };
    async getAllApi () {
        const apiUrl = 'http://localhost:3300/api/zum';
        const getApi = await fetch(apiUrl);
        if (getApi.status === 200) {
            const data = await getApi.json()
            return data
        } else {
            throw new Error('Unable to get the currency code')
        }
    }; 
    first() {};

    // onChangeHash() {
    //     this.render();
    // }

    setup () {}; //state 선언

    template () { return ''; }
    mounted () {};
    
    async render () {
        this.zumMenu= await this.getMenu();
        this.zumApi = await this.getAllApi();
        if (this.zumApi  && this.zumMenu) {
            this.target.innerHTML = await this.template(); //HTML 렌더링을 하는 구간
            this.mounted();// render 이후 추가적인 기능을 수행하기 위해
        }
    }

    setEvent () {};
    setState (newState) { //State가 변경되면 자동 렌더링
      this.state = { ...this.state, ...newState };
      this.render();
    }
    addEvent (eventType, selector, callback) {
        const children = [ ...this.target.querySelectorAll(selector) ]; 
        // selector에 명시한 것 보다 더 하위 요소가 선택되는 경우가 있을 땐
        // closest를 이용하여 처리한다.
        const isTarget = (target) => children.includes(target)
                                     || target.closest(selector);
        this.target.addEventListener(eventType, event => {
          if (!isTarget(event.target)) return false;
          callback(event);
        })
      }
  }