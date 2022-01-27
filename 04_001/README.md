# zum-board
2022.01.16 ~ 2022.01.24 / [ZUM] 프론트엔드 과제

## 1. 사용 기술

<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=HTML5&logoColor=white"/>&nbsp;<img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=CSS3&logoColor=white"/>&nbsp;<img src="https://img.shields.io/badge/Sass-CC6699?style=flat-square&logo=Sass&logoColor=white"/>&nbsp;<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"/>&nbsp;<img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white"/>&nbsp;<img src="https://img.shields.io/badge/Babel-F9DC3E?style=flat-square&logo=Babel&logoColor=white" />&nbsp;<img src="https://img.shields.io/badge/Webpack-8DD6F9?style=flat-square&logo=Webpack&logoColor=white" />

## 2. 실행

### 1) Frontend
```sh
# Development
$npm start

# Production (build 파일 생성)
$npm run build
```

### 2) Backend
```sh
# Development
$npm start
```

## 3. 데모
<img src="https://user-images.githubusercontent.com/33610315/150689024-44cbd64e-106b-49d2-87a8-68800ca8deb1.gif" width= 800 />


## 4. 구조
```
.
├── README.md
├── backend
│   ├── front_build
│   │   └── (front build files)
│   ├── package-lock.json
│   ├── package.json
│   ├── src
│   │   ├── core
│   │   │   ├── ServerError.ts
│   │   │   └── index.ts
│   │   ├── data
│   │   │   └── posts.json
│   │   ├── index.ts
│   │   ├── routes.ts
│   │   └── utils
│   │       ├── constants.ts
│   │       ├── functions.ts
│   │       └── index.ts
│   └── tsconfig.json
├── common
│   └── types
│       └── index.ts
└── frontend
    ├── package-lock.json
    ├── package.json
    ├── public
    │   └── index.html
    ├── src
    │   ├── App.ts
    │   ├── components
    │   │   ├── Board
    │   │   ├── Button
    │   │   ├── Input
    │   │   ├── Pagination
    │   │   ├── SelectBox
    │   │   ├── Textarea
    │   │   └── index.ts
    │   ├── compositions
    │   │   ├── DetailPageBottomBar
    │   │   ├── DetailPageContent
    │   │   ├── EditPageBottomBar
    │   │   ├── EditPageContent
    │   │   ├── MainPageBoard
    │   │   ├── MainPageTopBar
    │   │   └── index.ts
    │   ├── core
    │   │   ├── Component
    │   │   │   ├── functions.ts
    │   │   │   ├── index.ts
    │   │   │   └── vdom.ts
    │   │   ├── CustomError
    │   │   │   └── index.ts
    │   │   ├── Router
    │   │   │   ├── functions.ts
    │   │   │   └── index.ts
    │   │   ├── RouterLink
    │   │   ├── Store
    │   │   │   ├── classes
    │   │   │   │   ├── Publisher.ts
    │   │   │   │   └── Subscriber.ts
    │   │   │   ├── editPublisher.ts
    │   │   │   ├── index.ts
    │   │   │   └── mainPublisher.ts
    │   │   └── index.ts
    │   ├── index.scss
    │   ├── index.ts
    │   ├── pages
    │   │   ├── DetailPage
    │   │   ├── EditPage
    │   │   │   └── index.ts
    │   │   ├── MainPage
    │   │   └── index.ts
    │   └── utils
    │       ├── functions
    │       │   ├── dataFetching.ts
    │       │   ├── index.ts
    │       │   ├── localStorage.ts
    │       │   └── normal.ts
    │       ├── style
    │       │   ├── common.scss
    │       │   ├── mixin.scss
    │       │   └── reset.scss
    │       └── types.ts
    ├── tsconfig.json
    └── webpack.config.js
```

---

[Feature List](https://github.com/17-sss/zum-board/issues/1)

