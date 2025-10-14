// import { useEffect, useRef, useState } from 'react'
// UTILS
import AnimatedTimeDisplay from './components/animatedTimeDisplay'
import { BreakText } from './components/breakText';
// HOOKS
import { useTimer } from './hooks/useTimer';
import { Statistics } from './components/statistics';
import { ActionBar } from './components/actionBar';
import { TimerDisplay } from './components/TimerDisplay';

// Klucze do zapisu danych w localStorage
const SESSION_STORAGE_KEY = 'przerwomat-session';
// Czas pracy do przerwy (ustawiony na 1 minutę dla łatwiejszego testowania)
const WORK_SESSION_DURATION = 1 * 60 * 1000;

const BREAKS_SAVE_KEY = 'przerwomat-braks'

function App() {
  const {
    elapsedTime,
    totalSessionTime,
    timeToBreak,
    isBreakTime,
    isCurrentlyOnBreak,
    currentBreakDuration,
    handleBreakToggle,
  } = useTimer();

  return (
    <div className='page h-screen bg-white p-0 flex flex-col'>
      <TimerDisplay
        totalSessionTime={totalSessionTime}
        // totalSessionTime={0}
        elapsedTime={elapsedTime}
      />
      <Statistics />
      <ActionBar
        timeToBreak={timeToBreak}
        isBreakTime={isBreakTime}
        isCurrentlyOnBreak={isCurrentlyOnBreak}
        currentBreakDuration={currentBreakDuration}
        handleBreakToggle={handleBreakToggle}
      />
    </div>
  )
}

export default App;