import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { CourseDetailsPage } from './pages/CourseDetailsPage';
import { CoursesPage } from './pages/CoursesPage';
import { FAQPage } from './pages/FAQPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { OrderRequestPage } from './pages/OrderRequestPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { RegisterPage } from './pages/RegisterPage';
import { SecurityProgramPage } from './pages/SecurityProgramPage';
import { StorePage } from './pages/StorePage';
import { StaticInfoPage } from './pages/StaticInfoPage';
import { ThankYouPage } from './pages/ThankYouPage';

function LegacyProductRedirect() {
  const { productId } = useParams();
  return <Navigate to={`/store/${productId}`} replace />;
}

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
        <Route path="/programs/:programId" element={<SecurityProgramPage />} />
        <Route path="/checkout/:courseId" element={<CheckoutPage />} />
        <Route path="/store" element={<StorePage />} />
        <Route path="/store/:productId" element={<ProductDetailsPage />} />
        <Route path="/shop" element={<Navigate to="/store" replace />} />
        <Route path="/shop/:productId" element={<LegacyProductRedirect />} />
        <Route path="/order-request" element={<OrderRequestPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="/privacy" element={<StaticInfoPage type="privacy" />} />
        <Route path="/terms" element={<StaticInfoPage type="terms" />} />
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
}
