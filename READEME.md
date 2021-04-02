# ZUM 과제

## Vanila Javascript로 SPA 만들기

### node express 사용

> 구현한 부분

- 제공되어지는 JSON을 이용하여 express를 이용하여 api router 생성해 res.json()으로 data를 불러왔습니다.
- router를 이용하여 새로고침 없이 페이지 이동
- /path 값을 만들어서 window.history.pushState로 path 뒤에 값을 넣었습니다.
- path값을 가져와 id를 이용해서 render함수를 호출해 새로고침 없이 페이지를 생성했습니다.
- 이벤트 위임을 사용하여 nav에 이벤트를 걸어 api를 호출하도록 진행했습니다.

* '/'로 이동할때, 메인페이지에서 button으로 클릭시에만 새로고침 발생. navigation에서 이동할때는 새로고침 발생안하는 spa방식 이용

* 반응형으로 UI 생성

- npm run start > local host: 3000에서 작동

> 구현하지 못한 부분

- 웹팩과 바벨 설정을 진행했는데 main.js에서 api값을 호출해 오지 못했습니다.
- 웹팩을 이용하여 랜더링을 진행하면 오류가 발생했습니다.

* npm run dev / npm run build 하면 오류가 발생
* 즐겨찾기 부분 구현못함
* 상세페이지
