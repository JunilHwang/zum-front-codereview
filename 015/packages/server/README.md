# zum-server

#### run

- `yarn server:dev`: api 서버 실행
- `yarn crawler:start`: 크롤러 실행

#### requirements

##### 기본 요구사항

- [x] 제공된 JSON을 토대로 API End-point 만들기
- [x] 상세페이지는 원본 URL의 컨텐츠를 스크래핑(크롤링) 하여 사용한다. (`puppeteer 사용`)
- 이미 조회한 데이터의 경우 캐싱을 하여 사용한다.
  - [x] **최대 5개 요청을 로컬 캐싱**

##### 선택 요구사항

- 기존에 제공되는 콘텐츠 대신에 허브줌([https://hub.zum.com/](https://hub.zum.com/))을 스크랩핑(크롤링) 하여 사용하기
  - [x] 10분 주기로 스크랩핑 하여 사용한다.
  - [x] 스크랩핑 후에 JSON으로 저장 후 다음 요청 부턴 해당 JSON 데이터 사용
  - [x] JSON 저장 시 원본 내용을 덮어쓰는게 아니라 원본 내용에 추가되어야 한다.
    - ex) 40개 → 80개 → 120개
    - 컨텐츠 순서는 최신순으로 쌓여야함
