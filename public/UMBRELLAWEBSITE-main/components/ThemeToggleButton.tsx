import React from 'react';
import { useTheme } from './ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';

const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full text-[var(--text-primary)] hover:bg-white/10 transition-colors duration-300"
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        <FiSun
          className={`absolute transition-all duration-300 ease-in-out ${
            theme === 'light' ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}
        />
        <FiMoon
          className={`absolute transition-all duration-300 ease-in-out ${
            theme === 'dark' ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}
        />
      </div>
    </button>
  );
};

export default ThemeToggleButton;
