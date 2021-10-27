import { Component, StoreOptions } from "@src/core";

type ComponentConstructor = {
  new (target: Element): Component;
};
type State = { [key: string]: any };
type Props = State;
type ComponentOptions = {
  stopInit: boolean;
  keepAdding: boolean;
};

type ComponentStoreOptions = StoreOptions & { isSetEvents?: boolean };
type SetStateOptions = { notUsedRender?: boolean; customTemplate?: string, customFunc?: () => void };

export type { ComponentConstructor, State, Props, ComponentOptions, ComponentStoreOptions, SetStateOptions };
