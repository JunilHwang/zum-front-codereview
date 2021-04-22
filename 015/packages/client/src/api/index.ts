import { restClient } from '@/utils';

const apiBaseUrl = 'http://localhost:3000/api/';

interface ContentQuery {
  start?: number;
  length?: number;
}

export const getRanking = async () => {
  const res = await restClient.fetch(`${apiBaseUrl}best`);
  const { data } = await res.json();
  return data;
};

export const getMainContents = async () => {
  const resultArr = await restClient.fetchAll([
    `${apiBaseUrl}content/life?start=0&length=4`,
    `${apiBaseUrl}content/food?start=0&length=4`,
    `${apiBaseUrl}content/trip?start=0&length=4`,
    `${apiBaseUrl}content/culture?start=0&length=4`,
  ]);
  const mainContentsArray = await Promise.all(resultArr.map((res) => res.json()));
  return mainContentsArray.map(({ data }) => data);
};

export const getDetail = async (path: string) => {
  const res = await restClient.fetch(`${apiBaseUrl}detail${path}`);
  const { data } = await res.json();
  return data;
};

export const getLife = async ({ start = 0, length = 4 }: ContentQuery) => {
  const res = await restClient.fetch(`${apiBaseUrl}content/life?start=${start}&length=${length}`);
  const { data } = await res.json();
  return data;
};

export const getFood = async ({ start = 0, length = 4 }: ContentQuery) => {
  const res = await restClient.fetch(`${apiBaseUrl}content/food?start=${start}&length=${length}`);
  const { data } = await res.json();
  return data;
};

export const getTrip = async ({ start = 0, length = 4 }: ContentQuery) => {
  const res = await restClient.fetch(`${apiBaseUrl}content/trip?start=${start}&length=${length}`);
  const { data } = await res.json();
  return data;
};

export const getCulture = async ({ start = 0, length = 4 }: ContentQuery) => {
  const res = await restClient.fetch(`${apiBaseUrl}content/culture?start=${start}&length=${length}`);
  const { data } = await res.json();
  return data;
};
