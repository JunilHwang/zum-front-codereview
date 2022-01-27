/**
 * [Router]
 * - App 컴포넌트에서 페이지 설정, 이전 & 다음페이지 기능
 * - 참고사항
 *    - a 태그를 통한 페이지 이동(pushState)은 src/core/RouterLink 컴포넌트 참고
 */
import CustomError from "../CustomError";
import { ComponentItemType } from "../Component";
import { renderPath } from "./functions";
import { Publisher } from "../Store";
export * from "./functions";

export type RouterInfo = {
  [key: string]: ComponentItemType;
};

export interface RenderPathProps {
  href: string;
  componentName?: string;
  routerInfo: RouterInfo;
  publisherList: Publisher[];
}

// ========

class Router {
  constructor(
    protected readonly $target: Element | null,
    protected readonly routerInfo: RouterInfo,
    private readonly publisherList: Publisher[],
  ) {
    try {
      if ($target === null) throw new CustomError("NOT_FOUND_TARGET", this.constructor.name);
      this.init();
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * 👾 init
   * - setPopStateEvent: 이전 페이지 & 다음 페이지 이벤트 설정
   */
  private init(): void {
    this.setPopStateEvent();
    const href = window.location.href;
    const { routerInfo, publisherList } = this;
    renderPath({ href, componentName: this.constructor.name, routerInfo, publisherList });
  }

  private setPopStateEvent(): void {
    window.addEventListener("popstate", () => this.popStateEventHandler());
  }
  private popStateEventHandler(e?: PopStateEvent): void {
    const href = window.location.href;
    const { routerInfo, publisherList } = this;
    renderPath({ href, componentName: this.constructor.name, routerInfo, publisherList });
  }
}

export default Router;
