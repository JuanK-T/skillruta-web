import { http } from '@/lib/api/client';
import {
  Chapter,
  CreateChapterData,
  UpdateChapterData,
  ReorderChaptersData,
} from '../../courses/types/chapter';

export const chaptersApi = {
  addChapter: async (courseId: string, chapterData: CreateChapterData): Promise<Chapter> => {
    return http<Chapter>(`/courses/${courseId}/chapters`, {
      method: 'POST',
      body: chapterData,
    });
  },

  updateChapter: async (
    courseId: string,
    chapterId: string,
    chapterData: UpdateChapterData
  ): Promise<Chapter> => {
    return http<Chapter>(`/courses/${courseId}/chapters/${chapterId}`, {
      method: 'PATCH',
      body: chapterData,
    });
  },

  deleteChapter: async (courseId: string, chapterId: string): Promise<void> => {
    return http<void>(`/courses/${courseId}/chapters/${chapterId}`, {
      method: 'DELETE',
    });
  },

  publishChapter: async (courseId: string, chapterId: string): Promise<Chapter> => {
    return http<Chapter>(`/courses/${courseId}/chapters/${chapterId}/publish`, {
      method: 'POST',
    });
  },

  unpublishChapter: async (courseId: string, chapterId: string): Promise<Chapter> => {
    return http<Chapter>(`/courses/${courseId}/chapters/${chapterId}/unpublish`, {
      method: 'POST',
    });
  },

  reorderChapters: async (courseId: string, data: ReorderChaptersData): Promise<void> => {
    return http<void>(`/courses/${courseId}/reorder`, {
      method: 'POST',
      body: data,
    });
  },
};
