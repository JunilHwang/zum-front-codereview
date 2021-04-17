import { API_URL } from './request';
import fetchForAPI from './fetchForAPI';

export default function getRanking() {
  const path = `${API_URL}/best`;

  return fetchForAPI(path);
}
