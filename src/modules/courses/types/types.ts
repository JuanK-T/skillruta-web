export type CourseCategory =
  | 'PROGRAMMING'
  | 'DESIGN'
  | 'BUSINESS'
  | 'MARKETING'
  | 'LIFESTYLE'
  | 'OTHER';

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
  totalDurationSec?: number;
  thumbnailUrl?: string;
}

export interface CatalogResponse {
  courses: Course[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export interface CatalogFilters {
  q?: string;
  category?: string;
  authorId?: string;
  page?: number;
  pageSize?: number;
}
