import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@components/ui/card';
import { Button } from '@components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@components/ui/form';
import { Input } from '@components/ui/input';
import { Textarea } from '@components/ui/textarea';
import { Checkbox } from '@components/ui/checkbox';
import { postModeratorApplication } from '@/lib/api';
import { useState } from 'react';
import { Badge } from '@components/ui/badge';

const schema = z
  .object({
    username: z.string().min(3, 'Username must be at least 3 characters'),
    email: z.string().email('Enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    password_confirm: z.string().min(8, 'Confirm your password'),
    certifications: z.string().min(5, 'Tell us about your certifications'),
    bio: z.string().min(100, 'Bio should be at least 100 characters'),
    agree_terms: z.boolean().refine(val => val, 'You must agree to continue'),
    captcha: z.string().min(1, 'Captcha response required')
  })
  .refine(values => values.password === values.password_confirm, {
    message: 'Passwords must match',
    path: ['password_confirm']
  });

type ModeratorFormValues = z.infer<typeof schema>;
const fieldNames: Array<keyof ModeratorFormValues> = [
  'username',
  'email',
  'password',
  'password_confirm',
  'certifications',
  'bio',
  'agree_terms',
  'captcha'
];

function normaliseMessage(value: unknown): string {
  if (!value) return '';
  if (Array.isArray(value)) {
    return value.map(v => normaliseMessage(v)).filter(Boolean).join(' ');
  }
  return typeof value === 'string' ? value : String(value);
}

export function ModeratorApplicationPage() {
  const [submitting, setSubmitting] = useState(false);
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const form = useForm<ModeratorFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      password_confirm: '',
      certifications: '',
      bio: '',
      agree_terms: false,
      captcha: ''
    }
  });

  const onSubmit = async (values: ModeratorFormValues) => {
    setServerMessage(null);
    form.clearErrors();
    setSubmitting(true);
    try {
      const payload = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (typeof value === 'boolean') {
          payload.append(key, value ? 'on' : '');
        } else {
          payload.append(key, value);
        }
      });

      await postModeratorApplication(payload);
      form.reset();
      setServerMessage('Application submitted! Watch your inbox for next steps.');
    } catch (error) {
      let fallbackMessage = 'Something went wrong submitting your form.';
      if (error instanceof Error) {
        try {
          const data = JSON.parse(error.message);
          if (data?.errors && typeof data.errors === 'object') {
            for (const [key, value] of Object.entries(data.errors)) {
              const message = normaliseMessage(value);
              if (fieldNames.includes(key as keyof ModeratorFormValues)) {
                form.setError(key as keyof ModeratorFormValues, {
                  type: 'server',
                  message
                });
              } else if (key === '__all__') {
                fallbackMessage = message;
              }
            }
          }
          if (data?.message) {
            fallbackMessage = data.message;
          }
        } catch {
          fallbackMessage = error.message || fallbackMessage;
        }
      }
      setServerMessage(fallbackMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-12">
      <Card className="glass">
        <CardHeader className="space-y-3">
          <Badge variant="outline" className="text-xs">
            Moderator Application
          </Badge>
          <CardTitle>Help steward CyberShield</CardTitle>
          <CardDescription>
            Moderators keep the signal sharp. Share your background so the crew can match you to the right threads.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-10">
          <div className="grid gap-3 rounded-2xl border border-border/40 bg-secondary/40 p-6">
            <h3 className="text-sm uppercase tracking-[0.35em] text-muted-foreground">Role expectations</h3>
            <ul className="grid gap-3 text-sm text-muted-foreground md:grid-cols-2">
              <li className="flex items-start gap-3 rounded-2xl border border-border/30 bg-background/40 p-4">
                <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/15 text-primary">01</span>
                Review and green-light posts within your expertise lanes.
              </li>
              <li className="flex items-start gap-3 rounded-2xl border border-border/30 bg-background/40 p-4">
                <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/15 text-primary">02</span>
                Flag misleading or risky content before it spreads.
              </li>
              <li className="flex items-start gap-3 rounded-2xl border border-border/30 bg-background/40 p-4">
                <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/15 text-primary">03</span>
                Jump into threads where your skills can unblock analysts.
              </li>
              <li className="flex items-start gap-3 rounded-2xl border border-border/30 bg-background/40 p-4">
                <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/15 text-primary">04</span>
                Mentor rising practitioners and help shape the intel base.
              </li>
            </ul>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
              <section className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Account details</h3>
                  <p className="text-sm text-muted-foreground/80">We will use these credentials for your moderator access.</p>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="cyber.sentinel" {...field} />
                        </FormControl>
                        <FormMessage>{form.formState.errors.username?.message}</FormMessage>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="you@company.com" {...field} />
                        </FormControl>
                        <FormMessage>{form.formState.errors.email?.message}</FormMessage>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormDescription>Use at least 8 characters with a mix of numbers and letters.</FormDescription>
                        <FormMessage>{form.formState.errors.password?.message}</FormMessage>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password_confirm"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Repeat password" {...field} />
                        </FormControl>
                        <FormMessage>{form.formState.errors.password_confirm?.message}</FormMessage>
                      </FormItem>
                    )}
                  />
                </div>
              </section>

              <section className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Moderator profile</h3>
                  <p className="text-sm text-muted-foreground/80">Share the experience that makes your input invaluable.</p>
                </div>
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="certifications"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Relevant certifications</FormLabel>
                        <FormControl>
                          <Textarea rows={4} placeholder="CISSP, OSCP, GCIA, CEH, Security+, ..." {...field} />
                        </FormControl>
                        <FormDescription>List certifications separated by commas. Include industry or vendor credentials.</FormDescription>
                        <FormMessage>{form.formState.errors.certifications?.message}</FormMessage>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Professional bio</FormLabel>
                        <FormControl>
                          <Textarea
                            rows={6}
                            placeholder="Share your focus areas, notable incidents, or mentoring experience."
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>Minimum 100 characters.</FormDescription>
                        <FormMessage>{form.formState.errors.bio?.message}</FormMessage>
                      </FormItem>
                    )}
                  />
                </div>
              </section>

              <section className="space-y-6">
                <FormField
                  control={form.control}
                  name="agree_terms"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-3 rounded-2xl border border-border/40 bg-secondary/40 p-6">
                      <FormLabel className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                        Commitments
                      </FormLabel>
                      <div className="flex items-start gap-4">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={(checked: boolean | 'indeterminate') => field.onChange(checked === true)} />
                        </FormControl>
                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">
                            I agree to the <a href="/terms_conditions" className="text-primary underline-offset-2 hover:underline">Terms &amp; Conditions</a> and will uphold the moderator guidelines.
                          </p>
                          <FormMessage>{form.formState.errors.agree_terms?.message}</FormMessage>
                        </div>
                      </div>
                    </FormItem>
                  )}
                />
              </section>

              <section className="space-y-4">
                <FormField
                  control={form.control}
                  name="captcha"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Verification</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter captcha response" {...field} />
                      </FormControl>
                      <FormMessage>{form.formState.errors.captcha?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </section>

              <CardFooter className="flex flex-col gap-4 border-none px-0 pb-0 pt-4 md:flex-row md:items-center md:justify-between">
                <div className="text-sm text-muted-foreground">Applications are reviewed within 72 hours.</div>
                <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row">
                  <Button type="submit" size="lg" disabled={submitting}>
                    {submitting ? 'Submitting…' : 'Submit application'}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="lg"
                    className="border border-border/60"
                    onClick={() => {
                      form.reset();
                      setServerMessage(null);
                    }}
                  >
                    Reset form
                  </Button>
                </div>
              </CardFooter>
            </form>
          </Form>

          {serverMessage && (
            <div className="rounded-2xl border border-primary/40 bg-primary/10 px-6 py-4 text-sm text-primary">
              {serverMessage}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
