import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem';


const ImageGallery = ({ images, openModal }) => {
  return (
    <ul className="ImageGallery">
      {images.map((image) => (
        <ImageGalleryItem key={image.id} image={image} openModal={openModal} />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default ImageGallery;