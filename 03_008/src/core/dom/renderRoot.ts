const renderRoot = ($root: Element, $app: Element) => {
  const $newRoot = $root.cloneNode(false) as Element;
  // 상태를 전역으로 참조하고 있기때문에 $app은 모듈화 되어있는 컴포넌트들이 변경된 상태를 가지고 본인의 모양을 가지게 된다.
  $newRoot.appendChild($app);

  return $newRoot;
};

export default renderRoot;
