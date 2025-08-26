import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export default function RegisterPage() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <main className="mx-auto max-w-md px-4 py-10">
      <div className="rounded-2xl bg-white shadow p-6">
        <h2 className="text-xl font-bold">Crear cuenta</h2>
        <form
          className="mt-4 space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            await register(name, email, pwd);
            setLoading(false);
            nav('/');
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
          <button type="submit" className="w-full rounded-xl bg-secondary px-3 py-2 text-white">
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
