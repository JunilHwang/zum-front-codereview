# zum

## Back-end

### Overview

- local에서 서버 실행 : `cd server` -> `npm run start`
- express, 타입스크립트를 사용한 api 서버 구축
- heroku 배포
- cors 설정, 클라이언트와 json으로 통신 가능

### Features

- router, controller, service, model 구조
- service : db와 관련 된 요청 수행
- controller : router에서 들어온 요청을 service에게 전달하고 응답

### Dependencies

- `express`, `typescript`, `ts-node`

### Note

1. class this 바인딩 문제

```typescript
// router
router.get("/", controller.getAllPosts);
// controller
class PostController {
  getAllPosts(_: Request, res: Response) {
    const { result, data } = this.postService.getAllItems();
    if (result) {
      res.status(200).json({ resonse: data });
    }
  }
}
```

- 클래스의 메서드를 라우터의 콜백 함수로 전달 시 메스드 내부의 this 바인딩을 잃어버리는 문제
- `this.postService`가 `undefined`로 접근 불가능 -> 메서드를 화살표 함수로 바꿔서 this 바인딩 해결

2. generic 사용법

- inteface에서 generic 사용 후 class implement 할 경우
- `class SampleImpl implements Sample<T>`
- 생성자에서 타입 추가 `new SampleImpl<string>`

3. 객체 구조 분해 할당과 type assertion 동시 사용 불가

- `req.body`는 any type이라 타입을 따로 지정해야함
- 객체 구조 분해 할당에서 `as`는 새로운 변수 이름으로 할당하는 기능
- type assertion을 위해 as를 동시에 사용할 수 없음
- 구조 분해 할당 사용 후 별도로 타입 지정

## Front-end

### Overview

- local에서 실행 `cd client` -> `npm run dev`
- 웹팩, 바벨, 타입스크립트를 사용해서 개발 환경 구축
- gh-pages 배포 : https://zzicc12.github.io/zum

### Features

- express 서버와 json으로 통신
- 게시글 CRUD 구현
- get 요청은 cache하여 사용 / post, delete, put 요청 시 cache 초기화
- html dataset, 이벤트 위임을 사용하여 이벤트 핸들러 최소화
- history.pushState로 url 이동 -> 각 컴포넌트에서 렌더링

### Dependencies

- `typescript`, `webpack`, `babel`, `cross-env`

### Note

1. popstate에 대해서

- popstate 이벤트는 pushState를 사용하면 trigger 되지 않음 -> url 변경 시 상태 변경과 렌더링에 관한 문제 발생
  - 커스텀 이벤트를 사용 OR pushState를 몽키패치해서 사용 등 여러 방법을 고민
- 상태를 관리하는 App class 에서 상태를 업데이트하는 메서드를 각 컴포넌트에게 콜백으로 전달
- 컴포넌트에서 url 변경 발생 -> App에서 전달받은 콜백을 url을 전달하며 호출 -> App에서 인지 ->
- App에서 전달 받은 url을 바탕으로 다음에 렌더링 될 컴포넌트의 `update()` 호출

2. localhost cors 문제 -> 서버에서 해결 OR webpack dev server에서 proxy 설정으로 해결 가능
3. 웹팩을 사용한 개발, 배포 환경을 동시에 관리하는 방법에 대해서 추가 공부 필요
