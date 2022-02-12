/* eslint-disable no-param-reassign */
import { IJsx } from './jsx';

type TState = Record<string, any>;
type THash = Record<string, ChildNode>;
type TEventObj = Record<
  string,
  { target: HTMLElement; eventType: keyof DocumentEventMap; callback: (e: Event) => void }[]
>;

const eventObj: TEventObj = {};

abstract class Component {
  target: HTMLElement;
  props: TState;
  state: TState;

  // constructor에서 state를 지정하기 위해 비동기 함수 사용
  constructor(target: HTMLElement, props = {}) {
    this.target = target;
    this.props = props;
    this.state = {};
    if (!target) return;
    requestAnimationFrame(() => {
      this.render();
      this.componentDidMount();
      this.removeDelegation();
      this.setDelegation();
    });
  }

  private render() {
    const { target } = this;

    const newNode = target.cloneNode(true) as HTMLElement;
    const newElements = this.createElement(this.markup());
    newNode.replaceChildren(newElements);

    const oldChildNodes = [...target.childNodes];
    const newChildNodes = [...newNode.childNodes];
    const max = Math.max(oldChildNodes.length, newChildNodes.length);
    for (let i = 0; i < max; i++) {
      this.updateElement(target, newChildNodes[i], oldChildNodes[i]);
    }

    this.appendComponent(target);

    if (this.props.class) this.addClass();
  }

  private addClass() {
    const firstElement = this.target.firstElementChild as HTMLElement;
    if (!firstElement) return;
    const classArr: string[] = this.props.class.split(' ');
    classArr.forEach((className) => {
      firstElement.classList.add(className);
    });
  }

  private createElement(node: IJsx | string) {
    // string인 경우 텍스트 노드를 리턴
    if (typeof node === 'string') {
      return document.createTextNode(node);
    }

    const { type, props, children } = node;

    // element를 만듦
    const element = ['svg', 'circle'].includes(type)
      ? document.createElementNS('http://www.w3.org/2000/svg', type)
      : type === 'frag'
      ? document.createDocumentFragment()
      : document.createElement(type);

    // props가 있는 경우에 attribute를 추가
    const isFrag = element instanceof DocumentFragment;
    if (props && !isFrag) {
      Object.entries(props).forEach(([name, value]) => {
        element.setAttribute(name, value);
      });
    }

    // state를 render할 때 문자열이 아닌 경우 에러 방지
    const parseChildren = children.map((child) => {
      if (typeof child !== 'object') return String(child);
      return child;
    });

    // 재귀적으로 함수를 실행하고 현재 element에 append
    const createElementArr = parseChildren.map((jsx) => this.createElement(jsx));
    createElementArr.forEach((createElement) => {
      element.appendChild(createElement);
    });

    return element;
  }

  private checkAttributes(oldNode: HTMLElement, newNode: HTMLElement) {
    const oldAttributes = [...oldNode.attributes];
    const newAttributes = [...newNode.attributes];
    if (oldAttributes.length !== newAttributes.length) return false;
    for (let i = 0; i < oldAttributes.length; i++) {
      if (newNode.getAttribute(oldAttributes[i].name) !== oldNode.getAttribute(newAttributes[i].name)) return false;
    }
    return true;
  }

  private updateElement(parent: HTMLElement, newNode: ChildNode, oldNode: ChildNode) {
    // 하위 컴포넌트는 하위 컴포넌트에서 비교(component라는 attribute가 있으면 비교하지 않는다)
    if (
      oldNode instanceof HTMLElement &&
      oldNode.getAttribute('component') &&
      newNode instanceof HTMLElement &&
      newNode.getAttribute('component') &&
      this.checkAttributes(oldNode, newNode) &&
      oldNode.nodeName === newNode.nodeName
    )
      return;

    // paret가 component attribute를 가지고 있고 newNode가 없다면 아직 appendComponent가 실행되지 않은 경우이다.
    // appendComponent를 실행한 후에 update한다.
    if (parent.getAttribute('component') && !newNode && parent.childElementCount === 0) return;

    // oldNode만 존재하면 remove, newNode만 존재하면 append
    if (!newNode && oldNode) return parent.removeChild(oldNode);
    if (newNode && !oldNode) return parent.appendChild(newNode);

    // oldNode와 newNode가 텍스트 노드인경우 교체
    if (newNode instanceof Text && oldNode instanceof Text) {
      if (oldNode.nodeValue === newNode.nodeValue) return;
      oldNode.nodeValue = newNode.nodeValue;
      return;
    }

    // html tag가 바뀔경우 전체를 replace
    if (newNode.nodeName !== oldNode.nodeName) {
      // const index = [...parent.childNodes].indexOf(oldNode);
      parent.replaceChild(newNode, oldNode);
      return;
    }

    if (!(newNode instanceof HTMLElement && oldNode instanceof HTMLElement)) throw new Error('update error');

    let hasKey = false;
    if (newNode.firstElementChild?.getAttribute('key') && oldNode.firstElementChild?.getAttribute('key')) {
      this.caseOfKey(oldNode, newNode);
      hasKey = true;
    }

    this.changeAttributes(oldNode, newNode);

    if (hasKey) return;

    const newChildNodes = [...newNode.childNodes];
    const oldChildNodes = [...oldNode.childNodes];
    const max = Math.max(newChildNodes.length, oldChildNodes.length);
    for (let i = 0; i < max; i++) {
      this.updateElement(oldNode, newChildNodes[i], oldChildNodes[i]);
    }
  }

