/**
 * @jest-environment jsdom
 */
import { queryByText } from '@testing-library/dom';
import { createElement as h, render } from '../dom';
import { Router, Route, Switch } from '../router';

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

const original = window.location;
beforeAll(() => {
  delete window.location;
  window.location = {
    pathname: '/',
  };
});

afterAll(() => {
  window.location = original;
});

test('주소에 해당하는 노드를 렌더링', () => {
  window.location.pathname = '/foo';
  const renderRouter = () => {
    render(
      h(Router, null,
        h(Switch, null,
          h(Route, {path: '/bar'}, 'bar'),
          h(Route, null, 'baz')
        )
      ),
      container
    );
  };
  renderRouter();
  expect(queryByText(container, 'bar')).toBeNull();

  window.location.pathname = '/bar';
  act(() => {
    renderRouter();
  });
  expect(queryByText(container, 'bar')).not.toBeNull();
});