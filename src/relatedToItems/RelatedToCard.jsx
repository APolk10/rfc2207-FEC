import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StarRatings from 'react-star-ratings';

function RelatedToCard({ id, setCurrentProduct, isDarkMode }) {
  const [productInfo, setProductInfo] = useState({});
  const [productImage, setProductImage] = useState('');
  useEffect(() => {
    axios.get(`http://localhost:3001/products/${id}`)
      .then((response) => {
        setProductInfo(response.data);
      });
    axios.get(`http://localhost:3001/styles/${id}`)
      .then((response) => {
        setProductImage(response.data.results[0].photos[0].thumbnail_url);
      });
  }, [id]);

  const handleClick = (e) => {
    e.preventDefault();
    setCurrentProduct(id);
  };

  return (
    !Object.keys(productInfo).length ? null
      : (
        <div className="related-to-card" onClick={handleClick} style={{ background: isDarkMode ? '#1b242c' : 'white' }}>
          <div className="related-to-card-gallery" style={{ background: isDarkMode ? '#1b242c' : 'white' }}>
            <img className="related-to-img" style={{ width: '50%' }} src={productImage} alt="404 Not Found" onError={({ currentTarget }) => {currentTarget.onerror = null; currentTarget.src="https://cdn.fleetfeet.com/products/goodr/Front-View-A-Gingers-Soul-OG-BK-BK1-copy.jpg/width:640-height:480-fit:trim/Front-View-A-Gingers-Soul-OG-BK-BK1-copy.jpg?signature=10ff1173"}} />
          </div>
          <div className="related-to-info">
            <div className="related-to-category">{productInfo.category.toUpperCase()}</div>
            <div className="related-to-name">{productInfo.name}</div>
            <div className="related-to-price">{productInfo.default_price}</div>
            <br />
            <StarRatings
              rating={4}
              starRatedColor={isDarkMode ? '#ECF1C6' : 'black'}
              starDimension="1.5vw"
              starSpacing="1px"
              numberOfStars={5}
              name="rating"
            />
          </div>
        </div>
      )
  );
}

export default RelatedToCard;
