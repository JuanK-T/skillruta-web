interface CourseObjectivesProps {
  objectives?: string[];
}

export function CourseObjectives({ objectives }: CourseObjectivesProps) {
  if (!objectives || objectives.length === 0) return null;

  return (
    <div className="mt-12 bg-card rounded-2xl shadow-lg p-6 md:p-8">
      <h2 className="text-2xl font-bold text-foreground mb-4">Lo que aprenderás</h2>
      <ul className="grid md:grid-cols-2 gap-3">
        {objectives.map((objective, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="text-green-500 mt-1">✓</span>
            <span className="text-muted-foreground">{objective}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
