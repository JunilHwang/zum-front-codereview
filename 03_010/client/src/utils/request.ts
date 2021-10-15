class HTTPError extends Error {
  private statusCode;

  constructor(statusCode: number, message?: string) {
    super(message);
    this.name = 'HTTPError';
    this.statusCode = statusCode;
  }

  showErrorMessage() {
    throw `상태코드 ${this.statusCode} 에러`;
  }
}

const request = async (url: string, option = {}) => {
  try {
    const res = await fetch(url, option);
    if (!res.ok) throw new HTTPError(res.status);

    const data = await res.json();

    return data;
  } catch (e: any) {
    if (e instanceof HTTPError) e.showErrorMessage();
    throw new Error('데이터를 가져오는 데 실패하였습니다.');
  }
};

export { request };
