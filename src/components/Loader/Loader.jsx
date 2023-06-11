import React from 'react';
// import Loader from 'react-loader-spinner';
import { ThreeDots } from 'react-loader-spinner';

function Spinner() {
  return (
    <div>
      <ThreeDots type="ThreeDots" color="#3f51b5" height={80} width={80} />
    </div>
  );
}

export default Spinner;
