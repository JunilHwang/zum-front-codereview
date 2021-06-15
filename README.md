### start webpack server
```
npm run start
```

### build production mode
```
npm run build
```

### 구현 사항

1. **typescript, webpack, babel를 이용하여 개발환경 구축**
    - 프론트엔트 코드를 webpack으로 build하여 production code 생성
    - build된 code를 server에 연동   
2. **컴포넌트 기반 설계**   
    - 상태(State)를 기반으로 렌더링
3. **SPA(Single Page Application)기반**
    - Router 만들어서 사용
    - 페이지간에 이동이 발생할 때 새로고침이 발생하지 않도록 함
    - 새로고침을 했을 경우에도 현재 페이지의 내용을 유지
4. **XHR(ajax) 관련**
    - 500ms 이후 Mock data를 돌려주도록 구현