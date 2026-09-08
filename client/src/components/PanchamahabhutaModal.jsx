import { X, Sparkles, Activity, ShieldCheck } from 'lucide-react';
import { getElementIcon } from './ElementIcons';
import './PanchamahabhutaModal.css';

const PanchamahabhutaModal = ({ element, onClose }) => {
  if (!element) return null;

  return (
    <div className="pm-modal-backdrop" onClick={onClose}>
      <div className="pm-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={`pm-modal-header pm-header-${element.colorKey || 'akasa'}`}>
          <div className="pm-modal-badge">
            <div className="pm-modal-icon-wrap">
              {getElementIcon(element.id || element.colorKey, 24)}
            </div>
            <div>
              <span className="pm-modal-sanskrit">{element.name}</span>
              <span className="pm-modal-english">({element.english})</span>
            </div>
          </div>
          <button className="pm-modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="pm-modal-body">
          <div className="pm-modal-attribute-box">
            <Sparkles size={18} className="pm-attr-icon" />
            <div>
              <span className="pm-attr-label">Primary Attribute:</span>
              <p className="pm-attr-value">{element.attribute}</p>
            </div>
          </div>

          <div className="pm-modal-section">
            <h4 className="pm-section-title">Core Elemental Description</h4>
            <p className="pm-section-text">{element.description}</p>
          </div>

          <div className="pm-modal-section">
            <h4 className="pm-section-title">Physiological & Clinical Significance</h4>
            <p className="pm-section-text">{element.significance || element.description}</p>
          </div>

          <div className="pm-modal-card">
            <div className="pm-card-title-row">
              <Activity size={16} />
              <span>How Nidarsanam Balances {element.name}</span>
            </div>
            <p className="pm-card-desc">
              During your diagnostic assessment, Dr. Nidarsin evaluates how {element.english.toLowerCase()} manifests in your digestion, tissues, and daily routine, tailoring specific traditional Indian foods, therapeutic Asanas, and Pranayama to restore equilibrium.
            </p>
          </div>

          <div className="pm-modal-disclaimer">
            <ShieldCheck size={16} />
            <span>Panchamahabhuta is a classical traditional assessment framework and complements holistic lifestyle medicine.</span>
          </div>
        </div>

        <div className="pm-modal-footer">
          <button className="btn btn-primary btn-sm" onClick={onClose}>
            Close Explorer
          </button>
        </div>
      </div>
    </div>
  );
};

export default PanchamahabhutaModal;
