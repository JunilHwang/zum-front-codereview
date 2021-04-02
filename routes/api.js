var express = require("express");
var router = express.Router();

let lanking = [
  {
    idx: 75514,
    title: "10억년 신비 품은 해변 따라 삼각산 돌아보니 황제의 氣 꿈틀",
    mediaName: "동아일보",
    url: "https://hub.zum.com/donga/75514",
  },
  {
    idx: 75511,
    title: "열기구 올라 낙화암, 수륙양용 버스 타고 백마강… “부여가 달라졌어요”",
    mediaName: "조선일보",
    url: "https://hub.zum.com/chosun/75511",
  },
  {
    idx: 75561,
    title: "'강철부대' 박군, 특전사 부대원으로 출격…\"재입대 상상도 못해\"",
    mediaName: "뉴스1",
    url: "https://hub.zum.com/news1/75561",
  },
  {
    idx: 75459,
    title:
      "[벚꽃 시리즈②: 부산·경남] 조용히 꽃구경하기 좋은 부산·경남 벚꽃 명소 5선",
    mediaName: "문화뉴스",
    url: "https://hub.zum.com/munhwanews/75459",
  },
  {
    idx: 75530,
    title: '이수근 아내 고백 "더 아플까봐 겁나…난 참 소심한 관종"',
    mediaName: "엑스포츠뉴스",
    url: "https://hub.zum.com/xportsnews/75530",
  },
  {
    idx: 74465,
    title: "모두 말렸던 정몽구의 10조 배팅, 벌써 벌어들인 수익만…",
    mediaName: "머니그라운드",
    url: "https://hub.zum.com/mground/74465",
  },
  {
    idx: 75471,
    title: "혼욕이 가능했던 로마의 목욕탕에서 종종 벌어진 일들",
    mediaName: "책식주의",
    url: "https://hub.zum.com/papervore/75471",
  },
  {
    idx: 75462,
    title: "남도엔 이미 아기자기한 봄맛이 방울방울 [지극히 味적인 시장 (51)]",
    mediaName: "경향신문",
    url: "https://hub.zum.com/khan/75462",
  },
  {
    idx: 75247,
    title: "세무조사관도 엄지 들게 만든 연예계 기획사 세무조사 결과",
    mediaName: "스마트인컴",
    url: "https://hub.zum.com/smartincome/75247",
  },
  {
    idx: 75490,
    title: "‘미처 몰랐다’ 부자들이 유독 현관에 화분 두는 현실이유",
    mediaName: "머니그라운드",
    url: "https://hub.zum.com/mground/75490",
  },
  {
    idx: 75588,
    title: "한국 연예인도 따라 입는 레깅스 패션 선두주자들",
    mediaName: "OSEN",
    url: "https://hub.zum.com/osen/75588",
  },
  {
    idx: 75348,
    title: "아이를 가난하게 만드는 부모들의 공통점",
    mediaName: "책썰미",
    url: "https://hub.zum.com/chaegssulmi/75348",
  },
];

