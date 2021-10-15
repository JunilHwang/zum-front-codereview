const _ = {
  $: <T>(
    selector: string,
    $target: HTMLElement | Document
  ): (T extends HTMLElement ? T : any) | null => {
    if ($target === document) return document.querySelector(selector);
    else if ($target) return $target.querySelector(selector);
    else throw new Error('해당 엘리먼트를 찾을 수 없습니다.');
  },
  $All: (selector: string, $target: HTMLElement | Document) => {
    if ($target === document) return document.querySelectorAll(selector);
    else return $target.querySelectorAll(selector);
  },
  on: <T>(el: Element, action: any, handler: (e: T) => void) =>
    el.addEventListener(action, handler),
};

export { _ };
