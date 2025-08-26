import type { Course } from '@/modules/courses/types/types';

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'React + TypeScript desde Cero',
    slug: 'react-typescript',
    category: 'PROGRAMMING',
    isPublished: true,
    thumbnailUrl:
      'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1200&q=60&auto=format&fit=crop',
    totalDurationSec: 6 * 3600,
    authorName: 'CoE Desarrollo',
  },
  {
    id: '2',
    title: 'Diseño UI: Sistemas de Diseño con Tailwind',
    slug: 'ui-design-tailwind',
    category: 'DESIGN',
    isPublished: true,
    thumbnailUrl:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=60&auto=format&fit=crop',
    totalDurationSec: 3 * 3600,
    authorName: 'CoE Diseño',
  },
  {
    id: '3',
    title: 'APIs & Microservicios: buenas prácticas',
    slug: 'apis-microservicios',
    category: 'BUSINESS',
    isPublished: false,
    thumbnailUrl:
      'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=1200&q=60&auto=format&fit=crop',
    totalDurationSec: 5 * 3600,
    authorName: 'CoE Backend',
  },
];
