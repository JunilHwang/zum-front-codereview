import { State } from "..";
import { HubContent } from "../getData";


export default (target: HTMLElement, state: State, events) => {
	const element = <HTMLElement>target.cloneNode(true);
	const favorite = state.category.favorite;
	const content: HubContent = state.detail;
	const {
		idx,             
		mediaName,      
		title,          
		summaryContent,
		url,          
		imageUrl     
	} = content;

	element.querySelector('.detail-header').innerHTML = `<h2>${title}</h2>
		<p>${mediaName}</p>`

	let isChecked: string;
	if (favorite.some(cnt => cnt.idx === idx)) {
		isChecked = 'checked'
	} else {
		isChecked = 'unChecked'
	}

	return element
}