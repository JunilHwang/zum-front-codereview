import useState from './hooks/useState';

const scrollEnd = document.querySelector('#scrollEnd');

const [itemCount, setItemCount] = useState(0);

function fetchMore() {
  setItemCount(itemCount() + 12);
}

// Intersection observer
const options = {
  root: null,
  rootMargin: '0px 0px 5px 0px',
  threshold: 0,
};

const observer = new IntersectionObserver(([{ isIntersecting }]) => {
  if (isIntersecting) {
    fetchMore();
  }
}, options);

observer.observe(scrollEnd);

// event
window.addEventListener('hashchange', () => setItemCount(12));

export { itemCount, setItemCount };
