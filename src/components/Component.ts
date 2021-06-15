export default class Component {
    target: HTMLElement;
    state;
    props;

    constructor(target: HTMLElement, props?: any) {
        this.target = target;
        this.props = props || {};
        this.init();
        this.render();
    }

    init(): void {
    }

    template(): string {
        return '';
    }

    render(): void {
        this.target.innerHTML = this.template();
        this.mount();
    }

    setState(state: object): void {
        this.state = {...this.state, ...state};
        this.render();
    }

    mount(): void {
    }
}
