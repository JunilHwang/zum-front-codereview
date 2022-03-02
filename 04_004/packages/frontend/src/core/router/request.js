import { Cache } from '@/core/util';

class RequestCache extends Cache {
  set(key, value) {
    return super.set(`request:${key}`, value);
  }

  get(key) {
    return super.get(`request:${key}`);
  }

  has(key) {
    return super.has(`request:${key}`);
  }

  delete(key) {
    return super.delete(`request:${key}`);
  }
}
export const cache = new RequestCache();

export async function request(url, options = {}) {
  const abortController = new AbortController();
  const method = options.method || 'GET';
  if (cache.has(url)) {
    if (method.toUpperCase() === 'GET') {
      return cache.get(url);
    }
    cache.delete(url);
  }
  const response = await fetch(url, {
    signal: abortController.signal,
    ...options
  });

  if (400 <= response.status) {
    const result = await response.json();
    response.result = result;
    throw response;
  }

  const result = await response.json();
  cache.set(url, result);

  return result;
}
