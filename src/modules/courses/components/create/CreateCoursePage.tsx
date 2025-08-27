import ProtectedRoute from '@/routes/ProtectedRoute';
import { CourseForm } from './CourseForm';

export default function CreateCoursePage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <div className="container py-8">
          <CourseForm />
        </div>
      </div>
    </ProtectedRoute>
  );
}
