type TParams = Record<string, string>;

const getQuery = () => {
  const { search } = window.location;
  const queries = new URLSearchParams(search);
  const query: TParams = {};
  queries.forEach((value, key) => {
    query[key] = value;
  });
  return query;
};

const pathValidation = (currentPath: string[], routePath: string[]) => {
  if (currentPath.length !== routePath.length) return false;
  const params: TParams = {};
  for (let index = 0; index < currentPath.length; index++) {
    if (/^:/.test(routePath[index])) {
      params[routePath[index].slice(1)] = currentPath[index];
      continue;
    }
    if (currentPath[index] !== routePath[index]) {
      return false;
    }
  }
  return params;
};

export { getQuery, pathValidation };
