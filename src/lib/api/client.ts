const BASE = import.meta.env.VITE_API_BASE_URL as string;

type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

// Interface para el error response esperado
interface ErrorResponse {
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

export async function http<T = unknown>(
  path: string,
  opts: { method?: HttpMethod; body?: unknown; headers?: Record<string, string> } = {}
): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method: opts.method ?? 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(opts.headers ?? {}),
    },
    body: opts.body ? JSON.stringify(opts.body) : undefined,
    // MUY IMPORTANTE para que se manden/reciban cookies (sr_at / sr_rt)
    credentials: 'include',
  });

  const isJson = res.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await res.json() : undefined;

  if (!res.ok) {
    // Tipado correcto sin usar 'any'
    const errorData = data as ErrorResponse | undefined;
    const message = errorData?.message ?? errorData?.error ?? `HTTP ${res.status}`;
    throw new ApiError(message, res.status, data);
  }

  return data as T;
}
