import Component from "../core/Component"

class Header extends Component {
    setup() {
        this.HEADER = [
            { name: "홈", link: "home" },
            { name: "라이프", link: "life" },
            { name: "푸드", link: "food" },
            { name: "여행", link: "trip" },
            { name: "컬쳐", link: "culture" },
            { name: "즐겨찾기", link: "favorite" },]
    }
    template() {
        return `
            <ul>
                ${this.HEADER.map(({ name, link }) => `
                    <li>
                        <a href="#${link}">${name}</a>
                    </li>
                `).join("")}
            </ul>
        `
    }
}

export default Header;