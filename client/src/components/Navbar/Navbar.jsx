import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Phone, Calendar, Menu, X, Sparkles } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { content } = useCMS();

  const rawSettings = content?.settings || {};
  const isOldPhone = rawSettings.phone_number && rawSettings.phone_number.includes('98765');
  const settings = {
    ...rawSettings,
    phone_number: isOldPhone ? '+91 99523 38765' : (rawSettings.phone_number || '+91 99523 38765'),
  };

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Add scrolled shadow & backdrop blur
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/blog', label: 'Blog' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <>
      {/* Top Announcement / Contact Bar */}
      <div className="top-banner">
        <div className="container top-banner-container">
          <div className="top-banner-left">
            <span className="top-banner-tag">
              <Sparkles size={13} className="top-banner-icon" />
              Roots & Elements
            </span>
            <span className="top-banner-text">
              Panchamahabhuta Assessment • Traditional Indian Food • Therapeutic Yoga
            </span>
          </div>
          <div className="top-banner-right">
            <a href={`tel:${settings.phone_number || '+919952338765'}`} className="top-banner-contact">
              <Phone size={13} />
              <span>{settings.phone_number || '+91 99523 38765'}</span>
            </a>
            <span className="top-banner-divider">|</span>
            <Link to="/contact" className="top-banner-badge">
              Online & Clinic Consultations
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header className={`navbar-header ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="container navbar-container">
          {/* Logo */}
          <Link to="/" className="navbar-brand" id="navbar-logo">
            <div className="brand-emblem">
              <img
                src="/logo.png"
                alt="Nidarsanam Healthcare Logo"
                className="brand-logo-img"
                onError={(e) => {
                  if (!e.target.src.endsWith('/logo.PNG')) {
                    e.target.src = '/logo.PNG';
                  }
                }}
              />
            </div>
            <div className="brand-details">
              <span className="brand-title">Nidarsanam</span>
              <span className="brand-subtitle">HEALTHCARE</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav" aria-label="Main Navigation">
            <ul className="nav-menu">
              {navLinks.map((link) => (
                <li key={link.path} className="nav-item">
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `nav-link ${isActive ? 'nav-link-active' : ''}`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right Action Area */}
          <div className="navbar-actions">
            <a
              href={`tel:${(settings.phone_number || '+91 99523 38765').replace(/[^0-9+]/g, '')}`}
              className="navbar-call-btn"
              aria-label={`Call ${settings.phone_number || '+91 99523 38765'}`}
              title={`Direct Call: ${settings.phone_number || '+91 99523 38765'}`}
            >
              <Phone size={15} />
              <span className="navbar-call-text">Call Now</span>
            </a>

            <Link to="/contact" className="btn btn-primary btn-navbar-cta" id="navbar-cta-btn">
              <Calendar size={16} />
              <span>Book Appointment</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className={`mobile-toggle-btn ${isOpen ? 'open' : ''}`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className={`mobile-nav-drawer ${isOpen ? 'open' : ''}`}>
          <div className="mobile-nav-content">
            <ul className="mobile-nav-menu">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `mobile-nav-link ${isActive ? 'active' : ''}`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="mobile-nav-footer">
              <div className="mobile-contact-pill">
                <span>Direct Hotline:</span>
                <a href={`tel:${settings.phone_number || '+919952338765'}`}>
                  {settings.phone_number || '+91 99523 38765'}
                </a>
              </div>
              <Link to="/contact" className="btn btn-primary mobile-cta-btn">
                <Calendar size={18} />
                <span>Book an Appointment</span>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
