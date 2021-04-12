// @ts-check

/**
 * Class Component
 * 클래스형 컴포넌트
 */
export default class Component {
  /**
   * Class constructor
   * - target, properties 받아서 내부 private 변수로 저장
   * - private 변수는 상속되지 않으므로, 자식 컴포넌트에서 매번 선언해줘야 함
   * - 컴포넌트 생성 - 이벤트 등록 - 렌더
   * @param {Element|HTMLElement} target
   * @param {Object} [props]
   */
  constructor(target, props) {
    this._target = target;
    this._props = props;
    this._states = {};
    this._setUpComponent();
    this._setEvent();
    this._render();
  }

  /**
   * _setUpComponent
   * - 초기 상태 설정 메서드
   * @protected
   */
  _setUpComponent() {
    //
  }

  /**
   * _setState
   * - 상태변경 메서드
   * @protected
   * @param {Object} newStates 변경되는 state 객체로 입력
   */
  _setState(newStates) {
    if (typeof newStates !== "object") {
      console.error("정상적인 state 가 아닙니다");
      return;
    }
    this._states = { ...this._states, ...newStates };
    this._render();
  }

  /**
   * _setEvent
   * - 초기 이벤트 등록 메서드
   * @protected
   */
  _setEvent() {
    //
  }

  /**
   * addEvent
   * - 이벤트 추가 등록 메서드
   * @protected
   * @param {keyof ElementEventMap} eventType
   * @param {string} targetSelector
   * @param {EventListenerOrEventListenerObject} callback
   */
  _addEvent(eventType, targetSelector, callback) {
    //
  }

  /**
   * 컴포넌트 생성 후 작업 메서드
   * - 자식 노드 생성 등
   * @protected
   */
  _setAfterMounted() {
    //
  }

  /**
   * _template
   * - HTML 템플릿 생성 메서드
   * - 자식 노드 DOM 추가 등
   * @protected
   * @returns {string}
   */
  _template() {
    return ``;
  }

  /**
   * _render
   * - 현재 컴포넌트 innerHTML로 template 입력
   * - afterMounted 메서드 실행
   * @protected
   */
  _render() {
    this._target.innerHTML = this._template();
    this._setAfterMounted();
  }
}
