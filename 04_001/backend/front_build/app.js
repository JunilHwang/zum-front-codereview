(()=>{"use strict";const t={NOT_FOUND_TARGET:"지정하려는 타켓을 찾을 수 없습니다.",NOT_FOUND_ROUTER_INFO:"페이지 정보를 담고 있는 RouterInfo를 불러올 수 없습니다."};class e extends Error{constructor(e,n=""){super(t[e]),this.msgType=e,this.name=n}}const n=e,s=class{constructor(t,e){this.setStateCallback=e,this._notExec=!1,this._recentChangedKeys={prevKeys:[],currKeys:[],largeKeySet:new Set},this._observers=new Set,this._state=t,this._prevState=t}get state(){return this._state}get recentChangedKeys(){return this._recentChangedKeys}set state(t){this._state=Object.assign({},t),this.setStateCallback&&this.setStateCallback(),this.updateRecentChangedKeys(),this._notExec?this._notExec=!1:this.exec()}setState(t,e){e&&void 0!==e.notExec&&(this._notExec=e.notExec),this._prevState=Object.assign({},this._state),this.state=Object.assign(Object.assign({},this._state),t)}exec(){this._observers.forEach((t=>t()))}add(t){this._observers.add(t)}remove(t){this._observers.delete(t)}clear(){this._observers.clear()}clearLargeKeySet(){this._recentChangedKeys.largeKeySet.clear()}updateRecentChangedKeys(){var t;Object.values(this._recentChangedKeys).every((t=>!t.length))||(this._recentChangedKeys.prevKeys=[...this._recentChangedKeys.currKeys]),this._recentChangedKeys.currKeys=null!==(t=this.getRecentKeys())&&void 0!==t?t:[];const{largeKeySet:e,currKeys:n}=this._recentChangedKeys;[...e,...n].forEach((t=>this._recentChangedKeys.largeKeySet.add(t)))}getRecentKeys(){if(!this._state||!this._prevState)return null;const t=Object.entries(this._state),e=Object.entries(this._prevState),n=[];for(let s=0;s<t.length;s++){const[i,a]=t[s],[r,o]=e[s];i===r&&JSON.stringify(a)!==JSON.stringify(o)&&n.push(i)}return n}};function i(t){const e=(t=>localStorage.getItem(t))(t);return e?JSON.parse(e):null}function a(t,e){return((t,e)=>localStorage.setItem(t,e))(t,JSON.stringify(e))}var r,o=function(t,e,n,s){return new(n||(n=Promise))((function(i,a){function r(t){try{c(s.next(t))}catch(t){a(t)}}function o(t){try{c(s.throw(t))}catch(t){a(t)}}function c(t){var e;t.done?i(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(r,o)}c((s=s.apply(t,e||[])).next())}))};function c({type:t,options:e}={type:"getPost"}){return o(this,void 0,void 0,(function*(){try{const n=((t,e)=>{const n="http://localhost:4000/api",s="getPost"===t?"post":t;return void 0!==e&&"getPost"===t?`${n}/${s}/${e}`:`${n}/${s}`})(t,null==e?void 0:e.id),s=yield fetch(n,e);if(!(200<=s.status&&s.status<400))throw new Error(`[!] API : status - ${s.status}`);return yield s.json()}catch(t){return console.error(t.message),null}}))}function l(){return o(this,void 0,void 0,(function*(){try{const t=yield c();if(!t||!t.data)return;const{data:e}=t;return e.forEach(((t,n)=>{const{createdDate:s}=t;s&&"string"==typeof s&&(e[n].createdDate=new Date(s))})),e.sort(((t,e)=>t.id&&e.id?e.id-t.id:0)),e}catch(t){console.error(t)}}))}const d={postData:[],editId:-1,isInit:!1,isRefresh:!1,filterOptions:{author:"",searchWord:"",isDesc:void 0,numPost:5,pageNum:1},numPostList:[5,10,20,30,50,100]},u="zum_board_main",h=new s(null!==(r=function(){const t=i(u);return t?(t.postData.forEach(((e,n)=>{const{createdDate:s}=e;s&&"string"==typeof s&&(t.postData[n].createdDate=new Date(s))})),t):null}())&&void 0!==r?r:Object.assign({},d),(()=>a(u,h.state)));function p({filterOptions:t,postData:e,isFullData:n}){const{author:s,isDesc:i,numPost:a,pageNum:r,searchWord:o}=t,c=function(...t){return e=>t.reduce(((t,e)=>e(t)),e)}(function(t){return e=>t?e.filter((e=>e.author===t)):e}(s),function(t){return e=>{if(!t)return e;const n=t.replace(/\s+/g,"");return e.filter((({subject:t})=>{if(null!==t)return t.replace(/\s+/g,"").indexOf(n)>-1}))}}(o),function(t){return e=>void 0===t?e:[...e].sort(((e,n)=>null===e.createdDate||null===n.createdDate?0:t?n.createdDate.valueOf()-e.createdDate.valueOf():e.createdDate.valueOf()-n.createdDate.valueOf()))}(i),function(t,e,n){return s=>{if(n)return s;const i=Math.ceil(s.length/t);e>i&&(e=i);const a=(e-1)*t,r=e*t;return s.slice(a,r)}}(a,r,n))(e);return c}var g;const f={editData:{id:null,subject:null,author:null,createdDate:null,contents:null},isEdited:!1},b="zum_board_edit";const m=new s(null!==(g=function(){if(function(){const{origin:t,pathname:e}=new URL(window.location.href),n=i(b),s=null==n?void 0:n.editId,a=!s||s===d.editId||"/edit"!==e;return a&&(window.history.pushState({origin:t},"",t),localStorage.removeItem("zum_board_edit")),a}())return null;const t=i(b);if(!t)return null;const{createdDate:e}=t.editData;return"string"==typeof e&&(t.editData.createdDate=new Date(e)),t}())&&void 0!==g?g:Object.assign({},f),(()=>a(b,m.state))),v=(t,e)=>Math.floor(Math.random()*(e-t+1))+t;function O(t){return Array.from(t.childNodes)}function y(t,e,n,s){const i=Math.max(e.length,n.length);let a=0;for(s&&e.length>n.length&&function(t,e){t.forEach(((t,n)=>{if(e.find((e=>{if(!(e instanceof Element&&t instanceof Element))return;let[n,s]=Array.from({length:2});return t instanceof HTMLElement&&(n=t.dataset.componentId),e instanceof HTMLElement&&(s=e.dataset.componentId),!(!n||!s||n!==s)||([n,s]=[t.id,e.id],!(!n||!s||n!==s)||void 0)})))return;const s=e[n];s&&(e[n+1]=s),e[n]=t}))}(e,n);i>a;){const s=e[a],i=n[a];if(S(t,s,i)){a++;continue}j(s,i);const r=O(s),o=O(i);(r.length||o.length)&&y(s,r,o),a++}}function S(t,e,n){const s=e&&!n,i=!e&&n;if(s?t.removeChild(e):i&&t.appendChild(n),s||i)return!0;const a=e.nodeName!==n.nodeName,r=[e,n].every((t=>t instanceof Text))&&e.nodeValue!==n.nodeValue;return a?t.replaceChild(n,e):r&&(e.nodeValue=n.nodeValue),!(!a&&!r)}function j(t,e){if(!(t instanceof Element&&e instanceof Element))return;const n=Array.from(e.attributes),s=Array.from(t.attributes);n.forEach((({name:e,value:n})=>{var i;return null!==(i=s.find((({name:t,value:s})=>e===t&&n===s)))&&void 0!==i?i:t.setAttribute(e,n)})),s.forEach((({name:e})=>{var s;return null!==(s=n.find((({name:t})=>t===e)))&&void 0!==s?s:t.removeAttribute(e)}))}const _=["isNotKeepAdding","initInsertPosition"],E=class{constructor(t,e={}){this.$target=t,this.props=e,this._renderState="adding",this.componentId=function(t=16){const[e,n]=["a".charCodeAt(0),"z".charCodeAt(0)];let s="";for(;s.length<t;)s+=Boolean(Math.round(Math.random()))?v(0,9):String.fromCharCode(v(e,n));return`__${s}`}();try{if(null===t)throw new n("NOT_FOUND_TARGET",this.constructor.name);"string"==typeof t&&(this.$target=document.querySelector(t)),this.init(),this.initSubscriber(),this.render()}catch(t){console.error(t)}}init(){}initSubscriber(){}registerSubscriberFunction(t,e){this._subscriber||(this._subscriber=new class{constructor(t){this.func=t}registerFunc(t){this.func&&t.add(this.func)}removeFunc(t){this.func&&t.remove(this.func)}}),this._subscriber.func=e,this._subscriber.registerFunc(t)}setState(t,e){var n;this._state=Object.assign(Object.assign({},this._state),t),(null==e?void 0:e.noRender)||this.render(null===(n=null==e?void 0:e.isSetEvents)||void 0===n||n)}get state(){return this._state}setBeforeRender(){}render(t=!0){const{$target:e,props:n}=this;if(null===e||"string"==typeof e)return;this.setBeforeRender();const{isNotKeepAdding:s,initInsertPosition:i}=n;s&&(this._renderState="disabled");const{_renderState:a}=this;if("adding"===a){const t=null!=i?i:"beforeend";e.insertAdjacentHTML(t,this.setTemplate()),this._renderState="done"}else this.updateComponentNodes(e,"done"===a);this.setChildren(),t&&this.setEvents()}updateComponentNodes(t,e){y(t,O(t),function(t){const e=document.createElement("div");return e.innerHTML=t,Array.from(e.childNodes)}(this.setTemplate()),e)}setTemplate(){return""}setChildren(){}setEvents(){}getEventTarget(){let t=null;const{$target:e,componentId:n}=this;return t=n?document.querySelector(`[data-component-id=${n}]`):"string"==typeof e?document.querySelector(e):e,t}createStringAttribute(...t){const e=[..._,...t];return Object.entries(this.props).reduce(((t,[n,s])=>e.includes(n)?t:t+=`${n}="${s}" `),"")}},x=class extends E{constructor(t,e){super(t,e),this.$target=t,this.props=e}setTemplate(){const{componentId:t,props:e}=this,{arrPostData:n}=e,s=(null==n?void 0:n.length)?Object.keys(n[0]):[],i=this.createTDStrings(n);return`<table class="app-board" data-component-id=${t}>\n    <thead>\n      <tr>\n      ${[["번호",15],["제목",55],["작성자",15],["작성일",15]].map((([t,e],n)=>`<th style=width:${e}%; ${s[n]?`class=${s[n]}`:""}>${t}</th>`)).join("")}\n      </tr>\n    </thead>\n      ${i.length?`<tbody>${i.map((t=>`${t}`)).join("")}</tbody>`:""}\n    </table>\n    `}setChildren(){const{props:{arrPostData:t}}=this,e=H();t.forEach((({id:t,subject:n})=>{const s=document.querySelector(`tr[data-id="${t}"] td.subject`);s&&new z(s,{href:`/detail?id=${t}`,text:null!=n?n:"제목 없음",routerInfo:e,publisherList:[h,m]})}))}createTDStrings(t){const e=[];return t.length?(t.forEach((t=>{const{id:n}=t,s=Object.entries(t).reduce(((t,[e,n])=>{if("contents"===e)return t;const s="subject"!==e;return n=n instanceof Date?n.toLocaleDateString():n,t+`<td class=${e}>${s?n:""}</td>`}),"");e.push(`<tr data-id=${n}>${s}</tr>`)})),e):[]}},D=class extends E{constructor(t,e){super(t,e),this.$target=t,this.props=e}setTemplate(){const{componentId:t,props:e}=this;return`<button class="app-button" ${this.createStringAttribute("text")} data-component-id=${t}>${e.text}</button>`}},$=class extends E{constructor(t,e){super(t,e),this.$target=t,this.props=e}setTemplate(){const{componentId:t}=this;return`<input class="app-input" ${this.createStringAttribute()} data-component-id=${t}></input>`}},C=class extends E{constructor(t,e){super(t,e),this.$target=t,this.props=e}setTemplate(){const{componentId:t}=this;return`\n    <div class="app-pagination" data-component-id=${t}>\n      <ul class="list">\n        ${this.createLiItemStrings().join("")}\n      </ul>\n    </div>\n    `}createLiItemStrings(){let{pageNum:t,max:e}=this.props;t>e&&1!==t&&(t=e);const n=t%5==0?5:t%5,s=t-n,i=t+(5-n),a=[];let r=s;for(;r<i&&!(r+1>e);){const e=r+1===t?'class="current"':"";a.push(`<li ${e}>${r+1}</li>`),r++}const o=`<li class="next${e===r?" disabled":""}">&rarr;</li>`;return[`<li class="prev${0===s?" disabled":""}">&larr;</li>`,...a,o]}},w=class extends E{constructor(t,e){super(t,e),this.$target=t,this.props=e}setTemplate(){const{componentId:t,props:e}=this,{numPostList:n,selectedValue:s}=e;return n.length?`\n    <select class="app-selectbox" data-component-id=${t}>\n      ${n.map((t=>`<option value=${t} ${s===t?"selected":""}>${t}</option>`)).join("")}\n    </select>\n    `:""}},T=class extends E{constructor(t,e){super(t,e),this.$target=t,this.props=e}setTemplate(){const{componentId:t,props:e}=this,{value:n,isFullSize:s}=e;return`<textarea class="app-textarea ${s?"fullsize":""}"  ${this.createStringAttribute("value","isFullSize")} data-component-id=${t}>${n||""}</textarea>`}};const I=class extends E{setTemplate(){const{componentId:t}=this;return`<div class="detail__page--bottombar" data-component-id=${t}></div>`}setChildren(){const{props:t}=this,e={isButton:!0,routerInfo:H(),publisherList:[h,m]},n=t.dataId?+t.dataId:-1;new z(".detail__page--bottombar",Object.assign(Object.assign({},e),{href:"/edit",text:"수정",callbackOption:{func:()=>h.setState(Object.assign(Object.assign({},h.state),{editId:n})),runPosition:"afterRenderPath"}})),new D(".detail__page--bottombar",{name:"delete",text:"삭제"}),new z(".detail__page--bottombar",Object.assign(Object.assign({},e),{href:"/",text:"목록"}))}setEvents(){this.registerDetailBottomBarClick()}registerDetailBottomBarClick(){var t;null===(t=this.getEventTarget())||void 0===t||t.addEventListener("click",(t=>this.handleDetailBottomBarClick(t)))}handleDetailBottomBarClick(t){const e=t.target;if(e.classList.contains("app-button")&&e instanceof HTMLButtonElement&&"delete"===e.name){if(!confirm("정말 삭제하시겠습니까?"))return;this.requestDeleteData()}}requestDeleteData(){return t=this,e=void 0,s=function*(){try{const{dataId:t}=this.props,e={method:"DELETE",body:JSON.stringify({id:t}),headers:{"Content-Type":"application/json"}};yield c({type:"delete",options:e}),m.setState(Object.assign(Object.assign({},m.state),{isEdited:!0})),window.history.back()}catch(t){console.error(t)}},new((n=void 0)||(n=Promise))((function(i,a){function r(t){try{c(s.next(t))}catch(t){a(t)}}function o(t){try{c(s.throw(t))}catch(t){a(t)}}function c(t){var e;t.done?i(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(r,o)}c((s=s.apply(t,e||[])).next())}));var t,e,n,s}},L={id:"번호",subject:"제목",author:"작성자",createdDate:"작성일",contents:"내용"},k=["author","contents","subject"],N=class extends E{setTemplate(){const{componentId:t,props:e}=this,n=e.dataId?+e.dataId:-1,{textInfoStrings:s,contents:i}=this.createPostDataStrings(n);return`\n    <div class="detail__page--content" data-component-id=${t}>\n      <ul class="textinfo">${s}</ul>\n      <div class="contents">${i}</div>\n    </div>`}setChildren(){}setEvents(){}createPostDataStrings(t){var e;const n=h.state.postData.find((e=>e.id===t));if(!n)return{textInfoStrings:"",contents:""};const s=[],i=Object.keys(n);for(let t=0;t<i.length;t++){if("contents"===i[t])continue;const e=L[i[t]];let a=n[i[t]];"createdDate"===i[t]&&(a=a.toLocaleString()),s.push(`<li><span class="name">${e}</span><span>${null!=a?a:""}</span></li>`)}return{textInfoStrings:s.join(""),contents:null!==(e=n.contents)&&void 0!==e?e:"내용 없음"}}};const P=class extends E{setTemplate(){const{componentId:t}=this;return`<div class="edit__page--bottombar" data-component-id=${t}></div>`}setChildren(){const t={isButton:!0,routerInfo:H(),publisherList:[h,m]};new D(".edit__page--bottombar",{name:"goback",text:"뒤로"}),new z(".edit__page--bottombar",Object.assign(Object.assign({},t),{href:"/",name:"submitlink",text:"전송",callbackOption:{func:()=>this.regsiterEditData(),runPosition:"beforePushState"}}))}setEvents(){this.registerEditBottomBarClick()}registerEditBottomBarClick(){var t;null===(t=this.getEventTarget())||void 0===t||t.addEventListener("click",(t=>this.handleEditBottomBarClick(t)))}handleEditBottomBarClick(t){const e=t.target;e.classList.contains("app-button")&&e instanceof HTMLButtonElement&&"goback"===e.name&&window.history.back()}regsiterEditData(){const{editData:t}=m.state,e=Object.keys(t).reduce(((e,n)=>(t[n]&&e++,e)),0),n=e>=k.length;if(!n)return!1;const s=e>k.length;return this.requestCreateData(t,s),m.setState(Object.assign(Object.assign({},m.state),{editData:f.editData})),n}requestCreateData(t,e){return n=this,s=void 0,a=function*(){try{const n=e?"edit":"write",s={method:e?"PUT":"POST",body:JSON.stringify(t),headers:{"Content-Type":"application/json"}};yield c({type:n,options:s}),m.setState(Object.assign(Object.assign({},m.state),{isEdited:!0}))}catch(t){console.error(t)}},new((i=void 0)||(i=Promise))((function(t,e){function r(t){try{c(a.next(t))}catch(t){e(t)}}function o(t){try{c(a.throw(t))}catch(t){e(t)}}function c(e){var n;e.done?t(e.value):(n=e.value,n instanceof i?n:new i((function(t){t(n)}))).then(r,o)}c((a=a.apply(n,s||[])).next())}));var n,s,i,a}},B=class extends E{setTemplate(){const{componentId:t}=this;return`\n    <div class="edit__page--content" data-component-id=${t}>\n      <ul class="editinfo">${this.createEditInfoStrings()}</ul>\n      <div class="editbox"></div>\n    </div>`}setChildren(){var t;const{editData:e}=this.props;["subject","author"].forEach(((t,n)=>{if(!e)return;let s=e[t];"string"!=typeof s&&(s=""),new $(`ul.editinfo li[data-key="${n}"]`,{name:t,type:"text",value:s,placeholder:L[t]})})),new T(".editbox",{name:"contents",value:e&&(null!==(t=e.contents)&&void 0!==t?t:""),isFullSize:!0,placeholder:"하고싶은 말은..?"})}setEvents(){this.registerEditContentsKeyup()}createEditInfoStrings(){return["subject","author"].reduce(((t,e,n)=>{const s=`<li data-key=${n}><span class="name">${L[e]}</span></li>`;return t.push(s),t}),[]).join("")}registerEditContentsKeyup(){var t;null===(t=this.getEventTarget())||void 0===t||t.addEventListener("keyup",(t=>this.handleEditContentsKeyup(t)))}handleEditContentsKeyup(t){const e=t.target,n="TEXTAREA"===e.nodeName&&e.classList.contains("app-textarea");if("INPUT"===e.nodeName&&e.classList.contains("app-input")||n)if(n){const t=e.value,{state:n}=m;m.setState(Object.assign(Object.assign({},n),{editData:Object.assign(Object.assign({},n.editData),{contents:t})}))}else{const t=e.name,n=e.value,{state:s}=m;m.setState(Object.assign(Object.assign({},s),{editData:Object.assign(Object.assign({},s.editData),{[t]:n})}))}}};const K=class extends E{setTemplate(){const{componentId:t}=this;return`\n    <div class="main__page--topbar" data-component-id=${t}>\n      <div class="topbar--box"></div>\n      <div class="topbar--box"></div>\n    </div>`}setChildren(){const t=H(),{numPostList:e,filterOptions:n}=h.state,{searchWord:s,numPost:i}=n,a=t=>`.main__page--topbar .topbar--box:nth-child(${t})`;new D(a(1),{name:"refrash",text:"새로고침"}),new D(a(1),{name:"init",text:"초기화"}),new z(a(1),{href:"/write",text:"작성",routerInfo:t,isButton:!0,publisherList:[h,m],callbackOption:{func:()=>m.setState(Object.assign({},f)),runPosition:"beforePushState"}}),new $(a(2),{name:"search_input",type:"text",placeholder:"검색어를 입력해주세요.",value:s}),new w(a(2),{numPostList:e,selectedValue:i})}setEvents(){this.registerMainTopBarClick(),this.registerMainTopBarKeyUp(),this.registerMainTopBarChange()}registerMainTopBarClick(){var t;null===(t=this.getEventTarget())||void 0===t||t.addEventListener("click",(t=>this.handleMainTopBarClick(t)))}handleMainTopBarClick(t){const e=t.target;if(e.closest(".topbar--box")&&e.classList.contains("app-button")&&e instanceof HTMLButtonElement){const t=e.name;"init"===t?this.initMainTopBarElements():"refrash"===t&&this.refrashPostData()}}initMainTopBarElements(){var t,e;const n=null===(t=this.getEventTarget())||void 0===t?void 0:t.querySelector('.topbar--box:nth-child(2) input[name="search_input"]');n&&(n.value="");const{filterOptions:s}=d,i=null===(e=this.getEventTarget())||void 0===e?void 0:e.querySelector(".topbar--box:nth-child(2) .app-selectbox");i&&(i.value=`${s.numPost}`),h.setState(Object.assign(Object.assign({},d),{isInit:!0}))}refrashPostData(){return t=this,e=void 0,s=function*(){try{const t=yield l();if(!t)return;d.postData=t,h.setState(Object.assign(Object.assign({},h.state),{postData:[...t],isRefresh:!0}))}catch(t){console.error(t)}},new((n=void 0)||(n=Promise))((function(i,a){function r(t){try{c(s.next(t))}catch(t){a(t)}}function o(t){try{c(s.throw(t))}catch(t){a(t)}}function c(t){var e;t.done?i(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(r,o)}c((s=s.apply(t,e||[])).next())}));var t,e,n,s}registerMainTopBarKeyUp(){var t;null===(t=this.getEventTarget())||void 0===t||t.addEventListener("keyup",(t=>this.handleMainTopBarKeyUp(t)))}handleMainTopBarKeyUp(t){const e=t.target;if("search_input"!==e.name||"INPUT"!==e.nodeName)return;const n=e.value,{filterOptions:s}=h.state,i=Object.assign(Object.assign({},s),{searchWord:n});h.setState(Object.assign(Object.assign({},h.state),{filterOptions:i}))}registerMainTopBarChange(){var t;null===(t=this.getEventTarget())||void 0===t||t.addEventListener("change",(t=>this.handleMainTopBarChange(t)))}handleMainTopBarChange(t){const e=t.target;if(!e)return;if("SELECT"!==e.nodeName||!e.classList.contains("app-selectbox"))return;const n=+e.value;if(Number.isNaN(n))return;const{filterOptions:s}=h.state;h.setState(Object.assign(Object.assign({},h.state),{filterOptions:Object.assign(Object.assign({},s),{numPost:n})}))}};const M=class extends E{init(){this.initGetAllPostData(),this.setState(Object.assign(Object.assign({},this.state),{isUpdate:!1}),{noRender:!0})}initSubscriber(){this.registerSubscriberFunction(h,(()=>{const{currKeys:t}=h.recentChangedKeys;if(t.includes("isInit"))return this.execInitMainPageBoard();(t.includes("filterOptions")||t.includes("postData")||t.includes("isRefresh"))&&this.execUpdateMainPageBoard(t.includes("isRefresh"))}))}setBeforeRender(){this.state&&this.state.isUpdate&&this.setState(Object.assign(Object.assign({},this.state),{isUpdate:!1}),{noRender:!0})}setTemplate(){const{componentId:t}=this;return`<div class="main__page--board" data-component-id=${t}></div>`}setChildren(){const{filterOptions:t,postData:e}=h.state,{pageNum:n,numPost:s}=t,i=p({filterOptions:t,postData:e});new x(".main__page--board",{arrPostData:i});const a=p({filterOptions:t,postData:e,isFullData:!0}),r=Math.ceil(a.length/s);new C(".main__page--board",{pageNum:n,max:r})}setEvents(){this.registerMainBoardClick()}initGetAllPostData(){return t=this,e=void 0,s=function*(){const t=yield l();if(!t)return;const{isEdited:e}=m.state;d.postData=t,h.setState(Object.assign(Object.assign({},h.state),{postData:[...t]}),{notExec:!!e||void 0}),e&&m.setState(Object.assign(Object.assign({},m.state),{isEdited:!1}),{notExec:!0})},new((n=void 0)||(n=Promise))((function(i,a){function r(t){try{c(s.next(t))}catch(t){a(t)}}function o(t){try{c(s.throw(t))}catch(t){a(t)}}function c(t){var e;t.done?i(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(r,o)}c((s=s.apply(t,e||[])).next())}));var t,e,n,s}registerMainBoardClick(){var t;null===(t=this.getEventTarget())||void 0===t||t.addEventListener("click",(t=>this.handleMainBoardClick(t)))}handleMainBoardClick(t){const e=t.target;if("A"===e.nodeName&&e.classList.contains("app-link"))return;const n=e.closest(".app-board"),s=e.closest(".app-pagination");if(n||s)if(n){if(!e.closest("tr"))return;const t="TH"===e.nodeName&&e.classList.contains("createdDate"),n="TD"===e.nodeName&&e.classList.contains("author")&&e.textContent;if(t)return this.execCreatedDateClick();if(n&&e.textContent)return this.execAuthorClick(e.textContent)}else if("LI"===e.nodeName)return this.execPaginationItemClick(e)}execCreatedDateClick(){const{filterOptions:t}=h.state,e=!t.isDesc,n=Object.assign(Object.assign({},t),{isDesc:e});h.setState(Object.assign(Object.assign({},h.state),{filterOptions:n})),this.setState(Object.assign(Object.assign({},this.state),{isUpdate:!0}),{isSetEvents:!1})}execAuthorClick(t){const{filterOptions:e}=h.state,n=Object.assign(Object.assign({},e),{author:t});h.setState(Object.assign(Object.assign({},h.state),{filterOptions:n})),this.setState(Object.assign(Object.assign({},this.state),{isUpdate:!0}),{isSetEvents:!1})}execPaginationItemClick(t){const e=t.classList.contains("prev")||t.classList.contains("next"),{filterOptions:n,postData:s}=h.state;let i=-1;if(e){if(!this.state||t.classList.contains("disabled"))return;const{pageNum:e,numPost:a}=n,r=Math.ceil(s.length/a);i=t.classList.contains("prev")?e-5:e+5,i>r?i=r:i<=0&&(i=1)}else{const e=+`${t.textContent}`;if(Number.isNaN(e))return;i=e}const a=Object.assign(Object.assign({},n),{pageNum:i});h.setState(Object.assign(Object.assign({},h.state),{filterOptions:a}),{notExec:!0}),this.setState(Object.assign(Object.assign({},this.state),{isUpdate:!0}),{isSetEvents:!1})}execInitMainPageBoard(){h.setState(Object.assign(Object.assign(Object.assign({},h.state),d),{isInit:!1}),{notExec:!0}),this.setState(Object.assign(Object.assign({},this.state),{isUpdate:!0}),{isSetEvents:!1})}execUpdateMainPageBoard(t){return t&&h.setState(Object.assign(Object.assign({},h.state),{isRefresh:!1}),{notExec:!0}),this.setState(Object.assign(Object.assign({},this.state),{isUpdate:!0}),{isSetEvents:!1})}},A=class extends E{setTemplate(){const{componentId:t}=this;return`<div class="detail__page default-page-size" data-component-id=${t}></div>`}setChildren(){var t,e;const n=new URL(window.location.href).search,s=null===(e=null===(t=q(n))||void 0===t?void 0:t.find((t=>"id"===t.key)))||void 0===e?void 0:e.value;new N(".detail__page",{dataId:s}),new I(".detail__page",{dataId:s})}},R=class extends E{initSubscriber(){this.registerSubscriberFunction(h,(()=>{const{currKeys:t}=h.recentChangedKeys;t.includes("editId")&&this.registerEditData()}))}setTemplate(){const{componentId:t}=this;return`<div class="edit__page default-page-size" data-component-id=${t}></div>`}setChildren(){const{editData:t}=m.state;new B(".edit__page",{editData:t}),new P(".edit__page")}registerEditData(){const{editId:t,postData:e}=h.state;if(-1===t)return;const n=e.find((({id:e})=>t===e));n&&(m.setState(Object.assign(Object.assign({},m.state),{editData:n})),h.setState(Object.assign(Object.assign({},h.state),{editId:d.editId}),{notExec:!0}),this.setState(Object.assign(Object.assign({},this.state),{editData:n}),{isSetEvents:!1}))}},U=class extends E{setTemplate(){const{componentId:t}=this;return`<div class="main__page default-page-size" data-component-id=${t}></div>`}setChildren(){new K(".main__page"),new M(".main__page")}};function F({href:t,routerInfo:e,componentName:s,publisherList:i}){try{if(!e)throw new n("NOT_FOUND_ROUTER_INFO",s);const{pathname:a}=new URL(t),r=e[a];if(!r)return;const{Component:o,props:c}=r;let l=r.$target;if("string"==typeof l&&(l=document.querySelector(l)),!l)return;l.innerHTML="",i&&i.forEach((t=>t.clear())),new o(l,c)}catch(t){console.error(t)}}function H(t=document.querySelector("#root")){return{"/":{$target:t,Component:U},"/detail":{$target:t,Component:A},"/edit":{$target:t,Component:R},"/write":{$target:t,Component:R}}}const q=t=>{var e;try{const n=/(?<key>[\w]+)=(?<value>[\w]+)/g,s=null!==(e=Array.from(t.matchAll(n)))&&void 0!==e?e:[];return s&&s.length?s.map((t=>t.groups)):null}catch(t){return null}},z=class extends E{constructor(t,e){super(t,e),this.$target=t,this.props=e}setTemplate(){if(!this.props)return"";const{componentId:t,props:e}=this,{text:n,isButton:s}=e;return`<a class="app-link ${s?" btn":""}" ${this.createStringAttribute("routerInfo","publisherList","isButton","callbackOption","text")} data-component-id=${t}>${null!=n?n:""}</a>`}setEvents(){this.registerAnchorClick()}registerAnchorClick(){var t;null===(t=this.getEventTarget())||void 0===t||t.addEventListener("click",(t=>this.anchorClickHandler(t)))}anchorClickHandler(t){null==t||t.preventDefault();const e=null==t?void 0:t.target,n=null==t?void 0:t.currentTarget;if(!n||e!==n)return;const s=n.href;if(!s)return;const{callbackOption:i}=this.props;if((null==i?void 0:i.func)&&"beforePushState"===i.runPosition){const t=i.func();if("boolean"==typeof t&&!t)return}window.history.pushState({href:s},"",s);const{routerInfo:a,publisherList:r}=this.props;F({href:s,componentName:`${this.constructor.name}(${this.componentId})`,routerInfo:a,publisherList:r}),(null==i?void 0:i.func)&&"afterRenderPath"===i.runPosition&&i.func()}};new class extends E{constructor(t){super(t)}init(){this.$target&&"string"!=typeof this.$target&&new class{constructor(t,e,s){this.$target=t,this.routerInfo=e,this.publisherList=s;try{if(null===t)throw new n("NOT_FOUND_TARGET",this.constructor.name);this.init()}catch(t){console.error(t)}}init(){this.setPopStateEvent();const t=window.location.href,{routerInfo:e,publisherList:n}=this;F({href:t,componentName:this.constructor.name,routerInfo:e,publisherList:n})}setPopStateEvent(){window.addEventListener("popstate",(()=>this.popStateEventHandler()))}popStateEventHandler(t){const e=window.location.href,{routerInfo:n,publisherList:s}=this;F({href:e,componentName:this.constructor.name,routerInfo:n,publisherList:s})}}(this.$target,H(),[h,m])}}("#root")})();