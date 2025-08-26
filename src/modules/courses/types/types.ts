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