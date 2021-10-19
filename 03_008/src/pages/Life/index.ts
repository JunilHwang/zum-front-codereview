import { createElement } from '@/core/dom';
import { FunctionComponent } from '@/types';
import lifeStyle from './life.module.scss';

const { life } = lifeStyle;

export const Life: FunctionComponent = () => {
  return createElement(
    `<main class="${life}">life페이지입니다. 콘텐츠가 존재하지 않아 스크롤 유무로 페이지 이동시 레이아웃이 무너지는중입니다..</main>`
  );
};
