/* eslint-disable no-unused-vars */
import React from 'react';

// eslint-disable-next-line react/prop-types
const ProgressBar = ({ step, totalSteps }) => {
  return (
      <div style={{ width: `${(step / totalSteps) * 100}%` }}></div>
  );
};

export default ProgressBar;