let life = [
  {
    idx: 75588,
    title: "한국 연예인도 따라 입는 레깅스 패션 선두주자들",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/24/13/f9ea2c54c3264be795d6126be3e2b955.jpg",
    mediaName: "OSEN",
    url: "https://hub.zum.com/osen/75588",
    summaryContent:
      "옷 잘 입기로 소문난 한국에서도 레깅스 패션 만큼은 길에서 마주하게 된지 얼마 되지 않았다. 몇 년 전 그룹 에이핑크 손나은이 한 안무 영상에서 독보적인 레깅스 핏으로 신드롬을 만들면서 점차 퍼지기 시작했다. 헐리우드에서 레깅스는 보는 사람도 입는 사람도 그 누구도 의식하지 않는 편안한 옷일 뿐이기에 더욱 다양한 스타일링이 눈에 띈다. 연예인들도 참고한다는",
  },
  {
    idx: 75454,
    title: "[더오래]‘살아도 산 것이 아닌’ 20대 자식 임종 지키는 어머니",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/22/10/80830dcca31042249249d81670dab09f.jpg",
    mediaName: "중앙일보",
    url: "https://hub.zum.com/joongang/75454",
    summaryContent:
      "━ [더,오래] 조용수의 코드클리어(67) 병원의 창문은 조그맣다. 절반 이상 열리지 않는다. 사람이 뛰어내리는 걸 막기 위해서라는 소문이 있는데, 사실이라면 조금 섬뜩할 거 같다. 아무튼, 최대로 열어도 고양이 한 마리가 겨우 지나갈 크기이다. 작은 건 창문만이 아니다. 병원은 건물 규모에 비해 출입문도 적고 입출입도 모두 통제된다. 그래서인지 종종 세상",
  },
  {
    idx: 75471,
    title: "혼욕이 가능했던 로마의 목욕탕에서 종종 벌어진 일들",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/22/14/cc659dc379664bcf8ea988fa4f8d03ab_640x480c.jpeg",
    mediaName: "책식주의",
    url: "https://hub.zum.com/papervore/75471",
    summaryContent:
      "6000년간 인류 문명을 꽃피운 26개 도시의 역사를 담은 벤 윌슨의 『메트로폴리스』를 소개합니다. 상업, 예술, 매춘, 목욕탕, 길거리 음식, 사교 등. 도시를 배경으로 다채롭게 펼쳐지는 인류 문명사의 다양한 이야기들을 만나보세요. 전체 이야기를 영상으로 확인하세요 ▼▼▼",
  },
  {
    idx: 75472,
    title:
      "간암환자 80~90%가 앓고 있는 ‘위험한 동행’은 [김태열 기자의 생생건강 365]",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/22/14/65e8836cadfd4f3682b1a80a1f3c0d20.jpg",
    mediaName: "헤럴드경제",
    url: "https://hub.zum.com/heraldcorp/75472",
    summaryContent:
      "대부분의 암은 초기에는 별다른 증상이 나타나지 않는 경우가 많습니다. 하지만 그중에서도 특히 간암은 아무런 증상이 없는 것으로 알려져 있습니다. 초기에는 피로, 소화불량, 체중 감소 등의 뚜렷하지 않은 증상이 나타나다가 간암이 점차 진행되면서 복부 통증, 위장관 출혈, 황달, 복수(腹水) 등 눈에 띄는 증상이 나타나게 됩니다. 간암은 조기에 발견되지 않으면",
  },
  {
    idx: 75473,
    title: "밀폐용기도 교체주기가 있을까? 락앤락에게 물었다!",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/22/14/fd344eb9a50f4ba2977cf909c9af54d2.jpg",
    mediaName: "쉐어하우스",
    url: "https://hub.zum.com/sharehows/75473",
    summaryContent:
      "보통 밀폐용기는 한 번 사면 잘 버리지 않는다. 부서지지 않는 한 말이다. 하지만 사용한 시간이 오래되면 문득 의문이 든다. ‘나 잘 쓰고 있는 건가?’ 그래서 락앤락에게 직접 물었다. 플라스틱 용기 소비자 조사에 따르면 평균 교체주기는 3년에서 5년 사이라고 한다. 그러나 긁힌 자국 등 육안으로 흠집이 보이는 밀폐용기는 미생물 오염 등 우려가 있어 교체해",
  },
  {
    idx: 75490,
    title: "‘미처 몰랐다’ 부자들이 유독 현관에 화분 두는 현실이유",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/24/10/22285ff3692f42549c4fa568a5bc030e_640x480c.jpg",
    mediaName: "머니그라운드",
    url: "https://hub.zum.com/mground/75490",
    summaryContent:
      "[MONEYGROUND 디지털뉴스팀] 최근 TvN 온앤오프에 출연한 배우 한보름의 인테리어 방식이 화제를 모았다. 취미로 풍수지리를 공부한 그녀는 자신의 집안 곳곳 인테리어를 그에 맞게 꾸민 모습을 방송을 통해 공개했다. 한보름은 금전운이 들어오게 해준다는 해바라기 그림과 전자레인지와 냉장고는 멀리 떨어뜨려야 한다는 등의 본인만의 원칙을 지켰다. 미신 아니",
  },
  {
    idx: 75346,
    title:
      "[2030 서울탈출기]③ 서핑에 눈 떠 PD 때려 치웠다…이들이 강릉서 먹고사는 법",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/18/15/a2c7cdb58ccf48549100a18134632b36.jpg",
    mediaName: "중앙일보",
    url: "https://hub.zum.com/joongang/75346",
    summaryContent:
      "[2030 서울탈출기]③ 서핑하고 요가하며, ‘쉼’ 기획하는 PD와 기타리스트 ━ CJ ENM에서 PD로 일했던 한귀리(39)씨는 GS 기업문화팀 등을 거쳐가며 약 13년간 지속됐던 직장생활을 접고 지난 2019년 강릉에 게스트하우스 ‘위크엔더스’를 열었다. 강릉 구도심 지역에 위치한 위크엔더스는 1974년에 지어진 2층짜리 여인숙을 개조한 곳이다. 1층의",
  },
  {
    idx: 75348,
    title: "아이를 가난하게 만드는 부모들의 공통점",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/18/16/2bf7efade6834821ab8cf5f55b028e37_640x480c.jpg",
    mediaName: "책썰미",
    url: "https://hub.zum.com/chaegssulmi/75348",
    summaryContent: "",
  },
  {
    idx: 75350,
    title:
      "달리기로 디스크 치료를? 마라톤에 빠진 의사들[양종구의 100세 시대 건강법]",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/18/16/436fadcdbac54a369944fda9852b5f6b.jpg",
    mediaName: "동아일보",
    url: "https://hub.zum.com/donga/75350",
    summaryContent:
      "2015년 5월 제주국제울트라마라톤 100km 단체전에서 놀라운 일이 벌어졌다. ‘고대 의대 달리는 의사들’ 5명이 출전해 1위를 차지한 것이다. 5명이 모두 15시간 안에 들어온 단체 중 상위 3명 기록이 좋은 팀이 우승하는 방식에서 정상에 오른 것이다. 쟁쟁한 울트라마라톤 동호회 관계자들이 깜짝 놀랐다. 당시 김학윤 김학윤정형외과의원 원장(78학번)을 ",
  },
  {
    idx: 75341,
    title: "가방 디자인부터 포장까지 혼자서… 인생 걸음마 뗀 ‘빙상 여제’",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/18/14/1aaedc587a864b3a8a7949c8bb8d117f.jpg",
    mediaName: "조선일보",
    url: "https://hub.zum.com/chosun/75341",
    summaryContent:
      "“에코백 종류별로 작업 지시서 파일을 이메일로 드렸는데, 못 받으셨나요? 거기에 로고 사이즈가 다 적혀 있거든요.” 인터뷰 도중 날염 공장 사장에게 걸려온 전화에 박승희(29)가 능숙하게 답했다. 대한민국 최초 올림픽 쇼트트랙 전 종목 메달 획득, 역대 한국 동계 올림픽 최다 메달리스트. 그 ‘빙상 여제’가 맞나 싶다. 신기한 눈으로 보자 박승희가 쑥스러운",
  },
  {
    idx: 75338,
    title: "공무원 공부만 하다 나이 먹은 사람들은 모두 어디로 갈까?",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/18/13/1f8e92fd55484e1096945bedcdd446f8.jpg",
    mediaName: "책썰미",
    url: "https://hub.zum.com/chaegssulmi/75338",
    summaryContent: "",
  },
  {
    idx: 75418,
    title: "신입사원 잘 봐. PT는 이렇게 하는 거야 EP.04 엘피를 홍보해라",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/21/09/fc45884cd8af4b72a941b4a28c7c1fdf.jpg",
    mediaName: "딩고 스타일",
    url: "https://hub.zum.com/dingostyle/75418",
    summaryContent:
      "지금까지 이런 PT는 없었다..! 보노보노 피피티를 뛰어넘는 엘피 피피티 등장 !! 선배한테 이쁨 받고 싶은 신입 사원, 이 영상 꼭 끝까지 보세요. (엄근진) 엘페이ㅣ엘포인트 채널 격주 금요일 6시 선공개 띵고 채널 격주 토요일 7시 온에어 #인턴쉽 #변성태 #롤린 [띵고] 구독 바로가기 ➡️ https://bit.ly/2G1BQ3U [띵고] 인스타그램 ",
  },
  {
    idx: 75410,
    title: "‘1층은 싫어요’란 말에 건설사가 내놓은 테라스 아파트의 내부",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/20/00/493de549316648efab7a7b124f6e907e_640x480c.jpg",
    mediaName: "피클코",
    url: "https://hub.zum.com/pikleco/75410",
    summaryContent:
      "건설사들이 저층 특화에 나섰습니다. 입주민들의 선호도가 떨어지는 아파트 저층에 테라스를 설계하는 등 움직임을 보이고 있는데요. 이들은 이곳을 자신만의 텃밭으로 꾸미거나 골프 퍼팅을 하는 등 다양한 방식으로 활용하고 있습니다. 공급량이 적어 거래가 쉽지 않은 것은 기본, 청약 경쟁률은 최고 300 대 1을 자랑한다는 저층 아파트에 대해 알아보도록 할까요? 아",
  },
  {
    idx: 75322,
    title: "밤에 하는 양치질, 수면에 영향을 미칠까?",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/18/11/8293c3fb81d54444b287cef13d20435f.jpg",
    mediaName: "하이닥",
    url: "https://hub.zum.com/hidoc/75322",
    summaryContent:
      "밤에 씻기 전 졸음이 쏟아졌지만, 양치질을 한 후에는 잠이 오지 않는 경우가 많다. 양치질을 하는 시간에 따라 수면의 질이 달라질 수 있을까? 일본 온라인 매거진 MYLOHAS는 자기 전 양치질을 하면 수면을 방해할 수 있다고 설명했다. 자기 전 양치질을 하면 수면을 방해할 수 있다. 잇몸이 자극되면 수면을 유도하는 호르몬인 멜라토닌 분비량이 줄어들기 때문",
  },
  {
    idx: 75373,
    title: "‘어딜가나 연어’ 건강한 연어 고르는 기준은?",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/19/09/c2482d9292cf4ac99dca2e42a85dfd00_640x480c.jpg",
    mediaName: "리얼푸드",
    url: "https://hub.zum.com/realfoods/75373",
    summaryContent:
      "[리얼푸드=육성연 기자]‘연어 포케’, ‘연어 덮밥’, ‘연어 스테이크’ 등 트렌디한 메뉴중에는 연어가 자주 등장한다. 비린내가 적은 연어는 어떤 식재료와도 잘 어울리기 때문에 날 것으로 먹어도, 열을 가해도 맛있다. 젊은층의 꾸준한 사랑때문에 수입량도 늘어났다. 해양수산부 통계에 따르면 지난해 연어 수입량은 4만 2600톤(t)으로 10년 전과 비교하면 ",
  },
  {
    idx: 75316,
    title: "시골카페서 글 쓰고 사진 찍고···그런데 장사, 그거 쉽지 않더라",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/18/09/e346a407025b4ba6afcd6260bb6e05ae.jpg",
    mediaName: "중앙일보",
    url: "https://hub.zum.com/joongang/75316",
    summaryContent:
      "“당신은 지금 하고 싶은 것을 하면서 살고 있습니까?” 전라북도 진안군 진안읍에 위치한 ‘카페공간 153’에 들어서면, 빨간 글씨로 쓰인 이 문구가 한눈에 들어온다. 옆에는 수명을 다한 분홍색 트럭이 세워져 있다. 바리스타 겸 여행작가 김현두(39) 씨와 함께 전국을 떠돌며 여행하던 커피 트럭이다. 겨울비가 내리는 궂은 날씨에도 점심시간이면 테이블이 손님들",
  },
  {
    idx: 75317,
    title: "[ESC] ‘빈센조’ 송중기처럼 슈트 입고 싶다고?",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/18/09/0b7bd9cc9a9e45ab8a651e99cbc8c370.jpg",
    mediaName: "한겨레",
    url: "https://hub.zum.com/hani/75317",
    summaryContent:
      "시기가 시기인지라 청첩장이 예년만큼 쌓이지 않는다. “턱시도는 어디서 맞추는 게 좋을까요?” 이런 용건의 전화도 부쩍 줄었다. 그런 전화에 “몇 시 예식인데 턱시도를 맞추느냐. 턱시도는 ‘이브닝 웨어’라 저녁에만 입는 것이다”고 하면 예비 신랑들은 놀란다. 첨언하면 턱시도를 예복으로 활용하는 건 전혀 문제없다고 생각한다. 원칙은 저녁에 입는 옷이지만, 자장",
  },
  {
    idx: 75319,
    title: "'이 말' 자주 하는 사람, 불행해질 가능성 아주 높다",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/18/10/2a8a2cb9973d491881357e30e46359d6_640x480c.jpeg",
    mediaName: "책식주의",
    url: "https://hub.zum.com/papervore/75319",
    summaryContent: "",
  },
  {
    idx: 75324,
    title: "음주 후 두통, 이렇게 해결하자!",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/18/11/f843298320e140f6a9bc4da2a9adeb6e_640x480c.jpg",
    mediaName: "드링킷",
    url: "https://hub.zum.com/drinkeat/75324",
    summaryContent:
      "술 마신 다음날, 예고 없이 찾아와 우리를 괴롭히는 두통. 음주 후 깨질 듯한 두통 때문에 일상 생활이 어려웠던 경험이 있거나 매번 숙취 두통을 견뎌내고 있는 이들을 위해, 음주 후 두통의 원인과 간단한 해결 방법을 정리했다. 가장 좋은 해결법은 음주를 피하는 것이지만, 그럴 수 없는 상황이라면 이 글을 꼼꼼히 읽어 보자. 음주로 인한 두통의 주요 원인으로",
  },
  {
    idx: 75258,
    title: "[집 공간 사람] 58년 된 7평 구옥 고쳐 마당 누리는 밀레니얼 부부",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/17/09/efcea1b8c9ab45059a0ddac758cba563.jpg",
    mediaName: "한국일보",
    url: "https://hub.zum.com/hankookilbo/75258",
    summaryContent:
      "단칸방에서 30평대 아파트 한 채를 꿈꿨던 신혼의 단꿈은 밀레니얼 세대(1980년대 이후 출생자)에게 더는 유효하지 않다. 결혼 3년 차인 안정호(33)ㆍ김성진(33) 부부는 지난해 8월 서울 성동구 행당동에 58년 된 7평(대지면적 25.84㎡, 연면적 40㎡) 남짓한 구옥을 사서 고쳤다. 부부의 신혼도 작은 아파트에서 시작됐다. 살다 보니 의문이 들었다",
  },
  {
    idx: 75280,
    title: "혹 떼려다 혹 붙일 수 있는 민간요법 7",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/17/11/c7c49e88daa541d6bd90484a541035d9.jpg",
    mediaName: "마음건강 길",
    url: "https://hub.zum.com/mindgil/75280",
    summaryContent:
      "‘민간요법’이란 말 그대로 의사가 아닌 일반인이 행하는 치료법이다. 즉 민간요법은 전문의의 처방을 받지 않은 요법이므로, 안전성을 보장할 수 없다. 그럼에도 많은 이들이 간단히 문제를 해결하기 위해 흔히 민간요법을 사용하곤 한다. 때로 이런 대증요법이 효과를 나타내는 경우도 있다. 하지만 무턱대고 행하다가는 오히려 증상을 악화시키거나, 더 큰 질병으로 이어",
  },
  {
    idx: 75290,
    title: "일을 그만둬야 할 때 몸과 마음에 나타나는 신호4",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/17/15/78aa885268734504a660e0688eabdf12_640x480c.png",
    mediaName: "북적북적",
    url: "https://hub.zum.com/wjbook/75290",
    summaryContent:
      "얼핏 들으면 어딘가 큰 병에 걸린 사람의 이야기 같지만 실은 직장 스트레스로 힘들어하는 사람들에게 자주 듣게 되는 말입니다.&nbsp; '신기율의 마음 찻집' 주인장 신기율 센터장은 정말 일을 그만 둬야하는 때가 되면 단순히 머리로만 회사에 가기 싫다고 생각하는 게 아니라온 몸의 세포가 내가 하는 일을 거부하고 있다는 징조들이 나타난다고 말합니다. 일을 그만둬야하는",
  },
  {
    idx: 75295,
    title: "베베쿡X소유진, 집콕육아 극복 라이브 방송 성황리 종료",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/17/18/a02bfbbaab5a4c999537a303825e6b33_640x480c.jpg",
    mediaName: "리얼푸드",
    url: "https://hub.zum.com/realfoods/75295",
    summaryContent:
      "[리얼푸드=육성연 기자]영유아식품 전문 브랜드 베베쿡이 지난 16일 자사 모델인 배우 소유진과 진행한 ‘집콕육아 극복 프로젝트’ 라이브 방송이 성황리에 종료됐다고 밝혔다. 이번 라이브 방송은, 6일 동안 소유진 인스타그램을 통해 신청받은 육아 고민 사연 중 몇 가지를 골라 참여자들과 나누고, 소유진만의 육아 꿀팁을 공개하는 등 특별한 시간으로 채워졌다. 6",
  },
  {
    idx: 75262,
    title: "'찜한 메뉴가 많아졌다' 배달음식, 똑똑하게 먹는 방법",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/17/10/987b2e2b2cb549499e9931c8350b2ca5_640x480c.jpg",
    mediaName: "리얼푸드",
    url: "https://hub.zum.com/realfoods/75262",
    summaryContent:
      "[리얼푸드=육성연 기자]신종 코로나 바이러스 감염증(코로나19)사태 이후 외식 빈도수는 눈에 띄게 감소한 반면 온라인 주문의 배달음식이 큰 폭으로 늘어났다. 통계청에 따르면 온라인 음식 서비스 거래액은 지난해 17조 4000억 원으로 전년 대비 78.6% 증가했다. 하지만 배달음식들은 영양불균형적인 경우가 많다. 이는 일부 영양소가 결핍되거나 과잉된 상태를",
  },
  {
    idx: 75172,
    title: "오래 앉아있는 당신, 통증을 예방할 수 있는 8가지 운동법",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/15/13/ffd2fa9b77584ac3b8bcbcff7f56aaaa.jpg",
    mediaName: "머니투데이",
    url: "https://hub.zum.com/mt/75172",
    summaryContent:
      "많은 사람들이 코로나19 대유행에 따른 재택근무, 원격 수업 등을 하게 되면서 하루 중 앉아있는 시간이 늘고 있다. 그러나 오래 앉아있는 것은 엉덩이 뒤쪽 근육을 약해지게 하고 근육을 긴장시켜 통증을 부르는 등 건강에 악영향을 줄 수 있다. 당신이 집에 머무르든 사무실에서 머무르든 하루동안 움직이는 시간을 늘려 좌식 생활로 야기되는 건강 상 문제를 피하는 ",
  },
  {
    idx: 75174,
    title: "\"회사는 '부업'\" 1억8천 모금한 96년생 한복디자이너",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/15/14/dad75deaf0be4d32aeb72cb83bbc8f0c.jpg",
    mediaName: "29STREET",
    url: "https://hub.zum.com/29street/75174",
    summaryContent:
      "원단 유통 스타트업에서 일하고 있는 김하늘 씨는 최근 펀딩 플랫폼에서 1억8000만원짜리 ‘한복 잭팟’을 터뜨렸다. 한복 판매 첫 도전에서 장저고리 제작 프로젝트로 1억8200만원이 넘는 금액을 모은 것. 그야말로 요즘 세대가 만든, 요즘 세대가 좋아하는 한복이다. 앳된 얼굴로 “한복에 인생을 쏟아 부었다”며 웃는 그는 현재 원단 유통 스타트업에 근무 중인",
  },
  {
    idx: 75175,
    title: "완전 탐나! 집에 들이고픈 스타들의 홈바 5",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/15/14/59afa63fd1274c8fac1f98c7238aa0d5_640x480c.jpg",
    mediaName: "드링킷",
    url: "https://hub.zum.com/drinkeat/75175",
    summaryContent:
      "SNS를 구경하다 보면 탐나는 인테리어가 정말 많다. 그중에서도 가장 시선을 끄는 건, 바로 홈바다. 밖에서 술을 마시는 것이 조심스러운 요즘, 근사한 칵테일 바 부럽지 않은 공간에서 하루의 피로를 푸는 기분은 어떨까? 생각만으로도 미소가 지어진다. 당장이라도 우리 집에 들여놓고 싶은, 트렌디한 감성의 홈바를 운영(?) 중인 셀럽들을 모아 봤다. 아기자기부",
  },
  {
    idx: 75176,
    title: "“님아. 그것을 노란 봉투에 넣지 마오” [식탐]",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/15/14/1fe654bd91a54e4fa4d7ae230b19bfdb.jpg",
    mediaName: "헤럴드경제",
    url: "https://hub.zum.com/heraldcorp/75176",
    summaryContent:
      "답은 ‘NO’이다. ‘먹는 음식’의 재료이기 때문에 그동안 의심없이 음식물쓰레기 봉투에 담았던 이들이 많지만 이들은 일반 종량제 봉투가 정답이다. 지난해부터 가정내 요리가 급증하면서 집에서 버리는 음식물쓰레기의 분리배출이 더욱 중요해졌다.음식물쓰레기는 에너지 낭비와 온실가스 배출로 인한 환경오염, 식량자원의 손실, 처리비용 등의 문제가 발생된다. 음식물쓰레",
  },
  {
    idx: 75159,
    title: "우리나라 성인 대부분이 숨기고 산다는 '이 감정'",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/15/11/be803ee8c62e42d88309865e87032614_640x480c.png",
    mediaName: "북적북적",
    url: "https://hub.zum.com/wjbook/75159",
    summaryContent: "",
  },
  {
    idx: 75150,
    title: "넉달의 ‘삽질’에 ‘나만의 욕실’이 빛나기 시작했다",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/15/10/0d4a779fb905407dbe66f4e30cc74a30.jpg",
    mediaName: "한겨레",
    url: "https://hub.zum.com/hani/75150",
    summaryContent:
      "“아무것도 하지 마.” 이사 온 뒤 집 곳곳을 보수하겠다는 나의 계획에 엄마는 말했다. 2년 살 집에 돈 들이지 말라는 충고였다. 그렇지만 물론 내 생각은 달랐다. 이 집은 사실상 내가 15년 전 독립한 뒤 처음으로 갖게 된 근사한 집이었다. 밝고, 넓고, 전망이 좋고, 동네도 마음에 들었다. 계절이 아주 조금씩 바뀌고 있다는 것이 드넓은 거실 창으로 한눈",
  },
  {
    idx: 75145,
    title: "“좁은 공간이 무서워요”…연예인도 많이 겪는 ‘폐소공포증’이란?",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/15/10/1ae11c25b62b4ee19a51c49e878fae38.jpg",
    mediaName: "하이닥",
    url: "https://hub.zum.com/hidoc/75145",
    summaryContent:
      "최근 배우 차인표, 박소담, 강하늘 등 많은 연예인들이 폐소공포증이 있다고 밝히면서 화제가 됐었다. 폐소공포증(Claustrofomia)은 밀폐되어 있거나 좁은 공간에서 극도의 공포를 느끼는 증상을 말한다. 예를 들어, 창문이 없는 방, 붐비는 엘리베이터, 혼잡한 고속도로 등의 다양한 공간에서 공포를 느낄 수 있다. 증상으로는 심박수 증가, 땀 흘림, 호흡",
  },
  {
    idx: 75141,
    title: "“신중년이라면 이렇게 먹어라”",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/15/10/2dd684e66dd4446ea686b8da0e567885_640x480c.jpg",
    mediaName: "리얼푸드",
    url: "https://hub.zum.com/realfoods/75141",
    summaryContent:
      "[리얼푸드=육성연 기자]신중년(50~64세)이라면 식단이 달라져야 한다. 이 나이에는 고혈압, 비만, 당뇨병 등 만성질환의 유병률이 이전보다 크게 높아지기 때문이다. 소화력도 떨어지며, 기초대사량도 줄어든다. 한 마디로 몸이 달라졌기 때문에 먹는 음식도 변화가 필요하다는 말이다. 하지만 영양사가 아닌 일반인들이 신중년에 최적화된 영양 식단을 꾸리는 것은 쉽",
  },
  {
    idx: 75060,
    title: "[ESC] 이것만 알면 ‘안영미’처럼 말할 수 있다",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/12/15/95926730766a48d3bd984b52eea54bf0.jpg",
    mediaName: "한겨레",
    url: "https://hub.zum.com/hani/75060",
    summaryContent:
      "“진행자인가요? 패널인가요?” 말 잘하는 사람의 특징이 무엇인지 물었더니 같은 반문이 돌아왔다. 그렇다. 방송은 진행자와 패널이 가져야 하는 덕목이 다르다. 티브이(TV)라면 엠시(MC), 라디오라면 디제이(DJ)라고 부를 수 있겠다. 쌍방향 음성 기반 에스엔에스 ‘클럽하우스’의 모더레이터(방 개설 및 토론 진행자)와 비슷한 역할이라 볼 수도 있다. 살다 ",
  },
  {
    idx: 74907,
    title: "'나 혼자 산다'의 화사처럼 나도 쉴 수 있을까",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/12/15/f35e3d3760a3460684be98e97f56c163.jpg",
    mediaName: "오마이뉴스",
    url: "https://hub.zum.com/ohmynews/74907",
    summaryContent:
      "며칠째 잠을 이루지 못했다. 최근 힘든 일이 겹쳤다. 올해부터 회사에서 담당하는 업무가 늘었고 새로운 부서에 발령받아 적응해야 했다. 거기에다 바빠서 한동안 연락을 하지 못했던 가까운 친구가 갑자기 세상을 떠났다는 소식을 들었다. '아! 나는 어쩌다 이렇게 살고 있지? 지금 이렇게 살아도 괜찮은걸까?' 문득 정신없이 하루하루 버티며 사는 게 허무해지고 이유",
  },
  {
    idx: 75077,
    title: "샤넬은 올드? 멋을 아는 요즘 애들, '新명품' 하트♥·여우에 빠졌다",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/12/15/9e95a3e82ada41188d5ff876355973dd.jpg",
    mediaName: "머니투데이",
    url: "https://hub.zum.com/mt/75077",
    summaryContent:
      "[머니투데이 오정은 기자] [편집자주] \"샤넬은 올드해, 아미(AMI) 하트티 좋아.\" 코로나19(COVID-19)에도 백화점 샤넬 매장에선 '오픈런' 광풍이 계속되고 있지만, 명품 소비 지형에 조용한 변화가 나타나고 있다. 루이비통·샤넬이 상징하는 구명품보다 역사는 짧지만 '역사상 최대 소비세대'로 불리는 MZ세대(18세~34세)의 감성을 사로잡은 신명품",
  },
  {
    idx: 74952,
    title:
      "[슬기로운 집콕생활] 정원과 모래 놀이터가 있는 아파트 1층에 살아봤니",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/10/16/9410bc9bbc004e8fad07c68b12d39451.jpg",
    mediaName: "한국일보",
    url: "https://hub.zum.com/hankookilbo/74952",
    summaryContent:
      "아파트 1층이 확 달라졌다. 예전에는 사생활 침해와 방범 우려, 채광 부족, 소음 등으로 기피했지만 최근에는 층간 소음 문제를 해결해주고 자연을 마음껏 누릴 수 있는 ‘신 로열층’으로 각광받고 있다. 1층에 정원이 있는 일부 아파트의 경우 1층 매매 가격이 단지 내 최고가를 기록하기도 했다. 박정환 홍익대 건축학과 교수는 “코로나19로 집에 머무는 시간이 ",
  },
  {
    idx: 75061,
    title: "정신과 의사가 말하는 우울증의 뜻밖의 원인",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/12/10/41c832c959d140fbbefa379561a879ae_640x480c.png",
    mediaName: "도서출판 길벗",
    url: "https://hub.zum.com/gilbut/75061",
    summaryContent: "",
  },
  {
    idx: 75011,
    title: "나이 들수록 매력적인 사람들의 공통점",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/11/14/3529f17908514b50bc8803a96f7bb915_640x480c.png",
    mediaName: "북적북적",
    url: "https://hub.zum.com/wjbook/75011",
    summaryContent:
      "대한민국 영화계에 새 역사를 쓰고 있는 ‘미나리’의 주역 윤여정 배우. 그는 tvN ‘윤스테이’에서도 솔직하고 센스 있는 입담으로 젊은 세대들에게 큰 인기를 얻으며 제2의 전성기를 누리고 있습니다. 이렇게 70대가 훌쩍 넘은 나이에도 전 세대를 아우르는 배우 윤여정의 힘은 무엇일까요? 국내 TV에서 들어오는 역할만 하고, 영화도 오는 역할만 하고 그러면 지",
  },
  {
    idx: 75068,
    title: '[인-잇] "암 걸리고 바뀐 내 인생, 행복합니다"',
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/12/15/b9bb2428e8374e99a546c205be99a3f6.jpg",
    mediaName: "SBS",
    url: "https://hub.zum.com/sbsnews/75068",
    summaryContent:
      '김범석│서울대 암병원 종양내과 전문의. 책 저자. "기사님, 롯데호텔로 빨리 좀 부탁합니다." 그날은 학회 발표가 있던 날이었다. 예정된 시각보다 늦을 것 같아서 부랴부랴 병원 앞에서 택시를 탔다. 택시 운전사는 백미러로 나를 쓱 보더니 뒤를 돌아보며 말했다. "어? 김범석 선생님 아니세요?" 한 번 만나고 다시 볼 일 없는 택시 운전사가 내 이름을 불러서',
  },
  {
    idx: 75084,
    title: "“저만 실패하는 거 같아요”라는 고민에 박세리의 사이다 답변",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/13/00/ba6513e2176d42bd986a367522d12e40_640x480c.jpg",
    mediaName: "스마트인컴",
    url: "https://hub.zum.com/smartincome/75084",
    summaryContent:
      "모두의 인생에는 저마다의 슬럼프가 찾아옵니다. 무엇인가를 모두 이루고 최정상에 올라있는 사람에게만 슬럼프가 오는 것은 아닙니다. 아무것도 이루지 못한 사람이라도 슬럼프는 올 수 있죠. 어쩌면 뭐 하나 잘 풀리지 않는 지금이 슬럼프 일 수도 있습니다. 슬럼프 때문에 힘들어하는 청년에게 전 골프선수 박세리는 자신만의 해답을 전해주기도 했었는데요. 과연 박세리는",
  },
];

