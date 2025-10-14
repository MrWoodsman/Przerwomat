// HOOKS
import { useTimer } from './hooks/useTimer';
// COMPONENTS
import { Statistics } from './components/statistics';
import { ActionBar } from './components/actionBar';
import { TimerDisplay } from './components/TimerDisplay';

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