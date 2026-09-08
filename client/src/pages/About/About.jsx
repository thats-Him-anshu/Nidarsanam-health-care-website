import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  ArrowRight,
  Sparkles,
  Utensils,
  Activity,
  Sun,
  ShieldCheck,
  CheckCircle2,
  HeartHandshake,
  Award,
  BookOpen,
  ChevronRight
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import PanchamahabhutaModal from '../../components/PanchamahabhutaModal';
import { getElementIcon } from '../../components/ElementIcons';
import './About.css';

const About = () => {
  const { content } = useCMS();
  const aboutData = content?.about || {};
  const panchamahabhuta = content?.home?.panchamahabhuta || {};
  const [selectedElement, setSelectedElement] = useState(null);

  const hero = aboutData.hero || {};
  const story = aboutData.story || {};
  const philosophyQuote = aboutData.philosophy_quote || {};
  const fivePillars = aboutData.five_pillars || [];
  const practitioner = aboutData.practitioner_detail || {};
  const differentiators = aboutData.differentiators || [];
  const promise = aboutData.promise || {};

  const getPillarIcon = (iconName) => {
    switch (iconName) {
      case 'Utensils': return <Utensils size={24} />;
      case 'Activity': return <Activity size={24} />;
      case 'Sun': return <Sun size={24} />;
      case 'Sparkles': return <Sparkles size={24} />;
      case 'CheckCircle2': return <CheckCircle2 size={24} />;
      default: return <Sparkles size={24} />;
    }
  };

  return (
    <div className="about-page-root">
      {/* 1. HERO */}
      <section className="about-hero-section">
        <div className="container">
          <div className="about-hero-content">
            <span className="section-eyebrow animate-fade-in">Our Heritage & Purpose</span>
            <h1 className="about-hero-title animate-fade-in">
              {hero.headline && !hero.headline.includes('Different')
                ? hero.headline
                : 'The Right Way to Look at Health.'}
            </h1>
            <p className="about-hero-subtitle animate-fade-in">
              {hero.subheadline || 'Understanding the individual before designing the approach.'}
            </p>
          </div>
        </div>
      </section>

      {/* 2. OUR STORY */}
      <section className="section section-white">
        <div className="container">
          <div className="story-grid">
            <div className="story-media-wrap">
              <div className="story-image-card">
                <img
                  src={hero.image || 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80'}
                  alt="Nidarsanam Healthcare Story"
                  className="story-img"
                />
                <div className="story-floating-stat">
                  <span className="story-stat-number">100%</span>
                  <span className="story-stat-label">Individualized Lifestyle Pathways</span>
                </div>
              </div>
            </div>

            <div className="story-text-col">
              <span className="section-eyebrow">Our Journey</span>
              <h2 className="story-heading">{story.heading || 'Why Nidarsanam?'}</h2>
              <div className="story-paragraphs">
                {(story.paragraphs || []).map((paragraph, index) => (
                  <p key={index} className="lead story-para">{paragraph}</p>
                ))}
              </div>
              <div className="story-features">
                <div className="story-feature-item">
                  <CheckCircle2 size={18} className="feature-check" />
                  <span>Evidence-conscious naturopathic medicine</span>
                </div>
                <div className="story-feature-item">
                  <CheckCircle2 size={18} className="feature-check" />
                  <span>Respect for regional Indian food biodiversity</span>
                </div>
                <div className="story-feature-item">
                  <CheckCircle2 size={18} className="feature-check" />
                  <span>Therapeutic yoga tailored to individual anatomy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR PHILOSOPHY (LARGE QUOTE) */}
      <section className="section section-sage">
        <div className="container container-narrow text-center">
          <span className="section-eyebrow">Guiding Principle</span>
          <div className="quote-box about-philosophy-quote">
            <blockquote className="about-quote-text">
              "{philosophyQuote.quote || "We don't begin with the condition. We begin by understanding the individual."}"
            </blockquote>
            <p className="about-quote-explanation">
              {philosophyQuote.explanation || 'Every person has a different food pattern, routine, sleep schedule, movement pattern, environment and lifestyle. Therefore, Nidarsanam follows a personalised approach rather than applying the same plan to everyone.'}
            </p>
          </div>
        </div>
      </section>

      {/* 4. PANCHAMAHABHUTA FRAMEWORK EXPLAINED */}
      <section className="section section-white" id="panchamahabhuta">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Assessment Framework</span>
            <h2 className="section-title">The Five Elements (Panchamahabhuta)</h2>
            <p className="section-subtitle">
              Classical Indian medicine views the human body as an expression of five primordial forces. Understanding which elements are depleted or aggravated forms the foundation of our work.
            </p>
          </div>

          <div className="grid-5 panchamahabhuta-about-grid">
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
                <h3 className="element-sanskrit">{element.name}</h3>
                <span className="element-english">{element.english}</span>
                <p className="element-attr">{element.attribute}</p>
                <p className="element-desc">{element.description}</p>
                <span className="element-explore-link">
                  Explore <ChevronRight size={13} />
                </span>
              </div>
            ))}
          </div>

          <div className="disclaimer-box mt-5">
            <ShieldCheck size={20} />
            <p>Panchamahabhuta is a traditional assessment framework and does not replace conventional medical diagnosis, laboratory pathology, or emergency care.</p>
          </div>
        </div>
      </section>

      {/* 5. FIVE VISUAL PILLARS */}
      <section className="section section-sage" id="pillars">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Our Clinical Methodology</span>
            <h2 className="section-title">The Five Visual Pillars</h2>
            <p className="section-subtitle">A comprehensive architecture integrating every facet of your lifestyle.</p>
          </div>

          <div className="grid-5 pillars-grid">
            {fivePillars.map((pillar) => {
              let desc = pillar.description;
              if (pillar.title === 'LIFESTYLE' || pillar.number === '3') {
                desc = desc.replace(/\s*\(Dinacharya\)/gi, '').replace(/\s*Dinacharya/gi, '');
              }
              if (pillar.title === 'NATURAL THERAPIES' || pillar.number === '4') {
                desc = desc.replace('herbal applications', 'naturopathy applications');
              }
              return (
                <div key={pillar.number} className="card pillar-card">
                  <div className="pillar-top">
                    <span className="pillar-num">{pillar.number}</span>
                    <div className="pillar-icon-box">
                      {getPillarIcon(pillar.icon)}
                    </div>
                  </div>
                  <h3 className="pillar-title">{pillar.title}</h3>
                  <p className="pillar-desc">{desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. MEET DR. NIDARSIN */}
      <section className="section section-white" id="doctor">
        <div className="container">
          <div className="practitioner-deep-card">
            <div className="practitioner-deep-grid">
              <div className="practitioner-deep-photo-col">
                <div className="practitioner-deep-img-wrap">
                  <img
                    src={practitioner.image || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80'}
                    alt={practitioner.name || 'Dr. Nidarsin, BNYS'}
                    className="practitioner-deep-img"
                  />
                  <div className="practitioner-deep-badge">
                    <Award size={18} />
                    <span>BNYS Naturopathy Physician</span>
                  </div>
                </div>
              </div>

              <div className="practitioner-deep-info-col">
                <span className="section-eyebrow">Meet Your Physician</span>
                <h2 className="practitioner-deep-name">{practitioner.name || 'Dr. Nidarsin, BNYS'}</h2>
                <p className="practitioner-deep-title">{practitioner.title || 'Naturopathy Physician & Lifestyle Medicine Specialist'}</p>

                <div className="practitioner-deep-sections">
                  <div className="deep-section-item">
                    <div className="deep-section-header">
                      <BookOpen size={16} className="deep-icon" />
                      <h4>Educational Qualifications</h4>
                    </div>
                    <p>{practitioner.educational_qualification}</p>
                  </div>

                  <div className="deep-section-item">
                    <div className="deep-section-header">
                      <Award size={16} className="deep-icon" />
                      <h4>Professional Background</h4>
                    </div>
                    <p>{practitioner.professional_background}</p>
                  </div>

                  <div className="deep-section-item">
                    <div className="deep-section-header">
                      <HeartHandshake size={16} className="deep-icon" />
                      <h4>Clinical Philosophy</h4>
                    </div>
                    <p>{practitioner.clinical_philosophy}</p>
                  </div>

                  <div className="deep-section-item">
                    <div className="deep-section-header">
                      <Sparkles size={16} className="deep-icon" />
                      <h4>Areas of Special Focus</h4>
                    </div>
                    <p>{practitioner.areas_of_interest}</p>
                  </div>

                  <div className="deep-section-item">
                    <div className="deep-section-header">
                      <ShieldCheck size={16} className="deep-icon" />
                      <h4>Patient Care Approach</h4>
                    </div>
                    <p>{practitioner.patient_care_approach}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. WHAT MAKES NIDARSANAM DIFFERENT? (6-CARD GRID) */}
      <section className="section section-sage" id="difference">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Distinctive Care</span>
            <h2 className="section-title">What Makes Nidarsanam Different?</h2>
            <p className="section-subtitle">Six fundamental principles that set our clinical practice apart.</p>
          </div>

          <div className="grid-3 diff-grid">
            {differentiators.map((diff) => (
              <div key={diff.id} className="card diff-card">
                <div className="diff-header">
                  <span className="diff-number">0{diff.id}</span>
                  <h3 className="diff-title">{diff.title}</h3>
                </div>
                <p className="diff-desc">{diff.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. OUR PROMISE */}
      <section className="section section-forest promise-section">
        <div className="container text-center">
          <div className="promise-box">
            <span className="section-eyebrow">Our Commitment to You</span>
            <h2 className="promise-title text-white">{promise.statement || 'Understand. Personalise. Reorder.'}</h2>
            <p className="promise-text">
              {promise.supporting_text || 'We aim to make healthy living practical, understandable and sustainable for you and your family.'}
            </p>
            <div className="promise-cta-wrap mt-4">
              <Link to="/contact" className="btn btn-gold btn-lg">
                <Calendar size={18} />
                <span>Begin Your Journey</span>
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

export default About;
