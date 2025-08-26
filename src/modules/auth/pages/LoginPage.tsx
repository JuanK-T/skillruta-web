import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { getNestErrorMessage } from '../api/error-handler';
import { toastWelcome } from '@/lib/ui/specialToasts';

export default function LoginPage() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  return (
    <main className="mx-auto max-w-md px-4 py-10">
      <div className="rounded-2xl bg-white shadow p-6">
        <h2 className="text-xl font-bold">Iniciar sesión</h2>
        <form
          className="mt-4 space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            setErr(null);
            setLoading(true);
            try {
              await login(email, pwd);
              nav('/');
              toastWelcome(email.split('@')[0]);
            } catch (error) {
              // Usar directamente el helper que maneja todos los casos
              setErr(getNestErrorMessage(error));
            } finally {
              setLoading(false);
            }
          }}
        >
          <div className="space-y-1">
            <label className="text-sm">Correo</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 disabled:opacity-60"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm">Contraseña</label>
            <input
              type="password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              required
              disabled={loading}
              className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 disabled:opacity-60"
            />
          </div>

          {/* Mostrar error si existe */}
          {err && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-xs text-red-500 mt-1">
                Verifica tu correo y contraseña e intenta nuevamente.
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-primary px-3 py-2 text-primary-foreground hover:bg-primary/90 focus:ring-2 focus:ring-primary/40 disabled:opacity-60"
          >
            {loading ? 'Ingresando…' : 'Entrar'}
          </button>
          <p className="text-sm text-center opacity-70">
            ¿No tienes cuenta?{' '}
            <Link to="/register" className="underline">
              Regístrate
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
