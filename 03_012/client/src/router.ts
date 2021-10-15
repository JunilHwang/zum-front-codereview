const NAV_SELECTOR = 'a[data-nav]';
const ROUTE_PARAMETER_REGEXP = /:(\w+)/g
const URL_FRAGMENT_REGEXP = '([^\\/]+)'
const TIC_TIME = 250;

type Callback = (prams?) => void;

interface Route {
	testRegExp: RegExp;
	callback: Callback;
	params: string[];
}

interface Routerable {
	checkRoutes?: () => void;
	addRoute?: (path: string, callback: Callback) => Routerable;
	navigate?: (path: string) => void;
	setNotFound?: (callback: Callback) => Routerable;
	start?: () => Routerable
}

const extractUrlParams = (route: Route, pathname: string) => {
	if (route.params.length === 0) {
		return {};
	}

	const params = {};

  const matches = pathname
    .match(route.testRegExp);

  matches.shift();

  matches.forEach((paramValue, index) => {
    const paramName = route.params[index]
    params[paramName] = paramValue
  });

  return params;
}

export default () => {
	const routes = [];
	let lastPathName: string;
	let notFound = () => {};

	const router: Routerable = {}

	router.checkRoutes = () => {
		const { pathname } = window.location;
		if (pathname === lastPathName) return;
		
		lastPathName = pathname;

		const currentRoute = routes.find((route: Route) => {
			return route.testRegExp.test(pathname)
		})
	
		if (!currentRoute) {
			notFound();
			return;
		}

		const params = extractUrlParams(currentRoute, pathname);

		currentRoute.callback(params);
	}

	router.addRoute = (path, callback) => {
    const params = []

    const parsedPath = path
      .replace(ROUTE_PARAMETER_REGEXP, (match, paramName) => {
        params.push(paramName)
        return URL_FRAGMENT_REGEXP
      }).replace(/\//g, '\\/')

    routes.push({
      testRegExp: new RegExp(`^${parsedPath}$`),
      callback,
      params
    })

    return router
  }

	router.setNotFound = (cb: Callback) => {
    notFound = cb
    return router
  }

	router.navigate = (path: string) => {
		window.history.pushState(null, null, path);
		router.checkRoutes();
	}

	router.start = () => {
		router.checkRoutes();
		window.setInterval(router.checkRoutes, TIC_TIME);
		
		document.addEventListener('click', (e) => {
			const target = <HTMLAnchorElement>e.target;
			if (target.matches(NAV_SELECTOR)) {
				e.preventDefault()
				router.navigate(target.href)
			}

			const parent = <HTMLAnchorElement>target.parentElement;
			if (parent && parent.matches(NAV_SELECTOR)) {
				e.preventDefault()
				router.navigate(parent.href)
			}
		})

		return router;
	}
	
	return router;
}