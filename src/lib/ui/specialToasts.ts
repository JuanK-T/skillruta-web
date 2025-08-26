import { toast } from 'sonner';

/** Toast para cuando el usuario inicia sesión */
export function toastWelcome(nameOrEmail: string) {
  toast.success(`¡Bienvenido, ${nameOrEmail}! 🎉`, {
    position: 'top-center',
    duration: 3500,
  });
}

/** Toast para cuando un usuario se registra por primera vez */
export function toastCongrats(nameOrEmail: string) {
  toast.success(`🎊 ¡Felicitaciones ${nameOrEmail}! Tu cuenta fue creada con éxito.`, {
    position: 'top-center',
    duration: 4000,
  });
}
