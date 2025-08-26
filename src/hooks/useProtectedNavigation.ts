import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from './useAuth';

export const useProtectedNavigation = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const navigateToProtected = (path: string) => {
    if (!isAuthenticated) {
      toast.error('Debes iniciar sesión', {
        description: 'Inicia sesión para acceder a los detalles del curso',
        duration: 3000,
        action: {
          label: 'Iniciar sesión',
          onClick: () => navigate('/login'), // Ajusta la ruta según tu app
        },
      });
      return false;
    }

    navigate(path);
    return true;
  };

  return { navigateToProtected };
};
