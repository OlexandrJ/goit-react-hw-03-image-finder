import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

const Modal = ({ largeImageURL, onClose }) => {
  const handleKeyDown = useCallback(
    (e) => {
      if (e.code === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  const handleClick = useCallback(
    (e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="Overlay" onClick={handleClick}>
      <div className="Modal">
        <img src={largeImageURL} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;