import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AuthContext } from './AuthContext';
import type { User } from '@/types/auth';
import { apiLogin, apiLogout, apiMe, apiRegister } from '@/modules/auth/api/authApi';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Intentar levantar sesión si ya hay cookies (sr_at) válidas
  useEffect(() => {
    (async () => {
      try {
        const me = await apiMe();
        setUser({ id: me.id, email: me.email, role: me.role, name: me.email.split('@')[0] });
      } catch {
        setUser(null);
      }
    })();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    await apiLogin(email, password); // setea cookies
    const me = await apiMe(); // trae perfil
    setUser({ id: me.id, email: me.email, role: me.role, name: me.email.split('@')[0] });
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    await apiRegister(email, password); // crea usuario
    await apiLogin(email, password); // genera cookies
    const me = await apiMe(); // trae perfil
    setUser({ id: me.id, email: me.email, role: me.role, name });
  }, []);

  const logout = useCallback(async () => {
    try {
      await apiLogout();
    } finally {
      setUser(null);
    }
  }, []);

  const value = useMemo(() => ({ user, login, register, logout }), [user, login, register, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
