// lib/hooks/useDarkMode.ts
import { useState, useEffect } from 'react';

export const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('theme') === 'dark';
    setDarkMode(savedMode);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
    setDarkMode(newMode);
  };

  return [darkMode, toggleDarkMode] as const;
};
