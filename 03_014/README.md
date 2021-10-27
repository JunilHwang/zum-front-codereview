# zum-exam

2021.10.15 (10:00) ~ 2021.10.21 (10:00) / [ZUM] 프론트엔드 과제

## 1. 사용 기술

<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=HTML5&logoColor=white"/>&nbsp;<img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=CSS3&logoColor=white"/>&nbsp;<img src="https://img.shields.io/badge/Sass-CC6699?style=flat-square&logo=Sass&logoColor=white"/>&nbsp;<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"/>&nbsp;<img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white"/>&nbsp;<img src="https://img.shields.io/badge/Babel-F9DC3E?style=flat-square&logo=Babel&logoColor=white" />&nbsp;<img src="https://img.shields.io/badge/Webpack-8DD6F9?style=flat-square&logo=Webpack&logoColor=white" />

## 2. 실행

### 1) Frontend
```sh
# Development
$npm start

# Production (build 파일 생성)
$npm run production
```

### 2) Backend
```sh
# Development (일반 서버 실행)
$npm start

# Production (Frontend 배포 파일 적용)
$npm run production
```


## 3. 데모
<img src="https://user-images.githubusercontent.com/33610315/138142542-ee63e567-e9c8-47b3-a8d7-70fc709edce1.gif" width= 800 />


## 4. 구조
```
.
├── README.md
├── backend
│   ├── front_build_files
│   │   └── (build Files)
│   ├── package-lock.json
│   ├── package.json
│   ├── src
│   │   ├── app.ts
│   │   ├── data
│   │   │   ├── culture.json
│   │   │   ├── food.json
│   │   │   ├── index.ts
│   │   │   ├── life.json
│   │   │   ├── ranking.json
│   │   │   └── travel.json
│   │   ├── routes
│   │   │   ├── best.ts
│   │   │   ├── content.ts
│   │   │   ├── detail.ts
│   │   │   └── index.ts
│   │   └── utils
│   │       ├── consts.ts
│   │       ├── funcs.ts
│   │       ├── index.ts
│   │       └── types.ts
│   └── tsconfig.json
└── frontend
    ├── package-lock.json
    ├── package.json
    ├── public
    │   ├── images
    │   │   └── (Image Files)
    │   └── index.html
    ├── src
    │   ├── App.scss
    │   ├── App.ts
    │   ├── components
    │   │   ├── DetailDesc
    │   │   ├── DetailTitle
    │   │   ├── ErrorView
    │   │   ├── LoadingView
    │   │   ├── Logo
    │   │   ├── Nav
    │   │   ├── RankingItem
    │   │   ├── RankingList
    │   │   ├── TabContentItem
    │   │   ├── TabContentList
    │   │   └── index.ts
    │   ├── composition
    │   │   ├── DetailSection
    │   │   ├── Header
    │   │   ├── RankingSection
    │   │   ├── TabSection
    │   │   └── index.ts
    │   ├── core
    │   │   ├── Component.ts
    │   │   ├── Router.ts
    │   │   ├── Store.ts
    │   │   └── index.ts
    │   ├── global.d.ts
    │   ├── index.ts
    │   ├── pages
    │   │   ├── DetailPage
    │   │   ├── FavoritePage
    │   │   ├── HomePage
    │   │   ├── SubPage
    │   │   ├── common.scss
    │   │   └── index.ts
    │   └── utils
    │       ├── consts.ts
    │       ├── funcs
    │       │   ├── dataFetching.ts
    │       │   ├── index.ts
    │       │   ├── localStorageFuncs.ts
    │       │   └── utilFuncs.ts
    │       ├── store
    │       │   ├── appStore.ts
    │       │   └── index.ts
    │       ├── style
    │       │   ├── common.scss
    │       │   └── reset.scss
    │       └── types
    │           ├── common.ts
    │           ├── component.ts
    │           ├── core.ts
    │           ├── dataFetching.ts
    │           ├── index.ts
    │           └── router.ts
    ├── tsconfig.json
    └── webpack.config.js
```

---

[Feature List](https://github.com/17-sss/zum-exam/issues/1)
