export type commonProps<P> = P & {
  children?: Element[] | undefined;
  className?: string;
  textContent?: string;
  id?: string;
};

export interface FunctionComponent<P = {}> {
  (props: commonProps<P>): Element;
}
