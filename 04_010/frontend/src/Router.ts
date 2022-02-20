import { Giact } from "./core/giact";
import { div } from "./core/h";
import Main from "./pages/Main";
import Modify from "./pages/Modify";
import Write from "./pages/Write";
import { Component } from "./types/component";

type RouterMap = {
  [path: string]: Component;
};

function Router() {
  const getPath = () => {
    const path = document.location.pathname;
    const pathVariable = path.split("/");
    const queryParams = new URLSearchParams(document.location.search);
    return {
      path: `/${pathVariable[1]}`,
      params: pathVariable.slice(2, pathVariable.length),
      query: queryParams,
    };
  };
  const map: RouterMap = {
    "/": Main,
    "/write": Write,
    "/modify": Modify,
  };
  const initPage = getPath();
  const [curPage, setCurPage] = Giact.useRouter(
    map[initPage.path]({ params: initPage.params, query: initPage.query })
  );
  const onChangeLocation = () => {
    Giact.clear();
    const nextPage = getPath();
    setCurPage(
      map[nextPage.path]({ params: nextPage.params, query: nextPage.query })
    );
  };

  window.addEventListener("route", onChangeLocation);
  window.addEventListener("popstate", onChangeLocation);

  return {
    template: () => div({ class: "router" }, [curPage().template()]),
  };
}

export default Router;
