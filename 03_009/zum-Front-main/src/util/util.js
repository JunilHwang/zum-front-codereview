// 여러 파일에서 공통적으로 사용할 수 있는 함수들을 모아놓았습니다. 

import CultureData from "../api/Culture.json";
import FoodData from "../api/Food.json";
import LifeData from "../api/LifeContents.json";
import TravelData from "../api/Travel.json";
import RankingData from "../api/Ranking.json";

// 현재 들어간 페이지의 경로를 파싱하여 해당하는 데이터를 리턴합니다. 
export function getJsonData(menu) { 
  switch (menu) {
    case "/Home":
      return RankingData;
    case "/Culture":
      return CultureData;
    case "/Food":
      return FoodData;
    case "/Life":
      return LifeData;
    case "/Travel":
      return TravelData;
    default:
      return RankingData;
  }
}

// 상단에 위치하는 문구를 경로에 맞게 리턴하는 함수. 
export function getMenuName(pathName) {
  switch (pathName) {
    case "/Home":
      return "# 실시간_TOP12_소식";
    case "/Culture":
      return "컬쳐";
    case "/Food":
      return "음식";
    case "/Life":
      return "라이프";
    case "/Travel":
      return "여행";
    default:
      return "# 실시간_TOP12_소식";
  }
}
