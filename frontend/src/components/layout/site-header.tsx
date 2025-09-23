import * as React from 'react';
import { Button } from '@components/ui/button';
import { ThemeToggle } from './theme-toggle';
import { cn } from '@/lib/utils';

const links = [
  { href: '/', label: 'Forum' },
  { href: '/leaderboard/', label: 'Leaderboard' },
  { href: '/become_moderator', label: 'Moderators' }
];

const authLinks = [
  { href: '/login', label: 'Login', variant: 'ghost' as const },
  { href: '/user_signup', label: 'Sign Up', variant: 'default' as const }
];

export function SiteHeader() {
  const [activePath, setActivePath] = React.useState('/become_moderator');

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setActivePath(window.location.pathname);
    }
  }, []);

  const normalize = (path: string) => path.replace(/\/+$/, '') || '/';
  const currentPath = normalize(activePath);

  return (
    <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between">
        <div className="flex w-full items-center justify-between gap-6">
          <a
            href="/"
            className="text-lg font-semibold tracking-[0.4em] text-muted-foreground transition hover:text-primary"
          >
            CYBERSHIELD
          </a>
          <nav className="hidden items-center gap-2 md:flex">
            {links.map(link => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  'rounded-full border border-transparent px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground transition hover:border-border/60 hover:text-foreground',
                  normalize(link.href) === currentPath && 'border-border/60 text-foreground'
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
        <nav className="flex items-center gap-3 md:hidden">
          {links.map(link => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                'text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground transition hover:text-foreground',
                normalize(link.href) === currentPath && 'text-foreground'
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {authLinks.map(link => (
            <Button
              key={link.href}
              variant={link.variant}
              asChild
            >
              <a href={link.href}>{link.label}</a>
            </Button>
          ))}
        </div>
      </div>
    </header>
  );
}
