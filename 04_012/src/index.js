import 'regenerator-runtime'
import wire from './pages/wire';
import list from './pages/list';
import itemList from './pages/itemList';
import paramItemList from './pages/paramItemList'
import detail from './pages/info';
import edit from './pages/edit';
import './pages/main.css';


window.onload = () => {
    const today = new Date();     
    const main = document.getElementById("root");

    const renderContents = async () => {
        const { pathname } = window.location
        switch (pathname) {
            case "/list":
                const itemlistHtml = await list();
                let inHtml = ""
                main.innerHTML = itemlistHtml
                    
                main.innerHTML += `</br></br></br><div id="wire">글 작성</div>`

                main.innerHTML += `
                <div id="sortDiv">
                    <input type="radio" id="up" name="sort" value="up">
                    <label for="up">오름차순</label>
                    <input type="radio" id="dawn" name="sort" value="dawn">
                    <label for="dawn">내림차순</label>
                </div>
                `
                main.innerHTML += `<span>제목</span><input type="text" id="searchText"/><button id="searchButton">검색</button>`                

                inHtml = await itemList();                
                const articles = document.getElementById('articles');                
                articles.innerHTML = inHtml;

                
                const sortRadio = document.getElementById('sortDiv');
                const searchButton = document.getElementById('searchButton')
                const searchText = document.getElementById('searchText')
                let sortOption = ""
                sortRadio.addEventListener("change", ()=> {
                    localStorage.clear                    
                    sortOption = event.target.value       
                    localStorage.setItem('radioVal' ,sortOption)                                                   
                })

                searchButton.addEventListener('click', async () => {
                    sortOption = localStorage.getItem('radioVal');
                    let searchTextVal = ""
                    searchText.value == "" ? searchTextVal = "" :  searchTextVal = searchText.value
                    console.log(searchTextVal)
                    inHtml = await paramItemList(sortOption,searchTextVal);
                    articles.innerHTML = inHtml                    
                })

                const wireButton = document.getElementById("wire")

                wireButton.addEventListener("click", () => {
                    const targetUrl = "/wire"
                    const { pathname, search } = window.location
            
                    if (targetUrl === `${pathname}${search}`) {
                        return
                    }
            
                    const locationChangeEvent = new CustomEvent("locationchange", {
                        composed: true,
                        detail: { href: targetUrl },
                    })
            
                    window.dispatchEvent(locationChangeEvent)
                })

                // 글목록 선택을 위한 부모를 찾아 이벤트 타켓 찾아서 이동
                articles.addEventListener("click", () => {  

                    let infiEvId = event.target.parentElement.id           
                    let infoEv = document.getElementById(infiEvId)     
                 
                    localStorage.setItem('postId', infoEv.firstChild.innerText);
                    const targetUrl = "/info" 
                    const { pathname, search } = window.location

                    if (targetUrl === `${pathname}${search}`) {
                        return
                    }

                    const locationChangeEvent = new CustomEvent("locationchange", {
                        composed: true,
                        detail: { href: targetUrl },
                    })

                    window.dispatchEvent(locationChangeEvent)                    
                });
                
                break
            case "/wire":                     
                    const wireHtml = wire();                                        
                    main.innerHTML = wireHtml; 
                    const submit = document.getElementById("submit")
                    submit.addEventListener('click', ()=> {                                                
                        let post = document.postFrom
                        let title = post.title.value
                        let witer = post.witer.value
                        let content = post.content.value                        

                        const sendData = async () => {                            
                            await fetch('http://localhost:1010/sendData', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json'
                            },
                            body:  new URLSearchParams({                                
                                title: title,
                                content: content,
                                Writer: witer,
                                date: today.getFullYear() + "-" + (Number(today.getMonth())+1)+ "-" + today.getDate()
                            })                               
                        })
                        .then( (response) => { 
                            console.log('성공함')                                                                               
                        })                        
                        .catch(error => {                            
                            console.error('Error:', error)                            
                            alert('실패')
                            const targetUrl = "/list"
                            const { pathname, search } = window.location

                            if (targetUrl === `${pathname}${search}`) {
                                return
                            }

                            const locationChangeEvent = new CustomEvent("locationchange", {
                                composed: true,
                                detail: { href: targetUrl },
                            })
                            window.dispatchEvent(locationChangeEvent)
                        });
                    }
                    sendData();
                    })                    
                break  
            case "/info":                
                    console.log('info')
                    let postId = localStorage.getItem('postId');     
                    localStorage.clear;               
                    const detailHtml = await detail(postId);
                    main.innerHTML = detailHtml

                    const editButton = document.getElementById("editPost")
                    const delButton = document.getElementById("delPost")
                    const goList = document.getElementById('goList')

                    // 목록으로 이벤트
                    goList.addEventListener("click", () => {
                        console.log('목록클릭')
                        const targetUrl = "/list" 
                        const { pathname, search } = window.location
    
                        if (targetUrl === `${pathname}${search}`) {
                            return
                        }
    
                        const locationChangeEvent = new CustomEvent("locationchange", {
                            composed: true,
                            detail: { href: targetUrl },
                        })
    
                        window.dispatchEvent(locationChangeEvent)
                    })

                    // 삭제시 이벤트
                    delButton.addEventListener("click", async () => {
                        await fetch(`http://localhost:1010/delData/${postId}`,{
                        method:"DELETE"})
                        .then((res)=> {
                            alert('삭제성공')
                            const targetUrl = "/list"
                            const { pathname, search } = window.location

                            if (targetUrl === `${pathname}${search}`) {
                                return
                            }

                            const locationChangeEvent = new CustomEvent("locationchange", {
                                composed: true,
                                detail: { href: targetUrl },
                            })
                            window.dispatchEvent(locationChangeEvent)
                        }).catch(error => {
                            console.log(error)
                            alert('삭제실패')
                            const targetUrl = "/list"
                            const { pathname, search } = window.location

                            if (targetUrl === `${pathname}${search}`) {
                                return
                            }

                            const locationChangeEvent = new CustomEvent("locationchange", {
                                composed: true,
                                detail: { href: targetUrl },
                            })
                            window.dispatchEvent(locationChangeEvent)
                        })
                    })

                    // 수정버튼 클릭시 이벤트
                    editButton.addEventListener("click", () => {
                        localStorage.setItem('postId', postId);
                        const targetUrl = "/edit" 
                        const { pathname, search } = window.location
    
                        if (targetUrl === `${pathname}${search}`) {
                            return
                        }
    
                        const locationChangeEvent = new CustomEvent("locationchange", {
                            composed: true,
                            detail: { href: targetUrl },
                        })
    
                        window.dispatchEvent(locationChangeEvent)
                    })
                break
                case "/edit":
                    console.log('edit')
                    postId = localStorage.getItem('postId'); 
                    localStorage.clear
                    const editHtml = await edit(postId);
                    main.innerHTML = editHtml
                                        

                    let editButtonSubmit = document.getElementById("editButtonSubmit")
                    console.log(editButtonSubmit)
                    editButtonSubmit.addEventListener('click', async ()=> {                   
                        let editPost = document.editFrom
                        let editId = editPost.id.value
                        let editTitle = editPost.title.value
                        let editWiter = editPost.witer.value
                        let editContent = editPost.content.value
                        

                        const sendData = async () => {                
                            let editUrl = 'http://localhost:1010/editData/'+editId
                            console.log(editUrl);
                            await fetch(editUrl, {
                            method: 'PUT',
                            headers: {
                                'Accept': 'application/json'
                            },
                            body:  new URLSearchParams({
                                id: editId,
                                title: editTitle,
                                content: editContent,
                                Writer: editWiter,
                                date: today.getFullYear() + "/" + today.getMonth()+ "/" + today.getDate()
                            })                               
                        })
                        .then( (response) => { 
                            console.log('성공함')                           
                            localStorage.setItem('postId', editId);
                            const targetUrl = "/info" 
                            const { pathname, search } = window.location

                            if (targetUrl === `${pathname}${search}`) {
                                return
                            }

                            const locationChangeEvent = new CustomEvent("locationchange", {
                                composed: true,
                                detail: { href: targetUrl },
                            })
                            window.dispatchEvent(locationChangeEvent)
                        })
                        .catch(error => {                            
                            console.error('Error:', error)
                            alert('실패')
                            const targetUrl = "/list"
                            const { pathname, search } = window.location

                            if (targetUrl === `${pathname}${search}`) {
                                return
                            }

                            const locationChangeEvent = new CustomEvent("locationchange", {
                                composed: true,
                                detail: { href: targetUrl },
                            })
                            window.dispatchEvent(locationChangeEvent)
                        });
                    }
                    await sendData();
                    })
                break
            default:
                main.innerHTML = "<div>404</div>"
        }
    }        
    const handleLocationChange = (e) => {
        const { href } = e.detail
        window.history.pushState(undefined, "타이틀", href)
        renderContents()
    }

    window.addEventListener("locationchange", handleLocationChange)    
    main.innerHTML = `<ul>
                        <li id="list">글 목록</li>
                        <li id="wire">글 작성</li>
                    </ul>
                    </br></br></br></br></br></br></br></br></br></br></br>
                    <p>&& 페이지 이동시 이동하려는 페이지와 현제 url이 같다면 이동하지 않아요 </p>
                    <p>예를들면 글작성으로 가려면 wire가 되어있다면 이동하지 않으니 그럴땐 url을 list나 다른 아무문자를 넣고 다시</p>
                    <p>이동하면 잘 가질거예요.. spa 만들기 어렵네요......</p>
                    <p>라이브러리의 소중함을 알았습니다....</p>
                    `

    const homeButton = document.getElementById("list")
    const wireButton = document.getElementById("wire")

    homeButton.addEventListener("click", () => {
        const targetUrl = "/list"
        const { pathname, search } = window.location
        if (targetUrl === `${pathname}${search}`) {
            return
        }

        const locationChangeEvent = new CustomEvent("locationchange", {
            composed: true,
            detail: { href: targetUrl },
        })

        window.dispatchEvent(locationChangeEvent)
    })

    wireButton.addEventListener("click", () => {
        const targetUrl = "/wire"
        const { pathname, search } = window.location

        if (targetUrl === `${pathname}${search}`) {
            return
        }

        const locationChangeEvent = new CustomEvent("locationchange", {
            composed: true,
            detail: { href: targetUrl },
        })

        window.dispatchEvent(locationChangeEvent)
    })

    window.addEventListener("popstate", () => {        
        renderContents()
    })
}