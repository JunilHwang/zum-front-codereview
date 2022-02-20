import { Node } from "./node";

export type Vdom = {
  type: keyof HTMLElementTagNameMap;
  props: {
    [key: string]: string;
  };
  children: Node[] | string[];
};
