import './card.css';

const Card = (information) => {
  const render = () => {
    const { idx, title, imageUrl, mediaName, url, summaryContent } =
      information;
    return `<div id="category-item-${idx}">
        <div class="category-item-image" style="background-image : url(${imageUrl})"></div>
        <div class="category-item-title">${title}</div>
        <div class="category-item-summary">${summaryContent || '...'}</div>
        <div class="more-info-container">
            <div class="category-item-media">by ${mediaName}</div>
            <button id="bookmark-button-${idx}" class="bookmark-button">☆</button>
        </div>
    </div>`;
  };
  return render();
};

export default Card;
