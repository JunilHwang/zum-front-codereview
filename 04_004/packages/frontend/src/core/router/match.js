function pathnameToRegExp(pathname) {
  return pathname
    .replace(/(?<![.\]])[*]/, '.*')
    .replace(/(?<=\/)\:([a-zA-Z_]+)/, '(?<$1>[^/]+)')
    .replace(/\//g, '\\/');
}

export function matchPath(pathname, props = {}) {
  if (!props.path) {
    return null;
  }
  const pathRegex = '^' +
    pathnameToRegExp(props.path) +
    (props.exact ? '$' : '');

  const matched = new RegExp(pathRegex).exec(pathname);
  if (!matched) return null;

  return {
    params: {
      ...matched.groups
    }
  };
}

