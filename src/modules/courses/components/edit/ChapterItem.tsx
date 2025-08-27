import { Button } from '@/components/ui/button';
import { Grip, Pencil, Trash2, Eye, EyeOff } from 'lucide-react';
import { Chapter } from '../../types/chapter';
import { DraggableProvidedDragHandleProps } from '@hello-pangea/dnd';

interface ChapterItemProps {
  chapter: Chapter;
  onEdit: (chapterId: string) => void;
  onDelete: (chapterId: string) => void;
  onTogglePublish: (chapterId: string, isPublished: boolean) => void;
  dragHandleProps?: DraggableProvidedDragHandleProps | null;
}

export function ChapterItem({
  chapter,
  onEdit,
  onDelete,
  onTogglePublish,
  dragHandleProps,
}: ChapterItemProps) {
  return (
    <div
      className={`flex items-center gap-2 mb-2 p-3 border rounded-md bg-background ${
        chapter.isPublished ? 'border-green-200 bg-green-50' : ''
      }`}
    >
      <div {...dragHandleProps} className="flex-shrink-0">
        <Grip className="h-5 w-5 text-muted-foreground" />
      </div>
      <div className="flex-grow">
        <p className="font-medium text-sm">
          {chapter.position}. {chapter.title}
        </p>
        <p className="text-xs text-muted-foreground">
          {chapter.isPublished ? 'Publicado' : 'Borrador'}
        </p>
      </div>
      <div className="flex gap-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onTogglePublish(chapter.id, chapter.isPublished)}
        >
          {chapter.isPublished ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </Button>
        <Button variant="ghost" size="icon" onClick={() => onEdit(chapter.id)}>
          <Pencil className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => onDelete(chapter.id)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
