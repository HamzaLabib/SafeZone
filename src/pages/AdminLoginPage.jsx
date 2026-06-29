import { LockKeyhole } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { InputField } from '../components/ui/FormField';

export function AdminLoginPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isChecking, setIsChecking] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function checkSession() {
      try {
        const response = await fetch('/api/admin/login');
        const result = await response.json();

        if (isMounted && result.authenticated) {
          navigate('/admin/dashboard', { replace: true });
        }
      } catch {
        // Stay on the login page if the session check cannot complete.
      } finally {
        if (isMounted) {
          setIsChecking(false);
        }
      }
    }

    checkSession();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    if (!password.trim()) {
      setError('Enter the admin password.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });
      const result = await response.json();

      if (!response.ok || !result.ok) {
        setError(result.error || 'Login failed.');
        return;
      }

      navigate('/admin/dashboard', { replace: true });
    } catch {
      setError('Could not reach the admin login service.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Seo
        title="Admin Login"
        description="Protected Safe Zone Security Academy administrator login."
        noindex={true}
      />
      <main className="mx-auto max-w-xl px-4 py-12 md:px-8">
        <Card className="overflow-hidden">
          <section className="bg-academyNavy p-8 text-white">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-200">
              <LockKeyhole className="h-4 w-4" aria-hidden="true" />
              Admin access
            </p>
            <h1 className="mt-4 text-3xl font-extrabold">Safe Zone Admin</h1>
            <p className="mt-3 leading-7 text-white/75">
              Sign in to review registration leads, item requests, and contact messages during preview operations.
            </p>
          </section>
          <form className="grid gap-4 p-6" onSubmit={handleSubmit} noValidate>
            <InputField
              id="admin-password"
              label="Admin password"
              type="password"
              autoComplete="current-password"
              value={password}
              error={error}
              onChange={(event) => {
                setPassword(event.target.value);
                setError('');
              }}
              disabled={isChecking}
            />
            <Button type="submit" disabled={isChecking || isSubmitting}>
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </Card>
      </main>
    </>
  );
}
