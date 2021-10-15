let template: HTMLTemplateElement;
import { HubContent } from "../getData";
const getTemplate = () => {

	if (!template) {
		template = <HTMLTemplateElement>document.getElementById('zum-section');
	}

	return template.content.firstElementChild.cloneNode(true);
}

const getSectionElement = (content: HubContent, categoryName: string, favorite: HubContent[]) => {
	const {
		idx,
		mediaName,
		title,
		summaryContent,
		url,
		imageUrl
	} = content;

	let isChecked: string;

	if (favorite.some(cnt => cnt.idx === idx)) {
		isChecked = 'checked'
	} else {
		isChecked = 'unChecked'
	}

	return `<li>
	<a data-nav href="/${categoryName}/${idx}">
		<img
			class="thumb"
			src=${imageUrl}></img>
		<p class="title">${title}</p>
		<p class="summary">${summaryContent}</p>
		<p class="author">${mediaName}</p>
	</a>
	<div class="icon">
		<span class="fa fa-star ${isChecked}" data-idx=${idx}></span>
	</div>
</li>`
}

export default (target: HTMLElement, state, events) => {
	const element = <HTMLElement>target.cloneNode(true);
	const categoryName = target.dataset.category;
	const { favorite } = state.category;
	const { addFavorite, deleteFavorite } = events;
	let contents: HubContent[];

	element.innerHTML = '';
	element.appendChild(getTemplate())

	element.querySelector('h3').textContent = categoryName

	const isHome = element.matches('[data-home]');

	if (state.category[categoryName] && isHome) {
	  contents = state.category[categoryName].slice(0,3);

		contents.map((content: HubContent) => getSectionElement(content, categoryName, favorite))
			.forEach((parsedContent: string) => {
				element.querySelector('ul').innerHTML += parsedContent;
			})
	} else if (state.category[categoryName] && !isHome) {

	  contents = state.category[categoryName].slice(0,12);

		contents.map((content: HubContent) => getSectionElement(content, categoryName, favorite))
			.forEach((parsedContent: string) => {
				element.querySelector('ul').innerHTML += parsedContent;
			})
		
		element.querySelector('ul').classList.add('section-page')
	}

	// favorite event
	element.addEventListener('click', (e) => {
		const target = <HTMLElement>e.target; 

		if (target.matches('.fa-star.checked')) {
			
			target.classList.remove('checked')
			target.classList.add('unChecked')

			const idx = parseInt(target.dataset.idx)
			deleteFavorite(idx)

		} else if (target.matches('.fa-star.unChecked')) {

			target.classList.remove('unChecked')
			target.classList.add('checked')

			const idx = parseInt(target.dataset.idx)
			const content = contents.find(cnt => cnt.idx === idx);
			addFavorite(content)

		}
	})

	return element
}