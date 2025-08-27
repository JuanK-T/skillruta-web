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

export interface CreateChapterData {
  title: string;
  description?: string;
  videoUrl?: string;
}

export interface UpdateChapterData {
  title?: string;
  description?: string;
  videoUrl?: string;
  isPublished?: boolean;
}

export interface ReorderChaptersData {
  chapterIds: string[];
}
