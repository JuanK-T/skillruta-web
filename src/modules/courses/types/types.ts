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
  category: CourseCategory;
  isPublished: boolean;
  thumbnailUrl?: string;
  totalDurationSec: number;
  authorName: string;
}
