import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Cookie } from 'lucide-react';
import './CookieConsent.css';

const COOKIE_KEY = 'nidarsanam_cookie_consent';

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(COOKIE_KEY);
    if (!saved) {
      // Delay slightly so it doesn't flash immediately on page load
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_KEY, 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-label="Cookie consent">
      <div className="cookie-icon-wrap">
        <Cookie size={22} />
      </div>
      <div className="cookie-text">
        <strong>We use cookies</strong>
        <p>
          We use essential cookies to make our website work, and optional analytics cookies to understand
          how you use it. See our{' '}
          <Link to="/privacy-policy" onClick={handleAccept}>Privacy Policy</Link> for details.
        </p>
      </div>
      <div className="cookie-actions">
        <button className="cookie-btn cookie-btn-decline" onClick={handleDecline}>
          Decline
        </button>
        <button className="cookie-btn cookie-btn-accept" onClick={handleAccept}>
          Accept All
        </button>
      </div>
      <button className="cookie-close" onClick={handleDecline} aria-label="Close">
        <X size={16} />
      </button>
    </div>
  );
};

export default CookieConsent;
