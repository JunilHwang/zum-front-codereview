const registry = {};
type Component = (target: HTMLElement, state, events) => HTMLElement;

const renderWrapper = (component: Component) => {
	return (target: HTMLElement, state, events) => {
		const element = component(target, state, events);

		const childComponents: NodeListOf<HTMLElement> = element.querySelectorAll('[data-component]');

		Array.from(childComponents)
			.forEach(target => {
				const name = target.dataset.component;

				const child = registry[name];

				if (!child) return;

				target.replaceWith(child(target, state, events));
			})
		
		return element
	}
}

const add = (name: string, component: Component): void => {
	registry[name] = renderWrapper(component);
}

const renderRoot = (root: HTMLElement, state, events) => {
	const rootComponent = (root: HTMLElement) => {
		const element =  <HTMLElement>root.cloneNode(true);
		return element
	}

	return renderWrapper(rootComponent)(root, state, events)
}

export default {
	add,
	renderRoot
}