/**
 * @jest-environment jsdom
 */
import { fireEvent, getByText } from '@testing-library/dom';
import { createElement as h, render } from '@/core';
import { Articles } from '../Articles';

let container;
beforeEach(() => {
  container = document.createElement('div');
  jest.useFakeTimers();
});

afterEach(() => {
  container.innerHTML = '';
  jest.useRealTimers();
});

const act = callback => {
  callback();
  jest.runAllTimers();
};

const articles = [
  {id: 1, title: 'foo', content: 'bar', author: 'baz', timestamp: 0}
];
test('게시글 목록 렌더링', () => {
  render(h(Articles, {articles, resort: () => {}}), container);
  expect(container).toMatchSnapshot();
});

test('작성일을 눌러 정렬 수행', () => {
  const mock = jest.fn();
  render(h(Articles, {articles, resort: mock}), container);
  act(() => {
    fireEvent.click(getByText(container, '작성일', {selector: 'a'}));
  });
  expect(mock).toBeCalled();
});

test('작성자를 눌러 검색', () => {
  const mock = jest.fn();
  render(
    h(Articles, {
      articles,
      resort: () => {},
      search: mock
    }),
    container
  );
  act(() => {
    fireEvent.click(getByText(container, 'baz', {selector: 'a'}));
  });
  expect(mock).toBeCalledWith({keyword: 'baz', page: 0, searchField: 'author'});
});