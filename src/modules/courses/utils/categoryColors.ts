import { CourseCategory } from '../types';

export interface CategoryStyle {
  bgColor: string;
  textColor: string;
}

export const getCategoryStyle = (category: CourseCategory): CategoryStyle => {
  const categoryMap: Record<string, CategoryStyle> = {
    MARKETING: {
      bgColor: 'bg-pink-100',
      textColor: 'text-pink-800',
    },
    DESIGN: {
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-800',
    },
    PROGRAMMING: {
      bgColor: 'bg-green-100',
      textColor: 'text-green-800',
    },
    BUSINESS: {
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-800',
    },
    OTHER: {
      bgColor: 'bg-gray-100',
      textColor: 'text-gray-800',
    },
  };

  // Si la categoría existe en el mapeo, la devolvemos, sino usamos OTHER
  return categoryMap[category] || categoryMap.OTHER;
};

// Opcional: función para formatear el texto de la categoría
export const formatCategoryText = (category: CourseCategory): string => {
  const textMap: Record<string, string> = {
    MARKETING: 'Marketing',
    DESIGN: 'Diseño',
    PROGRAMMING: 'Programación',
    BUSINESS: 'Negocios',
    OTHER: 'Otro',
  };

  return textMap[category] || category;
};
