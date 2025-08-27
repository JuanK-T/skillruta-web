import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { useCourse } from '../../hooks/useCourse';
import { useChapters } from '../../hooks/useChapters';
import { CourseInfoForm } from './CourseInfoForm';
import { ChapterList } from './ChapterList';
import { UpdateCourseData } from '../../types';
import { Chapter } from '../../types/chapter';

export function CourseEditForm() {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const {
    course,
    loading: isLoading,
    isUpdating,
    updateCourse,
    publishCourse,
    unpublishCourse,
  } = useCourse(slug || '');
  const {
    chapters,
    isLoading: chaptersLoading,
    addChapter,
    deleteChapter,
    togglePublishChapter,
    reorderChapters,
  } = useChapters(course?.id || '', course?.chapters || []);

  const handleSubmit = async (values: UpdateCourseData) => {
    try {
      await updateCourse(values);
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  const handleAddChapter = async (title: string): Promise<void> => {
    await addChapter(title); // 👈 no retornes el Chapter
  };

  const handleDeleteChapter = async (chapterId: string) => {
    return deleteChapter(chapterId);
  };

  const handleTogglePublishChapter = async (
    chapterId: string,
    isPublished: boolean
  ): Promise<void> => {
    await togglePublishChapter(chapterId, isPublished); // no retornes el Chapter
  };

  const handleReorderChapters = async (newOrder: Chapter[]) => {
    return reorderChapters(newOrder);
  };

  const handleEditChapter = (chapterId: string) => {
    navigate(`chapter/${chapterId}`);
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Cargando...</div>;
  }

  if (!course) {
    return <div>Curso no encontrado</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Editar Curso</h1>
          <p className="text-muted-foreground mt-2">
            Actualiza la información de tu curso y gestiona los capítulos.
          </p>
        </div>
        <div className="flex gap-2">
          {course.isPublished ? (
            <Button variant="outline" onClick={unpublishCourse} disabled={isUpdating}>
              <EyeOff className="h-4 w-4 mr-2" />
              Despublicar
            </Button>
          ) : (
            <Button onClick={publishCourse} disabled={isUpdating}>
              <Eye className="h-4 w-4 mr-2" />
              Publicar Curso
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CourseInfoForm
            initialData={{
              title: course.title,
              description: course.description,
              category: course.category,
              thumbnailUrl: course.thumbnailUrl,
            }}
            onSubmit={handleSubmit}
            isSubmitting={isUpdating}
            onCancel={() => navigate(-1)}
          />
        </div>

        <div className="lg:col-span-1">
          <ChapterList
            chapters={chapters}
            onAddChapter={handleAddChapter}
            onEditChapter={handleEditChapter}
            onDeleteChapter={handleDeleteChapter}
            onTogglePublishChapter={handleTogglePublishChapter}
            onReorderChapters={handleReorderChapters}
            isLoading={chaptersLoading}
          />
        </div>
      </div>
    </div>
  );
}
