import NumberFlow from '@number-flow/react';

export const BreakText = ({ timeInMillis }) => {

    if (timeInMillis <= 0) {
        return <span className='font-bold text-emerald-500'>Czas na przerwę!</span>;
    }

    const totalSeconds = Math.ceil(timeInMillis / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60;

    return (
        <span className='font-bold text-neutral-600'>
            <NumberFlow value={minutes} suffix='m' />{' '}
            <NumberFlow value={seconds} suffix='s' />
        </span>
    )
}