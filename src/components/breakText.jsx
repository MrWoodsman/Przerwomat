import NumberFlow, { NumberFlowGroup } from '@number-flow/react';
import AnimatedTimeDisplay from './animatedTimeDisplay';

export const BreakText = ({ timeInMillis }) => {

    if (timeInMillis <= 0) {
        return <span className='font-bold text-emerald-500'>Czas na przerwę!</span>;
    }

    return (
        <span className='font-bold text-neutral-600'>
            <AnimatedTimeDisplay timeInSeconds={Math.ceil(timeInMillis / 1000)} />
        </span>
    )
}