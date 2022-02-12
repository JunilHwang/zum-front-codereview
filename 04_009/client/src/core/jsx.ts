/* eslint-disable no-param-reassign */
type TState = Record<string, any>;

export interface IJsx {
  type: string;
  props: TState;
  children: any[] | IJsx[];
}

function jsx(type: string, props: TState, ...children: any[] | IJsx[]): IJsx {
  const nextChildren: IJsx[] = [];
  children.forEach((child) => {
    if (child !== false && child !== undefined) nextChildren.push(child);
  });
  if (props) {
    Object.keys(props).forEach((key) => {
      if (props[key] === false || props[key] === undefined) delete props[key];
    });
  }
  return { type, props, children: nextChildren.flat() };
}

export default jsx;
