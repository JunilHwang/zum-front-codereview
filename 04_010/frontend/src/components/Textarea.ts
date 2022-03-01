import EventManager from "../core/eventManager";
import { input, textarea } from "../core/h";

type Props = {
  placeholder: string;
  className: string;
  onChange: Function;
  value?: string;
};

function Textarea() {
  return {
    template: ({ className, placeholder, onChange, value }: Props) => {
      EventManager.addEventHandler(className, "change", onChange);
      return textarea(
        {
          type: "text",
          class: className,
          placeholder,
        },
        [value]
      );
    },
  };
}

export default Textarea;
