import React, { useState, useEffect } from 'react';
import axios from 'axios';
// eslint-disable-next-line import/extensions
import ReviewList from './components/reviewList.jsx';

function RatingsApp({
  currentProduct, currentProductName, setAverageStars, setNumberReviews, isDarkMode
}) {
  const [currentItem, setCurrentItem] = useState({ results: [] });
  const [currentMeta, setCurrentMeta] = useState({});
  const [incrementState, setIncrementState] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [flag, setFlag] = useState(false);

  function handleWidgetClick() {
    setClickCount(clickCount + 1);
    console.log('clicked r&r!');
  }

  function getMeta(productId) {
    axios.get(`http://localhost:3001/meta/${productId}`)
      .then((response) => setCurrentMeta(response.data))
      .catch((err) => (console.log(err)));
  }

  function getReviews() {
    axios.get(`http://localhost:3001/reviews/${currentProduct}`)
      .then((response) => setCurrentItem(response.data))
      .then(() => getMeta(currentProduct))
      .catch((err) => (console.log(err)));
  }

  function refreshList() {
    setIncrementState(incrementState + 1);
    console.log(incrementState);

    if (flag) {
      setFlag(false);
    } else {
      setFlag(true);
    }
  }

  function addReview(message) {
    axios.post('http://localhost:3001/reviews/addReview', message)
      .then((response) => setHelpfulCount(helpfulCount + 1))
      .catch((error) => console.log('error posting to server', error));
  }

  function postHelpful(ID) {
    axios.put('http://localhost:3001/reviews/putHelpful', ID)
      .then((response) => console.log('POST new helpful request to server successful', response))
      .then(() => getReviews())
      .catch((error) => console.log('error posting to server', error));
  }

  function postReport(ID) {
    console.log(ID);
    axios.put('http://localhost:3001/reviews/putReport', ID)
      .then((response) => console.log('POST new report request to server successful', response))
      .catch((error) => console.log('error posting to server', error));
  }

  if (currentItem) {
    setNumberReviews(currentItem.results.length);
  }

  useEffect(() => {
    axios.get(`http://localhost:3001/reviews/${currentProduct}`)
      .then((response) => setCurrentItem(response.data))
      .then(() => getMeta(currentProduct))
      .catch((err) => (console.log(err)));

    getMeta(currentProduct);

    const element = document.getElementById('rarMain');
    element.addEventListener('mousedown', handleWidgetClick);
  }, [currentProduct]);

  return (
    <div id="rarMain">
      <ReviewList
        productInfo={currentItem}
        flag={flag}
        itemMeta={currentMeta}
        currentProductName={currentProductName}
        addReview={addReview}
        postReport={postReport}
        setAverageStars={setAverageStars}
        postHelpful={postHelpful}
        refreshList={getReviews}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}

export default RatingsApp;
