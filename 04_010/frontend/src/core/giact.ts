import { Component, ComponentReturnType } from "../types/component";
import EventManager from "./eventManager";
import { VirtualDom } from "./virtualDom";

export const Giact = (() => {
  let _state: any = [];
  let _render: Function;
  let _root: ComponentReturnType;
  let _page: ComponentReturnType;
  let idx = 0;

  const render = (component: Component, $parent: HTMLElement) => {
    if (!_root) _root = component();
    if (!_render)
      _render = () => {
        VirtualDom.render(_root.template(), $parent);
        EventManager.regist();
      };
    _render();
  };
  const useRouter = (
    initPage: ComponentReturnType
  ): [() => ComponentReturnType, (newPage: ComponentReturnType) => void] => {
    _page = initPage;
    const getPage = () => _page;
    const setPage = (newPage: ComponentReturnType) => {
      _page = newPage;
      if (_render) _render();
    };
    return [getPage, setPage];
  };
  const useState = <T>(initState: T): [() => T, (newState: T) => void] => {
    const i = idx++;
    _state[i] = initState;
    const getState = (): T => _state[i];
    const setState = (newState: T) => {
      _state[i] = newState;
      if (_render) _render();
    };
    return [getState, setState];
  };
  const clear = () => {
    _state = _state.slice(0, 1);
    idx = 0;
  };

  return { useState, render, clear, useRouter };
})();
