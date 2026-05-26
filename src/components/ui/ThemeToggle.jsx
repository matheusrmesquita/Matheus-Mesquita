import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = () => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        /* eslint-disable react-hooks/set-state-in-effect */
        // Ignora a preferência do sistema operacional e força o Light Mode por padrão, a não ser que o usuário tenha salvo 'dark' explicitamente.
        if (localStorage.theme === 'dark') {
            setIsDark(true);
            document.documentElement.classList.add('dark');
        } else {
            setIsDark(false);
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
        }
        /* eslint-enable react-hooks/set-state-in-effect */
    }, []);

    const toggleTheme = () => {
        if (isDark) {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
            setIsDark(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
            setIsDark(true);
        }
    };

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Toggle Dark Mode"
        >
            {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
        </button>
    );
};

export default ThemeToggle;
