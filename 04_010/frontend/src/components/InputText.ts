import EventManager from "../core/eventManager";
import { input } from "../core/h";

type Props = {
  placeholder: string;
  className: string;
  onChange: Function;
  value?: string;
};

function InputText() {
  return {
    template: ({ className, placeholder, onChange, value }: Props) => {
      EventManager.addEventHandler(className, "change", onChange);
      return input({
        type: "text",
        class: className,
        placeholder,
        value,
      });
    },
  };
}

export default InputText;
