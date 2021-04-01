import { throttling } from "./throttling";

/* Lazy Loading Function*/ 
const Throttle=throttling();

export function lazyload () {
    Throttle.throttle(()=>{
      let lazyloadThrottleTimeout;
      const lazyloadImages = document.querySelectorAll("img.lazy"); 

      if(lazyloadThrottleTimeout) {
        clearTimeout(lazyloadThrottleTimeout);
      }    

      lazyloadThrottleTimeout = setTimeout(function() {
          const scrollTop = window.pageYOffset;
          lazyloadImages.forEach(function(img) {
              if(img.offsetTop < (window.innerHeight + scrollTop)) {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
              }
          });
          if(lazyloadImages.length == 0) { 
            document.removeEventListener("scroll", lazyload);
            window.removeEventListener("resize", lazyload);
            window.removeEventListener("orientationChange", lazyload);
          }
      }, 200);
    },200)
}