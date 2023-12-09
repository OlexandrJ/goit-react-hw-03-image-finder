import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';

class App extends Component {
  constructor() {
    super();
    this.state = {
      query: '',
      images: [],
      currentPage: 1,
      largeImageURL: '',
      showModal: false,
      hasMoreImages: true,
      loading: false,
    };
  }

  handleSearchSubmit = (searchQuery) => {
    this.setState({
      query: searchQuery,
      images: [],
      currentPage: 1,
      hasMoreImages: true,
    }, () => this.fetchImages(searchQuery, 1));
  };

fetchImages = (searchQuery, page) => {
  this.setState({ loading: true });

  const apiKey = '40243094-9cac1343afd7c4b92bc3dbcfd';
  const perPage = 12;
  const apiUrl = `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=${perPage}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const { hits, totalHits } = data;

      this.setState((prevState) => ({
        images: [...prevState.images, ...hits],
        currentPage: prevState.currentPage + 1,
        hasMoreImages: prevState.currentPage < Math.ceil(totalHits / perPage),
      }));
    })
    .catch((error) => console.error('Error fetching images:', error))
    .finally(() => {
      this.setState({ loading: false });
    });
};

handleLoadMore = () => {
  const { loading, hasMoreImages, query, currentPage } = this.state;

  if (!loading && hasMoreImages) {
    this.fetchImages(query, currentPage);
  }
};


  openModal = (largeURL) => {
    this.setState({
      largeImageURL: largeURL,
      showModal: true,
    });
  };

  closeModal = () => {
    this.setState({
      largeImageURL: '',
      showModal: false,
    });
  };

render() {
  const { images, largeImageURL, showModal, hasMoreImages, loading } = this.state;
  const shouldRenderLoadMore = images.length > 0 && hasMoreImages;

  return (
    <div className="App">
      <Searchbar onSubmit={this.handleSearchSubmit} />
      <ImageGallery images={images} openModal={this.openModal} />
      {loading && <p>Loading...</p>}
       {shouldRenderLoadMore && !loading && <Button onLoadMore={this.handleLoadMore} hasMoreImages={hasMoreImages} />}
      {showModal && <Modal largeImageURL={largeImageURL} onClose={this.closeModal} />}
    </div>
  );
}
}

export default App;