  // newNode의 key가 oldNode의 key에 존재한다면 바꾸지 않음
  private caseOfKey(oldNode: HTMLElement, newNode: HTMLElement) {
    const newKeyHashTable: THash = {};
    const oldKeyHashTable: THash = {};
    const newChildNodes = [...newNode.childNodes];
    const oldChildNodes = [...oldNode.childNodes];

    const keyOrderArr: string[] = [];
    newChildNodes.forEach((newChildNode) => {
      const key = (newChildNode as HTMLElement).getAttribute('key');
      if (!key) throw new Error('key is not defined');
      newKeyHashTable[key] = newChildNode;
      keyOrderArr.push(key);
    });
    oldChildNodes.forEach((oldChildNode) => {
      const key = (oldChildNode as HTMLElement).getAttribute('key');
      if (!key) throw new Error('key is not defined');
      oldKeyHashTable[key] = oldChildNode;
    });

    const changeArr: ChildNode[] = [];
    keyOrderArr.forEach((key) => {
      const oldElement = oldKeyHashTable[key];
      const newElement = newKeyHashTable[key];
      if (oldElement) changeArr.push(oldElement);
      else changeArr.push(newElement);
    });

    oldNode.replaceChildren(...changeArr);
  }

  private changeAttributes(oldNode: HTMLElement, newNode: HTMLElement) {
    const oldAttributes = [...oldNode.attributes];
    const newAttributes = [...newNode.attributes];
    oldAttributes.forEach(({ name }) => {
      if (newNode.getAttribute(name) === null) oldNode.removeAttribute(name);
    });
    newAttributes.forEach(({ name, value: newValue }) => {
      const oldValue = oldNode.getAttribute(name) || '';
      if (newValue !== oldValue) oldNode.setAttribute(name, newValue);
    });
  }

  // 자식 component를 추가하는 메소드
  // jsx에서 클래스를 xml 형태로 불러오지 못하기 때문에 필요
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public appendComponent(target: HTMLElement) {}

  public markup() {
    return '';
  }

  private removeDelegation() {
    const key = this.getKey();
    if (eventObj[key]) {
      eventObj[key].forEach(({ target, eventType, callback }) => {
        target.removeEventListener(eventType, callback);
      });
      eventObj[key] = [];
    }
  }

  // addDelegation을 넣는 메서드
  public setDelegation() {}

  public addDelegation(eventType: keyof DocumentEventMap, selector: string, callback: (e: Event) => void) {
    const curry = (e: Event) => {
      if ((e.target as HTMLElement).closest(selector)) callback(e);
    };
    const key = this.getKey();
    const nextEventObj = { target: this.target, eventType, callback: curry };
    if (eventObj[key]) eventObj[key].push(nextEventObj);
    else eventObj[key] = [nextEventObj];
    this.target.addEventListener(eventType, curry);
  }

  public componentDidMount() {}

  // state가 바뀌지 않았을 때 업데이트를 하지 않음
  public setState(changeState: TState, cb?: Function) {
    if (!this.checkNeedUpdate(changeState)) return;
    requestAnimationFrame(() => {
      this.componentDidUpdate({ ...this.state }, { ...this.state, ...changeState });
      this.state = { ...this.state, ...changeState };
      this.render();
      cb?.();
    });
  }

  private getKey() {
    const key = this.constructor.name + this.target.classList[0];
    return key;
  }

  private checkNeedUpdate(changeState: TState) {
    // eslint-disable-next-line no-restricted-syntax
    for (const key in changeState) {
      if (!Object.is(changeState[key], this.state[key])) return true;
    }
    return false;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public componentDidUpdate(state: TState, nextState: TState) {}
}

export default Component;
