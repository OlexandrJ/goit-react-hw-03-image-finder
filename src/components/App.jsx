import React, { useState } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSearchSubmit = (searchQuery) => {
    setQuery(searchQuery);
    setImages([]);
    setCurrentPage(1);
    fetchImages(searchQuery, 1);
  };

  const fetchImages = (searchQuery, page) => {
    const apiKey = '40243094-9cac1343afd7c4b92bc3dbcfd';
    const perPage = 12;
    const apiUrl = `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=${perPage}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setImages((prevImages) => [...prevImages, ...data.hits]);
        setCurrentPage((prevPage) => prevPage + 1);
      })
      .catch((error) => console.error('Error fetching images:', error));
  };

  const handleLoadMore = () => {
    fetchImages(query, currentPage);
  };

  const openModal = (largeURL) => {
    setLargeImageURL(largeURL);
    setShowModal(true);
  };

  const closeModal = () => {
    setLargeImageURL('');
    setShowModal(false);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleSearchSubmit} />
      <ImageGallery images={images} openModal={openModal} />
      {images.length > 0 && <Button onLoadMore={handleLoadMore} />}
      {showModal && <Modal largeImageURL={largeImageURL} onClose={closeModal} />}
    </div>
  );
};

export default App;