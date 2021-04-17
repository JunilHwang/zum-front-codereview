import { API_URL } from './request';
import fetchForAPI from './fetchForAPI';

export default function getContent(content, index, size) {
  const path = `${API_URL}/content/${content}`;
  const params = {
    index,
    size,
  };

  return fetchForAPI(path, params);
}
