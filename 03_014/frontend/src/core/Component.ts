import { ComponentOptions, Props, State, ComponentStoreOptions, SetStateOptions } from "@src/utils/types";
import { Publisher, Subscriber } from "@src/core/Store";

class Component {
  $target: Element;
  state: State = {};
  props: Props = {};
  options: ComponentOptions = { stopInit: false, keepAdding: false };
  storeSubscriber?: Subscriber;
  storeOptions?: ComponentStoreOptions;

  constructor($target: Element, props: Props = {}, storeOptions?: ComponentStoreOptions) {
    this.$target = $target;
    this.props = props;
    this.storeOptions = storeOptions;

    if (this.storeOptions) {
      const { subscriber, store } = this.storeOptions;
      subscriber && (this.storeSubscriber = subscriber);
      this.initStoreSubscriber(store);
    }

    this.init();
  }

  // [+] Store ========================================================================
  private initStoreSubscriber(store?: Publisher): void {
    if (!this.storeSubscriber) return;
    if (!this.storeSubscriber.subscriberFunc) {
      const isSetEvents = this.storeOptions?.isSetEvents;
      this.storeSubscriber.subscriberFunc = () => {
        isSetEvents && this.setEvents();
        this.render();
      };
    }
    if (store) this.setPublisherSubscriptions(store);
  }
  private setPublisherSubscriptions(store: Publisher) {
    if (!this.storeSubscriber || !this.storeSubscriber.subscriberFunc) return;
    this.storeSubscriber.publisherSubscriptions(store);
  }

  // 직접 등록 (사용안함)
  protected setStoreSubscriber(newStore: Publisher, newStoreSubscriber: Subscriber, isSetEvents?: boolean): void {
    if (this.storeSubscriber && this.storeOptions?.store) {
      const { store } = this.storeOptions;
      if (store) this.storeSubscriber.removePublisherSubscriptions(store);
    }

    this.storeSubscriber = newStoreSubscriber;
    if (!newStoreSubscriber.subscriberFunc) {
      if (this.storeOptions) this.storeOptions.isSetEvents = isSetEvents;
      this.storeSubscriber.subscriberFunc = () => {
        isSetEvents && this.setEvents();
        this.render();
      };
    }
    this.setPublisherSubscriptions(newStore);
  }

  // [+] Common ========================================================================
  /** 현재 컴포넌트의 state 업데이트  */
  protected setState(newState: State, options?: SetStateOptions): void {
    this.state = { ...this.state, ...newState };
    if (options) {
      const { notUsedRender, customTemplate, customFunc } = options;
      !notUsedRender && this.render(customTemplate);
      customFunc && customFunc();
    } else this.render();
  }

  protected setInitState(): State {
    return {};
  }

  protected setTemplate(): string {
    return "";
  }

  /** 현 컴포넌트의 이벤트 등록 (이벤트 델리게이션 활용하기) */
  protected setEvents(): void {}

  /** 템플릿 render, 자식 있다면 자식도 render  */
  private render(customTemplate?: string): void {
    if (this.options.keepAdding) {
      this.$target.innerHTML += customTemplate ? customTemplate : this.setTemplate();
    } else {
      this.$target.innerHTML = customTemplate ? customTemplate : this.setTemplate();
    }

    this.setRenderChildren();
  }

  /** render 메서드에서 innerHTML 업뎃 후 현재 컴포넌트를 이루고 있는 요소들을 렌더링 (자식들) */
  protected setRenderChildren(): void {}

  /** 초기화 시 사용되는 메서드 (일반 / 비동기)  */
  protected execInit(initState?: State) {
    this.state = initState ? initState : this.setInitState();
    this.setEvents();
    this.render();
  }

  // [+] 일반 / 비동기 ========================================================================
  /** init 메서드 실행 시, 처음으로 실행되는 메서드 (동기 / 비동기를 분기처리) */
  protected setBeforeStarted(): void {
    /* ex)
      // 비동기적으로 동작하기를 바랄때.
        this.options.stopInit = true;
        this.asyncInit();
      */
  }

  /** "일반(동기)" 초기화 메서드 (constructor에서 실행)  */
  private init(): void {
    this.setBeforeStarted();
    if (this.options.stopInit) return;
    this.execInit();
  }

  /** "비동기" 초기화 메서드 | setBeforeStarted에서 this.options.stopInit: true 후 사용
   * 📌 예전엔 사용했지만... 이젠..
   */
  protected async asyncInit(): Promise<void> {}
}

export default Component;
