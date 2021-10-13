<div id='id-section1'/>

<h1 align="center"> ZUM Junior Frontend 과제 - 이한슬</h1> 

<br />

## 📋 Table of Contents
- [과제 기간](#id-section2)
- [Getting Started](#id-section3)
- [기술 스택](#id-section4)
- [요구 사항 및 구현 여부](#id-section5)

<br />

<div id='id-section2'/>

## 🔔 Assignment Period (과제 기간)
21.09.30 ~ 21.10.06 오전 10시

<br />


<div id='id-section3'/>

## 🚀 Getting Started


### Prerequisites
- npm (>=7.21.0)
- node.js (>=14.15.1)

### Installation and usage

```sh
$ git clone https://github.com/hanseul-lee/202109_zum.git
$ cd 202109_zum
$ npm install
$ npm start
```

<br />

<div id='id-section4'/>

## 🛠 기술 스택

### **1. Front-end**
- vanilla javascript
- webpack
- babel

### **2. Back-end**
- node.js
- express.js

<br />

<div id='id-section5'/>

## 📕 요구 사항 및 구현 여부

| 구현 여부 표기 : **구현 완료**  /  *구현중*  /  ~~미구현~~

<br />

### 필수 요구사항
- Front-End
  - **구현에 필요한 프레임워크 및 라이브러리 절대 사용 금지**
  - **본인이 사용하기 편한 bundler를 이용하여 개발환경 구축하기**
  - **컴포넌트 기반 설계**
    - **Core를 만든 후에, 이를 사용하는 형태로 작성할 것**
    - **상태(State)를 기반으로 렌더링하는 형태로 작성할 것**
  - **SPA(Single Page Application)기반**
    - **페이지간에 이동이 발생할 때 새로고침이 발생하지 않도록 한다.**
    - **Router 만들어서 사용해보기**
    - **새로고침을 했을 경우에도 현재 페이지의 내용을 유지해야 한다.**
  - **전역 상태관리를 위한 Store 만들기**
    - **Vuex 혹은 Redux 등과 같은 상태관리 프레임워크 직접 만들어서 사용해보기**
  - **이벤트 관리를 최적화하기**
    - **불필요한 이벤트는 해제하기**
    - **이벤트 위임 사용하기**
  - ~~XHR(ajax) 관련~~
    - ~~API 요청중(loading)/실패(fail) 등에 대한 UI 처리~~
  - *localStorage 사용*
    - *즐겨찾기 데이터는 localStorage에 저장한다.*
  - **UI는 허브줌을 참고하여 만든다.**
    
- Back-End    
  - **제공된 JSON을 토대로 API End-point 만들기**
  - **상세페이지는 원본 URL의 컨텐츠를 스크래핑(크롤링) 하여 사용한다.**
  - ~~이미 조회한 데이터의 경우 캐싱을 통하여 관리한다.~~
    - ~~최대한 간단하게 로컬(in memory) 캐시로 구현할 것~~

<br />

### 선택적 요구 사항
- ~~타입스크립트 사용~~
- ~~가상돔 혹은 DIFF 알고리즘을 이용~~
- **Observer Pattern을 이용해서 상태가 변경될 때 자동으로 렌더링 되도록 만들어보기**
- **프론트엔드 코드를 webpack으로 build하여 production code 생성하기**
  - **이 때 서버에서 사용할 수 있는 형태로 빌드해야 한다.**
  - **즉, 서버에서 빌드된 코드를 연동하여 실행할 수 있도록 환경을 구성해야 함**
- *이미지는 Lazy Loading 사용*
- **webpack에 scss를 연동하여 사용**
 
 <br />

<div id='id-section6'/>


<!-- ## 🐣 보완할 점 -->

 
 <br />
 <br />


<span align="right"> 

  [🔼 Go to Top](#id-section1)

</span>
