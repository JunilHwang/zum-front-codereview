let template: HTMLTemplateElement;

const getTemplate = () => {
	if (!template) {
		template = <HTMLTemplateElement>document.getElementById('zum-app');
	}

	return <HTMLElement>template.content.firstElementChild.cloneNode(true);
}

export default (target: HTMLElement, state, events) => {
	const newApp = <HTMLElement>target.cloneNode(true);

	newApp.innerHTML = '';
	newApp.appendChild(getTemplate())

	return newApp;
}