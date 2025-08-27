import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Plus } from 'lucide-react';
import { Chapter } from '../../types/chapter';
import { ChapterItem } from './ChapterItem';

interface ChapterListProps {
  chapters: Chapter[];
  onAddChapter: (title: string) => Promise<void>;
  onEditChapter: (chapterId: string) => void;
  onDeleteChapter: (chapterId: string) => Promise<void>;
  onTogglePublishChapter: (chapterId: string, isPublished: boolean) => Promise<void>;
  onReorderChapters: (newOrder: Chapter[]) => Promise<void>;
  isLoading: boolean;
}

export function ChapterList({
  chapters,
  onAddChapter,
  onEditChapter,
  onDeleteChapter,
  onTogglePublishChapter,
  onReorderChapters,
  isLoading,
}: ChapterListProps) {
  const [isAddingChapter, setIsAddingChapter] = useState(false);
  const [newChapterTitle, setNewChapterTitle] = useState('');

  const handleAddChapter = async () => {
    if (!newChapterTitle.trim()) return;

    try {
      await onAddChapter(newChapterTitle);
      setNewChapterTitle('');
      setIsAddingChapter(false);
    } catch (error) {
      console.error('Error adding chapter:', error);
    }
  };

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(chapters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    try {
      await onReorderChapters(items);
    } catch (error) {
      console.error('Error reordering chapters:', error);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Capítulos</CardTitle>
          <CardDescription>
            {chapters.length} capítulo{chapters.length !== 1 ? 's' : ''}
          </CardDescription>
        </div>
        <Button
          size="sm"
          onClick={() => setIsAddingChapter(true)}
          disabled={isAddingChapter || isLoading}
        >
          <Plus className="h-4 w-4 mr-1" />
          Añadir
        </Button>
      </CardHeader>
      <CardContent>
        {isAddingChapter && (
          <div className="mb-4 p-3 border rounded-md bg-muted/20">
            <Input
              placeholder="Título del capítulo"
              value={newChapterTitle}
              onChange={(e) => setNewChapterTitle(e.target.value)}
              className="mb-2"
              autoFocus
            />
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsAddingChapter(false);
                  setNewChapterTitle('');
                }}
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button
                size="sm"
                onClick={handleAddChapter}
                disabled={isLoading || !newChapterTitle.trim()}
              >
                Añadir
              </Button>
            </div>
          </div>
        )}

        {chapters.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            <p>No hay capítulos aún</p>
            <p className="text-sm">Añade tu primer capítulo</p>
          </div>
        ) : (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="chapters">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {chapters.map((chapter, index) => (
                    <Draggable key={chapter.id} draggableId={chapter.id} index={index}>
                      {(provided) => (
                        <div ref={provided.innerRef} {...provided.draggableProps}>
                          <ChapterItem
                            chapter={chapter}
                            onEdit={onEditChapter}
                            onDelete={onDeleteChapter}
                            onTogglePublish={onTogglePublishChapter}
                            dragHandleProps={provided.dragHandleProps}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}

        {chapters.length > 0 && (
          <div className="mt-4 text-xs text-muted-foreground">
            <p>Arrastra y suelta para reordenar los capítulos</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
