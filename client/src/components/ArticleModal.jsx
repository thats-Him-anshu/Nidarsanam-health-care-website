import { Link } from 'react-router-dom';
import { X, Clock, Calendar, User, Tag, CheckCircle2, ShieldAlert, ArrowRight, Share2, Sparkles } from 'lucide-react';
import './ArticleModal.css';

const ArticleModal = ({ article, relatedArticles = [], onClose, onSelectRelated }) => {
  if (!article) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Article link copied to clipboard!');
    }
  };

  return (
    <div className="article-modal-backdrop" onClick={onClose}>
      <div className="article-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Modal Top Bar */}
        <div className="article-modal-topbar">
          <div className="article-modal-breadcrumb">
            <span className="article-top-tag">{article.category_name || 'Health Journal'}</span>
            <span className="article-top-dot">•</span>
            <span className="article-top-read"><Clock size={13} /> {article.reading_time_minutes || 5} min read</span>
          </div>
          <div className="article-top-actions">
            <button className="article-share-btn" onClick={handleShare} title="Share article">
              <Share2 size={16} />
              <span>Share</span>
            </button>
            <button className="article-close-btn" onClick={onClose} aria-label="Close article">
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="article-modal-scroll-area">
          {/* Header */}
          <div className="article-hero-section">
            <h1 className="article-title">{article.title}</h1>
            
            <div className="article-meta-row">
              <div className="article-author-info">
                <User size={16} className="article-meta-icon" />
                <span>{article.author || 'Dr. Nidarsin, BNYS'}</span>
              </div>
              <span className="article-meta-divider">|</span>
              <div className="article-date-info">
                <Calendar size={16} className="article-meta-icon" />
                <span>{article.published_at || 'Recent'}</span>
              </div>
              <span className="article-meta-divider">|</span>
              <div className="article-cat-info">
                <Tag size={16} className="article-meta-icon" />
                <span>{article.category_name}</span>
              </div>
            </div>

            {article.featured_image_url && (
              <div className="article-featured-img-wrap">
                <img
                  src={article.featured_image_url}
                  alt={article.title}
                  className="article-featured-img"
                />
              </div>
            )}

            {article.excerpt && (
              <p className="article-lead-excerpt">{article.excerpt}</p>
            )}
          </div>

          {/* Key Takeaways Box */}
          {article.key_takeaways && article.key_takeaways.length > 0 && (
            <div className="article-takeaways-card">
              <div className="article-takeaways-header">
                <Sparkles size={18} className="takeaways-icon" />
                <h3>Key Clinical Takeaways</h3>
              </div>
              <ul className="article-takeaways-list">
                {article.key_takeaways.map((takeaway, idx) => (
                  <li key={idx}>
                    <CheckCircle2 size={16} className="takeaway-check" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Main Article Body */}
          <div
            className="article-rich-body"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Medical Disclaimer Box */}
          <div className="article-disclaimer-box">
            <ShieldAlert size={22} className="article-disclaimer-icon" />
            <div>
              <strong>Medical Disclaimer:</strong>
              <p>
                Content on this website is intended for general educational purposes and should not be considered a substitute for individual medical diagnosis, prescription medications, or laboratory pathology tests.
              </p>
            </div>
          </div>

          {/* In-Article CTA Banner */}
          <div className="article-cta-banner">
            <div className="article-cta-text">
              <h3>Need Personalised Guidance?</h3>
              <p>Book a Panchamahabhuta assessment and tailored Indian food & lifestyle roadmap with Dr. Nidarsin (BNYS).</p>
            </div>
            <Link to="/contact" onClick={onClose} className="btn btn-gold btn-article-cta">
              <span>Book an Appointment</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="article-related-section">
              <h3 className="related-title">Related Journal Articles</h3>
              <div className="related-grid">
                {relatedArticles.slice(0, 3).map((rel) => (
                  <div
                    key={rel._id}
                    className="related-card"
                    onClick={() => onSelectRelated && onSelectRelated(rel)}
                  >
                    <img
                      src={rel.featured_image_url}
                      alt={rel.title}
                      className="related-img"
                    />
                    <div className="related-card-content">
                      <span className="related-badge">{rel.category_name}</span>
                      <h4 className="related-card-title">{rel.title}</h4>
                      <span className="related-read-link">
                        Read Article <ArrowRight size={13} />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleModal;
