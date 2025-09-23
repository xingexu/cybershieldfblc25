import { SiteHeader } from './site-header';
import { SiteFooter } from './site-footer';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-[radial-gradient(120%_120%_at_20%_20%,rgba(59,130,246,0.15),transparent_60%),radial-gradient(95%_110%_at_82%_5%,rgba(124,58,237,0.18),transparent_65%),radial-gradient(70%_90%_at_30%_85%,rgba(56,189,248,0.12),transparent_70%),linear-gradient(160deg,#01030a_0%,#0b1631_55%,#01010a_100%)]">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto w-full max-w-5xl px-6 py-12">
          {children}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
