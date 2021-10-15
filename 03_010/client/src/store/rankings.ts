import { initState } from '@src/lib/observer';

export type RankingContent = {
  idx: Number;
  mediaName: String;
  title: String;
  url: String;
};

export type RankingState = {
  isLoading: boolean;
  data: RankingContent[];
};

const rankingData = initState<RankingState>({
  key: 'rankingData',
  value: { isLoading: true, data: [] },
});

export { rankingData };