let food = [
  {
    idx: 75576,
    title: "신동엽도 단골, 외국인까지 줄서서 먹는다는 칼국수 맛집",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/24/11/1087f8a014364eecb6523f6e2ea09078_640x480c.jpg",
    mediaName: "밥심",
    url: "https://hub.zum.com/singleliving/75576",
    summaryContent:
      "날씨가 완전히 풀리기 전 열심히 먹어야 할 메뉴가 있어요! 바로 칼국수인데요ㅎㅎ 입김을 뿜어가며 호호 불어 먹는 칼국수의 맛이란..♥ 시원한 냉면에게 자리를 내어주기 전 꼭 먹어봐야 할 칼국수 맛집을 소개해 드릴게요! 오늘은 특별히 미식가로 유명한 연예인분들의 인증 맛집으로 가져왔습니다ㅎㅎ 가보실까요~? 경기 하남시 검단산로 348 10:30 – 23:59",
  },
  {
    idx: 75566,
    title: "여심잡는 ‘망고 빤지’, “홍콩 안가도 먹을 수 있어”",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/24/09/3a442c5cf8994d8fae6731d391b08153_640x480c.jpg",
    mediaName: "리얼푸드",
    url: "https://hub.zum.com/realfoods/75566",
    summaryContent:
      "[리얼푸드=육성연 기자]‘망고 빤지’는 홍콩 여행시 꼭 먹어야 할 음식중 하나로 손꼽힙니다. 얇은 팬케이크 반죽에 망고와 생크림을 넣어 만든 홍콩식 팬케이트인데요. 안에는 맛있는 망고와 생크림이 모두 들어 있으니 여성들의 사랑을 독차지할 만 합니다. 하지만 현재는 해외 여행의 자제로 홍콩 현지에서 먹기가 어려워졌습니다. 하지만 망고 빤지는 집에서도 얼마든지",
  },
  {
    idx: 75517,
    title: "쑥국 끓이는 법 들깨쑥국 고소하게 봄을 불러보세요~",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/23/11/c9a5e69c268b490fb54a0c096661041c_640x480c.jpg",
    mediaName: "4월의라라",
    url: "https://hub.zum.com/lara/75517",
    summaryContent:
      "봄이 왔어요. 환기를 하려고 창을 잠시 열어두어도 그리 춥지 않네요. 벌써 봄나물들이 나오는데, 요즘 머위도 보이고 곰취도 보이고, 일찍부터 쑥이랑 냉이도 나왔더랬죠. 저희 집 최애는 쑥이에요. 벌써 쑥전, 쑥버무리에 쑥국까지 다 먹어보았답니다. 우선 쑥국부터 올려드릴게요. 오늘은 쑥국 끓이는 법 올려드릴 테니 구경해 보세요. 쑥이 나는 계절은 부지런히 쑥",
  },
  {
    idx: 75518,
    title: "멍게비빔밥에 초장 넣지 마세요, 그거 아닙니다",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/23/11/bb114018256346858f9946c69f0b08eb.jpg",
    mediaName: "오마이뉴스",
    url: "https://hub.zum.com/ohmynews/75518",
    summaryContent:
      "'멍게, 해삼, 말미잘'로 시작하는 욕은 못생긴 외모를 비하는 것을 뜻한다. 하지만, 뜻밖에도 멍게를 길어 올리는 어부들은 \"바다 꽃이 피었다\"라고 한다. 그렇다. 선홍빛깔의 멍게는 자세히 보면 이쁘다. 뭐든지 자세히 보아야 이쁘다. 그 맛 또한 마찬가지다. 1월에서 6월 동안 수확되는 멍게는 그 퉁퉁한 몸 안 가득 바다를 한껏 품고 있다. 입안에서 퍼지는",
  },
  {
    idx: 75519,
    title: "집에 손님 올 때 과일로 감동주는 법",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/23/11/b0c02113b18f45f0977803f53b6533ef_640x480c.jpg",
    mediaName: "데일리",
    url: "https://hub.zum.com/daily/75519",
    summaryContent:
      "파티 푸드에는 새콤달콤한 과일이 빠질 수 없다. 단순히 맛을 즐기기 위한 것뿐만이 아니라, 알록달록 예쁜 색감으로 파티 분위기를 한층 살려주는 장식으로서의 역할까지도 하기 때문이다. 하지만 울퉁불퉁 못생기게, 혹은 밋밋하게 깎아놓은 과일은 자칫 성의 없어 보이거나 촌스럽게 느껴지기 쉽다. 같은 과일이라도 예쁘게 모양을 내어 자르고 깎아 플레이팅해 놓으면 세",
  },
  {
    idx: 75520,
    title:
      "[이용재의 세심한 맛] 냉장고에 붙이고 보면 좋을 100가지 ‘한 줄 요령’",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/23/11/e291ebdc00454c8da2f732cc05d04170.jpg",
    mediaName: "한국일보",
    url: "https://hub.zum.com/hankookilbo/75520",
    summaryContent:
      "‘세심한 맛’ 연재 100회를 마치며 전체 원고를 간추린 100가지 요령을 소개한다. 각 원고를 단 한 줄씩 요약한 세심한 맛을 위한 레시피 비법노트다. 소소하지만 효과는 놀라울 수 있다. 1. 계란은 싱크대 상판처럼 평평한 표면에 쳐 깬다. 2. 단단하고 천천히 녹는 돌얼음을 편의점이나 마트에서 사서 쓴다. 3. 요리에는 통조림 토마토를 쓰자. 4. 버터",
  },
  {
    idx: 75545,
    title:
      "[셰프열전]시마다 히로시 셰프 “최종 목적지는 고객 맞춤 우마미를 선사하는 것”",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/23/16/ee7373edd71041bb88bcf79a305f65c2_640x480c.jpg",
    mediaName: "리얼푸드",
    url: "https://hub.zum.com/realfoods/75545",
    summaryContent:
      "[리얼푸드=신소연 기자]“훌륭한 오마카세의 최종 목적지는 고객에게 최적화된 우마미(Umami)를 선사하는 것이다” 오마카세(お任せ)는 일본어로 ‘맡기다’는 뜻의 ‘任せる(마카세루)’ 명사형인 ‘任せ(마카세)’ 앞에 존경 형태인 ‘お(오)’를 붙인 말이다. 외식업계에서는 손님이 메뉴를 선택하지 않고 요리사가 그때그때 엄선한 식재료로 제철 요리를 만들어 내는 ",
  },
  {
    idx: 75521,
    title: "다 쓴 물티슈 버린 거 후회하게 된다는 꿀팁",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/23/11/61f3ea6c988c411d9eb08087a7ecc184_640x480c.jpg",
    mediaName: "밥심",
    url: "https://hub.zum.com/singleliving/75521",
    summaryContent:
      "예쁘게 뜯어서 모아놓자! 오늘은 일상에서 다양하게 사용되고있는 물티슈의 캡 부분을 재활용 해보려고요해요. 참고로, 물티슈는 플라스틱으로 만들어지는 경우가 많다고하니 구매를 할때에는 천연펄프 재질인지 확인하고 구매하는 게 좋겠죠? 물론! 다회용 행주를 사용하는 게 가장 좋겠지만요~! 오늘의 준비물은 물티슈 캡 이외에는 없습니다~ 간혹 글루건이나 양면테이프 정",
  },
  {
    idx: 75508,
    title: "지금은 냉이 먹는 계절",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/23/10/a90592950bb5445aba0c9447a28020d8_640x480c.jpg",
    mediaName: "리얼푸드",
    url: "https://hub.zum.com/realfoods/75508",
    summaryContent:
      "[리얼푸드=육성연 기자]냉이는 봄나물 중에도 소비량이 많은 채소다. 특유의 쌉쌀한 맛과 향이 좋아 예로부터 뿌리를 포함한 전초를 식용 및 약용으로 사용해왔다. 영양학적으로도 우수하다. 냉이는 단백질 8%, 탄수화물 7.4%, 무기질 3%, 지방 0.7% 이 함유돼 있으며, 특히 다른 산채류에 비하여 단백질의 함량이 높다. 아르기닌, 프롤린, 메티오닌 등의 ",
  },
  {
    idx: 75489,
    title: "볶음밥→냉동 볶음밥 재료, 젤라또→시판 아이스크림 준 음식점",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/23/00/d5657420aefc4d1fbdbbdfb366257d96_640x480c.png",
    mediaName: "스마트인컴",
    url: "https://hub.zum.com/smartincome/75489",
    summaryContent:
      "최근 우리들의 삶에서 빼놓을 수 없는 것이 있습니다 .&nbsp;바로 배달음식입니다 .&nbsp;코로나 팬데믹 이후 비대면이 일상이 되면서 배달업계는 큰 호황을 이어가고 있습니다. 특히 한 데이터 분석 기업에 따르면 우리나라의 배달음식 이용률을 세계 최고 수준이기도 한데요. 배달 주문이 폭발적으로 늘어난 만큼 배달음식과 관련해 크고 작은 사건 사고도 많아지고 있죠. 이와 관",
  },
  {
    idx: 75462,
    title: "남도엔 이미 아기자기한 봄맛이 방울방울 [지극히 味적인 시장 (51)]",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/22/10/5ecd8bf2a58340a1859841e3f0a0cd12.jpg",
    mediaName: "경향신문",
    url: "https://hub.zum.com/khan/75462",
    summaryContent:
      "드라마 &lt;응답하라 1988&gt;에 사천과 삼천포의 통합 이야기가 나온다. 삼천포 출신 배역을 연기한 김성균씨가 ‘사천과 삼천을 더해 칠천포로 하자’는 제안을 하다가 쫓겨나는 에피소드가 있다. 사천 갈 때면 그 장면이 살랑거리는 봄바람처럼 잠시 머물다 간다. 잘나가다가 삼천포로 빠지는 것은 당연하다. 아름답고 맛난 것이 많기 때문이다. 사천은 바다를 바라보는 방",
  },
  {
    idx: 75463,
    title: "해남에서 맛 보는 진정한 '닭 한마리' - 토종닭 코스전문 진솔통닭",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/22/10/dd347589ebfa42b1b88342573872a206_640x480c.jpg",
    mediaName: "로드프레스",
    url: "https://hub.zum.com/roadpress/75463",
    summaryContent:
      '- 전국에서 가장 큰 토종닭을 키우는 해남군, 닭 코스요리 전문점 특성화 - 구이와 불고기, 육회, 백숙 등 다양하게 즐기는 코스요리 "해남에서 뭐 드셨을까요잉?" 작년 해남 답사시, 해남군청의 담당자분이 웃으며 물어본 일이 있다. 나름 답사시 꽤 열심히 준비를 해 갔던터라 유명한 기사식당, 백반집과 팥칼국수집 등 거쳐온 곳을 줄줄 읊으니 "여그저그 많이',
  },
  {
    idx: 75465,
    title: "직접 하는 야채테크! 집에서 손쉽게 키울 수 있는 야채 4가지",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/22/11/81ac3d476c09408888b7aee9c46c0505.jpg",
    mediaName: "밸류챔피언",
    url: "https://hub.zum.com/valuechampion/75465",
    summaryContent:
      "통계청의 조사에 의하면 2020년 10월부터 2021년 1월까지 소비자물가는 거의 제자리에 머물렀지만 농축수산물 물가는 전년대비 월평균 11.03% 증가한 것으로 조사되었습니다. 특히 가격이 가장 가파르게 오른 농축수산물 중엔 식탁에서 자주보는 야채가 많아 집에서 직접 재배해서 먹는 경우도 늘어나고 있습니다. 가격이 가장 높게 오늘 품목 중 집에서도 쉽게 ",
  },
  {
    idx: 75466,
    title: "배가 터질 듯하지만 홍게 라면은 먹고 싶어",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/22/11/9219d341f37f42e89fc57463f9d674bf.jpg",
    mediaName: "조선일보",
    url: "https://hub.zum.com/chosun/75466",
    summaryContent:
      "고기를 얼마나 사야 할지 가늠할 수 없었다. 대학 1학년 강촌으로 떠난 첫 MT였다. 어머니 품을 막 벗어난 신입생들은 웃자란 중병아리처럼 행색도 표정도 어색했다. 먹을 고기 사는 것도 일이었다. 시켜주는 대로 먹었지 스스로 고기양을 가늠해본 것은 대부분 처음이었다. 결과는 실패였다. 그날 밤 돼지고기는 한참 남았다. 자취생들은 도둑고양이처럼 남은 고기에 ",
  },
  {
    idx: 75467,
    title: "캐릭터 컨셉 살리려다 정체성 잃어버린 것 같다는 GS25신상",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/22/11/3f0c113c27c5461f9f147fee2c2f163e_640x480c.jpg",
    mediaName: "밥심",
    url: "https://hub.zum.com/singleliving/75467",
    summaryContent:
      "떡볶이를 호로록~?? 여러분 지난번에 밥심이 진로 마카롱 리뷰했던 거 보신 분 있으신가요~? 그 이후에 GS25에서 엄청 다양한 진로 콜라보 제품이 나왔었더라고요! 너무나 늦게 알게 된 밥심은.. 이제야 들고 와 봤어요ㅋㅋ 같이 보러 가보실까요~? 대부분 편의점 떡볶이는 냉장에 보관하는 경우가 많아서 가봤는데 없더라고요! 그래서 포기하고 뒤돌아 서는 순간 ",
  },
  {
    idx: 75464,
    title: "전국 택배까지, 14900원에 3명이 실컷 먹는다는 닭갈비 맛집",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/22/11/a968588c8ea04eceaf75622bb6de10ea_640x480c.jpg",
    mediaName: "밥심",
    url: "https://hub.zum.com/singleliving/75464",
    summaryContent:
      "요즘 전국 택배맛집이 대세라며 밥심이 즐겨보는 예능 프로그램 중 ‘맛있는 녀석들’이 있는데요. 최근 전국 택배 맛집을 테마로 촬영을 했더라고요! 와 전국에 저렇게 맛집이 많았나, 넋을 놓고 봤었네요. 그래서 밥심도 춘천, 가평에서 먹던 보통 닭갈비를 밖에서 먹으면 야채가 고기보다 많아서 막 속상하잖아요. 밥심에서 찾은 닭갈비는 실하게 들어 있어서 바로 합격",
  },
  {
    idx: 75455,
    title: "‘어린시절 먹던 단순한 맛’ 2021년 맛 트렌드",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/22/10/a555d136843d4ab584442e87e6501b2b_640x480c.jpg",
    mediaName: "리얼푸드",
    url: "https://hub.zum.com/realfoods/75455",
    summaryContent:
      "[리얼푸드=육성연 기자]최근들어 입맛이 달라졌다는 이들이 많아지고 있다. 땀을 뻘뻘흘리며 먹던 극강의 매운 맛, 늘 ‘진리’로 통하던 ‘단짠’(달고 짠 맛), 달고 매운 맛에 새콤함까지 들어간 ‘쓰리콤보’의 복잡한 맛이 이전처럼 매력을 발산하지 못하고 있는 것이다. 원인은 신종 코로나 바이러스 감염증(코로나19) 사태가 장기화되면서 나타난 심리적 변화가 컸",
  },
  {
    idx: 75392,
    title: "중년 이후 꼭 챙겨 먹을 간식 4가지!",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/19/11/d816c7da0f6d43b2aae07d78dfddd712.jpg",
    mediaName: "마음건강 길",
    url: "https://hub.zum.com/mindgil/75392",
    summaryContent:
      "50대가 되면 음식에 대한 제약이 많아진다. 하나 둘씩 아픈 곳이 생기면서 건강에 대한 염려가 본격화되기 때문이다. 먹을 것도, 맛있는 것도 많은 요즘 세상이지만 아무거나 막 먹었다가는 내 몸을 망가뜨릴 수 있다. 하지만 사람이 어떻게 밥만 먹고 살 수 있나. 과자도, 빵도, 라면도, 치킨도 다 안 된다고 하면 도대체 무엇을 먹어야 하는 것일까. 유튜브 에",
  },
  {
    idx: 75393,
    title:
      "[임선영 작가의 오늘 뭐 먹지?]“우리 강아지 왔나” 할머니 무르팍 같은 구수한 수수팥떡",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/19/11/37338d192bc04c95a4c039f95f7169e6.jpg",
    mediaName: "동아일보",
    url: "https://hub.zum.com/donga/75393",
    summaryContent:
      "아무 조건 없이 아무 때나 찾아가도 무르팍을 내어주며 복슬강아지처럼 쓰다듬어 주는 사람이 있었다. 시골집 할머니. 나는 아직도 할머니 방의 담요 냄새와 구식 텔레비전, 처마 밑에 걸려 있는 흑백 가족사진들을 어렴풋이 기억한다. 그중 가장 뚜렷한 것은 부엌에서 내어 주시던 수수팥떡의 맛이었다. 할머니 손맛은 음식으로 기록됐다. 추억이라는 저장소에 깊이 남아 ",
  },
  {
    idx: 75394,
    title: "고기를 먹는 채식도 있다?",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/19/11/482d33fe87c44cc7b3ae3e66f63973f8.jpg",
    mediaName: "파이낸셜뉴스",
    url: "https://hub.zum.com/fnnews/75394",
    summaryContent:
      "채식에도 다양한 유형이 존재한다 [파이낸셜뉴스] '채식'은 동물성 식품의 일부 또는 전체를 피하고 식물성 식품을 중심으로 하는 식생활이다. 채식을 실천하는 사람을 채식주의자(Vegetarian, 베지테리언)라 부르는데, 이들은 먹거나 먹지 않는 식품에 따라 몇 가지 유형으로 구분된다. ■ 비건(vegan) 동물에게서 얻은 모든 식품을 먹지 않는 완전 채식주",
  },
  {
    idx: 75430,
    title: "누가 실수로 향수 쏟은 거 아니냐는 스타벅스 신상음료",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/23/11/4c03fced0d284a19a4486b8005e9a50c_640x480c.jpg",
    mediaName: "밥심",
    url: "https://hub.zum.com/singleliving/75430",
    summaryContent:
      "베르가못? 그거 향수 아니야..? 어느새 슬슬 날이 풀리면서 옷차림도 서서히 가벼워지고 있는데요. 스타벅스에서도 봄이 왔습니다ㅋㅋ 매년 나오는 체리블로썸 음료와 두 가지 음료를 더 출시했더라고요. 같이 만나러 가보실까요~? 밥심이 구매한 음료는 미드나잇 베르가못 콜드브루입니다! 이름 한 번 엄청 기네요ㅎㅎ 제품 정보 미드나잇이라는 이름과 어울리는 보라색 음",
  },
  {
    idx: 75390,
    title: "[강경록의 미식로드] 수능 때마다 줄서서 '덩실' 춤추는 분식집",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/19/11/cea448052b79412081ea0715632ec063.jpg",
    mediaName: "이데일리",
    url: "https://hub.zum.com/edaily/75390",
    summaryContent:
      "[이데일리 강경록 기자] ‘수능 때면 난리나는 분식집’이 충북 제천에 있다. 근데 이집 특이하다. 간판에는 분식집인데, 분식집 대표메뉴라고 할 수 있는 ‘김밥’, ‘라면’, ‘떡볶이’가 없다. 대신 찹살떡과 도넛만 있다. 제천 사람이면 누구나 아는 이곳의 이름은 ‘덩실분식’이다. 1965년 문을 열었으니, 업력만 60년 가까이 됐다. ‘덩실’이라고 이름 지",
  },
  {
    idx: 75391,
    title: "美쳐버린 가성비! 노브랜드 추천템 10",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/19/11/d95b5dcb2bd84908ac929bbed6d32aad_640x480c.jpg",
    mediaName: "드링킷",
    url: "https://hub.zum.com/drinkeat/75391",
    summaryContent:
      "저렴하고 맛 좋은 식품들로 자취생 마음 설레게 한다는 노브랜드. 노브랜드에 입점되어 있는 여러 상품 가운데, 가성비 뛰어난 식품들만 골라 봤다. 쟁여두고 하나씩 꺼내 먹기 좋은 술안주부터 달달한 디저트까지! 노브랜드 쇼핑 시 꼭 담아와야 할 제품들을 소개한다. 보이면 담아야 하는 필수 아이템이니 쇼핑 시 참고해 보자. 노브랜드 만두는 이미 '믿먹(믿고 먹는",
  },
  {
    idx: 75415,
    title: "봄나물과 호두와의 만남…‘호두냉이 된장무침’",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/20/08/a82d475dec0843ce9ca65dc076584da6_640x480c.jpg",
    mediaName: "리얼푸드",
    url: "https://hub.zum.com/realfoods/75415",
    summaryContent:
      "[리얼푸드=육성연 기자]제철을 맞은 봄나물은 각종 영양소가 풍부한 식품입니다. 각종 질병 예방과 면역력 향상에 도움을 주는 비타민과 미네랄, 그리고 식이섬유가 다량 들어있죠. 호두는 일반 견과류에서 찾아보기 힘든 식물성 오메가-3 알파리놀레산(ALA )을 풍부하게 함유한 유일한 견과류입니다. 호두 한 줌(28g) 당 2.5g이 들어있습니다. 영양소가 풍부한",
  },
  {
    idx: 75388,
    title: "감칠맛 나는 소스로 요리에 생명을! 만능 소스 레시피 추천",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/19/11/9f42648ab87e494db33feafa9a1b35ff_640x480c.jpg",
    mediaName: "드링킷",
    url: "https://hub.zum.com/drinkeat/75388",
    summaryContent:
      "모든 사람에게는 귀찮음이라는 본능이 잠재되어 있다. 이 귀찮음이 유독 드러나는 상황은 바로 요리를 할 때가 아닐까 생각이 든다. 재료 및 도구 준비, 과정에 따른 조리 시작. 접시에 완성된 요리를 예쁘게 담고, 다음에는 설거지 지옥(일명 설거지옥) 영접. 이처럼 요리는 상당히 복잡한 과정으로 이루어져 있기 때문이다. 하지만, 이런 귀찮은 과정을 거치기 싫은",
  },
  {
    idx: 75389,
    title: "[공복 김선생] 대파, ‘부의 상징'이 되다",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/19/11/a3ad0b9e08264abdae3b3f2eab0e87a1.jpg",
    mediaName: "조선일보",
    url: "https://hub.zum.com/chosun/75389",
    summaryContent:
      "지난 주말 점심 때였습니다. 곰국에 대파를 한 숟가락 가득 퍼 넣었더니, 아내가 “플렉스(flex) 하는구만”이라며 웃더군요. 플렉스란 ‘부를 과시하다'는 뜻으로 사용하는 말이잖아요. 그만큼 대파 가격이 크게 올랐습니다. 이미 상당히 내려갔고 이달 말부터는 진정될 것이라고 하지만, 아직은 여전히 비쌉니다. 사정이 이렇다 보니 식당에서 대파 보기가 힘들어졌을",
  },
  {
    idx: 75372,
    title: "제철 딸기 활용한 '1분 블렌딩 레시피'",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/19/09/1649177618414df7b4ff8855d0885b22_640x480c.jpg",
    mediaName: "리얼푸드",
    url: "https://hub.zum.com/realfoods/75372",
    summaryContent:
      "[리얼푸드=육성연 기자]딸기는 ‘3월 제철 과일’로 유명하다. 비타민C가 사과의 10배 이상 함유돼 있어 피로 회복, 면역력 증가, 피부 미용에 뛰어난 것은 물론, 항산화 물질인 안토시아닌도 풍부하게 들어있다. 딸기는 생과일로 먹어도 맛있지만 금방 상하기가 쉬워 소스나 퓌레, 스무디 재료로 활용하기 좋다. 블렌더를 이용하면 쉽고 빠르게 완성할 수 있다. 제",
  },
  {
    idx: 75366,
    title: "가격 미친것 같은데, 연예인들이 줄서서 먹는다는 도넛 맛집",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/19/08/4e372186fc324e939230d95f490b46f1_640x480c.jpg",
    mediaName: "밥심",
    url: "https://hub.zum.com/singleliving/75366",
    summaryContent:
      "여러분은 빵 좋아하시나요? 밥심은 빵심이라 불릴 만큼 굉장히 좋아합니다ㅎㅎ 자기 관리를 열심히 하는 연예인 분들도 유혹을 떨치지 못할 정도로 달콤해 보이는 도넛들! 오늘은 이 도넛 맛집들을 같이 살펴보려고 해요ㅎㅎ 랜선 먹방 투어 같이 떠나볼까요~? 서울 용산구 한남대로 27길 66 11:00 – 21:00 / 화요일 휴무 추천 메뉴 ▼ 튜브라떼 6,500",
  },
  {
    idx: 75328,
    title: "네가 왜 거기서...? 이색 메뉴 판매하는 프랜차이즈 카페",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/18/11/352cbfb6628940eeb3f4fb84f534de7d_640x480c.jpg",
    mediaName: "드링킷",
    url: "https://hub.zum.com/drinkeat/75328",
    summaryContent:
      "치킨 가게에서는 치킨과 맥주 등을 팔고, 음료 가게에서는 마실거리와 함께 먹는 스낵을 파는 게 당연하다. 하지만 뜬금없이 치킨가게에서 김밥을 판매하거나, 맥주 가게에서 쌍화차를 팔고 있다고 하면 어딘가 어색하게 느껴진다. '이걸 누가 사 먹어…?'라고 생각할 수도 있겠지만, 이는 분명 구매자의 수요를 예측하고 출시된 제품일 터. 트로트 가수 영탁의 노래 가",
  },
  {
    idx: 75329,
    title: "심장질환 40% 감소, 올리브유만큼 영양가 있다는 이것",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/18/11/5f96ec8d97474e2a8c4cee1281066887_640x480c.JPG",
    mediaName: "프레시코드",
    url: "https://hub.zum.com/freshcode/75329",
    summaryContent:
      "유럽을 대표하는 장수 지역으로 유명한 지중해 연안! 이 지역 사람들이 장수하는 첫 번째 이유로 '지중해식 식사'가 손꼽히는데요. 가 있습니다. 올리브 나무는 인류의 가장 오래된 농작물 중 하나로 기원전 3,000년부터 재배했으며, 척박한 환경에서도 잘 자라죠. 평균 수명은 600년 이상으로 이탈리아에는 무려 3,500년이 넘는 올리브 나무가 존재해요.&nbsp; 올",
  },
  {
    idx: 75330,
    title: "쌀의 화려한 변신, 쌀 디저트 카페 BEST 5",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/18/11/c6a61f43b51245c794e04f9089575c61_640x480c.jpg",
    mediaName: "식신",
    url: "https://hub.zum.com/siksin/75330",
    summaryContent:
      "한국을 대표하는 주식으로 잘 알려진 ‘쌀’. 식사로만 즐겼던 쌀을 디저트에 활용하는 카페들이 속속 늘어나고 있다. 쌀 디저트는 초기엔 글루텐불내증 같이 밀가루를 섭취하지 못하는 사람들을 위해 건강식으로 시작했다. 밀가루 제품보다 쌀가루로 만든 빵과 디저트들이 소화가 잘되자 일반 소비자들도 즐겨 찾으며 전문적으로 다루는 곳들이 생겨났다. 쌀 디저트는 초기에 ",
  },
  {
    idx: 75331,
    title: "입춘 지나 추위 여전해도…냉면은 ‘제철음식’",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/18/11/d82c5f3fcb2f461ab2c18af7aef018b5.jpg",
    mediaName: "한겨레",
    url: "https://hub.zum.com/hani/75331",
    summaryContent:
      "혼자 먹어도 어색하지 않고, 비교적 시간제한 없이 먹을 수 있는 음식을 선호한다. 웬만하면 쉬는 시간 없고, 1인분을 주문해도 눈치 보지 않아도 되는 식당, 무엇보다도 소주 한 잔 곁들일 수 있는 곳을 찾다가 ‘필동면옥’을 만났다. 지하철 충무로역 바로 앞, 대한극장을 지나 언덕으로 조금 올라가 마주친 이곳의 첫인상은 여타 평양냉면집과 비슷했다. 넓은 유리",
  },
  {
    idx: 75351,
    title: "샤워 안하기 vs 햄버거 덜 먹기, ‘물의 날’ 물 절약 효과는?",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/18/18/18d482fe631345589c94eae37e5d5ba3_640x480c.jpg",
    mediaName: "리얼푸드",
    url: "https://hub.zum.com/realfoods/75351",
    summaryContent:
      "[리얼푸드=육성연 기자]샤워를 하고 요리하면서 물을 절약하는 것보다 더 효율적인 방법이 있을까. 흔히 물 사용을 화장실이나 주방에서만 생각하기 쉬우나 우리가 먹는 식품에는 그보다 더 많은 양의 물이 들어있다. 식품의 생산부터 가공 및 유통, 심지어 폐기하는 과정에서도 사용되는 거대한 물, 즉 ‘물 발자국’ (Water Footprint)이다. 햄버거 한 개",
  },
  {
    idx: 75310,
    title: "알바생 고역일것 같다는, 1500원 올려 출시한 투썸 신상",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/18/08/bb121b74f67b457dbbf248067c6debcb_640x480c.jpg",
    mediaName: "밥심",
    url: "https://hub.zum.com/singleliving/75310",
    summaryContent:
      "누가.. 누가 가져갔어..? 카페인지 베이커리인지 헷갈릴 정도로 음료보다 디저트로 유명세를 타고 있는 투썸플레이스! 이번에 딸기 시즌이 끝나가면서 새로운 음료를 출시했더라고요. 어떤 음료인지~ 같이 보러 가실까요? 아직 따로 홍보를 하지 않는 건지 많이 모르고 계시더라고요. 밥심도 매장을 방문하고 알았어요ㅋㅋ 가격은 5,800원으로 핫, 아이스 둘 다 가격",
  },
  {
    idx: 75304,
    title: "‘방송 나가면 안 됐던 곳’이라 후기 극찬 받는 골목식당 맛집",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/18/11/dab754d28a5749848d2621ddd749b18c_640x480c.png",
    mediaName: "스마트인컴",
    url: "https://hub.zum.com/smartincome/75304",
    summaryContent:
      "요식업계 대부 백종원이 자영업자들의 식당을 찾아다니며 솔루션을 제공하는 프로그램인 ‘골목식당’은 아직까지도 방영되며 꾸준한 인기를 얻고 있습니다 .&nbsp;프로그램에 출연한 가게들 중에는 솔루션이 필요 없다며 백종원의 극찬을 받은 곳들도 적지 않죠. &nbsp;깐깐한 요리 전문가 백종원에게 극찬을 받은 맛집들은&nbsp;금세 화제가 되기도 하는데요 . 그래서 오늘은&nbsp;‘방송&nbsp;나가면 ",
  },
  {
    idx: 75274,
    title: "당신만 몰랐던 숨은맛집 알려드릴게요 #70 - 설악산 토박이식당 외 5곳",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/17/11/98a22f8df766494992c44a1314c582e6.jpg",
    mediaName: "다이닝코드",
    url: "https://hub.zum.com/diningcode/75274",
    summaryContent:
      "다이닝코드 리뷰어들이 직접 방문하고 평가한 전국의 숨은 맛집! 이번주에도 엄선해서 선정하였습니다. 다이닝코드는 식당 후기에 대하여 스폰 및 광고를 전혀받고 있지 않으니, 믿고 보셔도 됩니다.&nbsp; 설악 오색약수터에 자리잡은 산채비빔밥 맛집. 강원도 갈때마다 손두부 메밀 수육 메뉴만 먹다가 산채비빔밥 메뉴는 어색했던 선택... 고소한 산나물이 이렇게 속이 편안해",
  },
  {
    idx: 75275,
    title: "길거리토스트 만들기 식사대용으로 좋아요~",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/17/11/eef6cef4f1c94b1e893db766ab43d479_640x480c.jpg",
    mediaName: "4월의라라",
    url: "https://hub.zum.com/lara/75275",
    summaryContent:
      "길거리토스트 만들기 토스트 급 먹고 싶어 만들어봤어요. 얼마 전 '유퀴즈'라는 프로에서 이삭토스트 대표분이 나오셨던데, 소탈하니 좋으신 분 같으시더라고요. 옆지기랑 같이 보면서 토스트 먹고 싶다고... 토스트에는 달걀이 들어가는데, 안 넣을 수 없는데... 달걀 알레르기가 있는 사람이라 좀 망설일 만도 한데, 이번만 먹겠다네요. 배 아파도 먹고 싶다고 하는",
  },
  {
    idx: 75277,
    title: "11가지 효능의 ‘만병통치' 식품은?",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/17/11/b8c2d879562d42c5b413d0fce345ffc1.jpg",
    mediaName: "마음건강 길",
    url: "https://hub.zum.com/mindgil/75277",
    summaryContent:
      "생강은 중국의 성인 ‘공자’가 몸을 따뜻하게 하기 위해 식사 때마다 반드시 챙겨 먹었다고 전해질 정도로 그 효능이 뛰어나다. 이런 생강은 남자에게도 좋지만 특히 여자에게는 보약보다 더 좋다고 하는데. 하지만 생강의 매운 맛으로 인해 그냥 먹기보다는 생강차로 먹는 것이 편하다. 유튜브 에서 소개하는 생강차의 11가지 효능은 다음과 같다. 한방에서는 ‘반하후박",
  },
  {
    idx: 75278,
    title: "아침에 줄 서서 사먹는 딸기케이크…코로나 스트레스 날린다",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/17/11/1dc82ee8996944ef8227460ae4b8c785.jpg",
    mediaName: "한국일보",
    url: "https://hub.zum.com/hankookilbo/75278",
    summaryContent:
      "10일 오전 10시 30분, 서울 잠실 롯데월드몰 지하 딸기케이크 전문점 앞에 40여 명의 긴 줄이 늘어서 있었다. 전남 함평군이 본점인 ‘키친205’의 딸기케이크는 사회관계망서비스(SNS)에서 인기를 얻기 시작해 지난해 11월 서울로 진출했다. 지름 18㎝의 케이크에 800g의 딸기를 듬뿍 넣어 맛과 비주얼을 동시에 만족시켰다. 하루에 200개만 한정 판",
  },
  {
    idx: 75265,
    title: "가운데 ‘이것’ 넣은 게 신의 한 수 같다는 3천원대 CU신상",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/17/10/ffbd749f2daf45cebaa8f3a2ac97a3e2_640x480c.jpg",
    mediaName: "밥심",
    url: "https://hub.zum.com/singleliving/75265",
    summaryContent:
      "또 역대급? CU의 대표적인 디저트로는 띵작이라 불리던 쫀득롤케익이 있죠? 나올 때마다 역대급이라는 평가를 달고 나왔는데, 이번에도 역시나! 역대급이라는 평가들이 보이더라고요ㅋㅋ 밥심이 진짜 또 역대급이 맞는지, 확인해보려 가져와 보았습니다. 같이 보러 가실까요~? 무늬부터가 라떼아트 느낌이더라고요ㅎㅎ 가격은 3,300원으로 총 6조각이니, 조각당 550원",
  },
];

