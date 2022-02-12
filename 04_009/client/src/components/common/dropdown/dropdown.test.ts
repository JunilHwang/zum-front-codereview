import { getByText } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import Dropdown from '.';

const renderComplex = () => {
  const { body } = document;
  const $target = document.createElement('div');
  body.appendChild($target);
  const dropdowns = ['치킨', '피자'];
  const changeText = (dropdown: any) => `${dropdown}chagne`;
  const selectedDropdown = '치킨';
  const eventHandler = jest.fn();
  new Dropdown($target, { dropdowns, changeText, selectedDropdown, eventHandler: () => eventHandler() });
  jest.runAllTimers();
  const dropdonwWrapper = () => $target.querySelector('.dropdown-wrapper') as HTMLElement;
  const dropdownButton = () => $target.querySelector('.js-dropdown') as HTMLElement;
  const dropdown = () => $target.querySelector('.dropdown') as HTMLElement;
  const dropdown1 = () => getByText(dropdown(), changeText(dropdowns[0]));
  return { dropdonwWrapper, dropdownButton, dropdown, dropdown1, eventHandler };
};

beforeEach(() => {
  jest.useFakeTimers();
  jest.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => setTimeout(callback));
});

describe('dropdown', () => {
  it('dropdown button click', () => {
    const { dropdownButton, dropdown } = renderComplex();
    expect(dropdown().classList.contains('blind')).toBe(true);
    userEvent.click(dropdownButton());
    jest.runAllTimers();
    expect(dropdown().classList.contains('blind')).toBe(false);
  });
  it('dropdown item click', () => {
    const { dropdownButton, dropdown, dropdown1, eventHandler } = renderComplex();
    userEvent.click(dropdownButton());
    jest.runAllTimers();
    userEvent.click(dropdown1());
    jest.runAllTimers();
    expect(dropdown().classList.contains('blind')).toBe(true);
    expect(eventHandler).toHaveBeenCalled();
  });
  it('snapshot', () => {
    const { dropdonwWrapper } = renderComplex();
    expect(dropdonwWrapper()).toMatchSnapshot();
  });
});
