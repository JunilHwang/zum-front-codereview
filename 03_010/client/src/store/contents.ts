import { initState } from '@src/lib/observer';

export type ContentsState = {
  title: string;
  data: HubContent[];
  page?: number;
  isLoading?: boolean;
};

export type HubContent = {
  idx: Number;
  mediaName: String;
  title: String;
  summaryContent: String;
  url: String;
  imageUrl: String;
};

export type HomeContents = HubContent[];

const lifesData = initState({
  key: 'lifesData',
  value: { isLoading: true, title: '라이프', data: [], page: 1 },
});

const culturesData = initState({
  key: 'cultureData',
  value: { isLoading: true, title: '컬쳐', data: [], page: 1 },
});

const foodsData = initState({
  key: 'foodsData',
  value: { isLoading: true, title: '푸드', data: [], page: 1 },
});

const travelsData = initState({
  key: 'travelsData',
  value: { isLoading: true, title: '여행', data: [], page: 1 },
});

export { lifesData, culturesData, foodsData, travelsData };
