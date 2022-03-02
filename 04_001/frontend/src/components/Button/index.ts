import { Component, Props, TargetType } from "@src/core";
import "./style.scss";

type DefaultButtonProps = Pick<HTMLButtonElement, "name"> & Partial<Pick<HTMLButtonElement, "type">>;
interface ButtonProps extends Props, DefaultButtonProps {
  text: string;
}

class Button extends Component<{}, ButtonProps> {
  constructor(protected readonly $target: TargetType, protected props: ButtonProps) {
    super($target, props);
  }
  protected setTemplate(): string {
    const { componentId, props } = this;
    return `<button class="app-button" ${this.createStringAttribute("text")} data-component-id=${componentId}>${
      props.text
    }</button>`;
  }
}

export default Button;
