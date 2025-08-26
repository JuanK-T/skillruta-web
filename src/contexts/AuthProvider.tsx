import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AuthContext } from './AuthContext';
import type { User } from '@/types/auth';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Cargar de localStorage (demo). En producción, usa cookies httpOnly + refresh token.
  useEffect(() => {
    const raw = localStorage.getItem('sr:user');
    if (raw) setUser(JSON.parse(raw));
  }, []);

  useEffect(() => {
    if (!user) localStorage.removeItem('sr:user');
    else localStorage.setItem('sr:user', JSON.stringify(user));
  }, [user]);

  const login = useCallback(async (email: string, password: string) => {
    // TODO: integrar API real (POST /auth/login)
    console.log('Password:', password);
    setUser({ id: crypto.randomUUID(), email, role: 'USER', name: email.split('@')[0] });
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    // TODO: integrar API real (POST /auth/register)
    console.log('Password:', password);
    setUser({ id: crypto.randomUUID(), email, role: 'USER', name });
  }, []);

  const logout = useCallback(() => setUser(null), []);

  const value = useMemo(() => ({ user, login, register, logout }), [user, login, register, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
