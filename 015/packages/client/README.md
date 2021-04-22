# zum-client

#### run

- `yarn dev`: webpack dev server 실행
- `yarn build`: webpack build 실행

#### requirements

##### 기본 요구사항

- [x] webpack + babel를 이용하여 개발환경 구축하기
- 컴포넌트 기반 설계
  - [x] Core를 만든 후에, 이를 사용하는 형태로 작성할 것
  - [x] 상태(State)를 기반으로 렌더링하는 형태로 작성할 것
- SPA(Single Page Application)기반
  - [x] 페이지간에 이동이 발생할 때 새로고침이 발생하지 않도록 한다.
  - [x] Router 만들어서 사용해보기
- 전역 상태관리를 위한 Store 만들기
  - [x] Vuex 혹은 Redux 등과 같은 상태관리 프레임워크 직접 만들어서 사용해보기
    - **Store구현 후, 전체 fetch 횟수를 전역상태로 저장**
- 이벤트 관리를 최적화하기
  - [ ] 불필요한 이벤트는 해제하기
  - [x] [이벤트 위임](https://ko.javascript.info/event-delegation) 사용하기
- XHR(ajax) 관련
  - [x] fetch 사용
  - [x] API 요청중(loading)/성공(scucess)/실패(fail) 등에 대한 UI 처리
  - [x] Timeout 5초
- localstorage 사용
  - [x] 즐겨찾기 데이터는 localstorage에 저장한다.

##### 선택 요구사항

- [x] 타입스크립트 사용
- [ ] 가상돔 직접 구현해서 적용해보기(Babel JSX 같이 사용)
- [x] `Observer Pattern`을 이용해서 상태가 변경될 때 자동으로 렌더링 되도록 만들어보기
  - **store에 `Observer Pattern` 적용**
- XHR(ajax) 관련
  - [ ] 불필요한 API 요청은 취소(Abort) 하기
- [x] 프론트엔트 코드를 webpack으로 build하여 production code 생성하기
- [ ] 이미지는 Lazy Loading 사용
- [x] webpack에 scss를 연동하여 사용
- [x] IE11에서도 작동하는 코드 만들기 (Babel, Polyfill 등 사용)
