import { useEffect, useRef, useState } from "react";
// IMPORT USTAWIEŃ
import { loadSettings } from "../utils/settingsManager";

const settings = loadSettings()

export const useTimer = () => {
    const SESSION_STORAGE_KEY = 'przerwomat-session';
    const BREAKS_SAVE_KEY = 'przerwomat-breaks-data';
    const WORK_SESSION_DURATION = settings.WORK_SESSION_DURATION;

    const [elapsedTime, setElapsedTime] = useState(() => {
        const savedSession = localStorage.getItem(SESSION_STORAGE_KEY);
        const today = new Date().toISOString().split('T')[0];
        if (savedSession) {
            try {
                const { time, date } = JSON.parse(savedSession);
                if (date === today) return time;
            } catch (e) { console.error("Błąd parsowania danych sesji:", e); }
        }
        return 0;
    });

    const [breaksDataSave, setBreaksDataSave] = useState(() => {
        const savedData = localStorage.getItem(BREAKS_SAVE_KEY);
        if (savedData) {
            try {
                const parsedData = JSON.parse(savedData);
                return Array.isArray(parsedData) ? parsedData : [];
            } catch (e) { console.error("Błąd parsowania danych przerw:", e); }
        }
        return [];
    });

    const [timeToBreak, setTimeToBreak] = useState(WORK_SESSION_DURATION - (elapsedTime % WORK_SESSION_DURATION));
    const [isBreakTime, setIsBreakTime] = useState(timeToBreak <= 0);
    const [isCurrentlyOnBreak, setIsCurrentlyOnBreak] = useState(false);
    const [currentBreakDuration, setCurrentBreakDuration] = useState(0);

    const breakStartRef = useRef(null);
    const lastTimeRef = useRef(Date.now());

    useEffect(() => {
        lastTimeRef.current = Date.now();
        const tick = () => {
            const now = Date.now();
            const delta = now - lastTimeRef.current;
            if (delta < 2000) {
                if (isCurrentlyOnBreak) {
                    setCurrentBreakDuration(now - breakStartRef.current);
                } else {
                    setElapsedTime(prev => prev + delta);
                    setTimeToBreak(prev => prev - delta);
                }
            }
            lastTimeRef.current = now;
        };
        const intervalId = setInterval(tick, 100);
        return () => clearInterval(intervalId);
    }, [isCurrentlyOnBreak]);

    useEffect(() => {
        if (!isCurrentlyOnBreak) {
            const today = new Date().toISOString().split('T')[0];
            const sessionData = { time: elapsedTime, date: today };
            localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionData));
        }
        if (timeToBreak <= 0 && !isCurrentlyOnBreak) {
            setIsBreakTime(true);
        }
    }, [elapsedTime, timeToBreak, isCurrentlyOnBreak]);

    const handleBreakToggle = () => {
        if (isCurrentlyOnBreak) {
            const endTime = Date.now();
            const newBreak = { startTime: breakStartRef.current, endTime, duration: endTime - breakStartRef.current };
            const updatedBreaks = [...breaksDataSave, newBreak];
            setBreaksDataSave(updatedBreaks);
            localStorage.setItem(BREAKS_SAVE_KEY, JSON.stringify(updatedBreaks));
            setIsCurrentlyOnBreak(false);
            setIsBreakTime(false);
            setTimeToBreak(WORK_SESSION_DURATION);
            setCurrentBreakDuration(0);
            breakStartRef.current = null;
        } else {
            setIsCurrentlyOnBreak(true);
            breakStartRef.current = Date.now();
        }
    };

    const totalBreaksDuration = breaksDataSave.reduce((acc, br) => acc + br.duration, 0);
    const totalSessionTime = elapsedTime + totalBreaksDuration + currentBreakDuration;

    return { elapsedTime, totalSessionTime, timeToBreak, isBreakTime, isCurrentlyOnBreak, currentBreakDuration, handleBreakToggle };
};