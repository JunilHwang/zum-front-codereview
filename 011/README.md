# ZOOM 과제


## 기술 스택
- front-end
    - vanilla javascript
    - webpack
    - babel
- back-end
    - node.js
    - express.js

### 필수 요구사항
- front-end
  - [x] webpack + babel을 이용한 개발환경 구축
  - [x] 컴포넌트 기반 설계
  - [x] SPA(Single Page Application) 기반
  - [ ] 전역 상태관리를 위한 Store 만들기
  - [ ] 이벤트 관리를 최적화하기
  - [x] XHR(ajax)관련 -> fetch만 사용
  - [ ] localstorage 사용한 즐겨찾기 구현
  - [x] UI 레이아웃 구현

- back-end
  - [x] 제공된 JSON을 토대로 API End-point 구현
  - [ ] 상세페이지는 원본 URL의 컨텐츠를 스크래핑(크롤링) 하여 사용


### 선택 요구사항
- front-end
  - [ ] 타입스크립트 사용
  - [ ] 가상돔 직접 구현해서 적용해보기(Babel JSX 같이 사용)
  - [ ] Observer Pattern을 이용해서 상태가 변경될 때 자동으로 렌더링 되도록 만들어보기
  - [ ] XHR(ajax)관련 -> 불필요한 API 요청은 취소(Abort) 하기
  - [x] 프론트엔드 코드를 webpack으로 build 하여 production code 생성하기 
  - [ ] 이미지는 Lazy Loading 사용
  - [x] webpack에 sass를 연동하여 사용
  - [x] IE11에서도 작동하는 코드 만들기(Babel, Polyfill등 사용) => babel polyfill 사용(IntersectionObserver poltfill은 추가하지 않음)

- back-end
  - [ ] 이미 조회한 데이터의 경우 캐싱(로컬 캐시) 
  - [ ] 기존에 제공되는 콘텐츠 대신 허브줌을 스크래핑(크롤링) 하여 사용


### 기능적 요구사항
- [x] 메뉴 구현(홈, 라이프, 푸드, 여행, 컬쳐)
- [x] 메인페이지(Home)
- [x] 서브페이지(라이트, 푸드, 여행, 컬쳐)
- [ ] 상세페이지
- [ ] 즐겨찾기 페이지
