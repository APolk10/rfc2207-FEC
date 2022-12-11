import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RelatedToCard from './RelatedToCard.jsx';

function RelatedToList({ currentProduct, setCurrentProduct, isDarkMode }) {
  const [relatedToCards, setRelatedToCards] = useState([]);
  const [displayedCards, setDisplayedCards] = useState([]);
  const [firstIndex, setFirstIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(3);
  useEffect(() => {
    setFirstIndex(0);
    setLastIndex(3);
  }, [currentProduct]);
  useEffect(() => {
    axios.get(`http://localhost:3001/relatedTo/${currentProduct}`)
      .then((response) => {
        const relatedCards = [];
        response.data.forEach((id) => {
          if (id !== 66643 && !relatedCards.includes(id)) {
            relatedCards.push(id);
          }
        });
        setRelatedToCards(relatedCards);
        setDisplayedCards(relatedCards.slice(firstIndex, lastIndex));
      });
  }, [currentProduct]);

  useEffect(() => {
    setDisplayedCards(relatedToCards.slice(firstIndex, lastIndex));
  }, [firstIndex, lastIndex]);

  const goToNextSlide = () => {
    setFirstIndex(firstIndex + 1);
    setLastIndex(lastIndex + 1);
  };

  const goToPreviousSlide = () => {
    setFirstIndex(firstIndex - 1);
    setLastIndex(lastIndex - 1);
  };

  return (
    // Left Arrow
    <div>
      {firstIndex === 0 ? null : (
        <h2 className="related-to-left-arrow" type="button" onClick={goToPreviousSlide}>
          &#8249;
        </h2>
      )}
      <div id="related-to-list">
        {displayedCards.map((id) => (
          (
            <RelatedToCard
              id={id}
              setCurrentProduct={setCurrentProduct}
              isDarkMode={isDarkMode}
            />
          )
        ))}
      </div>
      {lastIndex === relatedToCards.length ? null : (
        <h2 className="related-to-right-arrow" type="button" onClick={goToNextSlide}>
          &#8250;
        </h2>
      )}
    </div>
  );
}

export default RelatedToList;
