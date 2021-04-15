import Component from "../../core/Component.js";
let contents = [];
export default class Home extends Component {

    // setBodyApi () {
    //     let menuContents = [];

    //     const saveApi  = this.zumApi[0].contents;
    //     console.log("setBodyApi",saveApi)
    //     // try {
    //         saveApi.map((currentValue,idx) => {
    //             console.log(idx)
    //             // if (idx > 15) { //4줄만 나오도록 . -> 스크롤이벤트로 내리면 더 나오게 만들기.
    //             //     console.log("Stop")
    //             // // throw sentinel;
    //             // }
    //             menuContents.push(`
    //             <div class="item">
    //                 <img src=${currentValue.imageUrl} />
    //                 <h4>${currentValue.title}<h4/>
    //                 <p>${this.props.textLengthOverCut(currentValue.summaryContent, 60, '...')}</p>
    //                 <p>${currentValue.mediaName} <span>★/☆</span><p/>
    //             </div>
    //             `);
    //         })
    //     // } catch(e) {
    //     //     if (e !== sentinel) throw e;
    //     // }
    //     console.log(menuContents)
    //     return menuContents;
    // }

    template() {
        if (this.props) {
            contents = this.props.setBodyApi('home');
        }
        return `
                <div id="home">
                    <div id="mainScreen">HOME</div>
                    <div class="container">
                    ${contents.join('')}
                    </div>
                </div>
        `;
    }
    mounte() {
        // console.log(this.router)
        // const button = document.querySelector('.move');
        // button.addEventListener('click', () => {
        //     window.location.hash = 'ranking'
        // });
      }
}