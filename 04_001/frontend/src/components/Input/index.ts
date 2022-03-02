import { Component, Props, TargetType } from "@src/core";
import "./style.scss";

type DefaultInputProps = Pick<HTMLInputElement, "name" | "type"> &
  Partial<Pick<HTMLInputElement, "placeholder" | "value">>;
interface InputProps extends Props, DefaultInputProps {}

class Input extends Component<{}, InputProps> {
  constructor(protected readonly $target: TargetType, protected props: InputProps) {
    super($target, props);
  }
  protected setTemplate(): string {
    const { componentId } = this;
    return `<input class="app-input" ${this.createStringAttribute()} data-component-id=${componentId}></input>`;
  }
}

export default Input;
