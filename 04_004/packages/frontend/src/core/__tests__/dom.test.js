/**
 * @jest-environment jsdom
 */
import { fireEvent, getByText, queryByText } from '@testing-library/dom';
import { createElement as h, render, Component, createRef } from '../dom';

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

describe('render', () => {
  test('hello world 렌더링', () => {
    render(h('h1', null, 'hello world'), container);
    expect(container).toMatchSnapshot();
  });

  test('hello world 컴포넌트 렌더링', () => {
    class App extends Component {
      render() {
        return h('h1', null, 'hello world');
      }
    }
    render(h(App), container);
    expect(container).toMatchSnapshot();
  });

  describe('변경사항 적용', () => {
    test('텍스트 노드 변경', () => {
      render(h('h1', null, 'hello world'), container);
      const header = getByText(container, 'hello world');
      act(() => {
        render(h('h1', null, 'foobar'), container);
      });
      expect(header.textContent).toBe('foobar');
    });

    test('속성 변경', () => {
      render(h('a', {href: 'https://www.google.com/'}, 'go!'), container);
      const link = container.querySelector('a[href="https://www.google.com/"]');
      act(() => {
        render(h('a', {href: 'https://github.com/'}, 'go!'), container);
      });
      expect(link.href).toBe('https://github.com/');
    });

    test('boolean값 속성', () => {
      render(h('button', {type: 'button', disabled: true}, 'click'), container);
      const button = container.querySelector('button[disabled]');
      expect(button).not.toBeNull();
      act(() => {
        render(h('button', {type: 'button', disabled: false}, 'click'), container);
      });
      expect(button.getAttribute('disabled')).toBeNull();
    });

    test('이벤트리스너 제어', () => {
      const mock = jest.fn();
      render(h('button', {type: 'button', onClick: mock}, 'click'), container);
      act(() => {
        fireEvent.click(container.querySelector('button'));
      });
      expect(mock).toBeCalledTimes(1);
      render(h('button', {type: 'button'}, 'click'), container);
      act(() => {
        fireEvent.click(container.querySelector('button'));
      });
      expect(mock).toBeCalledTimes(1);
      render(h('button', {type: 'button', onClick: mock}, 'click'), container);
      act(() => {
        fireEvent.click(container.querySelector('button'));
      });
      expect(mock).toBeCalledTimes(2);
    });
  });
});

describe('Component', () => {
  describe('생명주기 메서드', () => {
    test('componentDidMount', () => {
      class App extends Component {
        componentDidMount() {
          this.props.mock();
        }

        render() {
          return null;
        }
      }
      const mock = jest.fn();
      act(() => {
        render(h(App, {mock}), container);
      });
      expect(mock).toBeCalled();
    });

    test('componentWillUnmount', () => {
      class Children extends Component {
        componentWillUnmount() {
          this.props.mock();
        }

        render() {
          return null;
        }
      }

      class App extends Component {
        render() {
          return this.props.show && h(Children, {mock: this.props.mock});
        }
      }
      const mock = jest.fn();
      act(() => {
        render(h(App, {show: true, mock}), container);
      });
      act(() => {
        render(h(App, {show: false, mock}), container);
      });
      expect(mock).toBeCalled();
    });
  });

  describe('props', () => {
    test('props값을 이용한 렌더링', () => {
      class App extends Component {
        render() {
          return h('h1', null, this.props.message);
        }
      }
      render(h(App, {message: 'hi'}), container);
      expect(queryByText(container, 'hi')).not.toBeNull();
    });

    test('onClick 이벤트리스너', () => {
      class Counter extends Component {
        constructor(props) {
          super(props);

          this.state = {count: 0};
        }

        increment() {
          this.setState({
            count: this.state.count + 1,
          });
        }

        render() {
          return h('div', null,
            h('span', null, this.state.count),
            h('button', {onClick: this.increment.bind(this)}, 'click')
          );
        }
      }
      act(() => {
        render(h(Counter), container);
      });
      const button = getByText(container, 'click');

      act(() => {
        fireEvent.click(button);
      });
      expect(queryByText(container, '1')).not.toBeNull();
    });
  });
});

test('createRef', () => {
  const buttonRef = createRef();
  expect(buttonRef.current).toBeNull();
  render(h('button', {ref: buttonRef}, 'click'), container);
  expect(buttonRef.current).not.toBeNull();
});