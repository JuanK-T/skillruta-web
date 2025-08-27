import { HeroSection, FeaturesSection } from './sections';
import CoursesGridSection from './sections/CoursesGridSection';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

export default function CoursesLanding() {
  const [publishedCount, setPublishedCount] = useState(0);
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <HeroSection publishedCount={publishedCount} />
      {!isAuthenticated && <FeaturesSection />}
      <CoursesGridSection onTotalChange={setPublishedCount} />
    </div>
  );
}
