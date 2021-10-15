import http from './http'

export interface RankingContent {
	idx: number;        
	mediaName: string;  
	title: string;     
	url: string;        
	imageUrl: string;   
}

export interface HubContent {
	idx: Number;             
	mediaName: string;       
	title: string;           
	summaryContent: string;  
	url: string;             
	imageUrl: string;        
}

const HEADERS = {
  'Content-Type': 'application/json',
}

const BASE_URL = 'http://localhost:3000'

const getBest = async (): Promise<RankingContent[]> => {
	return await http.get(BASE_URL + '/best', HEADERS);
}

const getCategory = async (category: string): Promise<HubContent[]> => {
	return await http.get(BASE_URL + '/content/' + category, HEADERS)
}

const getDetail = async (category:string, idx: number) => {
	const url = BASE_URL + '/content/' + category + '/' + idx;
	return await http.get(url, HEADERS)
}

export {
	getBest,
	getCategory,
	getDetail
}

