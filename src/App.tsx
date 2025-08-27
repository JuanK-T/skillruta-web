import { Routes, Route } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import CoursesLanding from './modules/courses/components/views/CoursesLanding';
import CoursePublicPage from '@/modules/courses/components/details/DetailCourse';
import LoginPage from '@/modules/auth/pages/LoginPage';
import RegisterPage from '@/modules/auth/pages/RegisterPage';
import { Toaster } from 'sonner';
import CreateCoursePage from './modules/courses/components/create/CreateCoursePage';
import EditCoursePage from './modules/courses/components/edit/EditCoursePage';

export default function App() {
  return (
    <div className="min-h-screen bg-[#f6f7fb]">
      <Toaster position="top-right" richColors duration={2800} closeButton />
      <Navbar />
      <Routes>
        <Route path="/" element={<CoursesLanding />} />
        <Route path="/courses/:slug" element={<CoursePublicPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/courses/new" element={<CreateCoursePage />} />
        <Route path="*" element={<div>404 Not Found</div>} />
        <Route path="/courses/:slug/edit" element={<EditCoursePage />} />
      </Routes>
    </div>
  );
}
