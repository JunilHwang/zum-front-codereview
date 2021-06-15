const root = document.getElementById('root');
import List from "../container/List";
import Browse from "../container/Browse";
import Write from "../container/Write";

const initRoutes = (elem: HTMLElement): void => {
    renderHTML(elem, '/');

    window.onpopstate = () => {
        renderHTML(elem, window.location.pathname)
    };
}

const pushRouter = (elem: HTMLElement, pathname: string, data?: object): void => {
    window.history.pushState(data || {}, pathname, window.location.origin + pathname);
    renderHTML(elem, pathname)
}

const renderHTML = (elem: HTMLElement, pathname: string): void => {
    switch (pathname) {
        case '/':
            (new List(root, '')).template()
            break;
        case '/browse':
            (new Browse(root, '')).template();
            break;
        case '/write':
            (new Write(root, '')).template();
            break;
    }
}

const setLinkEvent = (elem: HTMLElement, data?: object): void => {
    elem.addEventListener('click', () => {
        const pathName = elem.getAttribute('route');
        if (!pathName) return;
        pushRouter(root, pathName, data);
    })
}

export {initRoutes, pushRouter, setLinkEvent};