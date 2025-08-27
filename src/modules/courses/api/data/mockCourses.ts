import { CourseCategory, type Course } from '@/modules/courses/types';

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'React + TypeScript desde Cero',
    slug: 'react-typescript',
    description: 'Aprende a crear aplicaciones modernas con React y TypeScript desde cero.',
    category: CourseCategory.MARKETING,
    isPublished: true,
    authorId: 'author-1',
    authorName: 'CoE Desarrollo',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    totalDurationSec: 3600,
    thumbnailUrl:
      'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1200&q=60&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Diseño UI: Sistemas de Diseño con Tailwind',
    slug: 'ui-design-tailwind',
    description: 'Crea y aplica sistemas de diseño consistentes con TailwindCSS.',
    category: CourseCategory.DESIGN,
    isPublished: true,
    authorId: 'author-2',
    authorName: 'CoE Diseño',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    totalDurationSec: 3600,
    thumbnailUrl:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=60&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'APIs & Microservicios: buenas prácticas',
    slug: 'apis-microservicios',
    description: 'Arquitectura y patrones para construir APIs y microservicios robustos.',
    category: CourseCategory.BUSINESS,
    isPublished: false,
    authorId: 'author-3',
    authorName: 'CoE Backend',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    totalDurationSec: 3600,
    thumbnailUrl:
      'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=1200&q=60&auto=format&fit=crop',
  },
];
