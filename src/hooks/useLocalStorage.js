import { useEffect, useState } from 'react';

// useState that persists to localStorage. Fails safe if storage is
// unavailable (private mode, quota) or contains corrupted JSON.
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage unavailable – keep working in memory */
    }
  }, [key, value]);

  return [value, setValue];
}
