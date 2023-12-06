import React from 'react';
import LoaderSpinner from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className="loader">
      <LoaderSpinner type="TailSpin" color="#00BFFF" height={80} width={80} />
    </div>
  );
};

export default Loader;