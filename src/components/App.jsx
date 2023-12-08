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
    const apiKey = '40243094-9cac1343afd7c4b92bc3dbcfd';
    const perPage = 12;
    const apiUrl = `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=${perPage}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.hits.length === 0) {
          this.setState({ hasMoreImages: false });
        } else {
          this.setState((prevState) => ({
            images: [...prevState.images, ...data.hits],
            currentPage: prevState.currentPage + 1,
          }));
        }
      })
      .catch((error) => console.error('Error fetching images:', error));
  };

  handleLoadMore = () => {
    if (this.state.hasMoreImages) {
      this.fetchImages(this.state.query, this.state.currentPage);
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
    const { images, largeImageURL, showModal, hasMoreImages } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery images={images} openModal={this.openModal} />
        {images.length > 0 && hasMoreImages && <Button onLoadMore={this.handleLoadMore} />}
        {showModal && <Modal largeImageURL={largeImageURL} onClose={this.closeModal} />}
      </div>
    );
  }
}

export default App;