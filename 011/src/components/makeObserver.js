export default function makeObserver(func) {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0,
  };

  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        func();
        observer.unobserve(entry.target);
      }
    });
  }, options);

  const observers = document.querySelector('.content-list-observer');
  io.observe(observers);
}
