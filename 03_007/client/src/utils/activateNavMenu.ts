const activateNavMenu = (
  menuNode: HTMLElement,
  current: HTMLElement | Element,
) => {
  // selected class 제거
  menuNode.querySelector('.selected')?.classList.remove('selected');

  // selected class 추가
  !Array.from(current.classList).includes('selected') &&
    current.classList.add('selected');
};
export default activateNavMenu;
