import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <BookOpen className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">SkillRuta</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `font-medium transition-colors hover:text-primary ${
                isActive ? 'text-primary' : 'text-muted-foreground'
              }`
            }
          >
            Cursos
          </NavLink>
          <span className="text-muted-foreground cursor-not-allowed">Insignias</span>
          <span className="text-muted-foreground cursor-not-allowed">Mi progreso</span>
        </nav>

        <div className="flex items-center gap-2">
          {!user ? (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login">Iniciar sesión</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/register">Crear cuenta</Link>
              </Button>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">
                Hola, <b className="text-foreground">{user.name ?? user.email}</b>
              </span>
              <Button variant="outline" size="sm" onClick={logout}>
                Salir
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
