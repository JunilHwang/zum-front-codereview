export default [{
    index: 1,
    title: "컴포넌트 기반 설계",
    writer: "민수",
    date: "2021-05-06",
    contents: "- 상태(state)를 기반으로 렌더링하는 형태로 작성할 것\n- Observer Pattern을 이용해서 상태가 변경될 때 자동으로 렌더링 되도록 만들어보기"
}, {
    index: 2,
    title: "SPA(Single Page Application)기반",
    writer: "철수",
    date: "2021-03-29",
    contents: "- Router 만들어서 사용해보기\n- **페이지간에 이동이 발생할 때 새로고침이 발생하지 않도록 한다.**\n- 새로고침을 했을 경우에도 현재 페이지의 내용을 유지해야 한다.",
}, {
    index: 3,
    title: "전역 상태관리를 위한 Store 만들기",
    writer: "영희",
    date: "2021-03-03",
    contents: "- Vuex, Redux, Mobx, Recoil 등과 같은 상태관리 라이브러리 직접 만들어서 사용해보기",
}, {
    index: 4,
    title: "이벤트 관리를 최적화하기",
    writer: "맹구",
    date: "2021-02-11",
    contents: "- 불필요한 이벤트는 해제하기\n- 이벤트 위임 사용하기",
}, {
    index: 5,
    title: "XHR(ajax) 관련",
    writer: "훈이",
    date: "2020-12-28",
    contents: "- **fetch 사용**\n- API **요청중(loading)/실패(fail)** 등에 대한 UI 처리\n- Timeout 5초",
}, {
    index: 6,
    title: "렌더링 최적화 - 필요한 부분만 렌더링",
    writer: "짱구",
    date: "2020-06-23",
    contents: "- **가상돔 혹은 DIFF 알고리즘을 이용**\n참고아티클\n- [Proxy와 가상 돔을 사용하여 나만의 프레임워크 만들기](https://meetup.toast.com/posts/158)\n- [가상돔 직접 만들기 (1)](https://medium.com/@deathmood/how-to-write-your-own-virtual-dom-ee74acc13060)\n- [가상돔 직접 만들기 (2)](https://medium.com/@deathmood/write-your-virtual-dom-2-props-events-a957608f5c",
}, {
    index: 7,
    title: "Back-end",
    writer: "맹구",
    date: "2020-03-14",
    contents: "- Express.js를 사용하여 서버를 구축"
}, {
    index: 8,
    title: "Back-end",
    writer: "철수",
    date: "2020-01-05",
    contents: "- Typescript 사용",
}];