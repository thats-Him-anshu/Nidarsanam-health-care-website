import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageCircle, Sparkles } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import LegalModal from '../LegalModal/LegalModal';
import './Footer.css';

// Clean SVG Icons for Socials
const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const YoutubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <polygon points="10 15 15 12 10 9 10 15" />
  </svg>
);

const Footer = () => {
  const [legalModalType, setLegalModalType] = useState(null);
  const { content } = useCMS();
  const rawSettings = content?.settings || {};
  const isOldPhone = rawSettings.phone_number && rawSettings.phone_number.includes('98765');
  const isOldCity = rawSettings.clinic_city === 'Hosur';
  const isOldEmail = rawSettings.email === 'contact@nidarsanam.com';

  const settings = {
    ...rawSettings,
    clinic_address: isOldCity ? '3/850 D, Renuga Devi Kovil Street, Manthoppu' : (rawSettings.clinic_address || '3/850 D, Renuga Devi Kovil Street, Manthoppu'),
    clinic_city: isOldCity ? 'Dharmapuri' : (rawSettings.clinic_city || 'Dharmapuri'),
    clinic_state: isOldCity ? 'Tamil Nadu' : (rawSettings.clinic_state || 'Tamil Nadu'),
    clinic_pincode: isOldCity ? '636701' : (rawSettings.clinic_pincode || '636701'),
    phone_number: isOldPhone ? '+91 99523 38765' : (rawSettings.phone_number || '+91 99523 38765'),
    whatsapp_number: isOldPhone ? '+91 99523 38765' : (rawSettings.whatsapp_number || '+91 99523 38765'),
    email: isOldEmail ? 'nidarsanamhealthcare@gmail.com' : (rawSettings.email || 'nidarsanamhealthcare@gmail.com')
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-root">
      {/* Decorative Botanical Accent Top Bar */}
      <div className="footer-top-accent">
        <div className="container footer-top-accent-container">
          <div className="footer-accent-pill">
            <Sparkles size={14} className="footer-accent-sparkle" />
            <span>Panchamahabhuta Assessment • Traditional Indian Food • Therapeutic Yoga</span>
          </div>
          <div className="footer-accent-motto">
            <span>The Path to Real Health</span>
          </div>
        </div>
      </div>

      <div className="container footer-main-container">
        <div className="footer-grid">
          {/* Column 1: Brand & Philosophy */}
          <div className="footer-col footer-col-brand">
            <Link to="/" className="footer-brand">
              <div className="footer-emblem">
                <img
                  src="/logo.png"
                  alt="Nidarsanam Healthcare"
                  className="footer-logo-img"
                  onError={(e) => {
                    if (!e.target.src.endsWith('/logo.PNG')) {
                      e.target.src = '/logo.PNG';
                    }
                  }}
                />
              </div>
              <div className="footer-brand-text">
                <span className="footer-brand-title">Nidarsanam</span>
                <span className="footer-brand-sub">HEALTHCARE</span>
              </div>
            </Link>

            <p className="footer-brand-tagline">
              "We don't begin with the condition. We begin by understanding the individual."
            </p>

            <div className="footer-positioning-badges">
              <span className="footer-pos-badge">Understand</span>
              <span className="footer-pos-dot">•</span>
              <span className="footer-pos-badge">Personalise</span>
              <span className="footer-pos-dot">•</span>
              <span className="footer-pos-badge">Reorder</span>
            </div>

            <p className="footer-brand-desc">
              Rooted in traditional Indian food wisdom, therapeutic yoga, and Panchamahabhuta assessment under the clinical guidance of Dr. Nidarsin (BNYS).
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Explore</h4>
            <ul className="footer-links">
              <li><Link to="/">Home Overview</Link></li>
              <li><Link to="/about">About Dr. Nidarsin & Story</Link></li>
              <li><Link to="/about#method">The Nidarsanam Method™</Link></li>
              <li><Link to="/blog">The Nidarsanam Journal</Link></li>
              <li><Link to="/contact">Book Consultation</Link></li>
              <li><Link to="/contact#location">Clinic Location (Dharmapuri)</Link></li>
              <li><Link to="/contact#faqs">Frequently Asked Questions</Link></li>
            </ul>
          </div>

          {/* Column 3: Approaches & Framework */}
          <div className="footer-col">
            <h4 className="footer-heading">Our Core Approach</h4>
            <ul className="footer-links">
              <li><Link to="/about#panchamahabhuta">Panchamahabhuta Assessment</Link></li>
              <li><Link to="/about#food">Traditional Indian Food Guidance</Link></li>
              <li><Link to="/about#yoga">Therapeutic Yoga & Pranayama</Link></li>
              <li><Link to="/about#lifestyle">Circadian Lifestyle Reordering</Link></li>
              <li><Link to="/about#natural-therapies">Acupuncture & Naturopathy</Link></li>
              <li><Link to="/blog">Metabolic Health Insights</Link></li>
              <li><Link to="/blog">Women's Hormonal Health</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact & Clinic */}
          <div className="footer-col footer-col-contact">
            <h4 className="footer-heading">Get in Touch</h4>
            <ul className="footer-contact-list">
              <li>
                <MapPin size={18} className="footer-icon" />
                <a
                  href={settings.map_link || 'https://maps.app.goo.gl/Hcaec89GsGM5vHYMA'}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  {settings.clinic_address || '3/850 D, Renuga Devi Kovil Street, Manthoppu'}<br />
                  {settings.clinic_city || 'Dharmapuri'}, {settings.clinic_state || 'Tamil Nadu'} - {settings.clinic_pincode || '636701'}, India
                </a>
              </li>
              <li>
                <Phone size={18} className="footer-icon" />
                <a href={`tel:${settings.phone_number || '+99523 38765'}`}>
                  {settings.phone_number || '+91 99523 38765'}
                </a>
              </li>
              <li>
                <MessageCircle size={18} className="footer-icon" />
                <a href={`https://wa.me/${(settings.whatsapp_number || '99523 38765').replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer">
                  WhatsApp: {settings.whatsapp_number || '+91 99523 38765'}
                </a>
              </li>
              <li>
                <Mail size={18} className="footer-icon" />
                <a href={`mailto:${settings.email || 'nidarsanamhealthcare@gmail.com'}`}>
                  {settings.email || 'nidarsanamhealthcare@gmail.com'}
                </a>
              </li>
            </ul>

            {/* Social Links */}
            <div className="footer-social-links">
              <a href={settings.instagram_url || 'https://instagram.com/nidarsanam'} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="footer-social-icon">
                <InstagramIcon />
              </a>
              <a href={settings.facebook_url || 'https://facebook.com/nidarsanam'} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="footer-social-icon">
                <FacebookIcon />
              </a>
              <a href={settings.youtube_url || 'https://youtube.com/nidarsanam'} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="footer-social-icon">
                <YoutubeIcon />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-copyright">
            © {currentYear} Nidarsanam Healthcare. All rights reserved. Dr. Nidarsin (BNYS).
          </div>
          <div className="footer-legal-links">
            <button
              type="button"
              className="footer-legal-btn"
              onClick={() => setLegalModalType('privacy')}
            >
              Privacy Policy
            </button>
            <span className="footer-dot">•</span>
            <button
              type="button"
              className="footer-legal-btn"
              onClick={() => setLegalModalType('terms')}
            >
              Terms & Conditions
            </button>
          </div>
        </div>
      </div>

      {/* Responsive Legal Modal for Privacy Policy and Terms */}
      <LegalModal
        isOpen={!!legalModalType}
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />
    </footer>
  );
};

export default Footer;
