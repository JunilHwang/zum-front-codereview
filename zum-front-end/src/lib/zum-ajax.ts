/*
 * Title: ZUM Ajax
 * Description: Server Communication API over httpRequest
 * Author : Seokhyeon Jang (coolman555@me.com)
 */

interface event {
  start: Function | any;
  progress: Function | any;
  success: Function | any;
  error: Function | any;
}

// Event Controller
function eventControl(httpRequest: any, func?: any) {
  const { start, progress, success, error }: event = func;
  httpRequest.timeout = 5000;
  httpRequest.ontimeout = error !== undefined ? error : null;

  httpRequest.onloadstart = start !== undefined ? start : null;
  httpRequest.onprogress = progress !== undefined ? progress : null;
  httpRequest.onloadend = success !== undefined ? success : null;
  httpRequest.onerror = error !== undefined ? error : null;
}

// Methods Controller
export default {
  get: (url: string, callback?: object) => {
    // Request instance
    const httpRequest = new XMLHttpRequest();
    if (!httpRequest) {
      console.error("XMLHTTP Instance error");
    }

    eventControl(httpRequest, callback);
    httpRequest.open("GET", url);
    httpRequest.send();
  },
  post: (url: string, callback?: object) => {
    // Request instance
    const httpRequest = new XMLHttpRequest();
    if (!httpRequest) {
      console.error("XMLHTTP Instance error");
    }

    eventControl(httpRequest, callback);
    httpRequest.open("POST", url);
    httpRequest.send();
  },
  put: (url: string, callback?: object) => {
    // Request instance
    const httpRequest = new XMLHttpRequest();
    if (!httpRequest) {
      console.error("XMLHTTP Instance error");
    }

    eventControl(httpRequest, callback);
    httpRequest.open("PUT", url);
    httpRequest.send();
  },
  patch: (url: string, callback?: object) => {
    // Request instance
    const httpRequest = new XMLHttpRequest();
    if (!httpRequest) {
      console.error("XMLHTTP Instance error");
    }

    eventControl(httpRequest, callback);
    httpRequest.open("PATCH", url);
    httpRequest.send();
  },
  delete: (url: string, callback?: object) => {
    // Request instance
    const httpRequest = new XMLHttpRequest();
    if (!httpRequest) {
      console.error("XMLHTTP Instance error");
    }

    eventControl(httpRequest, callback);
    httpRequest.open("DELETE", url);
    httpRequest.send();
  },
};
