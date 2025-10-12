import { useEffect, useRef, useState } from 'react'
// Utils
import AnimatedTimeDisplay from './utils/formatTime'

function App() {
  // Stan przechowuje czas w MILISEKUNDACH dla większej precyzji
  const [elapsedTime, setElapsedTime] = useState(0);

  // Refy do przechowywania danych bez powodowania ponownych renderów
  const lastTimeRef = useRef(Date.now());
  const intervalIdRef = useRef(null);

  useEffect(() => {
    // Ustawiamy początkowy czas przy montowaniu komponentu
    lastTimeRef.current = Date.now();

    const tick = () => {
      const now = Date.now();
      const delta = now - lastTimeRef.current; // Czas od ostatniego sprawdzenia

      // Próg, po którym zakładamy, że nastąpiła przerwa (np. uśpienie)
      const gapThreshold = 2000; // 2 sekundy

      // Dodajemy czas tylko, jeśli przerwa nie była zbyt długa
      if (delta < gapThreshold) {
        setElapsedTime(prevTime => prevTime + delta);
      }

      // Zawsze aktualizujemy czas ostatniego sprawdzenia
      lastTimeRef.current = now;
    };

    // Ustawiamy interwał na częste sprawdzanie (np. co 100ms)
    intervalIdRef.current = setInterval(tick, 100);

    // Funkcja czyszcząca - wyłącza interwał przy odmontowaniu komponentu
    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, []); // Pusta tablica [] gwarantuje, że efekt uruchomi się tylko raz

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
          <p className='text-center text-neutral-400 text-sm'>Następna przerwa za <span className='font-bold text-neutral-600'>45 min</span></p>
          <button className='bg-neutral-800 text-white rounded-lg text-2xl font-bold w-full p-3 cursor-pointer hover:bg-neutral-700 transition-colors'>
            Zrób przerwę
          </button>
        </div>
      </div>
    </>
  );
}

export default App;