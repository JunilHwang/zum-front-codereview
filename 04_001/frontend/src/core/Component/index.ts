import CustomError from "../CustomError";
import { Publisher, Subscriber } from "../Store";
import { makeComponentId } from "./functions";
import { createNodes, createTemplateNodes, updateNodes } from "./vdom";

export type TargetType = Element | string | null;
export interface ComponentConstructor<P extends Props = {}> {
  new ($target: TargetType, props?: P): Component;
}

export interface ComponentItemType<P extends Props = {}> {
  Component: ComponentConstructor<P>;
  $target: TargetType;
  props?: P;
}

const defaultPropsKeys = ["isNotKeepAdding", "initInsertPosition"] as const;
interface DefaultProps {
  isNotKeepAdding?: boolean;
  initInsertPosition?: InsertPosition;
}
export type Props<P = {}> = P & DefaultProps;

export interface SetStateOptions {
  noRender?: boolean;
  isSetEvents?: boolean;
}

type RenderState = "default" | "adding" | "done" | "disabled";

/**
 * [Component]
 * - 모든 컴포넌트(일반, page, Link)의 부모가 되는 class
 * - 생성 시 동작 과정: constructor -> init -> render -> setTemplate -> setChildren -> setEvents
 */
class Component<S = {}, P extends Props = DefaultProps> {
  private _state: S | undefined;
  private _renderState: RenderState = "adding";
  protected _subscriber: Subscriber | undefined;
  protected readonly componentId: string = makeComponentId();

  constructor(protected readonly $target: TargetType, protected props: P = {} as Props<P>) {
    try {
      if ($target === null) throw new CustomError("NOT_FOUND_TARGET", this.constructor.name);
      else if (typeof $target === "string") this.$target = document.querySelector($target);
      this.init();
      this.initSubscriber();
      this.render();
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * ✨ init
   * - setState를 활용하여 초기 state를 정해주는 등 초기화가 필요한 작업이 있을 때 사용
   */
  protected init(): void {}

  /**
   * ✨ initSubscriber
   * - registerSubscriberFunction() 를 활용할 때 사용
   */
  protected initSubscriber(): void {}

  /**
   * ✨ registerSubscriberFunction
   * - this._subscriber에 함수를 등록하고 이 함수를 publisher의 observer에 등록
   * - [!] initSubscriber() 메서드 내에서 사용하기
   */
  protected registerSubscriberFunction(publisher: Publisher, func: Function): void {
    if (!this._subscriber) this._subscriber = new Subscriber();
    this._subscriber.func = func;
    this._subscriber.registerFunc(publisher);
  }

  /**
   * ✨ setState
   * - state를 정의하거나 업데이트할 때 사용
   */
  protected setState(newState: S, options?: SetStateOptions): void {
    this._state = { ...this._state, ...newState };
    options?.noRender || this.render(options?.isSetEvents ?? true);
  }
  protected get state() {
    return this._state;
  }

  /**
   * ✨ setBeforeRender
   * - render 함수 바로 직전에 실행되어야 할 사항들을 설정
   */
  protected setBeforeRender(): void {}

  /**
   * 👾 render
   * - 컴포넌트의 Template를 생성하고, props.children에 있는 컴포넌트들을 생성 후 Event 등록.
   */
  private render(isSetEvents: boolean = true): void {
    const { $target, props } = this;
    if ($target === null || typeof $target === "string") return;

    this.setBeforeRender();

    const { isNotKeepAdding, initInsertPosition } = props;
    if (isNotKeepAdding) this._renderState = "disabled";

    const { _renderState } = this;
    if (_renderState === "adding") {
      const insertPosition: InsertPosition = initInsertPosition ?? "beforeend";
      $target.insertAdjacentHTML(insertPosition, this.setTemplate());
      this._renderState = "done";
    } else this.updateComponentNodes($target, _renderState === "done");

    this.setChildren();
    isSetEvents && this.setEvents();
  }
  private updateComponentNodes($target: Element, isNeedFixNodes?: boolean) {
    const prevNodes = createNodes($target);
    const newNodes = createTemplateNodes(this.setTemplate());
    updateNodes($target, prevNodes, newNodes, isNeedFixNodes);
  }

  /**
   * ✨ setTemplate
   * - 컴포넌트의 Template 설정
   */
  protected setTemplate(): string {
    return "";
  }

  /**
   * ✨ setChildren
   * - render 후, 컴포넌트를 구성하는 자식 컴포넌트를 렌더링 할 때 사용
   */
  protected setChildren(): void {}

  /**
   * ✨ setEvents
   * - 컴포넌트내의 요소들에 이벤트 설정
   */
  protected setEvents(): void {}

  /**
   * ✨ getEventTarget
   * - 각 컴포넌트에서 이벤트 생성 시, 이벤트가 등록될 Element를 가져옴
   *    - Component의 componentId 프로퍼티 값을 기준으로 Element를 가져옴
   *      (없다면 현재 컴포넌트가 등록된 this.$target(부모)를 가져옴)
   */
  protected getEventTarget(): Element | null {
    let $result = null;
    const { $target, componentId } = this;
    if (!componentId) $result = typeof $target === "string" ? document.querySelector($target) : $target;
    else $result = document.querySelector(`[data-component-id=${componentId}]`);
    return $result;
  }

  /**
   * ✨ createStringAttribute
   * - 컴포넌트에서 렌더링하는 template에 attribute를 추가할 때 사용
   */
  protected createStringAttribute(...excludeStrs: string[]): string {
    const arrExclude = [...defaultPropsKeys, ...excludeStrs];
    const strAttribute = Object.entries(this.props).reduce((result, [key, value]) => {
      if (arrExclude.includes(key)) return result;
      result += `${key}="${value}" `;
      return result;
    }, "");
    return strAttribute;
  }
}

export default Component;
