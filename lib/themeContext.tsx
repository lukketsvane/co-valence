import { createContext, useContext, useEffect, ReactNode } from 'react';

type Theme = 'light';

interface ThemeContextType {
  theme: Theme;
}

const ThemeContext = createContext<ThemeContextType>({ theme: 'light' });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme: Theme = 'light'; // Fixed theme to 'light'

  useEffect(() => {
    // Set the attribute on the document element to 'light', always.
    document.documentElement.setAttribute('data-theme', 'light');
  }, []); // Empty dependency array ensures this only runs once on mount

  // There is no need for a toggleTheme function or to store the theme in localStorage
  // since the theme is always 'light'.

  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
