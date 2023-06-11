import React from 'react';
import ImageGalleryItem from './iteam';
import styles from './ImagesGallery.module.css';

function ImageGallery({ images, onImageClick }) {
  return (
    <ul className={styles.gallery}>
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          webformatURL={image.webformatURL}
          largeImageURL={image.largeImageURL}
          onImageClick={onImageClick}
        />
      ))}
    </ul>
  );
}

export default ImageGallery;
