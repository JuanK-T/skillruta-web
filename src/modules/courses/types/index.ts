import { Chapter } from './chapter';

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  isPublished: boolean;
  authorId: string;
  authorName: string;
  createdAt: string;
  updatedAt: string;
  totalDurationSec: number;
  thumbnailUrl: string;
}

export interface CoursesResponse {
  data: Course[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export type CourseCategory = 'MARKETING' | 'DESIGN' | 'PROGRAMMING' | 'BUSINESS' | 'OTHER' | string;

export interface CourseDetail extends Course {
  chapters: Chapter[];
  objectives?: string[];
  requirements?: string[];
  isOwner?: boolean; // ← Añade esta propiedad
  isEnrolled?: boolean; // ← Y esta
}

export interface CreateCourse {
  title: string;
  slug: string;
  description?: string;
  category: 'PROGRAMMING' | 'DESIGN' | 'BUSINESS' | 'MARKETING' | 'LIFESTYLE' | 'OTHER';
}
