export default class API {
  constructor() {}
  async getResult(url) {
    try {
      const response = await fetch(url);
      const rank = await response.json();
      return rank;
    } catch (err) {
      alert('api에러');
    }
  }
}
