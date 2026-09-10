import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  ArrowRight,
  Sparkles,
  Compass,
  Eye,
  FileText,
  Utensils,
  Activity,
  Clock,
  RefreshCw,
  Leaf,
  Sun,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  HeartHandshake
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import PanchamahabhutaModal from '../../components/PanchamahabhutaModal';
import { WhatsAppIcon } from '../../components/WhatsAppButton/WhatsAppButton';
import { getElementIcon } from '../../components/ElementIcons';
import './Home.css';

const Home = () => {
  const { content } = useCMS();
  const homeData = content?.home || {};
  const [selectedElement, setSelectedElement] = useState(null);
  const [activeStep, setActiveStep] = useState(0);

  const hero = homeData.hero || {};
  const philosophy = homeData.philosophy || {};
  const panchamahabhuta = homeData.panchamahabhuta || {};
  const method = homeData.method || {};
  const approaches = homeData.approaches || [];
  const naturalTherapies = homeData.natural_therapies || {};
  const areasWeSupport = homeData.areas_we_support || {};
  const practitioner = homeData.practitioner || {};
  const finalCta = homeData.final_cta || {};

  // Method Icon Resolver
  const getMethodIcon = (iconName) => {
    switch (iconName) {
      case 'Compass': return <Compass size={22} />;
      case 'Eye': return <Eye size={22} />;
      case 'FileText': return <FileText size={22} />;
      case 'Utensils': return <Utensils size={22} />;
      case 'Activity': return <Activity size={22} />;
      case 'Clock': return <Clock size={22} />;
      case 'RefreshCw': return <RefreshCw size={22} />;
      default: return <Sparkles size={22} />;
    }
  };

  return (
    <div className="home-page-root">
      {/* 1. HERO SECTION */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-grid">
            {/* Left Content */}
            <div className="hero-content">
              <div className="hero-badge animate-fade-in">
                <Sparkles size={14} className="hero-badge-sparkle" />
                <span>Roots & Elements Lifestyle Health</span>
              </div>

              <h1 className="hero-title animate-fade-in">
                {hero.headline || 'Rebuild Your Health. Return to Your Roots.'}
              </h1>

              <p className="hero-subtitle animate-fade-in">
                {hero.subheadline || 'A personalised lifestyle approach rooted in traditional Indian food, therapeutic yoga and a deeper understanding of the individual.'}
              </p>

              <div className="hero-supporting-box animate-fade-in">
                <span className="hero-supporting-tag">Core Approach:</span>
                <p className="hero-supporting-text">
                  {hero.supporting_line || 'Panchamahabhuta-based assessment • Traditional Food • Therapeutic Yoga • Lifestyle Reordering'}
                </p>
              </div>

              <div className="hero-cta-group animate-fade-in">
                <Link to="/contact" className="btn btn-primary btn-lg" id="hero-primary-cta">
                  <Calendar size={18} />
                  <span>{hero.primary_cta_text || 'Book an Appointment'}</span>
                </Link>
                <a
                  href={`https://wa.me/919952338765?text=${encodeURIComponent('Hello Nidarsanam Healthcare, I would like to enquire about a consultation.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp-hero btn-lg"
                  id="hero-whatsapp-cta"
                  aria-label="Chat on WhatsApp at 9952338765"
                >
                  <WhatsAppIcon size={19} />
                  <span>WhatsApp: 99523 38765</span>
                </a>
                <a href="#philosophy" className="btn btn-secondary btn-lg" id="hero-secondary-cta">
                  <span>{hero.secondary_cta_text || 'Discover Our Approach'}</span>
                  <ArrowRight size={16} />
                </a>
              </div>

              {/* Mini Trust Bar */}
              <div className="hero-trust-bar">
                <div className="hero-trust-item">
                  <ShieldCheck size={18} className="trust-icon" />
                  <span>BNYS Physician Guided</span>
                </div>
                <span className="trust-divider">•</span>
                <div className="hero-trust-item">
                  <Leaf size={18} className="trust-icon" />
                  <span>100% Traditional Indian Diet</span>
                </div>
                <span className="trust-divider">•</span>
                <div className="hero-trust-item">
                  <Activity size={18} className="trust-icon" />
                  <span>Therapeutic Yoga</span>
                </div>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="hero-media-wrap animate-float">
              <div className="hero-image-card">
                <img
                  src={hero.hero_image || 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1200&q=80'}
                  alt="Authentic traditional Indian food beautifully arranged"
                  className="hero-main-image"
                />
                <div className="hero-floating-badge">
                  <div className="floating-badge-icon">🌿</div>
                  <div className="floating-badge-text">
                    <strong>Panchamahabhuta</strong>
                    <span>Personalised Assessment</span>
                  </div>
                </div>
                <div className="hero-floating-pill">
                  <span>Consultations Online & In Dharmapuri Clinic</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE NIDARSANAM PHILOSOPHY */}
      <section className="section section-white" id="philosophy">
        <div className="container">
          <div className="philosophy-grid">
            <div className="philosophy-left">
              <span className="section-eyebrow">The Nidarsanam Philosophy</span>
              <div className="quote-box philosophy-quote-box">
                <blockquote className="quote-statement">
                  "{philosophy.large_statement || "We don't begin with the condition. We begin by understanding the individual."}"
                </blockquote>
              </div>
              <div className="philosophy-text">
                {(philosophy.supporting_text || '').split('\n\n').map((paragraph, index) => (
                  <p key={index} className="lead">{paragraph}</p>
                ))}
              </div>
              <Link to="/about" className="btn btn-secondary btn-inline mt-4">
                <span>{philosophy.cta_text || 'Explore Our Approach'}</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="philosophy-right">
              <div className="philosophy-image-wrap">
                <img
                  src={philosophy.image || 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1000&q=80'}
                  alt="Holistic healthcare concept"
                  className="philosophy-image"
                />
                <div className="philosophy-tag-card">
                  <HeartHandshake size={24} className="tag-card-icon" />
                  <div>
                    <h4>Individualized Care</h4>
                    <p>No generic, one-size-fits-all protocols.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PANCHAMAHABHUTA FRAMEWORK */}
      <section className="section section-sage" id="panchamahabhuta">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Roots & Elements</span>
            <h2 className="section-title">{panchamahabhuta.heading || 'Understand Before You Reorder.'}</h2>
            <p className="section-subtitle">{panchamahabhuta.subheading || 'Our assessment begins with the individual through the lens of the five fundamental elements.'}</p>
          </div>

          {/* 5 Interactive Cards */}
          <div className="grid-5 panchamahabhuta-grid">
            {(panchamahabhuta.elements || []).map((element) => (
              <div
                key={element.id}
                className={`card element-card element-card-${element.colorKey || 'akasa'}`}
                onClick={() => setSelectedElement(element)}
                role="button"
                tabIndex={0}
              >
                <div className={`element-icon-box element-icon-${element.colorKey || element.id || 'akasa'}`}>
                  {getElementIcon(element.id || element.colorKey, 28)}
                </div>
                <div className="element-names">
                  <h3 className="element-sanskrit">{element.name}</h3>
                  <span className="element-english">{element.english}</span>
                </div>
                <p className="element-attr">{element.attribute}</p>
                <p className="element-desc">{element.description}</p>
                <span className="element-explore-link">
                  Explore Element <ChevronRight size={14} />
                </span>
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <div className="disclaimer-box mt-5">
            <ShieldCheck size={20} />
            <p>{panchamahabhuta.disclaimer || 'Panchamahabhuta is a traditional framework and does not replace conventional medical diagnosis, laboratory testing or emergency medical care.'}</p>
          </div>
        </div>
      </section>

      {/* 4. THE NIDARSANAM METHOD™ (VISUAL TIMELINE) */}
      <section className="section section-white" id="method">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">The Nidarsanam Method™</span>
            <h2 className="section-title">
              {method.heading && !method.heading.includes('different')
                ? method.heading
                : 'The Right Way to approach lifestyle health.'}
            </h2>
            <p className="section-subtitle">{method.subheading || 'A clear 7-step roadmap from root assessment to sustainable vitality.'}</p>
          </div>

          {/* Interactive Timeline */}
          <div className="timeline-wrapper">
            <div className="timeline-progress-bar" />
            <div className="timeline-grid">
              {(method.steps || []).map((step, idx) => (
                <div
                  key={step.number}
                  className={`timeline-step ${activeStep === idx ? 'timeline-step-active' : ''}`}
                  onClick={() => setActiveStep(idx)}
                >
                  <div className="timeline-node">
                    <span className="timeline-node-number">{step.number}</span>
                    <div className="timeline-node-icon">
                      {getMethodIcon(step.icon)}
                    </div>
                  </div>
                  <div className="timeline-content">
                    <h3 className="timeline-title">{step.title}</h3>
                    <p className="timeline-desc">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. THREE CORE APPROACHES */}
      <section className="section" id="approaches">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Our Three Pillars</span>
            <h2 className="section-title">Personalised Pathways to Lasting Health</h2>
            <p className="section-subtitle">Blending indigenous food traditions, mindful physical therapy, and daily habit reordering.</p>
          </div>

          <div className="grid-3 approaches-grid">
            {approaches.map((approach) => (
              <div key={approach.id} className="card approach-card">
                <div className="approach-img-wrap">
                  <img src={approach.image} alt={approach.title} className="approach-img" />
                  <span className="approach-badge">{approach.subtitle?.replace(/\s*Dinacharya\s*&?\s*/gi, '').trim() || approach.subtitle}</span>
                </div>
                <div className="approach-content">
                  <h3 className="approach-title">{approach.title}</h3>
                  <p className="approach-desc">{approach.description}</p>
                  <ul className="approach-highlights">
                    {(approach.highlights || []).map((item, idx) => (
                      <li key={idx}>
                        <CheckCircle2 size={15} className="highlight-icon" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to={approach.cta_link || '/about'} className="btn btn-secondary btn-sm approach-cta">
                    <span>{approach.cta_text || 'Learn More'}</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. NATURAL THERAPIES */}
      <section className="section section-sage" id="natural-therapies">
        <div className="container">
          <div className="natural-therapies-card">
            <div className="natural-therapies-header">
              <span className="section-eyebrow">Complementary Care</span>
              <h2 className="natural-therapies-title">{naturalTherapies.heading || 'Personalised Support Beyond Food'}</h2>
              <p className="natural-therapies-lead">
                {naturalTherapies.description || 'Where appropriate, our approach may also incorporate naturopathic and natural therapeutic modalities such as acupuncture alongside lifestyle-based interventions.'}
              </p>
            </div>

            <div className="grid-3 therapies-badges-grid">
              {(naturalTherapies.therapies || []).map((therapy, idx) => {
                const isNaturopathic = therapy.name?.toLowerCase().includes('naturopathic');
                const desc = isNaturopathic && therapy.description?.includes('Hydrotherapy')
                  ? 'natural modalities to aid metabolic and elimination and increase vital energy.'
                  : therapy.description;
                return (
                  <div key={idx} className="therapy-pill-card">
                    <div className="therapy-icon-box">
                      <Sparkles size={20} />
                    </div>
                    <h4 className="therapy-name">{therapy.name}</h4>
                    <p className="therapy-desc">{desc}</p>
                  </div>
                );
              })}
            </div>

            <div className="therapy-note">
              <ShieldCheck size={16} />
              <span>Non-invasive, evidence-informed modalities prescribed strictly based on individual clinical evaluation.</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. AREAS WE SUPPORT */}
      <section className="section section-white" id="areas">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Clinical Lifestyle Focus</span>
            <h2 className="section-title">{areasWeSupport.heading || 'Lifestyle Support for Better Health'}</h2>
            <p className="section-subtitle">{areasWeSupport.subheading || 'Our approach is personalised to the individual and is not a one-size-fits-all protocol.'}</p>
          </div>

          <div className="grid-4 areas-grid">
            {(() => {
              const currentAreas = areasWeSupport.areas || [];
              const hasInsomnia = currentAreas.some(a => a.title?.toLowerCase().includes('insomnia'));
              const itemsToRender = hasInsomnia
                ? currentAreas
                : [
                    ...currentAreas,
                    { title: 'Insomnia', description: 'Restoring circadian sleep architecture, nervous system relaxation, and natural melatonin rhythm without dependence on sedatives.' },
                    { title: 'Skin-Related Disorders', description: 'Root-cause management for chronic skin concerns, eczema, psoriasis, and acne through gut-skin axis harmony and natural blood purification.' },
                    { title: 'Psychological Counseling', description: 'Compassionate mind-body guidance, stress modulation, emotional balance, and therapeutic relaxation techniques.' },
                    { title: 'Pain Management Without Steroids', description: 'Non-steroidal pain relief through clinical acupuncture, anti-inflammatory natural nutrition, and therapeutic yoga alignment.' },
                    { title: 'All Kinds of Lifestyle Disorders', description: 'Holistic assessment and individualized lifestyle reordering for chronic modern lifestyle and metabolic conditions.' }
                  ];

              return itemsToRender.map((area, idx) => (
                <div key={idx} className="card area-card">
                  <div className="area-icon-dot" />
                  <h3 className="area-title">{area.title}</h3>
                  <p className="area-desc">{area.description}</p>
                </div>
              ));
            })()}
          </div>

          <div className="areas-footer-note">
            <p className="lead text-center">
              We focus on restoring digestive fire, hormonal balance, and nervous system ease without extreme starvation diets or exaggerated claims.
            </p>
          </div>
        </div>
      </section>

      {/* 8. ABOUT THE PRACTITIONER */}
      <section className="section section-sage" id="practitioner">
        <div className="container">
          <div className="practitioner-card">
            <div className="practitioner-grid">
              {/* Photo */}
              <div className="practitioner-photo-col">
                <div className="practitioner-photo-wrap">
                  <img
                    src={practitioner.image || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80'}
                    alt={practitioner.name || 'Dr. Nidarsin'}
                    className="practitioner-photo"
                  />
                  <div className="practitioner-photo-tag">
                    <ShieldCheck size={16} />
                    <span>Naturopathy Physician</span>
                  </div>
                </div>
              </div>

              {/* Bio Details */}
              <div className="practitioner-info-col">
                <span className="section-eyebrow">Medical & Holistic Leadership</span>
                <h2 className="practitioner-name">{practitioner.name || 'Dr. Nidarsin'}</h2>
                <div className="practitioner-qual-badge">
                  <span>{practitioner.qualification || 'BNYS'}</span>
                </div>
                <p className="practitioner-title-text">{practitioner.title || 'Naturopathy Physician'}</p>

                <div className="practitioner-bio-blocks">
                  <div className="practitioner-block">
                    <h4>Qualifications & Clinical Background</h4>
                    <p>{practitioner.qualifications_text}</p>
                  </div>
                  <div className="practitioner-block">
                    <h4>Clinical Philosophy</h4>
                    <p>{practitioner.philosophy_text}</p>
                  </div>
                </div>

                <Link to={practitioner.cta_link || '/about'} className="btn btn-primary btn-inline mt-3">
                  <span>{practitioner.cta_text || 'About Nidarsanam Healthcare'}</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FINAL CTA */}
      <section className="section section-forest final-cta-section">
        <div className="container text-center">
          <div className="final-cta-content">
            <span className="section-eyebrow">Begin Your Transformation</span>
            <h2 className="final-cta-title text-white">{finalCta.heading || 'Ready to Reorder Your Lifestyle?'}</h2>
            <p className="final-cta-subtitle">
              {finalCta.subheadline || 'Start with understanding. Build a plan that fits your life.'}
            </p>

            <div className="final-cta-buttons">
              <Link to={finalCta.primary_button_link || '/contact'} className="btn btn-gold btn-lg">
                <Calendar size={18} />
                <span>{finalCta.primary_button_text || 'Book an Appointment'}</span>
              </Link>
              <a
                href={`https://wa.me/919952338765?text=${encodeURIComponent('Hello Nidarsanam Healthcare, I would like to enquire about a consultation.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp-hero btn-lg"
                aria-label="Chat on WhatsApp at 9952338765"
              >
                <WhatsAppIcon size={20} />
                <span>WhatsApp: 99523 38765</span>
              </a>
              <Link to={finalCta.secondary_button_link || '/contact'} className="btn btn-outline-white btn-lg">
                <span>{finalCta.secondary_button_text || 'Contact Us'}</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Panchamahabhuta Modal */}
      {selectedElement && (
        <PanchamahabhutaModal
          element={selectedElement}
          onClose={() => setSelectedElement(null)}
        />
      )}
    </div>
  );
};

export default Home;
