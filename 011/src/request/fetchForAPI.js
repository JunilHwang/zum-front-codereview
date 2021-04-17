import { BASE_URL } from './request';

const timeoutPromise = new Promise((resolve, reject) => {
  setTimeout(resolve, 1000, 'timeout');
});

export default async function fetchForAPI(path, params = {}) {
  const url = new URL(path, BASE_URL);
  Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));

  // const result = await Promise.race([fetch(url), timeoutPromise]);
  const result = await fetch(url);
  const response = await result.json();

  if (result.ok) {
    return response;
  }
}
