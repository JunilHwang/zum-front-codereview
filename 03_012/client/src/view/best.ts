import { RankingContent } from '../getData';
import { State }  from '../index'

let template: HTMLTemplateElement;

const getTemplate = ():HTMLElement => {

	if (!template) {
		template = <HTMLTemplateElement>document.getElementById('zum-best');
	}

	return <HTMLElement>template.content.firstElementChild.cloneNode(true)
}

const getBestElement = (content: RankingContent, i: number) => {
	const rank = i + 1;
	const {
		idx,
		mediaName,
		title,
		url,
		imageUrl
	} = content;

	return `<li>
		<div>
			<div class="rank-content">
				<span>${rank}</span>
				<a data-nav href="best/${idx}" >
					<div class="title">
						${title}
					</div>
					<p class="author">${mediaName}</p>
				</a>
			</div>
		</div>
	</li>`
}

export default (target: HTMLElement, state: State, events) => {
	const element = <HTMLElement>target.cloneNode(true);

	const contents = state.bestContents

	element.innerHTML = '';
	element.appendChild(getTemplate())

	contents.map((content: RankingContent, i: number) => getBestElement(content, i))
		.forEach((parsedContent: string) => {
			element.querySelector('ul').innerHTML += parsedContent;
		})

	return element;
}