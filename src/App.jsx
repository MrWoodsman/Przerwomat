import { useEffect, useRef, useState } from 'react'
// Utils
import AnimatedTimeDisplay from './components/formatTime'
import { BreakText } from './components/breakText';

// Klucze do zapisu danych w localStorage
const SESSION_STORAGE_KEY = 'przerwomat-session';
// Czas pracy do przerwy (ustawiony na 1 minutę dla łatwiejszego testowania)
const WORK_SESSION_DURATION = 1 * 60 * 1000;

const BREAKS_SAVE_KEY = 'przerwomat-braks'

function App() {
  // Zmienna czasu który minał - Pobieranie jeśli jest coś zapisane z tego samego dnia
  const [elapsedTime, setElapsedTime] = useState(() => {
    const savedSession = localStorage.getItem(SESSION_STORAGE_KEY);
    const today = new Date().toISOString().split('T')[0]

    if (savedSession) {
      try {
        const { time, date } = JSON.parse(savedSession)
        if (date === today) {
          return time
        }
      } catch (e) {
        console.error("Failed to parse session data:", e)
        return 0
      }
    }
    return 0
  });

  // Zmienne dla przerwy
  const [breakNumber, setBreakNumber] = useState(9)
  const [breaksDataSave, setBreaksDataSave] = useState(() => {
    const savedData = localStorage.getItem(BREAKS_SAVE_KEY);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        // Zwróć sparsowane dane tylko jeśli są tablicą, w przeciwnym razie pustą tablicę
        return Array.isArray(parsedData) ? parsedData : [];
      } catch (e) {
        console.error("Failed to parse breaks data:", e);
        return [];
      }
    }
    // Jeśli nic nie ma w localStorage, zwróć pustą tablicę
    return [];
  });

  const [timeToBreak, setTimeToBreak] = useState((WORK_SESSION_DURATION * breakNumber) - (elapsedTime))
  const [isBreakTime, setIsBreakTime] = useState(false)

  const lastTimeRef = useRef(Date.now())
  const intervalIdRef = useRef(null)

  // Efekt odpowiedzialny za logike timera
  useEffect(() => {
    lastTimeRef.current = Date.now()
    const tick = () => {
      const now = Date.now()
      const delta = now - lastTimeRef.current
      const gapThreshold = 2000
      if (delta < gapThreshold) {
        setElapsedTime(prev => prev + delta);
        setTimeToBreak(prev => prev - delta);
      }
      lastTimeRef.current = now
    }
    const intervalId = setInterval(tick, 100)
    intervalIdRef.current = intervalId
    return () => clearInterval(intervalIdRef.current)
  }, [])

  // Efekt do zapisu w localStorage i sprawdzania czasu przerwy
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]
    const sessionData = {
      time: elapsedTime,
      date: today
    }
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionData))

    if (timeToBreak <= 0) {
      setIsBreakTime(true)
    }
  }, [elapsedTime, timeToBreak])

  const breakTimeStamp = () => {
    console.log('Break BUTTON');

    const newBreak = {
      startTime: Date.now()
    }

    const updatedBreaks = [...breaksDataSave, newBreak]
    setBreaksDataSave(updatedBreaks)
    localStorage.setItem(BREAKS_SAVE_KEY, JSON.stringify(updatedBreaks))

    // Resetowanie timera do następnej przerwy
    setTimeToBreak(WORK_SESSION_DURATION)
    setIsBreakTime(false)
  }

  return (
    <>
      <div className='page h-screen bg-white p-2 flex flex-col'>
        <div className='main-timer flex flex-col items-center justify-center p-8 border-b-[1px] border-neutral-200 w-full'>
          <h1 className='text-3xl font-bold text-center'>
            {/* Konwertujemy milisekundy na sekundy przed wyświetleniem */}
            <AnimatedTimeDisplay timeInSeconds={Math.floor(elapsedTime / 1000)} />
          </h1>
          <p className='text-base text-neutral-500 text-center mt-2'>Czas przed komputerem</p>
        </div>
        <div className='main-body h-full flex items-center justify-center text-neutral-400'>
          <p>Tutaj pojawią się statystyki i zadania.</p>
        </div>
        <div className='button-section flex flex-col gap-2 p-2'>
          <p className='text-center text-neutral-400 text-sm'>
            Następna przerwa za <BreakText timeInMillis={timeToBreak} />
          </p>
          <button className={`rounded-lg text-2xl font-bold w-full p-3 transition-colors
            ${isBreakTime
              ? 'bg-emerald-500 text-white cursor-pointer hover:bg-emerald-600'
              : 'bg-neutral-300 text-stone-500 cursor-not-allowed'
            }`}
            onClick={() => breakTimeStamp()}>
            Zrób przerwę
          </button>
        </div>
      </div >
    </>
  );
}

export default App;