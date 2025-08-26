import { Routes, Route } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import CoursesLanding from '@/modules/courses/pages/CoursesLanding';
import CoursePublicPage from '@/modules/courses/pages/CoursePublicPage';
import LoginPage from '@/modules/auth/pages/LoginPage';
import RegisterPage from '@/modules/auth/pages/RegisterPage';

export default function App() {
  return (
    <div className="min-h-screen bg-[#f6f7fb]">
      <Navbar />
      <Routes>
        <Route path="/" element={<CoursesLanding />} />
        <Route path="/courses/:slug" element={<CoursePublicPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}
