import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import { fetchImages } from './api';
function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalImageURL, setModalImageURL] = useState('');
  const [isShowButton, setIsShowButton] = useState(true);

  async function handleFetchImages(searchQuery, page) {
    setIsLoading(true);

    const data = await fetchImages(searchQuery, page);

    if (page === 1) {
      setImages(data);
    } else {
      setImages(prevImages => [...prevImages, ...data]);
    }
    setIsLoading(false);

    if (data.length === 0 || (page > 1 && data.hits.length === 0)) {
      setIsShowButton(false);
    } else {
      setIsShowButton(true);
    }
  }

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }

    handleFetchImages(searchQuery, page);
  }, [searchQuery, page]);

  function handleSearchFormSubmit(searchQuery) {
    setSearchQuery(searchQuery);
    setPage(1);
  }

  function handleLoadMoreButtonClick() {
    setPage(prevPage => prevPage + 1);
  }

  function handleImageClick(imageURL) {
    setModalImageURL(imageURL);
    setShowModal(true);
  }

  function handleModalClose() {
    setShowModal(false);
    setModalImageURL('');
  }

  return (
    <div>
      <Searchbar onSubmit={handleSearchFormSubmit} />

      <ImageGallery images={images} onImageClick={handleImageClick} />

      {isLoading && <Loader />}

      {images.length > 0 && !isLoading && isShowButton && (
        <Button onClick={handleLoadMoreButtonClick} />
      )}

      {showModal && (
        <Modal imageURL={modalImageURL} onClose={handleModalClose} />
      )}
    </div>
  );
}

export default App;
