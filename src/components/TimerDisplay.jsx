import AnimatedTimeDisplay from "./animatedTimeDisplay";

export const TimerDisplay = ({ totalSessionTime, elapsedTime }) => {
    return (
        <div className='main-timer flex flex-col items-center justify-center p-8 border-b-[1px] border-neutral-200 w-full'>
            <p className='text-base text-neutral-500 text-center mt-2'>Całkowity czas sesji</p>
            <h1 className='text-3xl font-bold text-center font-mono' title="Całkowity czas sesji (praca + przerwy)">
                <AnimatedTimeDisplay timeInSeconds={Math.floor(totalSessionTime / 1000)} />
            </h1>
            <p className='text-sm text-neutral-400 text-center mt-1' title="Aktywny czas pracy">
                Czas pracy: <AnimatedTimeDisplay timeInSeconds={Math.floor(elapsedTime / 1000)} className="font-semibold text-neutral-500" />
            </p>
        </div>
    );
};