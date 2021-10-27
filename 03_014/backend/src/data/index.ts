import { RankingContent, HubContent, AllHubContent } from "@src/utils/types";

import rankingData from "./ranking.json";
import lifeData from "./life.json";
import foodData from "./food.json";
import travelData from "./travel.json";
import cultureData from "./culture.json";

const ranking: RankingContent[] = rankingData;
const life: HubContent[] = lifeData;
const food: HubContent[] = foodData;
const travel: HubContent[] = travelData;
const culture: HubContent[] = cultureData;

const contentData: AllHubContent = { life, food, travel, culture };

export { ranking as bestData, contentData };
