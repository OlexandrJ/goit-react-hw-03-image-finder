import React from 'react';

const Button = ({ onClick }) => {
  return (
    <button className="load-more-button" onClick={onClick}>
      Load more
    </button>
  );
};

export default Button;