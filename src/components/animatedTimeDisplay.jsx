import NumberFlow, { NumberFlowGroup } from '@number-flow/react';

const AnimatedTimeDisplay = ({ timeInSeconds, className }) => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = Math.floor(timeInSeconds % 60);

  return (
    // Używamy np. <span> jako kontenera dla stylizacji
    <span className={`${className}`}>
      <NumberFlowGroup>
        {hours ? <><NumberFlow value={hours} suffix='h' /><span> </span></> : ''}
        {minutes ? <><NumberFlow value={minutes} suffix='m' /><span> </span></> : ''}
        {seconds ? <><NumberFlow value={seconds} suffix='s' /></> : ''}
      </NumberFlowGroup>
    </span>
  );
};

export default AnimatedTimeDisplay;