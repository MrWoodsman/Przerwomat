const SETTINGS_KEY = 'przerwomat-settings'

const defaultSettings = {
    workSessionDuration: 45 * 60 * 1000  // 45 minut
}

/**
 * Wczytuje usttawienai z localStorage
 * Jeśli nie ma zapisanych ustawień, zwraca domyślne
 * @returns {object} Obiekt z ustawieniami
 */
export const loadSettings = () => {
    try {
        const savedSettings = localStorage.getItem(SETTINGS_KEY)
        if (savedSettings) {
            // Łączenie zapisanych ustawień z domyślnymi aby zapenić
            // że wszystkie klucze są obecne, nawet po aktualziacji apliakcji
            return { ...defaultSettings, ...JSON.parse(savedSettings) }
        }
    } catch (e) {
        console.error('Błąd podczas wczytywania ustawień:', e)
    }
    // Zwraca domyślne jeśli nic nie zostało zapisane lub wystąpił błąd
    return defaultSettings
}

/**
 * Zapisuje obiekt ustawień w localStorage
 * @parm {object} settings - Obiekt ustawien do zapisania
 */
export const saveSettings = (settings) => {
    try {
        const settingsToSave = JSON.stringify(settings);
        localStorage.setItem(SETTINGS_KEY, settingsToSave);
    } catch (e) {
        console.error("Błąd podczas zapisywania ustawień:", e);
    }
}