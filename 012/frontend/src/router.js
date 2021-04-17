import Home from "./components/Home.js";
import Life from "./components/Life.js";
import Food from "./components/Food.js";
import Trip from "./components/Trip.js";
import Culture from "./components/Culture.js";
import Detail from "./components/Detail.js";

const pathToRegex = (path) =>
  new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = (match) => {
  const values = match.result.slice(1);
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
    (result) => result[1]
  );
  console.log(Array.from(match.route.path.matchAll(/:(\w+)/g)));
  return {};
};

const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

const router = () => {
  const routes = [
    { path: "/", view: Home },
    { path: "/life", view: Life },
    { path: "/food", view: Food },
    { path: "/trip", view: Trip },
    { path: "/culture", view: Culture },
    { path: "/:category/:idx", view: Detail },
    // { path: "/favorites", view: () => console.log("view favorites") },
  ];

  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      result: location.pathname.match(pathToRegex(route.path)),
    };
  });

  let match = potentialMatches.find((potentialMatch) => potentialMatch.result);

  if (!match) {
    match = {
      route: routes[0],
      isMatch: true,
    };
  }

  const view = new match.route.view(getParams(match));

  document.querySelector("#app").insertAdjacentHTML("afterbegin", view.setUp());
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      const url = e.target.getAttribute("href");
      navigateTo(url);
    }
  });

  router();
});
