import { Course } from '.';

export interface Chapter {
  id: string;
  title: string;
  description: string;
  position: number;
  isPublished: boolean;
  durationSec: number;
  videoUrl?: string;
  resources?: CourseResource[];
}

export interface CourseResource {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'link' | 'document';
  url: string;
}

export interface CourseDetail extends Course {
  chapters: Chapter[];
  description: string;
  objectives?: string[];
  requirements?: string[];
}
