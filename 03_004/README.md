# 줌인터넷 프론트엔드 과제

## 개발 환경

- MacOS Big Sur 11.4
- node v14.17.3
- npm v6.14.13

## 설치 및 실행
### 1. 패키지 설치
```
npm install
```

### 2. 서버 실행
```
npm run server
```

### 3. 웹 서버 실행
```
npm start
```
브라우저에서 [http://localhost:8080](http://localhost:8080) 페이지 열기. (웹팩 개발 서버 실행시 브라우저 자동 오픈)

## 프로젝트 구조

```
.  
├── 📁 server             > API 서버
├── 📁 src                > 클라이언트 코드
|   ├── 📁 component      > 컴포넌트들
|   ├── 📁 core           > 프론트엔드 코어 클래스
|   ├── 📁 types          > 타입 정의
|   ├── 📁 store          > 전역 상태 저장소 및 초기 state와 mutation
|   ├── 📝 app.ts
|   └── 📝 config.ts
├── 📁 style              > 컴포넌트 스타일들
├── 📝 index.html
├── 📝 index.ts
├── 📝 webpack.config.js
├── 📝 tsconfig.json
├── 📝 .babelrc
├── 📝 package.json
└── 📝 package-lock.json
```
