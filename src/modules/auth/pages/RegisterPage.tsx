import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

// Interface para el error esperado
interface AuthError {
  message?: string;
  [key: string]: unknown; // Para otras propiedades que pueda tener el error
}

export default function RegisterPage() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  return (
    <main className="mx-auto max-w-md px-4 py-10">
      <div className="rounded-2xl bg-white shadow p-6">
        <h2 className="text-xl font-bold">Crear cuenta</h2>
        <form
          className="mt-4 space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            setErr(null);
            setLoading(true);
            try {
              await register(name, email, pwd);
              nav('/');
            } catch (error) {
              // Type-safe error handling
              const authError = error as AuthError;
              setErr(authError?.message ?? 'No se pudo registrar');
            } finally {
              setLoading(false);
            }
          }}
        >
          <div className="space-y-1">
            <label className="text-sm">Nombre</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm">Correo</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm">Contraseña</label>
            <input
              type="password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              required
              className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2"
            />
          </div>

          {err && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
              {err}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-primary px-3 py-2 text-primary-foreground hover:bg-primary/90 focus:ring-2 focus:ring-primary/40 disabled:opacity-60"
          >
            {loading ? 'Creando…' : 'Registrarme'}
          </button>
          <p className="text-sm text-center opacity-70">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="underline">
              Inicia sesión
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
