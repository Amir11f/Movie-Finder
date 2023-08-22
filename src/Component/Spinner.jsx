import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const Spinner = () => {
  return (
    <div className='loadingSpinnerContainer'>
      <div className="overlay">
        <div className="loadingSpinner"></div>
      </div>
    </div>
  );
};

export default Spinner;
