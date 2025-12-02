import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {}
});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    (async () => {
      try {
        const v = await AsyncStorage.getItem('APP_THEME');
        if (v) setTheme(v);
      } catch (e) {
        // ignore
      }
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('APP_THEME', theme).catch(() => {});
  }, [theme]);

  const toggleTheme = () =>
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
