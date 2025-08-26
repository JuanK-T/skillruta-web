import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AuthContext } from './AuthContext';
import type { User } from '@/types/auth';
import { apiLogin, apiLogout, apiMe, apiRegister } from '@/modules/auth/api/authApi';
import { http } from '@/lib/api/client';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [bootstrapped, setBootstrapped] = useState(false);

  // Calcula isAuthenticated basado en la existencia del usuario
  const isAuthenticated = !!user;

  // Bootstrap: intenta /auth/me; si 401 → /auth/refresh → /auth/me
  useEffect(() => {
    (async () => {
      try {
        const me = await apiMe();
        setUser({ id: me.id, email: me.email, role: me.role, name: me.email.split('@')[0] });
      } catch {
        try {
          await http('/auth/refresh', { method: 'POST' });
          const me2 = await apiMe();
          setUser({ id: me2.id, email: me2.email, role: me2.role, name: me2.email.split('@')[0] });
        } catch {
          setUser(null);
        }
      } finally {
        setBootstrapped(true);
      }
    })();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    await apiLogin(email, password); // setea sr_at/sr_rt
    const me = await apiMe();
    setUser({ id: me.id, email: me.email, role: me.role, name: me.email.split('@')[0] });
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    await apiRegister(email, password); // crea usuario
    await apiLogin(email, password); // cookies
    const me = await apiMe();
    setUser({ id: me.id, email: me.email, role: me.role, name });
  }, []);

  const logout = useCallback(async () => {
    try {
      await apiLogout();
    } finally {
      setUser(null);
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated, // ← AÑADE ESTA PROPIEDAD
      login,
      register,
      logout,
    }),
    [user, isAuthenticated, login, register, logout]
  );

  // Opcional: puedes mostrar un loader global hasta que sepamos si hay sesión o no
  if (!bootstrapped) return null;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
