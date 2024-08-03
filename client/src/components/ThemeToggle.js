'use client';

import { useTheme } from "../context/ThemeContext";
import { SunIcon, MoonIcon } from "@heroicons/react/outline";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 mt-4 text-sm bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center"
    >
      {theme === 'light' ? (
        <MoonIcon className="w-6 h-6 text-gray-800 dark:text-gray-200" />
      ) : (
        <SunIcon className="w-6 h-6 text-gray-800 dark:text-gray-200" />
      )}
    </button>
  );
}
