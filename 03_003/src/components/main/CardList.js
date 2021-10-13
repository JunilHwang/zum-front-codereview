import Card from '../common/Card';

const CardList = data => {
  const category = ['라이프', '푸드', '여행', '컬쳐'];
  const categorytoHash = {
    라이프: 'life',
    푸드: 'food',
    여행: 'trip',
    컬쳐: 'culture',
  };

  const CardContainer = name => {
    const hash = categorytoHash[name];
    const slicedData = data[hash].slice(0, 4);

    return `
      <div class="cardContainer">
        <ul>
          ${slicedData.map(cardData => Card(cardData)).join('')}
        </ul>
      </div>`;
  };

  const renderCardList = () => {
    return `
    <section id="cardList">
    ${category
      .map(
        category =>
          `<h1>#${category}</h1>
          ${CardContainer(category)}
        `,
      )
      .join('')}
    </section>`;
  };

  return renderCardList();
};

export default CardList;
