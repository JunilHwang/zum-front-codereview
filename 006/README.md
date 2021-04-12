# 2021 줌 프론트엔드 과제

- [과제 요구사항](https://www.notion.so/c4c70fbaa3cd4e43a299abb0824d93a9)
- hub.zum.com UI/레이아웃 참고

![허브줌 캡쳐](https://i.imgur.com/FLyS9hYb.jpg)

## 요구사항 정리

### Front-End

- 기술스택: Vanilla JavaScript, Webpack, Babel

- 필수 요구사항

  - [x] 개발환경 구축: Webpack + Babel
  - [x] 컴포넌트 기반 설계
    - [x] Core 컴포넌트 상속해서 활용
  - [x] 상태 기반 렌더링
  - [x] SPA, Router
  - [ ] 전역 상태관리 위한 Store; Redux 구현
  - 이벤트 관리 최적화
    - [x] 이벤트 위임 사용
    - [ ] 불필요한 이벤트 해제
  - [ ] AJAX; fetch, timeout 5초, 요청전/중/후/실패에 대한 UI cjfl
  - [ ] localStorage 사용; 즐겨찾기 데이터
  - 기능

    - [x] 메뉴: HOME, 라이프, 푸드, 여행, 컬쳐, 즐겨찾기

    - 메인페이지 (HOME)

      - [x] 라이프, 푸드, 여행, 컬쳐의 상위 4개 컨텐츠 노출
        - 썸네일, 타이틀, 설명, 매체사, 즐겨찾기, 아이콘(★/☆) 등
      - [x] 실시간 TOP12
        - 순위, 제목, 매체사 등

    - 서브페이지 (라이프, 푸드, 여행, 컬쳐)

      - 각 서브페이지에 대한 컨텐츠
        - 썸네일, 타이틀, 설명, 매체사, 즐겨찾기, 아이콘(★/☆) 등
      - [ ] 한 줄 당 4개 카드
      - [ ] 처음에 총 12개 카드
      - [ ] 무한 스크롤로 최대 40개 카드

    - 상세페이지

      - [x] 메인페이지 또는 서브페이지에서 카드 클릭시 상세페이지 진입
      - [x] 타이틀, 매체사, 상세내용 등
      - [ ] 페이지 하단에 목록, 즐겨찾기 버튼

    - 즐겨찾기 페이지
      - [ ] 즐겨찾기로 지정된 컨텐츠 들
      - [ ] 제일 최근에 즐겨찾기한 순서대로

- 선택 요구사항

  - [ ] TypeScript
  - [ ] Virtual DOM
  - [ ] Observer Pattern 이용해 상태 변경시 자동 렌더링
  - [ ] AJAX 불필요한 API 요청 취소
  - [ ] Webpack build하여 production code 생성
  - [x] 이미지 lazy loading
  - [x] SCSS
  - [x] Babel, Polyfill

### Back-End

- 기술스택: Node.js, Express.js
- 필수 요구사항

  - [x] API End-point 구현
  - 크롤링
    - [x] 원본/상세페이지 원본 컨텐츠
    - `playwright` 사용
    - [Puppeteer vs. Playwright 비교](./_wiki/01.puppeteer-playwriter.md)

- 선택 요구사항

  - [ ] 이미 조회한 데이터는 최대한 간단하게 캐싱
  - 크롤링
    - [x] 10분 주기 스크래핑, JSON으로 저장 후 동일 요청에 대해 해당 JSON 데이터 사용
    - [x] JSON 저장시 원본에 계속 추가
    - [ ] 최신순 정렬

- API 명세

  - 랭킹 데이터

    ```typescript
    /** 랭킹 데이터 **/

    // Request
    GET /api/best

    // Response
    RankingContent[]

    // Interface
    interface RankingContent {
        idx: Number;        // 고유번호
        mediaName: String;  // 매체사
        title: String;      // 제목
        url: String;        // 상세페이지 URL
        imageUrl: String;   // 썸네일 URL
    }
    ```

  - 카테고리별 데이터

    ```typescript
    /** 카테고리별 데이터 **/

    // Request
    GET /api/content/:category

    // Response
    RankingContent[]

    // Interface
    interface HubContent {
        idx: Number;             // 고유번호
        mediaName: String;       // 매체사
        title: String;           // 제목
        summaryContent: String;  // 컨텐츠 미리보기
        url: String;             // 상세페이지 URL
        imageUrl: String;        // 썸네일 URL
    }
    ```

  - 상세페이지 데이터

    ```typescript
    /** 상세페이지 데이터 **/

    // Request
    GET /api/detail/:url

    // Response
    상세페이지 컨텐츠 HTML
    ```
