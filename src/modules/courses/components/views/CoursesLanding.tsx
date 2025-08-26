import { HeroSection, FeaturesSection } from './sections';
import CoursesGridSection from './sections/CoursesGridSection';
import { useState } from 'react';

export default function CoursesLanding() {
  const [publishedCount, setPublishedCount] = useState(0);

  return (
    <div className="min-h-screen bg-background">
      <HeroSection publishedCount={publishedCount} />
      <FeaturesSection />
      <CoursesGridSection onTotalChange={setPublishedCount} />
    </div>
  );
}
