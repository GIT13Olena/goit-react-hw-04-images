import React, { useEffect, useState } from 'react';

function Modal({ imageURL, onClose }) {
  const [showImage, setShowImage] = useState(true);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  function handleKeyDown(event) {
    if (event.code === 'Escape') {
      onClose();
    }
  }

  function handleBackdropClick(event) {
    if (event.currentTarget === event.target) {
      onClose();
    }
  }

  function handleImageClick() {
    setShowImage(false);
  }

  function handleImageLoad() {
    const image = document.querySelector('.modal img');
    const { width, height } = image.getBoundingClientRect();

    if (width > window.innerWidth) {
      image.style.maxWidth = '90%';
    }

    if (height > window.innerHeight) {
      image.style.maxHeight = '90%';
    }
  }

  function handleModalClick() {
    setShowImage(false);
    onClose();
  }

  const modalStyles = showImage
    ? { display: 'flex' }
    : { display: 'none', pointerEvents: 'none' };

  return (
    <div className="overlay" onClick={handleBackdropClick}>
      <div className="modal" style={modalStyles} onClick={handleModalClick}>
        <img
          src={imageURL}
          alt=""
          onLoad={handleImageLoad}
          className={showImage ? '' : 'hidden'}
          onClick={handleImageClick}
        />
      </div>
    </div>
  );
}

export default Modal;
