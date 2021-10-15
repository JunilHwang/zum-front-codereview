const ContentCard = (title, imageUrl, mediaName, summaryContent) => {
  return `
    <img class="content-img" src="${imageUrl}"/>
    <strong class="content-title">${title}</strong>
    <span class="content-text">${summaryContent}</span>
    <span class="content-pre">by</span><span class="content-name">${mediaName}</span>
  `;
};

export default ContentCard;
