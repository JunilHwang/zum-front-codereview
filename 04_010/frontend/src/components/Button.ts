import EventManager from "../core/eventManager";
import { button } from "../core/h";

type Props = {
  name: string;
  className: string;
  onClick: Function;
  disabled?: boolean;
};

function Button() {
  return {
    template: ({ name, className, onClick, disabled = false }: Props) => {
      EventManager.addEventHandler(className, "click", onClick);
      return button({ class: className, ...(disabled ? { disabled } : {}) }, [
        name,
      ]);
    },
  };
}

export default Button;
