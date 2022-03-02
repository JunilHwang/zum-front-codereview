// 지금은 사용하지 않고 있습니다.




import Posts from "../components/Posts";

const route = {
  '/': '/api/posts',
  '/app': '/api/posts',
}

const RouteTrigger = () => {
  const navigation = document.querySelector('nav');

  navigation.addEventListener('click', (event) => {
    event.preventDefault(); // 새로고침 막기

    const path = `/${event.target.getAttribute('routeTo')}`; // path이름 설정하기
    history.pushState(path, null, path); // url설정 및 history관리
    
    routing(history.state); // history.state가 바뀔때마다 원하는 컴포넌트를 
    // 보여주기??????
  });
}


const routing = (state) => {
  switch (state){
    case '/life': case '/food': case '/travel': case '/culture':
      console.log('서브페이지');
      // component는 같은데 data만 다르게
      new Posts(state); 
      break;
    case '/favorite':
      console.log("즐겨찾기 페이지");
      // 즐겨찾기 한 card를 볼 수 있도록
      break;
    case '/detail':
      // card를 보면 상세 페이지를 볼 수 있다. 
      console.log("상세페이지");
      break;
    default:
      console.log('default');
  }

}


window.addEventListener('DOMContentLoaded', () => {
  // mdn
  // DOMContentLoaded : 초기 HTML 문서를 완전히 불러오고 분석했을 때 발생합니다. 스타일 시트, 이미지, 하위 프레임의 로딩은 기다리지 않습니다.
  // console.log('DOMContentLoaded!!!!');
  RouteTrigger();
});

const rendering = ($app, state) => {
  // 덮고 다시 쓰는 방식으로 작성
  $app.innerHTML = '';
  new Header($app);

  if(state == '/app'){
    // 메인페이지
    new TopPosts($app);
  }
  else if (state == '/life'){
    // one of 서브페이지
    // 한줄에 4개씩 총 12개 카드가 보여져야함
    // 그 외에는 무한 스크롤 기능을 구현하여 최대 40개 카드를 볼 수 있도록한다.
    new Posts($app);
  }
  else if (state == '/detail'){
    // 상세페이지
    // 카드를 클릭했을 때 상세페이지 진입한다.
  }
  else if (state == '/favorite'){
    // 즐겨찾기
  }
}

// 앞으로가기 뒤로가기 등으로 바뀔 때 반응함
// url이 바뀌는 건 캐치를 안함.
// window.addEventListener('popstate', () => {
//   console.log("changed");
// });
