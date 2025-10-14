// HOOKS
import { useTimer } from './hooks/useTimer';
// UTILS
import { loadSettings, saveSettings } from './utils/settingsManager';
// COMPONENTS
import { Statistics } from './components/statistics';
import { ActionBar } from './components/actionBar';
import { TimerDisplay } from './components/TimerDisplay';
import { useState } from 'react';

function App() {
  const [settings, setSettings] = useState(loadSettings())

  const {
    elapsedTime,
    totalSessionTime,
    timeToBreak,
    isBreakTime,
    isCurrentlyOnBreak,
    currentBreakDuration,
    handleBreakToggle,
  } = useTimer(settings.workSessionDuration);

  const handleSettingsChange = (event) => {
    const minutes = Number(event.target.value);
    if (minutes > 0) {
      const newSettings = { ...settings, workSessionDuration: minutes * 60 * 1000 };
      setSettings(newSettings);
      saveSettings(newSettings);
    }
  };

  return (
    <div className='page h-screen bg-white p-0 flex flex-col'>
      {/* <input
        id="work-duration"
        type="number"
        value={Math.round(settings.workSessionDuration / 60000)}
        onChange={handleSettingsChange}
        className="w-full p-2 border border-neutral-300 rounded-md"
        min="1"
      /> */}
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