const BASE = import.meta.env.VITE_API_BASE_URL as string;

// Interface para la respuesta de error esperada
export interface ErrorResponse {
  message?: string;
  error?: string;
  [key: string]: unknown; // Para otras propiedades que pueda tener el error
}

export class ApiError extends Error {
  status: number;
  payload: unknown;
  constructor(message: string, status: number, payload: unknown) {
    super(message);
    this.status = status;
    this.payload = payload;
  }
}

async function rawFetch(path: string, init?: RequestInit) {
  const res = await fetch(`${BASE}${path}`, {
    credentials: 'include', // manda/recibe cookies
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
  });
  const isJson = res.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await res.json() : undefined;
  if (!res.ok) {
    // Type-safe sin usar 'any'
    const errorData = data as ErrorResponse | undefined;
    const msg = errorData?.message ?? errorData?.error ?? `HTTP ${res.status}`;
    throw new ApiError(msg, res.status, data);
  }
  return data;
}

/** Llama, si da 401 intenta /auth/refresh, y reintenta una sola vez */
export async function http<T = unknown>(
  path: string,
  opts: { method?: string; body?: unknown; headers?: Record<string, string> } = {}
): Promise<T> {
  try {
    return await rawFetch(path, {
      method: opts.method ?? 'GET',
      body: opts.body ? JSON.stringify(opts.body) : undefined,
      headers: opts.headers,
    });
  } catch (e) {
    if (e instanceof ApiError && e.status === 401) {
      // intenta refrescar
      try {
        await rawFetch('/auth/refresh', { method: 'POST' });
        // reintenta la original
        return await rawFetch(path, {
          method: opts.method ?? 'GET',
          body: opts.body ? JSON.stringify(opts.body) : undefined,
          headers: opts.headers,
        });
      } catch {
        // si refresh falla, propaga el 401 original
      }
    }
    throw e;
  }
}
