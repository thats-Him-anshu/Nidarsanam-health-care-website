import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CMSProvider } from './context/CMSContext';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Blog from './pages/Blog/Blog';
import Contact from './pages/Contact/Contact';
import NotFound from './pages/NotFound/NotFound';
import PrivacyPolicy from './pages/Legal/PrivacyPolicy';
import TermsOfService from './pages/Legal/TermsOfService';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminLayout from './pages/Admin/AdminLayout';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminLeads from './pages/Admin/AdminLeads';
import AdminCMS from './pages/Admin/AdminCMS';
import AdminBlogs from './pages/Admin/AdminBlogs';
import AdminSettings from './pages/Admin/AdminSettings';
import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton';
import CookieConsent from './components/CookieConsent/CookieConsent';
import './App.css';

// Public Layout Wrapper with Navbar and Footer
const PublicLayout = () => {
  return (
    <div className="public-app-layout">
      <Navbar />
      <main className="public-main-content">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <CookieConsent />
    </div>
  );
};

// Protected Admin Route Guard
const ProtectedAdminRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#F5F1EB', color: '#1B4D3E', fontFamily: 'serif', fontSize: '1.4rem' }}>
        Verifying Session...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <AdminLayout />;
};

function App() {
  return (
    <AuthProvider>
      <CMSProvider>
        <Router>
          <Routes>
            {/* Public Pages */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            {/* Admin Authentication */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Protected Admin Portal */}
            <Route path="/admin" element={<ProtectedAdminRoute />}>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="leads" element={<AdminLeads />} />
              <Route path="cms" element={<AdminCMS />} />
              <Route path="blogs" element={<AdminBlogs />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
          </Routes>
        </Router>
      </CMSProvider>
    </AuthProvider>
  );
}

export default App;
