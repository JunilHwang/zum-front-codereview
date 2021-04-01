# ZUM FrontEnd 과제 설명 <img src="https://hub.zum.com/resources/pc/images/logo_zum_2x-78df1cde157641c8f4178f86826539e8.png" width="80px" />



### #프로젝트 준비

```
$ npm install
$ cd ./crawling
$ npm install
```

</br>



### #프로젝트 실행

1. 서버파일 실행

```
$ node server.js
```

2. http://localhost:5000/ 접속

</br>



### #Build - production code 생성

```
$ npm run build
```

- /build 디렉토리안에 production code 생성됨

</br>



### #프로젝트 구조설명

```
├── README.md                 				- 리드미 파일
│
├── client/                   				- 클라이언트 사이드 폴더
│   ├── public/           	  				- 정적 폴더
|   |     └── index.html
|   |
│   ├── src/                  				- 어플리케이션 폴더
│   │   ├── component/        				- view 컴포넌트 폴더
|	|	|	   ├── Header/				
|	|	|	   |	 ├── header.js			- Page의 header정의
|	|	|	   |	 ├── nav.js				- header 내부의 navigator 정의
|	|	|	   |	 └── navItem.js			- header 내부의 navigator 정의
|	|	|	   |
|	|	|	   └── Contents/				- Home의 Comtents 정의
|	|	|	   |	 ├── contents.js	
|	|	|	   |	 ├── contentItem.js	
|	|	|	   |	 └── item.js		
|	|	|	   |
|	|	|	   └── SubPages/				- Life, Food, Trip, Culture의 Contents 정의
|	|	|	   |	 ├── subPage.js	
|	|	|	   |	 └── subPageItem.js			
|	|	|	   |
|	|	|	   └── Rank/					- 실시간 랭킹 12 Contents 정의
|	|	|	   |	 ├── topRank.js	
|	|	|	   |	 └── rankItem.js			
|	|	|	   |
|	|	|	   └── Favorite/				- 즐겨찾기 Contents 정의
|	|	|	   |	 ├── favoritePage.js	
|	|	|	   |	 └── favoriteItem.js			
|	|	|	   |
|	|	|	   └── DetailPages/
|	|	|	   |	 ├── detailPage.js		- 상세 페이지 Contents 정의
|	|	|	   |	 └── otherList.js		- 상세페이지 내부의 목록 정의
|	|	|	   |
|	|	|	   └── mainPage.js				- Home Page 정의
|	|	|	   └── starBtn.js				- 즐겨찾기 버튼 및 기능 정의
|	|	|	   
│   │   ├── core/       	  				- Component Core 폴더
|	|	|	 ├── component.js
| 	|	|
│   │   ├── func/       	  				- 여러 기능의 함수를 담은 폴더 
|	|	|	 ├── lazyLoading.js				- 이미지 파일 Lazy Loading 정의
|	|	|	 └── throttling.js				- Scroll event 최적화를 위한 throttling 정의
| 	|	|
│   │   ├── scss/             				- Style 폴더
|	|	|	 ├── style.scss				
|	|	|	 └── sub/
| 	|	|	 	  ├── _contents.scss
| 	|	|	 	  ├── _detailPage.scss
| 	|	|	 	  ├── _header.scss
| 	|	|	 	  ├── _favoritePage.scss
| 	|	|	 	  ├── _ranking.scss
| 	|	|	 	  └── _var.scss
| 	|	|
│   │   ├── service/          				- API 서버와 통신을 위한 폴더 
|	|	|	   ├── API.js
|	|	|
│   │   └── app.js       	  				- 메인이 되는 최상위 컴포넌트
│   │   └── main.js           				- 컴포넌트와 html 연결을 정의
│   │ 	└── router.js		  				- Page Routing 정의
|   |
│   ├── crawling/               			- 상세 페이지의 원본 URL Crawling
│   │   ├── grabData.js        				- puppeteer를 활용한 Crawling 정의 
│   │ 
│   └── Data/            					- Json data 정의
│        ├── ranking.json         
│        ├── life.json
│        ├── food.json
│        ├── trip.json
│        └── culture.json
|
|
├── server.js                 				- Express Server
├── webpack.config.js               		- webpack 설정
└── .babelrc             					- Babel 설정

```

</br>



