import App from "./app.js";
import APIs from "./service/APIs.js";

const apis=new APIs();
new App(document.querySelector('#app'),apis);