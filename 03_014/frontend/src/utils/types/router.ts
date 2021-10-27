import { ComponentConstructor } from "@src/utils/types";
import { PathType } from "./common";

type RouteInfo = {
  path: PathType;
  Component?: ComponentConstructor;
};

type RoutePathInfo = { paths: string[]; mainPath: string };

export type { RouteInfo, RoutePathInfo };