let trip = [
  {
    idx: 75553,
    title: "현지인이 추천한 제주도 여행 차박 스폿은 ‘이곳’",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/24/00/ec51c3e036e940f88e45156c3089700b_640x480c.jpg",
    mediaName: "스마트인컴",
    url: "https://hub.zum.com/smartincome/75553",
    summaryContent:
      "코로나의 여파로 국내여행을 희망하는 이들이 부쩍 늘었습니다. 공기 좋은 자연으로 여행을 계획하는 이들이 많아지면서 산이나 공원, 하천 등으로 여행 수요가 집중되고 있는데요. 특히 언택트 여행이 대세로 떠오르면서 개인적인 공간을 보장받을 수 있는 캠핑과 차박이 뜨거운 인기를 얻고 있습니다. 한편, 제주도는 매년 수많은 여행객들이 방문하는 국내 여행지 부동의&nbsp;",
  },
  {
    idx: 75511,
    title: "열기구 올라 낙화암, 수륙양용 버스 타고 백마강… “부여가 달라졌어요”",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/23/10/a303cbfd84ef49e18dcae632e797e621.jpg",
    mediaName: "조선일보",
    url: "https://hub.zum.com/chosun/75511",
    summaryContent:
      "[아무튼, 주말] 백제 고도 부여 ‘육·강 ·공’ 여행 검이불루 화이불치(儉而不陋 華而不侈). ‘검소하지만 누추하지 않고, 화려하지만 사치스럽지 않다.’ 김부식의 ‘삼국사기’ 중 ‘백제본기 온조왕’ 편에 등장하는 구절이다. 훗날 백제의 미학을 설명할 때 종종 인용되곤 한다. ‘백제의 미래’가 된 충남 부여는 이 구절처럼 검소하지만 누추하지 않고, 화려하지만",
  },
  {
    idx: 75513,
    title: "[스테이 99] 방과 풍경 사이, 햇살이 머무는 액자뷰 감성 숙소 5",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/23/11/f6f9229a044a43cd8d6335e6b2ce2add.jpg",
    mediaName: "대한민국 구석구석",
    url: "https://hub.zum.com/visitkorea/75513",
    summaryContent:
      "가만히 누워있기만 해도 좋은 방이 있다. 커다란 창문으로 햇살이 쏟아지고, 낯선 풍경에 마음이 콩닥콩닥 설레는 그런 방. 창문은 언제나 우리를 낯선 세계로 데려다 놓는다. 숙소를 고를 때 창문의 위치와 크기를 눈여겨보는 이유가 여기에 있다. 이번 주말엔 아늑한 분위기에 반하고 멋진 풍경에 두 번 반하는 액자뷰 숙소로 떠나보는 건 어떨까? 만성 피로에 시달리",
  },
  {
    idx: 75514,
    title: "10억년 신비 품은 해변 따라 삼각산 돌아보니 황제의 氣 꿈틀",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/23/11/62927d029acc4694860252d75a4d7ee0.jpg",
    mediaName: "동아일보",
    url: "https://hub.zum.com/donga/75514",
    summaryContent:
      "《서해로 향하는 뱃길은 변수가 많다. 안개와 풍랑, 최근 들어서는 미세먼지까지 끼어들어 항해 여부를 좌우한다. 인천시 옹진군 대청도를 갈 때도 그랬다. 인천항 연안여객터미널에서 짙은 안개 때문에 배가 떠나지 못해 하루를 허비했다. 쾌속선으로 3시간 30분쯤(약 211km) 걸리는 대청도에 도착한 후 1박2일 일정으로 머물다 돌아올 쯤에는 풍랑으로 또다시 하",
  },
  {
    idx: 75515,
    title: "지리산 화엄사 홍매화, 인기가 이 정도였나",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/23/11/33a8b22ebd67477a9c792531b86b3593.jpg",
    mediaName: "오마이뉴스",
    url: "https://hub.zum.com/ohmynews/75515",
    summaryContent:
      "동백과 매화·산수유로 시작된 남도의 꽃봄이 절정을 향하고 있다. 개나리꽃, 진달래꽃, 목련꽃에 이어 벚꽃까지 꽃망울을 터트리고 있다. 봄꽃의 행렬에 숨이 가쁠 지경이다. 꽃봄의 행렬에 끼어 매화를 만나러 간다. 주변에 흔한 매화가 아니다. 격이 다른 고품격의, 아주 오래 된 매화다. 우리나라에 명품 매화가 많다. 화엄사의 화엄매, 선암사의 선암매, 백양사의",
  },
  {
    idx: 75457,
    title:
      "[박준규의 기차여행, 버스여행] 노고단, 쌍산재, 대숲길...산수유 아니어도 구례는 봄",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/22/10/7893a9a647f74dec8a3662599c90f098.jpg",
    mediaName: "한국일보",
    url: "https://hub.zum.com/hankookilbo/75457",
    summaryContent:
      "구례의 봄은 산수유로 시작된다. 코로나19로 축제를 취소했지만 산동면 산수유마을엔 여전히 꽃이 피고 사람이 몰린다. 구례는 산수유가 아니어도 볼 게 많은 지역이다. 대한민국 최고 명산으로 꼽히는 지리산과 섬진강, 쌍산재 고택 등 매력적인 관광지가 즐비하다. 산수유에 집착하지 않으면 오히려 호젓하게 구례의 봄을 즐길 수 있다. 대중교통을 이용한 시골 여행은 ",
  },
  {
    idx: 75459,
    title:
      "[벚꽃 시리즈②: 부산·경남] 조용히 꽃구경하기 좋은 부산·경남 벚꽃 명소 5선",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/22/10/b88ada5fd50e470683666dc6e86a46a1.jpg",
    mediaName: "문화뉴스",
    url: "https://hub.zum.com/munhwanews/75459",
    summaryContent:
      "[문화뉴스 이홍주 기자] 봄 향기를 담뿍 안고 오는 벚꽃. 따뜻한 남쪽에 위치한 부산·경남 지역은 3월 26일경 개화가 시작되어 4월 2일경 벚꽃이 절정을 맞이할 것으로 예상된다. 유난히도 암울했던 겨울을 보내고 봄을 맞이하는 만큼, 활짝 핀 벚꽃은 우리에게 그 어느 때보다 더 큰 희망과 위로를 전해줄 것이다. 코로나19의 여파로 인해 올해 역시 벚꽃 축제",
  },
  {
    idx: 75460,
    title: "당항포에 봄바람 살랑부니 돛을 높이 올려라 [최현태 기자의 여행홀릭]",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/22/10/8736b8b208404b118292776ee662a227.jpg",
    mediaName: "세계일보",
    url: "https://hub.zum.com/segyenews/75460",
    summaryContent:
      "바람과 태양 온 몸 맞으며 인생도 쾌속행진/이순신 장군 호령하던 고성 당항만 요트천국·서퍼낙원으로/‘올록볼록’ 송학동 고분군 SNS 뷰맛집 등극/‘알록달록’ 무학마을 골목길은 동화나라/통영 나폴리농원 편백 피돈치드 샤워로 힐링 당항포에 따뜻한 봄바람 분다. 파도를 따라 천천히 미끄러지다 돛을 높이 활짝 펼치자 배는 한순간 휘청하더니 먼바다로 쏜살같이 나아간",
  },
  {
    idx: 75461,
    title: "조용필이 결혼식 장소로 선택한 절, 분위기가 남다르네",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/22/10/67b31016b47c4503973884de24a1116e.jpg",
    mediaName: "오마이뉴스",
    url: "https://hub.zum.com/ohmynews/75461",
    summaryContent:
      "경기도의 31개 도시 하나 하나를 새롭게 조명하고 여행의 매력을 새롭게 알아가보자 합니다. 김포를 시작으로 파주, 연천, 고양, 강화도, 시흥, 안산, 부천, 의정부, 양주 지역을 현재 취재 중입니다. 예전에는 광릉수목원이라는 이름으로 널리 알려져 있다가 이제는 이름이 국립수목원으로 바뀐 그곳으로 간다. 광릉에서 나오자마자 바로 길 건너편에 국립수목원의 입",
  },
  {
    idx: 75385,
    title:
      "[자박자박 소읍탐방] 쪽빛 바다보다 땀으로 빚은 삶… 마을이 풍경이 된 그곳",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/19/11/053fe6cd3bf14343a8e0e77cac9bee58.jpg",
    mediaName: "한국일보",
    url: "https://hub.zum.com/hankookilbo/75385",
    summaryContent:
      "남해는 남쪽에 있는 바다인 동시에 행정 지명이다. 부산에서 전남 신안에 이르는 넓은 바다에서 하필이면 왜 이곳이 남해일까. 경상도와 전라도의 경계, 한반도 남쪽 바다의 중간쯤이라는 지리적 위치 때문만은 아니다. 동해처럼 망망대해가 펼쳐진 것도, 그렇다고 서해처럼 물이 빠지면 드넓은 갯벌이 드러나는 지형도 아니다. 시선을 어디에 두든 작은 섬 하나쯤은 걸리고",
  },
  {
    idx: 75386,
    title: "[여행]2000년간 마르지 않았던 호수, '쉼터'가 되다",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/19/11/9fe462a2fcee44ab9991d01592bb5af0.jpg",
    mediaName: "이데일리",
    url: "https://hub.zum.com/edaily/75386",
    summaryContent:
      "[제천(충북)=글·사진 이데일리 강경록 기자] 중부 내륙에 위치한 아담한 소도시, 충북 제천. 하늘에서 보면 높은 산으로 둘러싸인 분지 지형으로, 조용하게 돌아다니기에 안성맞춤인 도시다. 그 중심에 ‘의림지’가 있다. 제천 10경 중 으뜸으로, 제천에서 가장 유서 깊은 곳이다. 제천 시민들은 의림지에 대한 향수가 각별하다. 유년 시절 단골 소풍 장소였고, ",
  },
  {
    idx: 75387,
    title: "[ESC] 돔 잡으러 돔으로 가세",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/19/11/125fead2ab3a4191b9262bad2dd67b62.jpg",
    mediaName: "한겨레",
    url: "https://hub.zum.com/hani/75387",
    summaryContent:
      "저 바다에 떠 있는 수상한 물체는 무엇일까? 2년 전 전남 고흥군 거금도를 지나가다가 처음 의문을 품었다. 돔 모양 시설이었다. 창고? 이글루? 우주 기지? 머지않아 그 정체를 알았다. 바다 위에서 숙식하며 낚시할 수 있는 펜션이었다. 돔 형태로 지은 건 멋보다는 실용성 때문이라고 한다. 바닷바람을 덜 받아 덜 흔들리도록 한 것이다. 보통 서해와 남해에서 ",
  },
  {
    idx: 75428,
    title: "5성급 호텔에서나 볼 수 있는 오션뷰로 화제된 국내 카페",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/21/00/ebb7dddb746b406ebde5123dfe0d9a29_640x480c.png",
    mediaName: "스마트인컴",
    url: "https://hub.zum.com/smartincome/75428",
    summaryContent:
      "카페는 단순히 커피나 디저트를 먹는 곳을 넘어서 하나의 문화로 자리 잡았습니다. SNS가 보편화되면서 많은 사람들이 분위기 좋은 카페를 일부러 검색해 찾아가곤 하죠. 최근에는 코로나 이슈로 밀폐된 공간에서의 모임을 꺼리면서 탁 트인 카페에서 커피와 함께 여유를 즐기는 일명 ‘카캉스’가 인기를 얻고 있습니다. 이에 따라 휴양지나 도시 외곽에는 멋진 전망을 보",
  },
  {
    idx: 75383,
    title: "포천 이색 스테이로 떠난 혼행의 기록",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/19/10/ffb95b38802b4bb69feb9e122732cf5a.jpg",
    mediaName: "대한민국 구석구석",
    url: "https://hub.zum.com/visitkorea/75383",
    summaryContent:
      "5000평의 넓은 땅에 자리 잡은 정원과 따스한 아궁이의 온기가 있는 황토집, 15여 년 직접 가꾼 80여 종의 나무와 여러 종류의 동물 친구들. 이곳은 답답한 도시와 집콕에 지친 나를 위하여 찾은 팜스테이 펜션이다. 아무것도 하지 않아도 좋지만 심심할 틈이라곤 없는 포천 샘물농장에서 ‘어쩌다 발견한 하루’를 오롯이 즐겨보려 한다. 펜션에 도착하자마자 눈에",
  },
  {
    idx: 75384,
    title: "농담이 아닙니다, 진짜 항구 이름이 '쪽박'입니다",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/19/11/4198a3a18d4644fd849ced68340af1b1.jpg",
    mediaName: "오마이뉴스",
    url: "https://hub.zum.com/ohmynews/75384",
    summaryContent:
      "농담이 아니다. 진짜 항구 이름이 '쪽박'이다. 어선 서너 척이 정박해있는 거제 동부면에 위치한 아주 작은 항구 이름이다. 3월 중순 따스한 오후, 쪽박항에서는 어선 한 척이 크레인에 들려 몸에 붙은 조개류를 뜯어내고 있었다. 그 옆에 우뚝 서 있는 안내판에 적힌 항구 이름을 보고 순간 두 눈을 의심했다. 재밌군. 누가 이름을 지은 걸까. 분명 보기와는 다",
  },
  {
    idx: 75380,
    title: "소소하지만 확실한 순창의 힐링 포인트 3",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/19/10/4ff54774e7c14284b4c434f4d8e0a70a.jpg",
    mediaName: "대한민국 구석구석",
    url: "https://hub.zum.com/visitkorea/75380",
    summaryContent:
      "순창은 장류의 고장으로 유명하다. 섬진강 상류에 해당하는 적성강이 고추장, 된장 등의 재료가 되는 맑은 물과 풍성한 곡식을 뒷받침한 덕분이다. 순창이 ‘힐링 1번지’로 불리는 이유도 천혜의 자연에 있다. 풍경은 눈길 닿는 곳마다 아늑하고, 정직하게 거둔 음식은 건강을 선물한다. 산 좋고 물 좋은 곳에 건강한 삶이 있는 것은 당연한 이치. 꾸준히 운동하겠다는",
  },
  {
    idx: 75381,
    title: "눈꽃 너머 숨겨진, 봄길 신난 겨울 끝자락",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/19/10/a1319d5a88b44af78a0511730f31ea01.jpg",
    mediaName: "서울신문",
    url: "https://hub.zum.com/seoulshinmun/75381",
    summaryContent:
      "눈이 왔을 때 풍경의 진수를 선보이는 곳들이 있다. 강원 태백, 삼척 등이 그렇다. 하나같이 베틀바위로 가는 노정에 놓인 고원 도시들이다. 이 지역들엔 겨울이 오래 머문다. 다른 지역에서 봄을 노래할 때 ‘철없는’ 눈이 내리는 경우도 잦다. 그 덕에 흑과 백이 극명한 대비를 이루는 탄광마을, 눈과 어우러진 통리협곡의 붉은 암벽 등 ‘저세상’ 풍경과 만나기도",
  },
  {
    idx: 75361,
    title: "해외 부럽지 않다, 30만 원에 묵을 수 있는 국내 5성급 호텔 오션뷰",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/19/00/13dcd78f0f384ee2ad236380147e6b65_640x480c.png",
    mediaName: "스마트인컴",
    url: "https://hub.zum.com/smartincome/75361",
    summaryContent:
      "코로나19로 인해 해외 여행길이 막히면서 호텔 방에서 하루를 보내는 호캉스 상품이 인기를 끌고 있습니다. 요즘은 호텔이 숙박을 넘어 일상 속 문화생활의 공간으로 주목받고 있죠. 호텔 내 레스토랑이나 라운지, 바, 스파 등을 즐기기 위해 누구나 쉽게 찾아갈 수 있는 공간이 되었는데요. 최근에는 번잡한 도심 속에서 벗어나 여유로운 시간을 보내고 싶은 이들이 늘",
  },
  {
    idx: 75323,
    title: "해상택시 타고 섬에서 섬으로, 동남아 호핑투어 저리가라",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/18/11/4da5904d50d24eeb8efadfe6bcb3ecff.jpg",
    mediaName: "중앙일보",
    url: "https://hub.zum.com/joongang/75323",
    summaryContent:
      "태국 푸껫, 필리핀 보라카이 같은 동남아 휴양지를 가면 ‘호핑 투어(Hopping tour)’를 즐기곤 했다. 배를 타고 작은 섬이나 해변을 넘나드는 여행 방식이다. 코로나19 탓에 동남아를 갈 수 없으니 국내로 눈을 돌려본다. 무려 570개 섬을 거느린 경남 통영이 호핑 투어 여행지로 제격이다. 국내 최초로 선보인 ‘해상택시’가 있어서다. 해상택시는 택시",
  },
  {
    idx: 75325,
    title:
      "낙성대 빌라촌 사이, 강감찬 장군의 생가터가 있다 [단칼에 끝내는 서울 산책기]",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/18/11/393cb4dc7d82404e978a70e765c8b3bb.jpg",
    mediaName: "오마이뉴스",
    url: "https://hub.zum.com/ohmynews/75325",
    summaryContent:
      "관악산의 한 줄기 2호선 낙성대역은 거란의 침략으로부터 고려를 구한 강감찬의 영정이 모셔진 곳이다. 낙성(落星)이란 한자에서 알 수 있듯이 그가 태어날 때 생가에 큰 별이 떨어졌다고 해서 붙여졌다. 별똥별 관련 출생담은 범상치 않은 인물에 대한 세계 여러 나라의 설화와 유사하다. 또 다른 기록으로는 고려에 온 중국 사신이 강감찬을 보고는 문곡성(북두칠성)의",
  },
  {
    idx: 75326,
    title: "무릉 너머 숨겨진, 하늘 길 열던 선녀의 옷자락",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/18/11/f56097054b174dcfb1bd1b13c89751bd.jpg",
    mediaName: "서울신문",
    url: "https://hub.zum.com/seoulshinmun/75326",
    summaryContent:
      "강원 동해에 거창한 이름의 경승지가 있다. 무릉계곡(명승 37호)과 두타산(1353m)이다. 이상향을 뜻하는 단어들을 각각의 지명에 차용했다. 무릉계곡과 두타산 사이엔 베틀바위가 있다. 두타산의 정수라고 해도 좋을 웅장한 바위봉우리다. 길이 험해 극소수의 전문 산악인들만 찾았던 베틀바위지만 이젠 누구나 어렵지 않게 오간다. 새로 난 ‘베틀바위 산성길’ 덕이",
  },
  {
    idx: 75327,
    title: "김태리처럼 대구 고택서 '인생샷' 남기는 방법은?",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/18/11/4270c4319b5f4e3faba73f109555d683.jpg",
    mediaName: "매일경제",
    url: "https://hub.zum.com/maekyung/75327",
    summaryContent:
      "거대도시 대구 시티에는 전통이 숨 쉬는 고즈넉한 풍경이 자리한다. 안동에 하회마을이 있다면 대구에는 남평문씨본리세거지가 있다. 남평문씨 중에 가장 유명한 인물은 문익점이다. 그의 후손들이 집성촌을 이루며 살고 있는 민속마을이다. 조선시대 달성지역 양반 주택의 양식을 보존한 한훤당 고택도 빼놓을 수 없다. 한훤당 김굉필을 배향한 낙동강 변의 도동서원도 같이 ",
  },
  {
    idx: 75268,
    title:
      "[기수정의 여행 in] 우두산 절경보며 '눈호강' 오도산 솔숲따라 '몸호강'",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/17/10/c717cc78781a443297ef9e64617a88ad.jpg",
    mediaName: "아주경제",
    url: "https://hub.zum.com/ajunews/75268",
    summaryContent:
      "초록물결 신비로운 거창 수승대 거북바위…퇴계이황 시구 비롯 옛 풍류詩가득 해발 1046m 우두산 자락 항노화 힐링랜드…기기묘묘 암봉 이은 'Y자 출렁다리' 명물 합천 오도산 힐링로드·숲속의 집 치유센터…전국유일 소나무 산림욕·시원한 계곡 '가득' 참 생경하다. 늘 맛봤던 숲의 내음도, 바람 소리도······. 모든 것이 새로운 요즘이다. 무서운 역병에 지인",
  },
  {
    idx: 75269,
    title: "[남는 건 사진] 웃을 일 없는 코로나 시국에 배꼽 빠질 여행 사진 5",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/17/10/2f2f71e2e87940dcbcb2463fed94f47a.jpg",
    mediaName: "매일경제",
    url: "https://hub.zum.com/maekyung/75269",
    summaryContent:
      "향긋한 꽃내음, 들녘의 푸르름, 따스한 해거름. 봄이 다가오는 모습은 다양하다. 올 봄, 우리는 떠날 수 있을까. 혹여 떠나지 못해도 이런 건 어떨까. 사진으로라도 대리만족해 여행길에 오르는 상상말이다. 하지만 그냥 떠나는 것은 ‘재미’가 떨어진다. 피사체와 준비물을 적극 활용해 재미를 끌어올리는 재기발랄함을 얹어보자. 일단 남들이 해놓은 것을 먼저 보고 ",
  },
  {
    idx: 75271,
    title: "어느덧 불어오는 봄바람 맞아 - 남파랑길 89코스",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/17/10/1df40fd76d90497d8d116c7707e648cb_640x480c.jpg",
    mediaName: "로드프레스",
    url: "https://hub.zum.com/roadpress/75271",
    summaryContent:
      "- 완도와 해남을 잇는 13.5km의 길 - 후반부의 임도구간은 걷기의 즐거움 가득한 멋진 길 - 후반부 이후 미황사까지 편의시설의 부족은 아쉬워 어느덧 봄이다. 이제는 '봄을 기다린다, 동장군의 늦은 시샘' 이런 말을 쓸 때가 아니다. 동장군은 완연하게 물러갔고 이미 남녘은 산수유꽃과 매화꽃이 한창이다. 그래서 남도의 끝, 해남과 완도를 향하는 발걸음은 ",
  },
  {
    idx: 75272,
    title: "막 찍어도 인생샷, 섭지코지는 유채꽃 만발한 지금이 제철",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/17/10/cad8e5ad00d84c55ac33c98bad72a0e5.jpg",
    mediaName: "중앙일보",
    url: "https://hub.zum.com/joongang/75272",
    summaryContent:
      "제주도는 누가 뭐래도 이맘때 가장 싱그럽다. 인생 사진 성지로 통하는 섭지코지도 지금이 제철이다. 이른 봄부터 4월 말까지 섭지코지 일대를 샛노란 유채꽃이 물들인다. 누구나 꿈꾸는 인생 사진을 가장 쉽게 건질 수 있는 때다. 하늘하늘한 원피스를 입고 성산일출봉을 향해 그네를 타는 사진. 최근 소셜미디어에서 자주 보이는 명장면이다. 성산일출봉을 마주 보는 섭",
  },
  {
    idx: 75211,
    title: "우리나라 3대 암산, 월출산에 올랐습니다",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/16/09/a829cc928e614be5b37322eceb82279b.jpg",
    mediaName: "오마이뉴스",
    url: "https://hub.zum.com/ohmynews/75211",
    summaryContent:
      "우리나라 명산을 아내와 함께 순례하는 친구가 있습니다. 벌써 51번째 산을 오른 서울 사는 친구인데, 이번에는 내가 살고 있는 목포와 가까운 영암 월출산을 올라간다고 해서 나도 함께 따라나섰습니다. 평소 허리가 좋지 않은 나는 가끔씩 침을 맞고 있는데, 허리 근육을 키우는데 산을 오르는 것보다 좋은 것도 없겠다 싶어서 함께 오른 산행길이었습니다. 그 친구는",
  },
  {
    idx: 75212,
    title: "'윤스테이'에 나온 그 동네, 산수유꽃이 절정이라오",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/16/09/b86c5c4008e545f8be1fe15db5741fb4.jpg",
    mediaName: "오마이뉴스",
    url: "https://hub.zum.com/ohmynews/75212",
    summaryContent:
      "완연한 봄날을 되찾았다. 촉촉하게 내린 봄비 덕분인지, 만물이 살아서 움직이는 게 느껴지는 요즘이다. 겨우내 앙상하던 나뭇가지에도 봄물이 잔뜩 올랐다. 땅에서는 봄까치꽃, 광대나물, 냉이꽃, 춘란이 무성하게 올라오고 있다. 섬진강변의 매화, 지리산 자락의 산수유꽃도 다 피어서 만발하고 있다. &lt;윤스테이&gt;가 있다. 케이블 텔레비전 tvN의 예능 프로그램 제목",
  },
  {
    idx: 75214,
    title: "엄마가 섬그늘에 굴 따러가던 ‘남해바래길’의 온기(溫氣)",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/16/09/fe3f139b616347b9993ed44c94f03a62.jpg",
    mediaName: "헤럴드경제",
    url: "https://hub.zum.com/heraldcorp/75214",
    summaryContent:
      "세상 어디에도 없는 남해군 창선도 고사리길 독일마을 낀 자암 김구(金絿)의 ‘화전별곡’길 지구촌 최소 ‘둘리 화석’, 아기공룡 발자국도 죽방렴 멸치쌈밥, 얼다녹은 甘시금치차 필수 서포 김만중 구운몽길, 미국마을 앵강다숲길 전지훈련 메카 바다노을길, 노량대첩 호국길 청년예술가들 ‘늘 그대로’展 로제,BTS 처럼 위로 [헤럴드경제=함영훈 여행선임기자] 매력 포",
  },
  {
    idx: 75215,
    title: "지구에서 즐기는 우주의 기운, 해외 우주 테마 숙소 5선",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/16/09/ae1c8b89ad8749d5a8d31bcb117a0bb0.jpg",
    mediaName: "뉴스1",
    url: "https://hub.zum.com/news1/75215",
    summaryContent:
      "(서울=뉴스1) 윤슬빈 여행전문기자 = 우주여행에 대한 관심이 높아지고 있다. 얼마 전 미국 캘리포니아의 한 우주개발 회사가 2027년 세계 최초로 우주 호텔을 가동할 계획이라고 밝혀, 우주여행을 꿈꿔오던 많은 이들의 이상이 현실에 더 가까워졌다. 부킹닷컴이 최근 한국인 1000여 명을 포함한 전 세계 2만2000여 명을 대상으로 실시한 설문조사에 따르면,",
  },
  {
    idx: 75153,
    title: "노동신문이 '절승경개'라며 공개한 북한 명승지는?",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/15/11/ee8e6eb6f7e44b4795eeb0418110870f.jpg",
    mediaName: "중앙일보",
    url: "https://hub.zum.com/joongang/75153",
    summaryContent:
      '남쪽에서 한창 봄 꽃소식이 전해지는 가운데 북한 노동신문은 14일자에 "아름다운 절승경개(絶勝景槪, 경치가 대단히 아름답고 좋음)를 자랑하는 우리 조국"이란 제목으로 사진을 공개했다. 사진에는 금강산 접선봉의 운해와 해칠보, 총석정의 일출, 이명수 폭포의 상고대, 한여름 시원하게 물줄기가 떨어지는 박연 폭포, 구월산의 단풍 등의 풍경이 담겨있다. 우리에게 ',
  },
  {
    idx: 75154,
    title: "[ESC] ‘동백 파마머리’ 벽화는 어떻게 ‘핫플’이 되었나",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/15/11/df2faf9304a849e59cb77ae727bb6981.jpg",
    mediaName: "한겨레",
    url: "https://hub.zum.com/hani/75154",
    summaryContent:
      "지난 2년간 지역 명소를 넘어 전국적인 여행지로 이름 날린 벽화가 있다. 전남 신안군 암태도 기동삼거리에 있는 문병일(79)·손석심(79) 부부 집 벽화다. 은은한 미소를 띤 부부의 얼굴이 담벼락을 가득 채우고 있다. 두 사람의 머리는 잎이 무성한 동백나무 모양이다. 담장 안쪽에 자라는 동백나무는 벽화 위로 풍성한 머리를 완성한다. 유쾌하고 우스꽝스러운 머",
  },
  {
    idx: 75155,
    title: "[매화산행 가이드] 매화 향에 홀려 정상온 줄도 몰랐네",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/15/11/b988db7dfe614cd1a6232a71561763dd.jpg",
    mediaName: "조선일보",
    url: "https://hub.zum.com/chosun/75155",
    summaryContent:
      "퇴계 이황의 유언은 “저 매화에 물을 주라”는 것이었다고 한다. 퇴계의 매화 사랑은 유명해 평소 매화를 ‘매형梅兄’, ‘매군梅君’이라 부르며 ‘혹애酷愛(지독한 사랑)’에 빠졌다고 고백할 정도였다. 엄동설한에도 홀로 고상하게 피는 꽃을 보면 퇴계의 마음을 이해할 것도 같다. 한평생 춥게 살아도 향기를 팔지 않는다는 매화의 품격을 사랑했던 것이다. 올해는 기나",
  },
  {
    idx: 75156,
    title: "제주도 항공권 화요일이 가장 싸다···꼭 피해야 할 요일은",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/15/11/480c5c91e8264c47afd22dae69d124af.jpg",
    mediaName: "중앙일보",
    url: "https://hub.zum.com/joongang/75156",
    summaryContent:
      "국제선 비행기를 타고 해외여행 떠나는 건 언감생심이지만 국내선 비행기라도 싸게 사는 방법은 없을까. 항공권 가격 비교 사이트 '카약'이 최근 3개월 치 국내선 항공권을 분석한 결과, 김포~제주 노선은 화요일에 출발했다가 목요일에 돌아오는 일정이 가장 저렴한 것으로 나타났다. 카약은 \"지난해 코로나19 탓에 여행 시장 전체가 위축됐지만, 국내선 검색량은 20",
  },
  {
    idx: 75044,
    title:
      "[강갑생의 바퀴와 날개]고리버들 의자에서 수억원대 일등석까지…여객기 좌석의 변신",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/12/08/8a9a8fc1d0e941988a85c2f3158145cf.jpg",
    mediaName: "중앙일보",
    url: "https://hub.zum.com/joongang/75044",
    summaryContent:
      "[강갑생의 바퀴와 날개] 항공사가 비행기를 새로 도입할 때 고심하는 것 중 하나가 '좌석'입니다. 항공권 등급별로 어떤 기능과 모양을 갖춘 좌석을 제작해서 기내에 설치하느냐 하는 건데요. 좌석이 해당 항공사의 경쟁력을 좌우하는 요소 가운데 하나이기 때문입니다. 통상 비행기 좌석은 항공사가 별도로 전문회사에 디자인과 제작을 의뢰한 뒤 비행기에 설치하게 됩니다",
  },
  {
    idx: 75045,
    title:
      "[자박자박 소읍탐방] 다시 본다 '옛날 관광지'… 숲과 길로 진화한 삼한시대 저수지",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/12/08/d5f83d4a84bc4aa2b5b2835a6f128c2f.jpg",
    mediaName: "한국일보",
    url: "https://hub.zum.com/hankookilbo/75045",
    summaryContent:
      "보존할 가치가 있는 문화유산 중 나라에서 경치가 빼어나다고 인정한 곳을 국가명승이라 부른다. 강릉 소금강을 필두로 거제 해금강, 완도 구계등 순으로 현재까지 전국 100여 곳이 목록에 올라 있다. 명승과 함께 유적ㆍ신앙ㆍ산업ㆍ교통 분야에서 중요한 것은 사적으로, 동물(서식지)ㆍ식물(자생지)ㆍ지질 분야에서 중요한 것은 천연기념물로 보호하고 있다. 명승은 대개",
  },
  {
    idx: 75046,
    title: "코로나 2년째, 전국 10대 봄 축제 안전하게 즐기는 방법 총정리",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/12/08/ee8a370aaf5345b0b18e1f862ca32aef.jpg",
    mediaName: "중앙일보",
    url: "https://hub.zum.com/joongang/75046",
    summaryContent:
      "봄이다. 방방곡곡에서 봄꽃 개화 소식이 들려온다. 하나 올해도 봄 축제는 안녕하지 못하다. 감염병 확산 우려로 취소가 줄을 잇는다. 코로나 2년 차를 맞아 달라진 점도 보인다. 온라인 축제로 전환하는가 하면, 드라이브 스루처럼 비대면 방식을 유도하는 축제도 있다. 축제는 취소했지만, 방역 절차에 따라 봄꽃 명소 입장을 허용하는 지역도 많다. 전국 주요 봄 ",
  },
  {
    idx: 75000,
    title: "“참 좋은데, 오시라 말도 못하고” 산수유꽃 만발한 구례 산동마을",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/11/13/e0eecdd6e0f3404b9e70c5c46ee0c71d.jpg",
    mediaName: "중앙일보",
    url: "https://hub.zum.com/joongang/75000",
    summaryContent:
      "벌써 봄이 왔다. 강원도가 폭설로 몸살을 앓는 사이, 여기 지리산 자락은 꽃으로 이미 환하다. 대관령 춘설은 때가 늦었다 했는데, 지리산에 내려온 봄은 철이 이르다. 일러도 한참 이르다. 여느 해보다 열흘 일찍 산수유꽃이 봉오리를 피웠다. 해마다 3월 중순이면 노고단 아랫마을에 들어와 봄맞이 의례를 치렀었다. 골짜기마다 들어선 마을을 돌아다니며 노란 기운으",
  },
  {
    idx: 75001,
    title:
      "관악산 제일의 해거름을 볼 수 있는 호암산성길 [단칼에 끝내는 서울 산책기]",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/11/13/d84e31010c41402481b1949fdf108bb2.jpg",
    mediaName: "오마이뉴스",
    url: "https://hub.zum.com/ohmynews/75001",
    summaryContent:
      "관악산에서 시흥동과 독산동 방면으로 뻗어나온 삼성산 줄기에 자리잡고 있는 호압사는 타는 듯한 붉은 노을을 언제나 볼 수 있는 곳이다. 시흥2동에서 도보로 10여분이면 도달하는 짧은 거리이며 제법 지대가 높고 시야를 가리는 사물이 없어서 산책코스로도 훌륭하다. 뿐만 아니라 호압사 바로 뒷산(호암산)으로 오르면 관악산 정상에서 보는 것 만큼이나 시원한 풍광이 ",
  },
  {
    idx: 75086,
    title: "‘국내 맞아요?’ 요즘 SNS에서 핫한 가평 풀빌라 5곳",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/13/00/74bbd039ca6c48f58cc6d87e3d6abce8_640x480c.png",
    mediaName: "스마트인컴",
    url: "https://hub.zum.com/smartincome/75086",
    summaryContent:
      "가평은 서울에서 차로&nbsp;1시간 반 거리에 위치해 있어 짧은 일정으로도 부담 없이 다녀올 수 있는 여행지입니다.&nbsp;주변에는 남이섬,&nbsp;아침 고요 수목원 등 관광 명소도 많아 즐길 거리가 다양하죠.&nbsp;서울 근교 인기 여행지&nbsp;1위에 빛나는 지역인만큼 펜션도 많습니다.&nbsp;최근에는 고급&nbsp;리조트나 특급호텔 부럽지 않은&nbsp;럭셔리 풀빌라들도 늘어나는 추세인데요. 그래서 오늘은&nbsp;봄을",
  },
];

