import { FunctionComponent } from '../dom';

export interface Route {
  path: string;
  component: FunctionComponent;
}

export interface Router {
  (routes: Route[]): Element;
}
