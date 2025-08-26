import { ApiError } from './client';

export function getNestErrorMessage(error: unknown): string {
  // Si es ApiError, extraer del payload
  if (error instanceof ApiError) {
    const nestError = error.payload as { message?: string; error?: string };
    return nestError.message || nestError.error || error.message;
  }

  // Si es Error, usar su message
  if (error instanceof Error) {
    return error.message;
  }

  // Si es string, devolverla directamente
  if (typeof error === 'string') {
    return error;
  }

  // Si es objeto, intentar convertirlo a string de forma segura
  if (typeof error === 'object' && error !== null) {
    try {
      // Intentar acceder a propiedades comunes de error
      const errorObj = error as Record<string, unknown>;
      if (typeof errorObj.message === 'string') return errorObj.message;
      if (typeof errorObj.error === 'string') return errorObj.error;

      // Si no tiene propiedades conocidas, convertirlo a string
      return JSON.stringify(error);
    } catch {
      return 'Error desconocido';
    }
  }

  // Cualquier otro caso
  return 'Error desconocido';
}
