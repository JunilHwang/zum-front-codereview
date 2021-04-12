// @ts-check
import { selectOne } from ".";
import {
  attributeNameMap,
  lazyLoadingClassMap,
  selectorNameMap,
} from "../types";

const defaultOptions = {
  root: selectOne(selectorNameMap.intersection),
  threshold: 0.25,
};

/**
 * lazy loading
 * @param {NodeListOf<HTMLElement|Element>} imgsParent img 감싸고 있는 div 배열
 * @param {attributeNameMap} imgSelector default "img.lazy"
 */
const lazyLoading = (
  imgsParent,
  imgSelector = selectorNameMap.image.lazy,
  options = defaultOptions
) => {
  if (!imgsParent.length) return;

  const io = new IntersectionObserver((entries) => {
    // 함수 호출 메모리 줄이기 위해
    // forEach/map 대신 loop 사용
    for (const { target, isIntersecting } of entries) {
      if (!isIntersecting) continue;

      const img = selectOne(imgSelector, target);
      if (!img?.dataset?.imgsrc) continue;

      // lazyloading 효과를 주기 위해 타이머 사용
      setTimeout(() => {
        img.src = img.dataset.imgsrc;
        img.removeAttribute(attributeNameMap.imgsrc);
        img.classList.remove(lazyLoadingClassMap.lazy);
        img.classList.add(lazyLoadingClassMap.loaded);
        img.style.backgroundImage = `url: "${img.src}"`;
      }, 300);
    }
  }, options);

  for (const parent of imgsParent) {
    io.observe(parent);
  }
};

export default lazyLoading;
