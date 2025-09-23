import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@components/ui/button';

export function ThemeToggle() {
  const [theme, setTheme] = React.useState<'dark' | 'light'>(() => {
    if (typeof window === 'undefined') return 'dark';
    const stored = window.localStorage.getItem('cs-theme');
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  });

  React.useEffect(() => {
    const root = window.document.documentElement;
    root.classList.add('dark');
    if (theme === 'light') {
      root.classList.add('light-theme');
    } else {
      root.classList.remove('light-theme');
    }
    window.localStorage.setItem('cs-theme', theme);
  }, [theme]);

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative h-10 w-10 border border-border/60 bg-background/60"
      onClick={() => setTheme(prev => (prev === 'light' ? 'dark' : 'light'))}
      aria-label="Toggle theme"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
