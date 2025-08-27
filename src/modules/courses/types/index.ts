import { Chapter } from './chapter';

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: CourseCategory;
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

export enum CourseCategory {
  MARKETING = 'MARKETING',
  DESIGN = 'DESIGN',
  PROGRAMMING = 'PROGRAMMING',
  BUSINESS = 'BUSINESS',
  OTHER = 'OTHER',
}

export interface CourseDetail extends Course {
  chapters: Chapter[];
  objectives?: string[];
  requirements?: string[];
  isOwner?: boolean; // ← Añade esta propiedad
  isEnrolled?: boolean; // ← Y esta
}

export interface CreateCourseData {
  title: string;
  description?: string;
  category: CourseCategory;
  thumbnailUrl?: string;
}

export interface CourseFormData {
  title: string;
  description: string;
  category: CourseCategory;
  thumbnailUrl: string;
}

export interface UpdateCourseData {
  title?: string;
  description?: string;
  category?: CourseCategory;
  thumbnailUrl?: string;
  isPublished?: boolean;
  objectives?: string[];
  requirements?: string[];
}

export interface CourseDetail extends Course {
  chapters: Chapter[];
  description: string;
  objectives?: string[];
  requirements?: string[];
}
