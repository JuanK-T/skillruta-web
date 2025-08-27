import { useState } from 'react';
import { toast } from 'sonner';
import { Chapter } from '../types/chapter';
import { chaptersApi } from '../api/chaptersApi';
import { UpdateCourseData } from '../types';

export const useChapters = (courseId: string, initialChapters: Chapter[] = []) => {
  const [chapters, setChapters] = useState<Chapter[]>(initialChapters);
  const [isLoading, setIsLoading] = useState(false);

  const addChapter = async (title: string) => {
    try {
      setIsLoading(true);
      const newChapter = await chaptersApi.addChapter(courseId, { title });
      setChapters([...chapters, newChapter]);
      toast.success('Capítulo añadido');
      return newChapter;
    } catch (error) {
      toast.error('Error al añadir el capítulo');
      console.error('Error adding chapter:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateChapter = async (chapterId: string, data: UpdateCourseData) => {
    try {
      setIsLoading(true);
      const updatedChapter = await chaptersApi.updateChapter(courseId, chapterId, data);
      setChapters(chapters.map((chapter) => (chapter.id === chapterId ? updatedChapter : chapter)));
      toast.success('Capítulo actualizado');
      return updatedChapter;
    } catch (error) {
      toast.error('Error al actualizar el capítulo');
      console.error('Error updating chapter:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteChapter = async (chapterId: string) => {
    try {
      setIsLoading(true);
      await chaptersApi.deleteChapter(courseId, chapterId);
      setChapters(chapters.filter((chapter) => chapter.id !== chapterId));
      toast.success('Capítulo eliminado');
    } catch (error) {
      toast.error('Error al eliminar el capítulo');
      console.error('Error deleting chapter:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const togglePublishChapter = async (chapterId: string, isCurrentlyPublished: boolean) => {
    try {
      setIsLoading(true);

      let updatedChapter;
      if (isCurrentlyPublished) {
        updatedChapter = await chaptersApi.unpublishChapter(courseId, chapterId);
      } else {
        updatedChapter = await chaptersApi.publishChapter(courseId, chapterId);
      }

      setChapters(chapters.map((chapter) => (chapter.id === chapterId ? updatedChapter : chapter)));

      toast.success(`Capítulo ${isCurrentlyPublished ? 'despublicado' : 'publicado'}`);
      return updatedChapter;
    } catch (error) {
      toast.error(`Error al ${isCurrentlyPublished ? 'despublicar' : 'publicar'} el capítulo`);
      console.error('Error toggling chapter publish status:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const reorderChapters = async (newOrder: Chapter[]) => {
    try {
      setIsLoading(true);
      const chapterIds = newOrder.map((chapter) => chapter.id);
      await chaptersApi.reorderChapters(courseId, { chapterIds });

      // Actualizar posiciones localmente
      const updatedChapters = newOrder.map((chapter, index) => ({
        ...chapter,
        position: index + 1,
      }));

      setChapters(updatedChapters);
      toast.success('Capítulos reordenados');
    } catch (error) {
      toast.error('Error al reordenar los capítulos');
      console.error('Error reordering chapters:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    chapters,
    isLoading,
    addChapter,
    updateChapter,
    deleteChapter,
    togglePublishChapter,
    reorderChapters,
    setChapters,
  };
};
