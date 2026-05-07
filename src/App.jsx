import { Route, Routes } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { CourseDetailsPage } from './pages/CourseDetailsPage';
import { CoursesPage } from './pages/CoursesPage';
import { DashboardPage } from './pages/DashboardPage';
import { FAQPage } from './pages/FAQPage';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { StaticInfoPage } from './pages/StaticInfoPage';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="bg-academyNavy">
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:courseId" element={<CourseDetailsPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/privacy" element={<StaticInfoPage type="privacy" />} />
        <Route path="/terms" element={<StaticInfoPage type="terms" />} />
        <Route path="*" element={<CoursesPage />} />
      </Routes>
      <Footer />
    </div>
  );
}
