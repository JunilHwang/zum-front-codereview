import Loader from '@/components/loader';

// fetch 함수 실행시 커스텀 이벤트를 발생시켜 전체에 로딩을 건다.

let requestCount = 0;

export const addLoader = (target: HTMLElement) => {
  new Loader(target);

  window.addEventListener('request', () => {
    requestCount++;
    target.classList.add('show');
  });

  window.addEventListener('request-end', () => {
    requestCount--;
    if (requestCount === 0) target.classList.remove('show');
  });
};
