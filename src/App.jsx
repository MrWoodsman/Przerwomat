import { useEffect, useState } from 'react'
// Utils
import AnimatedTimeDisplay from './utils/formatTime'

function App() {
  const [elapsedTime, setElapsedTime] = useState(0)

  useEffect(() => {
    const startTime = Date.now()

    const intervalId = setInterval(() => {
      const secondsPassed = (Date.now() - startTime) / 1000;
      setElapsedTime(secondsPassed);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [])

  return (
    <>
      <div className='page h-[100%] p-2 flex flex-col'>
        <div className='main-timer flex flex-col items-center justify-center p-8 border-b-[1px] border-neutral-100 w-full'>
          <h1 className='text-3xl font-bold text-center'>
          <AnimatedTimeDisplay timeInSeconds={elapsedTime} />
          </h1>
          <p className='text-base text-neutral-500 text-center'>Czas przed komputerem</p>
        </div>
        <div className='main-body h-full'>
          Jakieś informacje
        </div>
        <div className='button-section flex flex-col gap-1'>
          <p className='text-center text-neutral-400 text-sm'>Następna przerwa za <span className='font-bold'>45 min</span></p>
          <button className='bg-neutral-300 rounded-lg text-2xl font-bold w-full p-3 cursor-pointer'>Przerwa</button>
        </div>
      </div>
    </>
  )
}

export default App
