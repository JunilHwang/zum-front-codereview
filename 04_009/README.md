# basic-crud

## 기술 스택

### client

![typeScript](https://img.shields.io/badge/typescript-007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)
![babel](https://img.shields.io/badge/babel-%23F9DC3E.svg?style=for-the-badge&logo=babel&logoColor=black)
![jest](https://img.shields.io/badge/jest-C21325.svg?style=for-the-badge&logo=jest&logoColor=white)

### server

![typeScript](https://img.shields.io/badge/typescript-007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![nodeJS](https://img.shields.io/badge/node.js-43853D.svg?style=for-the-badge&logo=node.js&logoColor=white)
![express.js](https://img.shields.io/badge/express.js-404d59.svg?style=for-the-badge&logo=express&logoColor=61DAFB)
![jest](https://img.shields.io/badge/jest-C21325.svg?style=for-the-badge&logo=jest&logoColor=white)
![supertest](https://img.shields.io/badge/supertest-009688.svg?style=for-the-badge&logo=supertest&logoColor=white)
![winston](https://img.shields.io/badge/winston-black.svg?style=for-the-badge)

### 프로젝트 설명

- 간단한 crud, 검색 프로젝트
- 상테관리, 컴포넌트, 라우터 직접 구현
- diff 알고리즘, 이벤트 해제, 로컬 캐시 적용
- 간단한 json db 사용, 서버 내부의 변수를 이용한 캐시 적용

### 프로젝트 구조

### clinet

```
client
├── config
│ ├─webpack.common.js
│ ├─webpack.dev.js
│ ├─webpack.prod.js
├── public
│ ├─favicon.png
│ ├─index.html
├── src
│ ├─assets
│ ├─components
│ ├─constants
│ ├─core
│ ├─custom-types
│ ├─pages
│ ├─store
│ ├─styles
│ ├─utils
│ ├─app.tsx
│ └─index.tsx
├─.eslintrc.json
├─.prettierrc
├─jest.config.js
├─package.json
├─setup-test.ts
├─tsconfig.json
└─yarn.lock
```

### server

```
server
├── src
│ ├─__test__
│ ├─config
│ ├─constants
│ ├─controllers
│ ├─custom-types
│ ├─entity
│ ├─error
│ ├─loaders
│ ├─middlewares
│ ├─repositories
│ ├─routes
│ ├─services
│ ├─types
│ ├─validation
│ ├─server.ts
│ └─app.ts
├─.dev.env
├─.env
├─.eslintrc.json
├─.mock.env
├─.prettierrc
├─.test.env
├─jest.config.ts
├─package.json
├─tsconfig.json
└─yarn.lock
```

### 시작하기

- `server` 디렉토리의 .mock.env 파일을 참고해서 .env(.dev.env, .test.env) 파일을 생성해주세요(DB에 넣은 값을 이름으로 json 파일을 만듭니다. ex) DB=db => db.json)
- yarn seed(:prod, :div)로 씨드 데이터를 생성할 수 있습니다.
- 다음 명령어로 pm2 설치 후 yarn prod를 실행해야 합니다. 그렇지않다면 yarn prod:basic을 이용해 서버를 실행해주세요

```
yarn global add pm2
pm2 install typescript`
```

#### 프론트

```
# Development
$ cd client && yarn start

# Production
$ cd server && yarn build && nginx(apache) run
```

#### 서버

```
# Development
$ cd client && yarn dev

# Production
$ cd server && yarn prod or yarn prod:basic
```

### 추가해야 될 것들

- 프론트 테스트(컴포넌트 렌더링 테스트, core 라이브러리 테스트)
- 상태관리를 리덕스 형식으로 교체
- core 리팩토링
- 전체적인 리팩토링
- 스타일
- 최적화

![image](https://user-images.githubusercontent.com/57904979/153343674-d357b191-cd2a-4608-8397-b8aabb869a35.png)
![image](https://user-images.githubusercontent.com/57904979/153343745-890bf2ba-223f-455e-b34d-e3846b9552ed.png)
![image](https://user-images.githubusercontent.com/57904979/153343789-115c233b-a3ba-4f87-96bd-32a577585615.png)
![image](https://user-images.githubusercontent.com/57904979/153344474-3251a717-e27f-4a26-9df1-d2f78a470c5e.png)
