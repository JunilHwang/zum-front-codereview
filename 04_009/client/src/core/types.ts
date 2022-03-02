export type TState = Record<string, any>;

export interface IRouterState {
  pathname: string;
  query: TState;
  params: TState;
  push: (pathname: string) => void;
  goBack: () => void;
}

export interface ClassContructor {
  new (target: HTMLElement, props?: TState): void;
}

export interface IRoute {
  path: string;
  component: ClassContructor;
}
