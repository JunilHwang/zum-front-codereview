import { HubContent, RankingContent, RecentContents } from '@/types';
import axios from 'axios';

export const getArticleRanking = async () => {
  const res = await axios.get<RankingContent[]>('http://localhost:3020/api/best');
  return res.data;
};

export const getContents = async (category: string) => {
  const res = await axios.get<HubContent[]>(`http://localhost:3020/api/content/${category}`);
  return res.data;
};

export const getRecentContents = async () => {
  const res = await axios.get<RecentContents>(`http://localhost:3020/api/recentContent`);
  return res.data;
};
