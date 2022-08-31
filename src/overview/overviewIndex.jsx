/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageGallery from './components/ImageGallery.jsx';
import BasicInfo from './components/BasicInfo.jsx';
import StyleSelector from './components/StyleSelector.jsx';
import AddToCart from './components/AddToCart.jsx';
import ProductDetails from './components/ProductDetails.jsx';

function Overview() {
  const [product, setProduct] = useState({});
  useEffect(() => {
    axios.get('http://localhost:3001/products/66642')
      .then((response) => {
        setProduct(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [styles, setStyles] = useState([]);
  const [currentStyle, setCurrentStyle] = useState({});
  const [currentPhotos, setCurrentPhotos] = useState([]);
  const [currentThumbnails, setCurrentThumbnails] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3001/styles/66642')
      .then((response) => {
        setStyles(response.data.results);
        setCurrentStyle(response.data.results[0]);
        setCurrentPhotos(response.data.results[0].photos.map((current) => current.url));
        setCurrentThumbnails(response.data.results[0]
          .photos.map((current) => current.thumbnail_url));
      });
  }, []);

  return (
    <div>
      <div className="overview-widget">
        <ImageGallery current={currentPhotos} currentThumbnails={currentThumbnails} />
        <div className="basic-info-container">
          <BasicInfo product={product} />
          <StyleSelector
            styles={styles}
            current={currentStyle}
            setCurrentStyle={setCurrentStyle}
            setCurrentPhotos={setCurrentPhotos}
            setCurrentThumbnails={setCurrentThumbnails}
          />
          <AddToCart current={currentStyle} />
        </div>
      </div>
      <ProductDetails product={product} />
    </div>
  );
}

export default Overview;
