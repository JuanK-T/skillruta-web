import { useMemo } from 'react';
import { mockCourses } from '@/modules/courses/data/mockCourses';
import { HeroSection, FeaturesSection, CoursesGridSection } from '@/modules/courses/pages/sections';

export default function CoursesLanding() {
  const published = useMemo(() => mockCourses.filter((c) => c.isPublished), []);

  return (
    <div className="min-h-screen bg-background">
      <HeroSection publishedCount={published.length} />
      <FeaturesSection />
      <CoursesGridSection courses={published} />
    </div>
  );
}
