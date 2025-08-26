import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export default function LoginPage() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <main className="mx-auto max-w-md px-4 py-10">
      <div className="rounded-2xl bg-white shadow p-6">
        <h2 className="text-xl font-bold">Iniciar sesión</h2>
        <form
          className="mt-4 space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            await login(email, pwd);
            setLoading(false);
            nav('/');
          }}
        >
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
          <button type="submit" className="w-full rounded-xl bg-primary px-3 py-2 text-primary-foreground hover:bg-primary/90 focus:ring-2 focus:ring-primary/40 disabled:opacity-60">
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
