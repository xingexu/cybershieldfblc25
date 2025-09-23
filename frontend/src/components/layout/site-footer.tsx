export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <p>&copy; 2025 CyberShield. All rights reserved.</p>
        <nav className="flex flex-wrap items-center gap-3">
          <a href="/leaderboard/" className="transition hover:text-primary">Leaderboard</a>
          <a href="/terms_conditions" className="transition hover:text-primary">Terms &amp; Conditions</a>
          <a href="/become_moderator" className="transition hover:text-primary">Become a Moderator</a>
        </nav>
      </div>
    </footer>
  );
}
