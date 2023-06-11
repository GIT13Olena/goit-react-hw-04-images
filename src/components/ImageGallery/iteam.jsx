import React from 'react';

function ImageGalleryItem({ webformatURL, largeImageURL, onImageClick }) {
  function handleImageClick() {
    onImageClick(largeImageURL);
  }

  return (
    <li className="gallery-item">
      <img src={webformatURL} alt="" onClick={handleImageClick} />
    </li>
  );
}

export default ImageGalleryItem;
