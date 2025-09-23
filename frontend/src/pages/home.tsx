import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import { Button } from '@components/ui/button';
import { ShieldCheck, Users, Zap } from 'lucide-react';

const highlights = [
  {
    title: 'Collaborative intel',
    description: 'Swap detections, share playbooks, and surface emerging TTPs with the community.' ,
    icon: Users
  },
  {
    title: 'Curated expertise',
    description: 'Moderator signals ensure every thread stays actionable and grounded in real-world ops.',
    icon: ShieldCheck
  },
  {
    title: 'Faster response',
    description: 'Route escalations to the right specialists instantly with category-driven workflows.',
    icon: Zap
  }
];

export function HomePage() {
  return (
    <div className="space-y-12">
      <section className="grid gap-6 md:grid-cols-[3fr_2fr]">
        <Card className="glass">
          <CardHeader>
            <CardTitle className="text-4xl font-semibold">
              Stay ahead of live cyber threats
            </CardTitle>
            <CardDescription>
              Connect with analysts, streamline security discussions, and build a resilient knowledge base for your team.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6 md:flex-row md:items-end">
            <Button size="lg">Browse Discussions</Button>
            <Button size="lg" variant="ghost" className="border border-border/60">Become a Moderator</Button>
          </CardContent>
        </Card>
        <Card className="glass border-primary/40 bg-primary/5 text-primary">
          <CardHeader>
            <CardTitle className="text-2xl">Live signal health</CardTitle>
            <CardDescription className="text-primary/70">
              Platform highlights from the past 24 hours.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-baseline justify-between">
              <span className="text-sm uppercase tracking-[0.3em] text-primary/60">New posts</span>
              <span className="text-3xl font-semibold text-primary">18</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-sm uppercase tracking-[0.3em] text-primary/60">Investigations launched</span>
              <span className="text-3xl font-semibold text-primary">7</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-sm uppercase tracking-[0.3em] text-primary/60">Analysts online</span>
              <span className="text-3xl font-semibold text-primary">142</span>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {highlights.map(({ title, description, icon: Icon }) => (
          <Card key={title} className="glass">
            <CardContent className="space-y-4 pt-8">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border/60 bg-secondary/40">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
