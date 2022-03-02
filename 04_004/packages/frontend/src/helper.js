import { kApiBasePath } from './constant';

export function stripMultiSlashes(pathname) {
  return pathname.replace(/\/{2,}/g, '/');
}

export function stripTypeNamespace(type, seperator = '/') {
  return type.split(seperator).slice(1).join(seperator);
}

export function urlFor({ type, payload }, prev = '/') {
  switch (type) {
    case 'write':
      return prev + 'write';
    case 'read':
      return prev + payload.id;
    case 'list':
      return prev;
    default:
      return urlForApi({
        type: stripTypeNamespace(type),
        payload,
      });
  }
}

export function urlForApi({ type, payload }, prev = `${kApiBasePath}/`) {
  switch (type) {
    case 'delete':
    case 'read':
      return prev + 'articles/' + payload.id;
    case 'write':
    case 'list':
      return prev + 'articles';
    default:
      return prev;
  }
}
