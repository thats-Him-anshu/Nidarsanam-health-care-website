import { Link } from 'react-router-dom';
import { Home, Phone, Sparkles } from 'lucide-react';
import './NotFound.css';

const NotFound = () => {
  return (
    <main className="not-found-page section section-sage" id="not-found-page">
      <div className="container not-found-content text-center">
        <div className="not-found-badge">
          <Sparkles size={16} />
          <span>Roots & Elements</span>
        </div>
        <div className="not-found-code">404</div>
        <h1 className="not-found-title">Page Not Found</h1>
        <p className="not-found-text lead">
          The page you are looking for does not exist or has been relocated. Return to the path to real health.
        </p>
        <div className="not-found-actions">
          <Link to="/" className="btn btn-primary btn-lg">
            <Home size={18} />
            <span>Return to Home</span>
          </Link>
          <Link to="/contact" className="btn btn-secondary btn-lg">
            <Phone size={18} />
            <span>Contact Clinic</span>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
