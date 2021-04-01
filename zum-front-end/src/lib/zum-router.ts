/*
 * Title: ZUM Router
 * Description: Hash Location-based router for SPA implementation
 * Author : Seokhyeon Jang (coolman555@me.com)
 */

import zum from "./zum";
interface route {
  path: string;
  component: any;
}

// Hash Route
export function zumRoute(object: Array<route>): void {
  // Must be hash route
  if (window.location.hash === "") {
    location.href = "#/";
  }

  object.forEach((routeList) => {
    const hash = window.location.hash.indexOf('?') !== -1 ? window.location.hash.slice(0, window.location.hash.indexOf('?')) : window.location.hash;
    if ("#" + routeList.path === hash) {
      new zum(() => routeList.component);
    }
  });

  // Hash Route Event Register
  if (window.onhashchange === null) {
    window.onhashchange = function () {
      // remove event
      document.onscroll = null

      // scroll to the top of the page
      window.scrollTo(0, 0);


      zumRoute(object);
    };
  }
}

// Link
export function zumLink(href: string): void {
  window.location.hash = href;
}
