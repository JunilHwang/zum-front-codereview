import { Component, Props, TargetType } from "@src/core";
import { MainPublisherState } from "@src/core/Store";
import "./style.scss";

type DefaultSelectBoxProps = Pick<MainPublisherState, "numPostList">;
interface SelectBoxProps extends Props, DefaultSelectBoxProps {
  selectedValue?: string | number;
}

class SelectBox extends Component<{}, SelectBoxProps> {
  constructor(protected readonly $target: TargetType, protected props: SelectBoxProps) {
    super($target, props);
  }

  protected setTemplate(): string {
    const { componentId, props } = this;
    const { numPostList, selectedValue } = props;
    if (!numPostList.length) return ``;
    return `
    <select class="app-selectbox" data-component-id=${componentId}>
      ${numPostList.map((v) => `<option value=${v} ${selectedValue === v ? 'selected' : ''}>${v}</option>`).join("")}
    </select>
    `;
  }
}

export default SelectBox;
