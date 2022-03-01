# zum-assignment-vgihan

줌 인터넷 바닐라 자바스크립트 채용 과제입니다.

## 실행 방법

```
git clone https://github.com/vgihan/zum-assignment-vgihan-frontend.git .
yarn
yarn start
```

## 컴포넌트 구조

- 함수형 컴포넌트 구조를 설계했습니다.
- 각 컴포넌트는 아래와 같이 template에 실제 html 태그를 리턴하는 것이 아닌, virtual dom을 리턴합니다.
- 또한 이벤트를 적용할 부분은 eventManager를 통해 등록하는 데, 이후 설명드립니다.

```
function Button() {
  return {
    template: ({ name, className, onClick, disabled = false }: Props) => {
      EventManager.addEventHandler(className, "click", onClick);
      return button({ class: className, ...(disabled ? { disabled } : {}) }, [
        name,
      ]);
    },
  };
}
```

## 렌더링

- VirtualDom 객체에 virtual dom을 비교하여 real dom을 렌더링하는 함수들이 존재합니다.
- Giact 객체에 컴포넌트 별 내부 상태를 저장하고 상태 변경 시 VirtualDom 객체를 호출하여 렌더링합니다.
  ![image](https://user-images.githubusercontent.com/49841765/153843674-927a36d8-78d1-44a4-971f-a7dd0b937add.png)

## 이벤트 관리

- core의 eventManager가 target className, event 이름, handler를 모아 가상 객체로 가지고 있다가, 최초 혹은 상태 변경 이후 이벤트 위임을 통해 document에 한 번 등록합니다.

## 라우팅

- page를 mapping 해주는 객체를 하나 만들어 key로 path string을, value로 page component를 가지게 합니다.
- path variable을 사용하기 위해 첫 번째 경로만 mapping 하고 두 번째 부터는 path variable로써 이용합니다.
- location.search를 이용하여 query param을 얻습니다.
- 페이지에 대한 상태는 일반적인 useState에서 관리하는 변수와 따로 관리합니다. (useState로 관리하는 변수는 페이지 변경 시 초기화시키기 때문.)
