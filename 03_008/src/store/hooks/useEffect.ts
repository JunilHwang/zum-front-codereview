export const createUseEffect = () => {
  // 처음엔 무조건 callback을 호출하게끔 구현
  let hasChanged = true;
  let oldDeps: Array<any> = [];

  const useEffect = (callback: Function, deps: Array<any>) => {
    if (hasChanged) callback();

    // deps가 비었다면 항상 false를 반환한다.
    hasChanged = deps.some((d, i) => !Object.is(d, oldDeps[i]));

    // 이전에 전달한 deps의 값과 비교하기 위해 자유변수에 할당시켜준다.
    oldDeps = deps;
    // 사실 useState를 기반으로 구현한것이 아니라 아직 상태값을 deps로 넘겨주기에는 무리가 있을수도...
  };

  return useEffect;
};
