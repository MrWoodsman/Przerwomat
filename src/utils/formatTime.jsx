// src/AnimatedTimeDisplay.js
import React from 'react';
import NumberFlow from '@number-flow/react';

const AnimatedTimeDisplay = ({ timeInSeconds }) => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = Math.floor(timeInSeconds % 60);

  return (
    // Używamy np. <span> jako kontenera dla stylizacji
    <span className="time-display">
      <NumberFlow value={hours} suffix='h'/>{' '}
      <NumberFlow value={minutes} suffix='m'/>{' '}
      <NumberFlow value={seconds} suffix='s'/>
    </span>
  );
};

export default AnimatedTimeDisplay;