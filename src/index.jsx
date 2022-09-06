/* eslint-disable import/extensions */
import React, { useState, createRef } from 'react';
import ReactDOM from 'react-dom';
import Overview from './overview/overviewIndex.jsx';
// eslint-disable-next-line import/extensions
import RatingsApp from './ratingsAndReviews/RatingsApp.jsx';
// eslint-disable-next-line import/extensions
import Questions from './q&a/QuestionsApp.jsx';

function App() {
  const [currentProductName, setCurrentProductName] = useState('');
  const [averageStars, setAverageStars] = useState(0);
  const [numberReviews, setNumberReviews] = useState(0);

  const reviewsRef = createRef();
  const scrollToReviews = () => {
    reviewsRef.current.scrollIntoView({
      behavior: 'smooth',
    });
  };

  return (
    <div>
      <header>
        <p className="business-name">Atelier&nbsp;</p>
      </header>
      <div className="sitewide-sale">
        <em>SITE-WIDE ANNOUNCEMENT MESSAGE!</em>
        {' '}
        -- SALE / DISCOUNT&nbsp;
        {' '}
        <b>OFFER</b>
        {' '}
        --
        {' '}
        <u>NEW PRODUCT HIGHLIGHT</u>
      </div>
      <Overview
        averageStars={averageStars}
        numberReviews={numberReviews}
        setCurrentProductName={setCurrentProductName}
        scrollToReviews={scrollToReviews}
      />
      <Questions />
      <div ref={reviewsRef} />
      <RatingsApp
        currentProductName={currentProductName}
        setAverageStars={setAverageStars}
        setNumberReviews={setNumberReviews}
      />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
// export default index;
