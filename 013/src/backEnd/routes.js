const API = "/api"

const BEST = "/best"
const CATEGORY = "/content/:category"
const CATEGORY_DETAIL = "/content/:category/:idx"
const DETAIL = "/detail/:url"

const HOME = "/"

const routes = {
    api: API,
    best: BEST,
    category: CATEGORY,
    category_detail: CATEGORY_DETAIL,
    detail: DETAIL,
    home: HOME
}

export default routes;