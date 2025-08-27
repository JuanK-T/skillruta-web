import { Lock, Play } from 'lucide-react';
import { Chapter } from '../../types/chapter';

interface CourseChaptersProps {
  chapters: Chapter[];
  isAuthenticated: boolean;
}

export function CourseChapters({ chapters, isAuthenticated }: CourseChaptersProps) {
  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes} min`;
  };

  return (
    <div className="mt-8 bg-card rounded-2xl shadow-lg p-6 md:p-8">
      <h2 className="text-2xl font-bold text-foreground mb-6">
        Programa del curso ({chapters.length} capítulos)
      </h2>

      <div className="space-y-3">
        {chapters.map((chapter, index) => (
          <div
            key={chapter.id}
            className={`flex items-center gap-4 p-4 rounded-xl border ${
              isAuthenticated && chapter.isPublished
                ? 'border-green-200 bg-green-50 hover:bg-green-100 cursor-pointer'
                : 'border-muted bg-muted/50'
            } transition-colors`}
          >
            <div
              className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                isAuthenticated && chapter.isPublished
                  ? 'bg-green-500 text-white'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {index + 1}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">{chapter.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{chapter.description}</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                <span>{formatDuration(chapter.durationSec)}</span>
                {chapter.resources && chapter.resources.length > 0 && (
                  <span>{chapter.resources.length} recursos</span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {!isAuthenticated && <Lock className="h-4 w-4 text-muted-foreground" />}
              {isAuthenticated && chapter.isPublished && (
                <Play className="h-4 w-4 text-green-600" />
              )}
              {isAuthenticated && !chapter.isPublished && (
                <span className="text-xs text-muted-foreground">Próximamente</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
