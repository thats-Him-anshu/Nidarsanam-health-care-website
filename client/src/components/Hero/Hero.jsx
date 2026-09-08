import Button from '../ui/Button';
import './Hero.css';

const Hero = ({
  title = 'Your Health, Our Priority',
  highlight = 'Nidarsanam',
  subtitle = 'Delivering compassionate, world-class healthcare with cutting-edge technology and experienced medical professionals.',
  primaryAction = { label: 'Book Appointment', to: '/contact' },
  secondaryAction = { label: 'Our Services', to: '/services' },
}) => {
  return (
    <section className="hero" id="hero-section">
      {/* Background Effects */}
      <div className="hero-bg">
        <div className="hero-gradient"></div>
        <div className="hero-pattern"></div>
        <div className="hero-glow hero-glow-1"></div>
        <div className="hero-glow hero-glow-2"></div>
      </div>

      <div className="container hero-content">
        <div className="hero-badge animate-fade-in-down">
          <span className="badge-dot"></span>
          Welcome to Nidarsanam Health Care
        </div>

        <h1 className="hero-title animate-fade-in-up">
          {title.split(highlight).map((part, i, arr) => (
            <span key={i}>
              {part}
              {i < arr.length - 1 && (
                <span className="hero-highlight">{highlight}</span>
              )}
            </span>
          ))}
        </h1>

        <p className="hero-subtitle animate-fade-in-up delay-200">
          {subtitle}
        </p>

        <div className="hero-actions animate-fade-in-up delay-400">
          {primaryAction && (
            <Button to={primaryAction.to} variant="accent" size="lg" id="hero-primary-cta">
              {primaryAction.label}
            </Button>
          )}
          {secondaryAction && (
            <Button to={secondaryAction.to} variant="white" size="lg" id="hero-secondary-cta">
              {secondaryAction.label}
            </Button>
          )}
        </div>

        {/* Stats */}
        <div className="hero-stats animate-fade-in-up delay-600">
          <div className="hero-stat">
            <span className="stat-number">15+</span>
            <span className="stat-label">Years Experience</span>
          </div>
          <div className="hero-stat-divider"></div>
          <div className="hero-stat">
            <span className="stat-number">50K+</span>
            <span className="stat-label">Happy Patients</span>
          </div>
          <div className="hero-stat-divider"></div>
          <div className="hero-stat">
            <span className="stat-number">30+</span>
            <span className="stat-label">Expert Doctors</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-indicator">
        <div className="scroll-mouse">
          <div className="scroll-wheel"></div>
        </div>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
};

export default Hero;
