import { IError } from '@/types/IError';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

const requestEvent = new CustomEvent('request');
const requestEndEvent = new CustomEvent('request-end');

const getUrl = (url: string): string => {
  const baseUrl = process.env.NODE_ENV === 'development' ? '' : `http://${window.location.hostname}:4000`;
  const realUrl = baseUrl + url;
  return realUrl;
};

async function request<T>(method: Method, url: string, body?: unknown): Promise<T> {
  window.dispatchEvent(requestEvent);
  try {
    const realUrl = getUrl(url);
    const option: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: body ? JSON.stringify(body) : undefined,
    };
    const res = await fetch(realUrl, option);
    const data = await res.json();
    if (res.status >= 400) throw data;
    return data;
  } catch (err) {
    const { errorMessage } = err as IError;
    if (errorMessage) alert(errorMessage);
    throw err;
  } finally {
    window.dispatchEvent(requestEndEvent);
  }
}

export default request;
