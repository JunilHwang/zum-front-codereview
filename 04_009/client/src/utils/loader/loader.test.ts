import { addLoader } from '.';

const requestEvent = new CustomEvent('request');
const requestEndEvent = new CustomEvent('request-end');

describe('add-loader', () => {
  it('toggle class after dispatch event', () => {
    const { body } = document;
    addLoader(body);
    window.dispatchEvent(requestEvent);
    expect(body.classList.contains('show')).toBeTruthy();
    window.dispatchEvent(requestEndEvent);
    expect(body.classList.contains('show')).not.toBeTruthy();
  });
});
