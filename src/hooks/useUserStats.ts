import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

interface UserStats {
  totalCoursesCreated: number;
  totalStudents: number;
  totalEnrollments: number;
  averageCompletionRate: number;
  totalRevenue?: number;
}

export const useUserStats = () => {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchUserStats = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // Mock data por ahora - reemplaza con tu API real
        const mockStats: UserStats = {
          totalCoursesCreated: 3,
          totalStudents: 147,
          totalEnrollments: 285,
          averageCompletionRate: 72,
          totalRevenue: 2540,
        };

        setStats(mockStats);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar estadísticas');
        console.error('Error fetching user stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserStats();
  }, [user]);

  return { stats, loading, error };
};
