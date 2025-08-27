import ProtectedRoute from '@/routes/ProtectedRoute';
import { CourseEditForm } from './CourseEditForm';

export default function EditCoursePage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <div className="container py-8">
          <CourseEditForm />
        </div>
      </div>
    </ProtectedRoute>
  );
}
