import { DetailPageBottomBar, DetailPageContent } from "@src/compositions";
import { Component, createQueryStrings } from "@src/core";
import "./style.scss";

class DetailPage extends Component {
  protected setTemplate(): string {
    const { componentId } = this;
    return `<div class="detail__page default-page-size" data-component-id=${componentId}></div>`;
  }

  protected setChildren(): void {
    const serach = new URL(window.location.href).search;
    const dataId = (createQueryStrings(serach)?.find((v) => v.key === "id")?.value);

    new DetailPageContent(".detail__page", { dataId });
    new DetailPageBottomBar(".detail__page", { dataId });
  }
}
export default DetailPage;
