// https://kdydesign.github.io/2020/10/06/spa-route-tutorial/ 참고

import MainPage from "../pages/MainPage"
import SubPage from "../pages/SubPage"
import FavoritePage from "../pages/FavoritePage"


const initialRoutes = ($target) => {
    renderHTML($target, { factory: MainPage, link: "home" });
    const regex = new RegExp(/\d/);
    window.addEventListener('hashchange', (e) => {
        if (regex.test(e.target.location.hash)) return;
        return renderHTML($target, getHashRoute())
    })
}

const getHashRoute = () => {
    const link = window.location.hash.replace('#', '');
    if (["life", "food", "trip", "culture"].includes(link)) {
        return { factory: SubPage, link };
    }
    if (link === "favorite") {
        return { factory: FavoritePage, link };
    }

    return { factory: MainPage, link };
}


const renderHTML = ($target, { factory, link }) => {
    new factory($target, link);
}

export {
    initialRoutes
}