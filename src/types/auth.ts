export type Role = 'ADMIN' | 'USER';

export interface User {
  id: string;
  email: string;
  name?: string;
  role: Role;
}

export interface AuthContextValue {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export interface AuthError {
  message?: string;
  error?: string;
  status?: number;
  [key: string]: unknown;
}
