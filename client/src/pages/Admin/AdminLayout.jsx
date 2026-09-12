import { useState } from 'react';
import { Outlet, NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Globe,
  BookOpen,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Shield,
  Sparkles,
  ChevronRight,
  Settings
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './AdminLayout.css';

const AdminLayout = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    {
      path: '/admin/dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard size={20} />
    },
    {
      path: '/admin/leads',
      label: 'Leads Management',
      icon: <Users size={20} />
    },
    {
      path: '/admin/cms',
      label: 'Website Content',
      icon: <Globe size={20} />
    },
    {
      path: '/admin/blogs',
      label: 'Blog Management',
      icon: <BookOpen size={20} />
    },
    {
      path: '/admin/settings',
      label: 'Settings',
      icon: <Settings size={20} />
    },
  ];

  const getPageTitle = () => {
    if (location.pathname.includes('/leads')) return 'Leads Management';
    if (location.pathname.includes('/cms')) return 'Website Content CMS';
    if (location.pathname.includes('/blogs')) return 'Blog & Journal Management';
    if (location.pathname.includes('/settings')) return 'Admin Settings';
    return 'Admin Dashboard';
  };

  return (
    <div className="admin-shell">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        {/* Brand */}
        <div className="admin-sidebar-header">
          <Link to="/admin/dashboard" className="admin-sidebar-brand">
            <div className="sidebar-emblem">
              <img
                src="/logo-gold.png"
                alt="Nidarsanam Logo"
                className="sidebar-logo-img"
                onError={(e) => {
                  e.target.src = '/logo.png';
                }}
              />
            </div>
            <div>
              <span className="sidebar-brand-name">Nidarsanam</span>
              <span className="sidebar-brand-sub">CONTROL CENTER</span>
            </div>
          </Link>
          <button
            className="sidebar-close-btn"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="admin-sidebar-nav">
          <ul className="admin-nav-list">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `admin-nav-item ${isActive ? 'admin-nav-item-active' : ''}`
                  }
                >
                  <span className="admin-nav-icon">{item.icon}</span>
                  <span className="admin-nav-label">{item.label}</span>
                  {item.badge && (
                    <span className="admin-nav-badge">{item.badge}</span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* User / Logout Footer */}
        <div className="admin-sidebar-footer">
          <Link to="/" target="_blank" className="admin-live-site-link">
            <ExternalLink size={16} />
            <span>View Public Website</span>
          </Link>

          <div className="admin-user-card">
            <div className="admin-user-avatar">
              <Shield size={18} />
            </div>
            <div className="admin-user-info">
              <span className="admin-user-name">{admin?.name || 'Dr. Nidarsin'}</span>
              <span className="admin-user-email">{admin?.email || 'admin@nidarsanam.com'}</span>
            </div>
            <button
              className="admin-logout-btn"
              onClick={handleLogout}
              title="Sign Out"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="admin-main-wrapper">
        {/* Top Header */}
        <header className="admin-topbar">
          <div className="admin-topbar-left">
            <button
              className="admin-sidebar-toggle"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={22} />
            </button>
            <div className="admin-breadcrumb">
              <span>Portal</span>
              <ChevronRight size={14} className="breadcrumb-arrow" />
              <strong className="breadcrumb-current">{getPageTitle()}</strong>
            </div>
          </div>

          <div className="admin-topbar-right">
            <Link to="/" target="_blank" className="btn btn-secondary btn-sm btn-view-live">
              <ExternalLink size={14} />
              <span>Live Site</span>
            </Link>
            <div className="admin-role-badge">
              <Sparkles size={13} />
              <span>Authenticated Admin</span>
            </div>
          </div>
        </header>

        {/* Subroute Page Outlet */}
        <main className="admin-page-content">
          <Outlet />
        </main>
      </div>

      {/* Backdrop for mobile */}
      {sidebarOpen && (
        <div
          className="admin-sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;
