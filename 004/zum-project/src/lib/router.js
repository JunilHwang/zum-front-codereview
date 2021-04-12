export const routerPush = (pathName) => {
    // 새로고침하지 않고 주소를 변경
    window.history.pushState({}, pathName, window.location.origin + pathName);
};

export const routerInit = (cb) => {
    cb('/');
    // 뒤로가기
    window.onpopstate = () => {
        cb(window.location.pathname);
    };
};
