import NumberFlow, { NumberFlowGroup } from '@number-flow/react';

const AnimatedTimeDisplay = ({ timeInSeconds, className }) => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = timeInSeconds % 60;

  return (
    // Używamy np. <span> jako kontenera dla stylizacji
    <span className={`${className}`}>
      <NumberFlowGroup>
        {/* Wyświetlaj tylko, gdy godziny są większe od zera */}
        {hours > 0 && (<><NumberFlow value={hours} suffix='h' /><span> </span></>)}
        {/* Wyświetlaj, gdy minuty lub godziny są większe od zera */}
        {(minutes > 0 || hours > 0) && (<><NumberFlow value={minutes} suffix='m' /><span> </span></>)}
        {/* Sekundy wyświetlaj zawsze, co zapobiega migotaniu */}
        <NumberFlow value={seconds} suffix='s' />
      </NumberFlowGroup>
    </span>
  );
};

export default AnimatedTimeDisplay;