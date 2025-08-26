import { HeroSection, FeaturesSection } from './sections';
import CoursesGridSection from './sections/CoursesGridSection';
import { mockCourses } from '../data/mockCourses';

export default function CoursesLanding() {
  // Filtrar solo los cursos publicados para el diseño
  const publishedCourses = mockCourses.filter(course => course.isPublished);

  return (
    <div className="min-h-screen bg-background">
      <HeroSection publishedCount={publishedCourses.length} />
      <FeaturesSection />
      <CoursesGridSection courses={publishedCourses} />
    </div>
  );
}