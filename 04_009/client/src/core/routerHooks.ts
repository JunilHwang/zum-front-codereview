import routerContext from './router-context';

const useHistory = () => routerContext.state;

const usePathname = () => routerContext.state.pathname;

const useQuery = () => routerContext.state.query;

const useParams = () => routerContext.state.params;

export { useHistory, useQuery, useParams, usePathname };
