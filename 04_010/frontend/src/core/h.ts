import { Node } from "../types/node";

const h =
  (type: keyof HTMLElementTagNameMap) =>
  (props: {}, children: Node[] = []): Node => {
    return { type, props: props || {}, children };
  };

export const div = h("div");
export const p = h("p");
export const a = h("a");
export const ul = h("ul");
export const li = h("li");
export const button = h("button");
export const input = h("input");
export const span = h("span");
export const textarea = h("textarea");
