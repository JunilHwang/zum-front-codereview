/**
 * @jest-environment jsdom
 */
import { fireEvent } from '@testing-library/dom';
import { createElement as h, render } from '../dom';

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

test('이벤트핸들러 해제', () => {
  const mock = jest.fn();
  render(h('button', {onClick: mock}, 'click'), container);
  const button = container.querySelector('button');
  act(() => {
    fireEvent.click(button);
  });
  render(h('button', null, 'click'), container);
  act(() => {
    fireEvent.click(button);
  });
  expect(mock).toBeCalledTimes(1);
});