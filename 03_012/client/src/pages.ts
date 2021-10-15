import { render } from './index'; 
import { getDetail } from './getData';

export default () => {

	const home = () => {
		const container = <HTMLElement>window.document.querySelector('.container');

		if (container) {
			container.innerHTML = `<div data-component="section" data-category="life" data-home></div>
				<div data-component="section" data-category="food" data-home></div>
				<div data-component="section" data-category="trip" data-home></div>
				<div data-component="section" data-category="culture" data-home></div>
				<div data-component="best"></div>`
			render(container)
		}
	}

	const category = (params) => {
		const { category } = params;
		const container = <HTMLElement>window.document.querySelector('.container');

		if (container) {
			container.innerHTML = `<div data-component="section" data-category=${category}></div>`
			render(container)
		}
	}

	const detail = async (params) => {
		const { category, idx } = params; 
		
		const container = <HTMLElement>window.document.querySelector('.container');
		if (container) {
			container.innerHTML = `<div data-component="detail">
					<section>
					<div class="detail-header"></div>
					<div class="detail-content"></div>
				</section>
			</div>`;
			container.querySelector('.detail-content').innerHTML = await getDetail(category, idx)
			render(container)
		}
	}


	return {
		home,
		category,
		detail
	}
}