import { Node } from "./node";

export type Component = ({
  params,
  query,
}?: ComponentArgument) => ComponentReturnType;
export type ComponentReturnType = { template: () => Node };
export type ComponentArgument = {
  params: string[];
  query: URLSearchParams;
};
