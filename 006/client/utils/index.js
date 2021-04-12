// @ts-check
import { attributeNameMap, hubZumUrl, selectorNameMap } from "../types";

/**
 * selectOne
 * - querySelector 메서드로 해당 element 하나만 반환
 * @param {string} selector CSS selector
 * @param {Document|Element|HTMLElement} parent 탐색 시작하는 부모 노드
 * @returns {Element|HTMLElement|null} 탐색된 자식 노드
 */
export const selectOne = (selector, parent = document) =>
  parent.querySelector(selector);

/**
 * selectOne
 * - querySelectorAll 메서드로 해당 element NodeList 반환
 * @param {string} selector CSS selector
 * @param {Document|Element|HTMLElement} parent 탐색 시작하는 부모 노드
 * @returns {NodeListOf<Element|HTMLElement>|null} 탐색된 NodeList
 */
export const selectAll = (selector, parent = document) =>
  parent.querySelectorAll(selector);

/**
 * getCardData
 * - 상세페이지 이동에 필요한 카드 정보 추출
 * @param {Element|HTMLElement} cardParent card 또는 rank-card wrapper
 * @returns
 */
export const getCardData = (cardParent) => {
  const mediaParent =
    selectOne(selectorNameMap.card.media, cardParent) ||
    selectOne(selectorNameMap.rankCard.media, cardParent);
  const media = mediaParent.innerText.trim().replace("by ", "");

  const url = cardParent.getAttribute(attributeNameMap.detailUrl);
  const [, idx] = url.replace(hubZumUrl, "").split("/");

  const titleDiv =
    selectOne(selectorNameMap.card.title, cardParent) ||
    selectOne(selectorNameMap.rankCard.title, cardParent);
  const title = titleDiv.innerText;

  return { idx, title, media };
};
