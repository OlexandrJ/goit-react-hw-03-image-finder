import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ onLoadMore, hasMoreImages }) => {
  return (
    hasMoreImages && (
      <button className="Button" type="button" onClick={onLoadMore}>
        Load more
      </button>
    )
  );
};

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
  hasMoreImages: PropTypes.bool.isRequired,
};

export default Button;