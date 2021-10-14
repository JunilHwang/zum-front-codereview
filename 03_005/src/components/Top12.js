import Component from './core/Component.js';

class Top12 extends Component {

    async template() {
        const content = await fetch(`${this._url}/api/best`).then(resp => resp.json());
        let ul = `
        <h3 class='top12_title'>실시간 TOP 12</h3>
        <div>
            <ul>
        `;

        for (let i=0; i<=11; i++) {
            ul += `
                <li>
                    <div class='post-idx post-link' data-idx='${content[i].idx}'>
                        <span class='post-link'>${i+1}</span>
                        <span class='sub_title post-link'>${content[i].title}</span>
                        <span class='sub_content post-link'>${content[i].mediaName}</span>
                    </div>
                </li>
            `;
        }
        ul += '</ul></div>';
        return ul;
    }
}

export default Top12;