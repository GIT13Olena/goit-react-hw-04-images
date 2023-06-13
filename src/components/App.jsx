import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

const API_KEY = '37041202-1594c8105fa8f1138959983fe';
const BASE_URL = 'https://pixabay.com/api/';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalImageURL, setModalImageURL] = useState('');

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }

    fetchImages(searchQuery, page);
  }, [searchQuery, page]);

  useEffect(() => {
    if (page === 1) {
      setImages([]);
    } else {
      fetchImages(searchQuery, page);
    }
  }, [page]);

  async function fetchImages(searchQuery, page) {
    setIsLoading(true);

    const searchParams = new URLSearchParams({
      key: API_KEY,
      q: searchQuery,
      page,
      per_page: 12,
      image_type: 'photo',
      orientation: 'horizontal',
    });

    const url = `${BASE_URL}?${searchParams}`;
    const response = await fetch(url);
    const data = await response.json();

    setImages(prevImages => [...prevImages, ...data.hits]);
    setIsLoading(false);
  }

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

      {images.length > 0 && !isLoading && (
        <Button onClick={handleLoadMoreButtonClick} />
      )}

      {showModal && (
        <Modal imageURL={modalImageURL} onClose={handleModalClose} />
      )}
    </div>
  );
}

export default App;
