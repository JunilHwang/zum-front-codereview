import Component, { Props, TargetType } from "../Component";
import { renderPath, RouterInfo } from "../Router";
import { Publisher } from "../Store";
import "./style.scss";

type DefaultLinkProps = Pick<HTMLAnchorElement, "href" | "text"> & Partial<Pick<HTMLAnchorElement, "name">>;
export interface RouterLinkProps extends Props, DefaultLinkProps {
  routerInfo: RouterInfo;
  publisherList: Publisher[];
  isButton?: boolean;
  callbackOption?: {
    func: () => boolean | void;
    runPosition: "beforePushState" | "afterRenderPath";
  };
}

/**
 * [RouterLink]
 * - a 태그를 통한 페이지 이동 컴포넌트 (Component 상속 & Router 일부 사용)
 */
class RouterLink extends Component<{}, RouterLinkProps> {
  constructor(protected readonly $target: TargetType, protected props: RouterLinkProps) {
    super($target, props);
  }
  protected setTemplate(): string {
    if (!this.props) return "";
    const { componentId, props } = this;
    const { text, isButton } = props;

    const excludeStrs = ["routerInfo", "publisherList", "isButton", "callbackOption", "text"];
    const strAttrs = this.createStringAttribute(...excludeStrs);
    const strClassName = `${isButton ? " btn" : ""}`;

    return `<a class="app-link ${strClassName}" ${strAttrs} data-component-id=${componentId}>${text ?? ""}</a>`;
  }
  protected setEvents(): void {
    this.registerAnchorClick();
  }

  // =====

  private registerAnchorClick(): void {
    this.getEventTarget()?.addEventListener("click", (e) => this.anchorClickHandler(e));
  }

  private anchorClickHandler(e?: MouseEvent | Event): void {
    e?.preventDefault();
    const $target = e?.target as HTMLElement;
    const $currentTarget = e?.currentTarget as HTMLAnchorElement;
    if (!$currentTarget || $target !== $currentTarget) return;
    const href = $currentTarget.href;
    if (!href) return;

    const { callbackOption: cb } = this.props;
    if (cb?.func && cb.runPosition === "beforePushState") {
      const execFunc = cb.func();
      const isBooleanFunc = typeof execFunc === "boolean";
      if (isBooleanFunc && !execFunc) return;
    }

    window.history.pushState({ href }, "", href);

    const { routerInfo, publisherList } = this.props;
    const componentName = `${this.constructor.name}(${this.componentId})`;
    renderPath({ href, componentName, routerInfo, publisherList });
    if (cb?.func && cb.runPosition === "afterRenderPath") cb.func();
  }
}

export default RouterLink;
