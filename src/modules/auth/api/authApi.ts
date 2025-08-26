import { http } from '@/lib/api/client';

export type Role = 'ADMIN' | 'USER';

export type RegisterResponse = { id: string; email: string; role: Role };
export type LoginResponse = { message: string };
export type MeResponse = { id: string; email: string; role: Role };

export async function apiRegister(email: string, password: string, role: Role = 'USER') {
  // POST /auth/register NO setea cookies; solo crea el usuario
  return http<RegisterResponse>('/auth/register', {
    method: 'POST',
    body: { email, password, role },
  });
}

export async function apiLogin(email: string, password: string) {
  // POST /auth/login devuelve cookies (sr_at, sr_rt)
  return http<LoginResponse>('/auth/login', {
    method: 'POST',
    body: { email, password },
  });
}

export async function apiMe() {
  // Requiere cookie sr_at; por eso llamamos después del login
  return http<MeResponse>('/auth/me');
}

export async function apiLogout() {
  return http<LoginResponse>('/auth/logout', { method: 'POST' });
}

export async function apiRefresh() {
  return http<LoginResponse>('/auth/refresh', { method: 'POST' });
}
