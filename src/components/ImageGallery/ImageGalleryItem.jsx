import React from 'react';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ image, openModal }) => {
  return (
    <li className="ImageGalleryItem">
      <img
        src={image.webformatURL}
        alt=""
        className="ImageGalleryItem-image"
        onClick={() => openModal(image.largeImageURL)}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;