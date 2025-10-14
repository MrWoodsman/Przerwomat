export const ActionBar = ({ timeToBreak, isBreakTime, isCurrentlyOnBreak, currentBreakDuration, handleBreakToggle }) => {
    // Różne style i tekst przycisku zależne od stanu
    const getButtonProps = () => {
        if (isCurrentlyOnBreak) {
            return {
                text: `Zakończ przerwę (${Math.floor(currentBreakDuration / 1000)})`,
                className: 'bg-orange-500 hover:bg-orange-600'
            }
        }
        if (isBreakTime) {
            return {
                text: `Zrób przerwę`,
                className: 'bg-emerald-500 hover:bg-emerald-600'
            }
        }
        return {
            text: `Zrób przerwę`,
            className: 'bg-neutral-600 hover:bg-neutral-700'
        }
    }

    const buttonProps = getButtonProps()
    const chevronStyle = {
        backgroundImage: `repeating-linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05) 10px, transparent 10px, transparent 20px)`
    }

    return (
        <div className='button-section flex flex-col gap-2 p-2'>
            <p className='text-center text-neutral-400 text-sm'>
                Następna przerwa za <TimeToBreakDisplay timeInMillis={timeToBreak} />
            </p>
            <button
                onClick={handleBreakToggle}
                className={`relative rounded-lg text-xl font-bold w-full p-3 text-white transition-colors overflow-hidden ${buttonProps.className}`}
                style={chevronStyle}
            >
                <span className="relative z-10">{buttonProps.text}</span>
            </button>
        </div>
    )
}