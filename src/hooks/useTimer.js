import { useEffect, useRef, useState } from "react";

export const useTimer = (workSessionDuration) => {
    const [elapsedTime, setElapsedTime] = useState(() => {
        const s = localStorage.getItem('przerwomat-session');
        if (!s) return 0;
        try { const { time, date } = JSON.parse(s); return date === new Date().toISOString().split('T')[0] ? time : 0; } catch { return 0; }
    });
    const [breaksData, setBreaksData] = useState(() => {
        const b = localStorage.getItem('przerwomat-breaks-data');
        if (!b) return [];
        try { const p = JSON.parse(b); return Array.isArray(p) ? p : []; } catch { return []; }
    });

    const [timeToBreak, setTimeToBreak] = useState(workSessionDuration);
    const [isBreakTime, setIsBreakTime] = useState(false); // Jawny stan informujący o czasie na przerwę
    const [isCurrentlyOnBreak, setIsCurrentlyOnBreak] = useState(false);
    const [currentBreakDuration, setCurrentBreakDuration] = useState(0);
    const breakStartRef = useRef(null);
    const lastTimeRef = useRef(Date.now());

    useEffect(() => {
        const timerId = setInterval(() => {
            const now = Date.now();
            const delta = now - lastTimeRef.current;
            if (delta < 2000) {
                if (isCurrentlyOnBreak) {
                    setCurrentBreakDuration(now - breakStartRef.current);
                } else {
                    setElapsedTime(prev => prev + delta);
                }
            }
            lastTimeRef.current = now;
        }, 100);
        return () => clearInterval(timerId);
    }, [isCurrentlyOnBreak]);

    // Poprawiona logika obliczania czasu do przerwy
    useEffect(() => {
        const lastBreak = breaksData.length > 0 ? breaksData[breaksData.length - 1] : null;
        const elapsedTimeAtLastBreakEnd = lastBreak?.elapsedTimeOnEnd ?? 0;

        const workTimeInCurrentSession = elapsedTime - elapsedTimeAtLastBreakEnd;

        // 1. Sprawdź, czy nadszedł czas na przerwę na podstawie aktualnych danych
        const shouldBeBreakTime = !isCurrentlyOnBreak && workTimeInCurrentSession >= workSessionDuration;

        // 2. Ustaw stan `isBreakTime`
        setIsBreakTime(shouldBeBreakTime);

        // 3. Oblicz czas do wyświetlenia w UI
        if (shouldBeBreakTime) {
            setTimeToBreak(0);
        } else {
            const timeToNextBreak = workSessionDuration - workTimeInCurrentSession;
            setTimeToBreak(timeToNextBreak);
        }
    }, [workSessionDuration, elapsedTime, breaksData, isCurrentlyOnBreak]);

    useEffect(() => {
        if (!isCurrentlyOnBreak) {
            localStorage.setItem('przerwomat-session', JSON.stringify({ time: elapsedTime, date: new Date().toISOString().split('T')[0] }));
        }
    }, [elapsedTime, isCurrentlyOnBreak]);

    const handleBreakToggle = () => {
        if (isCurrentlyOnBreak) { // Kończenie przerwy
            const endTime = Date.now();
            const newBreak = {
                startTime: breakStartRef.current,
                endTime,
                duration: endTime - breakStartRef.current,
                elapsedTimeOnEnd: elapsedTime // Zapisujemy czas pracy na koniec przerwy
            };
            const updatedBreaks = [...breaksData, newBreak];
            setBreaksData(updatedBreaks);
            localStorage.setItem('przerwomat-breaks-data', JSON.stringify(updatedBreaks));

            // KLUCZOWE: Resetujemy flagę i liczniki
            setIsBreakTime(false);
            setTimeToBreak(workSessionDuration);
            setCurrentBreakDuration(0);
            setIsCurrentlyOnBreak(false);
        } else { // Zaczynanie przerwy
            breakStartRef.current = Date.now();
            setIsCurrentlyOnBreak(true);
        }
    };

    const totalBreaksDuration = breaksData.reduce((acc, br) => acc + br.duration, 0);
    const totalSessionTime = elapsedTime + totalBreaksDuration + currentBreakDuration;
    return { elapsedTime, totalSessionTime, timeToBreak, isBreakTime, isCurrentlyOnBreak, currentBreakDuration, handleBreakToggle };
};