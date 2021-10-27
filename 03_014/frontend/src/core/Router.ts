import { REG_EX } from "@src/utils/funcs";
import { RouteInfo, RoutePathInfo } from "@src/utils/types";

class Router {
  $app: Element;
  execBetoreRender?: Function;
  routes: { [key: string]: RouteInfo } = {};

  constructor($app: Element, routeParams: RouteInfo[], execBetoreRender?: Function) {
    this.$app = $app;
    this.execBetoreRender = execBetoreRender;
    this.setRoutes(routeParams);
    this.init();
  }

  private setRoutes(routeParams: RouteInfo[]): void {
    routeParams.forEach((routeInfo: RouteInfo) => (this.routes[routeInfo.path] = routeInfo));
  }

  private init(): void {
    this.setPopStateEvent();
    this.setAnchorEvent();
    this.renderPath(window.location.pathname);
  }

  /** 모든 a 태그 이벤트 등록 (이벤트 델리게이션 활용) */
  private setAnchorEvent(): void {
    this.$app.addEventListener("click", this.AnchorEventHandler.bind(this));
  }
  private AnchorEventHandler(e: Event | MouseEvent): void {
    const target = e.target as HTMLElement;
    const cloestTarget = target.closest("a");
    if (!cloestTarget || cloestTarget.tagName !== "A") return;

    const URL_REG_EX = REG_EX.url;
    if (URL_REG_EX.test(cloestTarget.getAttribute("href") || "")) return;
    e.preventDefault();

    const path = cloestTarget.getAttribute("href");
    if (!path) return;

    window.history.pushState({ path }, "", path);
    this.renderPath(path);
  }

  /** 현재 Path 기반으로 렌더링 - Component가 생성되면서 렌더함 */
  private renderPath(path: string): void {
    const pathInfo = this.getPathInfo(path);
    if (!pathInfo || !pathInfo.paths.length) return;

    const currRouteInfo = this.routes[pathInfo.mainPath];
    if (!currRouteInfo || !currRouteInfo.Component) return;

    this.execBetoreRender && this.execBetoreRender();
    const { Component } = currRouteInfo;
    new Component(this.$app);
  }
  private getPathInfo(path: string): RoutePathInfo | null {
    const PATH_REG_EX = REG_EX.path;
    const paths = path.match(PATH_REG_EX);
    if (!paths || !paths.length) return null;
    const mainPath = paths[0];
    return { paths, mainPath };
  }

  /** 이전 페이지 & 다음 페이지 관련 이벤트 설정 */
  private setPopStateEvent(): void {
    window.addEventListener("popstate", this.popStateEventHandler.bind(this));
  }
  private popStateEventHandler(e: PopStateEvent): void {
    const path = window.location.pathname;
    this.renderPath(path);
  }
}

export default Router;