let culture = [
  {
    idx: 75478,
    title: "'10년 만의 역주행' 아이유 노래, '롤린'과 차이점은",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/22/16/d018056bfde640469ea87ca9acdffb91.jpg",
    mediaName: "오마이뉴스",
    url: "https://hub.zum.com/ohmynews/75478",
    summaryContent:
      "소피마르소의 머리 위로 헤드폰이 내려앉은 순간, 사랑은 시작됐습니다. 소녀의 눈앞에 완전히 다른 세상이 펼쳐졌지요. 아등바등 사느라 자주 놓치게 되는 당신의 낭만을 위하여, 잠시 헤드폰을 써보면 어떨까요. 어쩌면 현실보단 노래 속의 꿈들이 진실일지도 모르니까요. Dreams are my reality. 음원차트 역주행은 무명가수뿐 아니라 최정상에 오른 가수",
  },
  {
    idx: 75477,
    title: "한탕 하려던 남자들이 죽었다… 아내들이 대신 나섰다",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/22/15/3977ed43644d4882b7733ee790540819.jpg",
    mediaName: "한국일보",
    url: "https://hub.zum.com/hankookilbo/75477",
    summaryContent:
      "멀쩡하게 ‘출근’한 남편이 죽었다. 혼자가 아니었다. 네 남자가 함께 거액을 강탈하려다 경찰 총격으로 차와 함께 불탔다. 베로니카(비올라 데이비스)는 당황스럽다. 돈 잘 벌어오고 아내 사랑이 지극한 남편 해리(리엄 니슨)가 강도인 줄은 몰랐다. 엘리스(엘리자베스 데비키)도 마찬가지다. 폭력적이지만 달콤하기 그지 없는 남편이 범죄를 행하다 죽을 줄 상상치 못",
  },
  {
    idx: 75376,
    title: "한국인 사진기자 최초로 퓰리처상을 수상한 김경훈의 두 번째 책 ",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/19/10/3e9834456b6743afb17e2d5cd4cfdaab_640x480c.jpg",
    mediaName: "예스24 채널예스",
    url: "https://hub.zum.com/yes24/75376",
    summaryContent:
      "전작인&nbsp;『사진을 읽어 드립니다』가 유명한 사진들을 통해 사진의 역사를 이야기하는 방식이었다면, 이번 책은 사진을 통해 사회적인 이슈들을 끄집어낸다. 한 장의 사진으로부터 흥미로운 때로는 안타까운 이야기가 전개되며, 이를 시작으로 사진에 담긴 의미와 사진 한 장이 어떻게 사회에 영향을 미쳤는지 등 흥미진진한 내용들이 담겨 있다. 약 2년 만에 펴낸 신간입니다",
  },
  {
    idx: 75291,
    title: "7살 딸아이가 아빠 몰래 엄마에게 꺼낸 충격적인 말",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/17/16/af1e70e07b154a34baad7d0ac68bba58_640x480c.JPG",
    mediaName: "책썰미",
    url: "https://hub.zum.com/chaegssulmi/75291",
    summaryContent: "",
  },
  {
    idx: 75377,
    title: "경이로운 ‘소울’의 음악세계",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/19/10/f51e348659fd4e749dcd2c3340148686_640x480c.jpg",
    mediaName: "예스24 채널예스",
    url: "https://hub.zum.com/yes24/75377",
    summaryContent:
      "&lt;소울(Soul)&gt;이 픽사 애니메이션 스튜디오의 최고 작품은 아닐지도 모른다. 하지만 최고의 음악 영화임은 분명하다. 흑인 재즈 피아니스트 조 가드너(제이미 폭스 분), 태어나지 않은 영혼 22(티나 페이 분)의 하루를 그린 이 작품은 반복되는 일상 속 삶의 가치를 다시 묻고, 모든 것의 근원으로 거슬러 올라가 세계 속 개인을 곱씹게 만든다. 그 핵심 가치",
  },
  {
    idx: 75289,
    title: "'폭력' 아빠 때린 유치원 교사... 교장의 의외의 선택",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/17/15/b0af1b06a1cf4ecea6e0da1bb5fd02b6.jpg",
    mediaName: "오마이뉴스",
    url: "https://hub.zum.com/ohmynews/75289",
    summaryContent:
      "이제는 기억에서 많이 사라졌지만 유치원에 다니던 미취학아동 시절을 떠올려 보면 대부분의 아이들이 그렇듯 나 역시 선생님 말씀 안 듣고 말썽만 피우던 개구쟁이였다. 특히 '유치원 졸업반'이던 7살 때는 야외교육의 일환으로 뒷산에서 수업을 받은 적이 있는데 선생님의 시선이 소홀해 진 틈을 타 무리에서 몰래 빠져 나왔다가 산에서 길을 잃어 부모님과 선생님을 크게",
  },
  {
    idx: 75238,
    title: "관념을 벗은 통찰(洞察)의 건축가 황두진",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/16/15/769fb80ae982464fa28d179d27c5d94d.jpg",
    mediaName: "매일경제",
    url: "https://hub.zum.com/maekyung/75238",
    summaryContent:
      "[효효 아키텍트-77] 중첩된 기하학이 무슨 말인지 몰랐다. 며칠 뒤 한옥을 두고 한 말임을 알았다. 건축사무소 홈페이지, 중첩된 기하학(layered geometry) 개념을 '한 건물 안에 다양한 기하학이 공존'이라고 밝히고 있다. 기하학이 구조 및 재료와 결합하여 효과가 증폭된 게 한옥이다. 한옥을 &lt;'칸'(間)으로 대변되는 직교좌표계(直交座標界)와 ",
  },
  {
    idx: 75221,
    title: "드라마 ‘펜트하우스2’, 민설아와 배로나의 죽음에 대한 드라마의 책임",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/16/10/05607aef1dad406984598ce6bc783e45.jpg",
    mediaName: "경향신문",
    url: "https://hub.zum.com/khan/75221",
    summaryContent:
      "하나의 작은 세계가 무너지고, 또 다른 거대한 세계는 높이 솟아올랐다. SBS 드라마 &lt;펜트하우스&gt; 시즌 1 첫 화는 아직 시청자들이 누군지조차 모르는 인물인 민설아(조수민)가 작중 주요 무대인 헤라팰리스 고층에서 추락하고, 그와 교차해 하늘을 뚫을 듯 솟아오르는 헤라팰리스 상공에서 폭죽 쇼를 벌이는 모습으로 시작한다. “대한민국 최고의 집값” 펜트하우스인",
  },
  {
    idx: 75226,
    title: "봄이 손에 잡힐 듯… 꽃이 만발한 ‘신들의 정원’",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/16/10/19c734999fef44e3a9509dce52a40f67.jpg",
    mediaName: "세계일보",
    url: "https://hub.zum.com/segyenews/75226",
    summaryContent:
      "#폭설과 함께한 3월의 첫날 잊지 못할 3월의 첫날이었다. 봄의 시작처럼 여기는 날이지만 강원도에는 폭설이 왔다. 90㎝에 다다른 눈에 사고와 고립이 속출했다. 강원도를 오가는 익숙한 고속도로에서는 교통사고 수십 건이 발생했다. 뉴스에 자료화면이 나왔는데 온통 흰색이라 어딘지 파악할 수도 없었다. 그럼에도 불구하고 봄은 오고 있었나 보다. 며칠 사이 기온은",
  },
  {
    idx: 75167,
    title: "범인은 바로 너! 손에 땀을 쥐는 추리 영화 4 #해외편",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/15/13/4a2f6a3ff51e4ed391fa16b3db7da073_640x480c.jpg",
    mediaName: "드링킷",
    url: "https://hub.zum.com/drinkeat/75167",
    summaryContent:
      "침을 꼴깍 넘기며 몰입하게 되는 장르는 단연 추리물이 아닐까. 술도 함께 꼴깍꼴깍. 마지막까지 범인을 모른다는 점에서 모든 추리 영화는 반전의 묘미를 즐길 수 있다. 방구석에서 형사에 빙의해 범인을 찾으려는 노력도 추리 영화의 재미랄까. 각각의 단서가 하나의 인물을 가리킬 때의 쾌감이란! 개봉 당시에는 큰 주목을 받지 못했지만, 추리 덕후들의 입소문을 타며",
  },
  {
    idx: 75168,
    title: "개인 소장품을 ‘양지’로 꺼내는 일, ‘음지’의 문화를 모두가 누리는 길",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/15/13/b3ee697f2ba649f39e137d26c0d76b20.jpg",
    mediaName: "경향신문",
    url: "https://hub.zum.com/khan/75168",
    summaryContent:
      "‘간송 컬렉션’에 이어 ‘이건희 컬렉션’으로 다시 주목받는 ‘상속세의 미술품 물납제’가 이제는 도입되려나. 상속세의 미술품 물납제 도입을 촉구하는 목소리가 어느 때보다 높다. 국회에선 관련 법 개정안이 발의됐고, 기획재정부·문화체육관광부도 검토에 들어갔다. 미술품 물납제는 상속세를 현금 외에 부동산·유가증권처럼 미술품(문화재·현대미술)으로도 납부할 수 있게",
  },
  {
    idx: 75071,
    title: "\"난 23번, 이정은 선배는 1번\"... 이 배우는 왜 '아차' 했을까",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/12/12/817d5cfc05be481b8741d054dced9d9d.jpg",
    mediaName: "오마이뉴스",
    url: "https://hub.zum.com/ohmynews/75071",
    summaryContent:
      "작품 속 '주연'과 '조연', 그리고 '단역'의 구분은 있을지언정 연기와 인생의 주연, 조연은 따로 없습니다. 액터 인사이드는 연기를 해오며 온갖 희로애락을 겪었을 배우들을 응원하는 코너입니다. 단편과 독립영화까지 포함하면 이 배우가 출연한 작품만 100편 남짓. 16년의 연기 경력을 쌓아오면서 말 그대로 이 배우는 한 장면, 단 한 컷에 나올지언정 최선을",
  },
  {
    idx: 75072,
    title:
      "도둑질하러 들어간 집에서 들리는 이상한 소리, 홀린 듯이 따라갔더니...",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/12/12/81bfb70d9ad74daa8fdf84acd666a0e0_640x480c.png",
    mediaName: "북스피릿",
    url: "https://hub.zum.com/bookspirit/75072",
    summaryContent: "▲ 풀영상 보기(김경식 나레이션 ver.)",
  },
  {
    idx: 74990,
    title: "혹독한 겨울이 끝나면…'봄의 도착'",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/11/11/f056c326910c4b64b62b3b406debecc1.jpg",
    mediaName: "동아일보",
    url: "https://hub.zum.com/donga/74990",
    summaryContent:
      "푸른 눈의 아이가 버들가지로 엮은 커다란 나무 의자에 앉아 있다. 손에 쥔 머그컵 안에는 새순 돋은 나뭇가지 하나가 꽂혀 있다. 아이의 몸은 하얀 이불 천으로 감싸져 있고, 머리카락은 헝클어져 있다. 잠자리에서 막 일어난 걸까. 제목을 보니 아이는 지금 병에서 회복 중이다. 이 그림을 그린 헬렌 셰르베크는 19세기 핀란드를 대표하는 여성 화가다. 가난한 환",
  },
  {
    idx: 75059,
    title: "트럭 몰던 아버지의 감수성, 아들 박준의 시로 피었다",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/12/09/46747da75f5d478b94c795021465024c.jpg",
    mediaName: "경향신문",
    url: "https://hub.zum.com/khan/75059",
    summaryContent:
      "소년이 있다. 초등학교를 나와 10대 때부터 일을 했다. ‘아이스께끼’ 장사가 시작이었다. 서울 을지로와 청계천의 ‘메리야스’ 공장에서 일했다. 옆구리에는 ‘현대문학’을 끼고 다녔다. 청마 유치환과 노산 이은상의 시가 좋았다. 독학으로 기타도 배웠다. 운전면허를 딴 뒤 구청 기능직 공무원이 됐다. 트럭으로 생활쓰레기를 서울 난지도까지 실어날랐다. 40대에 ",
  },
  {
    idx: 74934,
    title: "이불의 파격 퍼포먼스에는 최승자 詩가 스며있다",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/10/09/696c59a1d53a43e1909b666f1e88aa14.jpg",
    mediaName: "조선일보",
    url: "https://hub.zum.com/chosun/74934",
    summaryContent:
      "여자가 나체로 공중에 거꾸로 매달려있다. 등산용 벨트 하나가 위태로운 안전을 가까스로 지탱한다. 이윽고 여자는 입을 열어 시(詩)를 읊는다. “어느 한 순간 세계의 모든 음모가/ 한꺼번에 불타오르고/ 우연히 발을 잘못 디딜 때/ 터지는 지뢰처럼 꿈도 도처에서 폭발한다.” 피 쏠린 얼굴과 눈자위 탓에, 이것은 낭송이라기보다 비명처럼 들린다. 설치미술가 이불(",
  },
  {
    idx: 74944,
    title: "30년전 이미 '가짜뉴스' 경고... 전설이 된 이 가수",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/10/10/3bee9ce0fc834271bdf42d9d00c492ff.jpg",
    mediaName: "오마이뉴스",
    url: "https://hub.zum.com/ohmynews/74944",
    summaryContent:
      "'문화대통령'이자 1990년대 가요계 최고의 음악천재로 꼽히는 서태지의 최종학력은 중졸이다. 서태지는 중학생 시절 친구들과 스쿨밴드를 결성할 때부터 음악이라는 확실한 꿈을 가지고 있었기 때문에 학업은 그리 중요하지 않았다. 고교 진학 후 본격적으로 음악에 정진하기 위해 과감하게 자퇴를 선택했던 그에 대해 세월이 흐른 후 잘못했다고 말하는 사람은 거의 없다.",
  },
  {
    idx: 74931,
    title:
      "'조선의 타임캡슐' 미라는 문화재인가 무연고 시신인가 [이기환의 흔적의 역사]",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/10/09/a4eebd62faeb4afbad1faf4dcfbec01a.jpg",
    mediaName: "경향신문",
    url: "https://hub.zum.com/khan/74931",
    summaryContent:
      "[경향신문] ‘혹시 암이 아닐까.’ 2002년 9월 경기 파주 교하의 파평 윤씨 묘역 중 무연고 묘에서 나온 미라의 옆구리 쪽을 살피던 김한겸 교수(고려대 의대)팀의 심장이 떨렸다. 미라의 홑바지 옷고름에 있는 글씨로 보아 ‘병인년윤시월’(1566년 윤 10월)에 묻힌 여인으로 추정됐다. 436년이 지났는데도 피부의 탄력이 살아있었다. 아직 인체에 수분이 ",
  },
  {
    idx: 74937,
    title: "아빠가 죽은 뒤, 새엄마가 아이를 절도죄로 신고한 이유",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/10/10/5b8b366be82149dd9680ffc44ced3174_640x480c.jpeg",
    mediaName: "책식주의",
    url: "https://hub.zum.com/papervore/74937",
    summaryContent:
      "▼▼▼나머지 이야기는 영상으로 확인하세요&nbsp; &lt;모두와 친구가 되고 싶은 오로르&gt; 보러가기",
  },
  {
    idx: 74926,
    title: "브레이브걸스가 보여줬다, 버티다보면 기회가 온다는걸 [인터뷰]",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/10/09/117bbfd70c1f4d0e8a34d14d26cb2450.jpg",
    mediaName: "경향신문",
    url: "https://hub.zum.com/khan/74926",
    summaryContent:
      "[경향신문] 언젠가는 기회가 올 것이라 믿었다. 그렇게 작은 무대 하나하나에 최선을 다했다. 해체 위기의 걸그룹을 되살린건 대형 기획사의 자본도 유튜브 알고리즘도 아닌, 과거의 자신들이 차곡차곡 쌓아올린 노력이었다. 2017년 발매곡 ‘롤린’으로 역주행 돌풍을 일으키고 있는 걸그룹 ‘브레이브걸스’의 이야기다. ‘롤린’ 열풍은 한 유튜브 영상에서 시작됐다. ",
  },
  {
    idx: 74940,
    title: "도박만이 삶의 전부였던 한 남자의 최후",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/10/10/9aa377d6c6f646639cdcbc8555ffb200.jpg",
    mediaName: "오마이뉴스",
    url: "https://hub.zum.com/ohmynews/74940",
    summaryContent:
      '*주의! 이 기사에는 영화의 스포일러가 포함돼 있습니다. "매일 돈이 굴러 들어온다니까요." 시카고 컵스의 경기장에서 매치 데이마다 교통 정리 일을 하는 에디(제이크 존슨 분). 그는 경기장을 관리하는 정규직 직원도 아니면서 경기 때마다 몰려드는 자동차들을 보며 이런 너스레를 떤다. 자리가 날 때마다 경기장 관리인의 연락을 받고 겨우 일당을 챙기는 그는 그',
  },
  {
    idx: 74897,
    title: '"열심히 사는데 왜..." 40대 남성 넷의 뼈 때리는 대사',
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/09/15/030e0c1b5d3347bcb5ec45145571e3ee.jpg",
    mediaName: "오마이뉴스",
    url: "https://hub.zum.com/ohmynews/74897",
    summaryContent:
      "2017년 대만 최고의 영화로 명성을 드높인 &lt;대불+&gt;는 '제22회 부산국제영화제'에 초청되어 우리나라 관객들과도 만났는데 큰 관심을 얻진 못했던 것 같다. 하지만 대만 현지에선 가히 압도적인 지지를 얻으며 제54회 금마장에서 5개 부문을 석권한 바 있다. 황 신 야오 감독의 데뷔작이었는데 말이다. 그런가 하면 토론토영화제를 비롯해 전 세계 수많은 영화제에",
  },
  {
    idx: 74898,
    title: "청나라 황제의 사냥그림, 조선에서 유행한 까닭은?",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/09/16/533ec702ec874ca7ad07e45b10e5888d.jpg",
    mediaName: "한국일보",
    url: "https://hub.zum.com/hankookilbo/74898",
    summaryContent:
      "작년 9월 미국의 한 경매에서 김홍도파 호렵도(胡獵圖) 팔폭병풍이 출품된다는 보도는 귀를 쫑긋 세우게 했다. 정조(1752-1800) 때 김홍도가 호렵도를 제작했다는 사실은 기록으로 전할 뿐, 아직 실물로 확인된 적이 없기 때문이다. 이 병풍은 1952년부터 한국에서 선교사로 활동하며 이화여대 교단에 섰던 캐슬린 크레인(Kathleen J. Crane) 박",
  },
  {
    idx: 74830,
    title: "한국계 고딩이 미국 영화 주인공이 되자 벌어진 일",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/08/11/593f512b611047f8a21f0a64348502e7.jpg",
    mediaName: "조선일보",
    url: "https://hub.zum.com/chosun/74830",
    summaryContent:
      "‘한복’ ‘보쌈’ ‘야쿠르트’ ‘마스크팩’. 우리에겐 익숙하지만 외국인들은 “새롭다” 말하는 이 물건들이 등장하는 횟수가 많을수록 환호받는 ‘미국’ 영화가 있다. 바로 넷플릭스 오리지널 영화 ‘내가 사랑했던 모든 남자들에게(All the Boys I’ve Loved Before)’. 일명 ‘내사모남’ 3부작으로 불리며 뉴욕타임스 40주 연속 베스트셀러에 올",
  },
  {
    idx: 74833,
    title: "대한민국을 충격에 빠뜨린 94세 남자의 죽음",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/08/14/9fe5367dfbed40a4a15c63b9590b41db_640x480c.png",
    mediaName: "북스피릿",
    url: "https://hub.zum.com/bookspirit/74833",
    summaryContent: "▲ 풀영상 보기(김경식 나레이션 ver.)",
  },
  {
    idx: 74634,
    title: "환갑 넘어 쓴 시 '풀꽃' 덕분에… 인생은 아름다워~",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/03/11/c7889fd0aa5749f187a65e36ce9ca630.jpg",
    mediaName: "세계일보",
    url: "https://hub.zum.com/segyenews/74634",
    summaryContent:
      "초등학교 교장하던 때, 아이들과 풀꽃을 그렸어요.“자세히 보고 오래 보고” 그리라고 가르치며 봤더니… 아이들이 풀꽃이더라구요. 말 안듣고 못생긴 아이도 오래 보니 이쁜 풀꽃이었죠. 사람이 사랑스러워지는 건, 관계 속에서 나오는 거잖아요. 시에서 “너도 그렇다”고 말하니, 내게도“너도 그렇다”는 답이 돌아왔어요. 내 마음 편하고 좋아서 쓴 시가 환갑 넘어 사",
  },
  {
    idx: 74649,
    title: "다양한 삶을 제공하는 도시형 생활주택, 필로스 503",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/03/16/8855b246a7294d79a01118ecea7078d5_640x480c.jpg",
    mediaName: "마실와이드",
    url: "https://hub.zum.com/masilwide/74649",
    summaryContent:
      "‘필로스 503’은 친구라는 의미의 Philos에 대지의 주소지인 503을 합성한 이름으로, 각기 다른 생각과 온도를 지닌 사람들을 위한 집이다. 대다수의 임대주택과 마찬가지로 최대 수익률을 고려해야 하는 수익형 건축 프로젝트지만, 모듈화된 공간과 기능적인 창호들이 주는 일률적인 풍경에서 벗어나 다양성이 존중되고 공존하는 방식을 찾기 위한 시도가 이번 프로",
  },
  {
    idx: 74578,
    title: "“까치머리 이상, 꼽추 구본웅이 걸어가면 곡마단 온 줄 알고 환호했다”",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/02/15/022d54bfa6c841c2951a5ab5002dccc9.jpg",
    mediaName: "조선일보",
    url: "https://hub.zum.com/chosun/74578",
    summaryContent:
      "[아무튼, 주말] 살롱 드 경성 ① 이상, 구본웅, 박태원의 우정 일제강점기는 혹독했으나 문학과 예술은 꽃피었다. 20세기 초반 온 세계가 사상 철학 문예 생활방식까지 빠른 속도로 변화하며 문화적 충격을 흡수하고 튕겨내야 했던 역동의 시대였다. 나라 잃은 절망을 이겨내기 위해 지성인들은 유토피아적 안식처를 찾아 문학과 예술의 가치에 헌신했다. 시와 그림, ",
  },
  {
    idx: 74650,
    title: "1700년 전 서울 주민은 어떻게 살았을까",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/03/17/16a4798de08d4f69a3e43416ec79d569.jpg",
    mediaName: "한겨레",
    url: "https://hub.zum.com/hani/74650",
    summaryContent:
      "가장 오래된 서울 사람의 얼굴이 돋보기 렌즈 속에 나타났다. 5세기께 백제 토기 뚜껑 꼭지에 새겨진 상이니 1600~1700년 전 서울 주민의 모습인 셈이다. 혹 모양의 꼭지에 쓱쓱 선을 부려 천진난만한 얼굴을 오목새김해 마치 외계인 같은 느낌도 든다. 찡그린 것인지, 환히 웃는 것인지, 미소를 머금은 것인지 표정을 종잡기 어렵다. 시선의 각도에 따라 미묘",
  },
  {
    idx: 74632,
    title: "‘V’자 손모양 하며 “피스아웃”… 90년대 ‘굿바이’ 의미 슬랭으로 퍼져",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/03/11/ec2209252aaf4443aab2916a8b23a8ed.jpg",
    mediaName: "세계일보",
    url: "https://hub.zum.com/segyenews/74632",
    summaryContent:
      "작년 실리콘밸리에 새롭게 등장한 소셜미디어가 올해 초 한국에 상륙하면서 폭풍과 같은 인기를 끌고 있다. 지난 10여 년 동안 페이스북, 트위터, 인스타그램처럼 텍스트와 이미지를 기반으로 한 서비스와 유튜브, 틱톡과 같은 동영상 기반의 서비스가 대부분을 차지했던 소셜미디어 산업에 오로지 오디오만으로 승부를 거는 미디어가 나타난 것이다. 이 화제의 앱은 바로 ",
  },
  {
    idx: 74688,
    title: "자식들이 말려도 고집불통 노인은 운전대를 못 놓는다",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/04/11/e0c17b9a7c014871bd5853eb27dd183e.jpg",
    mediaName: "한국일보",
    url: "https://hub.zum.com/hankookilbo/74688",
    summaryContent:
      "노인(하시지메 이사오)은 괴팍하다. 연로한데도 자동차를 손수 몰아야 한다. 접촉사고로 차가 파손됐어도 살다 보면 그럴 수 있다는 식이다. 아이까지 둔 자식들은 그런 노인이 불안하기만 하다. 삶의 많은 부분에 대해 체념할 때도 됐는데, 여전히 목소리를 꺾지 않는 아버지가 슬쩍 얄밉기도 하다. 가족 사이에는 은근 고랑이 생긴다. 작전을 수립해서라도 모두가 만족",
  },
  {
    idx: 74603,
    title: "척박한 땅에서도 뿌리내리는 '미나리'처럼",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/03/09/3f645a38ce5e4cb7a525d61ad8e9e338.jpg",
    mediaName: "노컷뉴스",
    url: "https://hub.zum.com/nocutnews/74603",
    summaryContent:
      "※ 스포일러 주의 정이삭 감독은 자신의 경험을 담백하면서도 솔직하게 그려냈다. 미화하지도, 덜거나 보태지 않으면서도 따뜻한 시선으로 말이다. 이민자 가족의 경험 속에 담긴 가족 이야기는 그렇게 모든 이를 아우르며 위로를 던진다. '미나리'(감독 정이삭)는 희망을 찾아 낯선 미국 땅으로 이민을 선택한 한국인 가족의 따뜻하고 특별한 이야기를 그린 작품이다. 제",
  },
  {
    idx: 74639,
    title: "조선시대, 아이들을 인신매매하던 거상에게 일어난 일",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/03/14/0967cc37877d410cb9c33c151b340da9_640x480c.jpeg",
    mediaName: "책식주의",
    url: "https://hub.zum.com/papervore/74639",
    summaryContent: "",
  },
  {
    idx: 74581,
    title: "“먼저 나서는 남성들 많아졌으면”…일상 속 ‘먼지차별’ 드러내다",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/02/15/e4f49c3d8f8d431bb8f437f1cb1ae019.jpg",
    mediaName: "한겨레",
    url: "https://hub.zum.com/hani/74581",
    summaryContent:
      "그냥, 어려서부터 그림 그리는 걸 좋아했다. 학창 시절 무슨 대회에 나가면 상을 곧잘 받았다. 화가가 되려고 서양화과에 갔다. 졸업전시회에 찾아온 출판사 편집자의 권유로 그림책에 삽화를 그렸다. 한참 일하던 이십대 후반에 난소암에 걸렸는데 투병기로 그냥 한번 그려본 만화 &lt;3그램&gt;(2012)이 데뷔작이 되었다. 필명은 수신지. 별 뜻 없이 본명을 조합한 이",
  },
  {
    idx: 74593,
    title: "감초역 자청한 김응수 “이제 겨우 60이지만, 버리는 맛을 알았다”",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/03/08/ee4ad0ae03054a7c8bf77a6f34f849d4.jpg",
    mediaName: "조선일보",
    url: "https://hub.zum.com/chosun/74593",
    summaryContent:
      "“돈 많고 아들내미 변호사에 며느리 잘 얻었으면 뭐 혀. 자식 놈 내 맘대로 안 되고, 손주 한번 안아보려니 그 멍텅구리 같은 놈 불륜 눈감아 주는 꼴 되고…. 그렇다고 판문호 자신이 행복한가? 딴생각? 어이구, 꽃뱀한테 안 걸리면 다행이지. 꼬장꼬장해도 아내가 말 붙여주길 기다리고, 강아지한테나 마음 주고 그러지요. 남들 보기엔 좋아 보여도, 한 꺼풀 벗",
  },
  {
    idx: 74405,
    title: "마을 사람이 다 죽었다, 생존자는 한국군을 가리켰다",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/02/25/16/9804880ac1584fb19008f7a9a4aa8356.jpg",
    mediaName: "오마이뉴스",
    url: "https://hub.zum.com/ohmynews/74405",
    summaryContent:
      "민주주의는 다원주의를 근간으로 한다. 각양각색 다양한 색깔의 사람들이 모여 살며 각기 제 모양과 색깔을 뽐내야 더 건강한 사회가 된다. 오늘 흥한 것이 내일 망할 수 있는 첨단을 살며 민주주의는 제 장점을 마음껏 드러낸다. 소수자가 보호받고 언론과 결사의 자유가 보장돼 더 많은 생각과 사상을 품을 수 있다. 그 속에서 관용과 창의가 태어나 사회를 더욱 크고",
  },
  {
    idx: 74580,
    title: "호스피스 대모, 70대 퀴어…나, 스스로 정하고 책임지는 인간",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/02/15/dfd97f78d4d0438cafd77fc2feb74346.jpg",
    mediaName: "한겨레",
    url: "https://hub.zum.com/hani/74580",
    summaryContent:
      "한국에서 태어나 한국 학교를 나와 한국의 인터넷신문사에서 한국어 기사를 쓰는 일을 했던 나는, 2016년 공부를 위해 일본으로 건너와 6년째 외국인으로 살고 있다. 아시아 최대 규모 대도시에서 하루에도 ‘카카오톡’으로 한국에 있는 조카 사진을 몇장씩 전송받는 내가 과거의 유학생 수필가나 유럽 어느 시골의 이주자와 같은 고립감을 말한다면 억지일 것이다. 워낙",
  },
  {
    idx: 74251,
    title: "한옥의 폐쇄성과 열린 공간 모두 가진 안암동 블랙박스",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/02/23/10/17bf63c4a1dd4e1b95c3faf28b5f2b5e_640x480c.jpg",
    mediaName: "마실와이드",
    url: "https://hub.zum.com/masilwide/74251",
    summaryContent:
      " 건축주는 옷을 디자인하고 샘플을 제작하며, 바이어와 상담하는 공간을 요구했다. 부부 중심으로 운영되는 작은 패션사옥으로, 일을 하면서 직원들과 같이 식사를 하고 휴식하는 공간이기를 원했다. 기존 공간이 한옥을 개조해서 운영해온 곳이라 마음에 들어 했고, 한옥처럼 밖에서는 패쇄적이고 안으로는 열린 공간이기를 바랐다. 23평의 작은 땅에서 여러 프로그램과 ",
  },
  {
    idx: 74407,
    title: "가수 꿈 안고 한국행, 폭발적 고음으로 무대 평정한 그녀",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/02/25/16/53dc7054c24c4ba9a78ac02ef7bcec53.jpg",
    mediaName: "오마이뉴스",
    url: "https://hub.zum.com/ohmynews/74407",
    summaryContent:
      "대한민국이 낳은 최고의 스포츠 영웅을 논할 때 야구의 박찬호, 골프의 박세리, 축구의 '손차박(손흥민, 차범근, 박지성)'과 함께 언제나 빠지지 않고 등장하는 이름이 바로 피겨 스케이팅의 김연아다. 2010년 밴쿠버 올림픽 금메달과 2014년 소치 올림픽 은메달에 빛나는 김연아는 현역 시절 뛰어난 실력으로 세계신기록을 무려 11번이나 경신했고 그 명성에 걸",
  },
  {
    idx: 74256,
    title: "1500년 된 블랙박스 열렸다, 백제 비밀 담긴 무령왕 황금무덤",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/02/23/11/dbf4e92d378141028f8723d5d25cfaa8.jpg",
    mediaName: "중앙일보",
    url: "https://hub.zum.com/joongang/74256",
    summaryContent:
      "[무령왕릉 발굴 50년, 역사를 바꾸다] ⓵ ■ 무령왕릉 50년, 졸속 발굴이 문화재과학 초석 되다 “이 무덤은 백제 사마왕과 왕비의 무덤입니다.” 1971년 7월 8일 흥분을 억누르며 김원룡 발굴단장(당시 국립중앙박물관장)이 말했다. 벽돌로 덮어 쌓은 아치형 무덤 입구 한쪽을 가까스로 빠져나온 직후였다. 벌떼처럼 둘러싼 기자들이 “사마왕이 누구냐”고 물었",
  },
];

// api router

router.get("/best", function (req, res, next) {
  res.json(lanking);
});

router.get("/content/life", function (req, res, next) {
  res.json(life);
});

router.get("/content/food", function (req, res, next) {
  res.json(food);
});
router.get("/content/trip", function (req, res, next) {
  res.json(trip);
});
router.get("/content/culture", function (req, res, next) {
  res.json(culture);
});

module.exports = router;
