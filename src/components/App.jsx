import React, { useState } from 'react';
import axios from 'axios';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

const API_KEY = '40243094-9cac1343afd7c4b92bc3dbcfd';

const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState('');

  const handleSearchSubmit = (searchQuery) => {
    setQuery(searchQuery);
    setPage(1);
    setImages([]);
    fetchImages(searchQuery, 1);
  };

  const fetchImages = async (searchQuery, pageNumber) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://pixabay.com/api/?q=${searchQuery}&page=${pageNumber}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );
      setImages((prevImages) => [...prevImages, ...response.data.hits]);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreImages = () => {
    setPage((prevPage) => prevPage + 1);
    fetchImages(query, page + 1);
  };

  const openModal = (imageUrl) => {
    setShowModal(true);
    setModalImage(imageUrl);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalImage('');
  };

  return (
    <div>
      <Searchbar onSubmit={handleSearchSubmit} />
      {images.length > 0 && <ImageGallery images={images} onImageClick={openModal} />}
      {loading && <Loader />}
      {images.length > 0 && !loading && <Button onClick={loadMoreImages} />}
      {showModal && <Modal imageUrl={modalImage} onClose={closeModal} />}
    </div>
  );
};

export default App;