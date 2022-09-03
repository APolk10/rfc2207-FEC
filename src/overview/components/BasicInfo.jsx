/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import StarRatings from 'react-star-ratings';

function BasicInfo({ product, scrollToReviews }) {
  function handleReviewClick(e) {
    e.preventDefault();
    scrollToReviews();
  }
  return (
    <div className="basic-info">
      <div className="see-reviews">
        <StarRatings
          rating={3.6}
          starRatedColor="black"
          starDimension="15px"
          starSpacing="1px"
          numberOfStars={5}
          name="rating"
        />
        <small onClick={handleReviewClick}>
          &nbsp;See all reviews...
        </small>
      </div>
      <div>{product.category && product.category.toUpperCase()}</div>
      <h2 className="product-name">{product.name}</h2>
    </div>
  );
}
BasicInfo.propTypes = {
  product: PropTypes.shape.isRequired,
};
export default BasicInfo;
