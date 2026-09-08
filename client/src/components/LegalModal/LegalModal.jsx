import React, { useEffect } from 'react';
import { X, ShieldCheck, FileText, Lock } from 'lucide-react';
import './LegalModal.css';

const LegalModal = ({ isOpen, type, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const isPrivacy = type === 'privacy';

  return (
    <div className="legal-modal-backdrop" onClick={onClose}>
      <div className="legal-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="legal-modal-header">
          <div className="legal-header-icon-title">
            {isPrivacy ? (
              <Lock size={22} className="legal-header-icon" />
            ) : (
              <FileText size={22} className="legal-header-icon" />
            )}
            <div>
              <h3 className="legal-modal-title">
                {isPrivacy ? 'Privacy Policy' : 'Terms & Conditions'}
              </h3>
              <span className="legal-modal-sub">Nidarsanam Healthcare • Dr. Nidarsin (BNYS)</span>
            </div>
          </div>
          <button
            className="legal-modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="legal-modal-body">
          {isPrivacy ? (
            <div className="legal-content">
              <div className="legal-highlight-box">
                <ShieldCheck size={20} className="highlight-icon" />
                <p>
                  <strong>Patient Confidentiality Guarantee:</strong> Your health records and contact information are strictly confidential and protected under Indian Healthcare Data Protection standards. We do not sell or share patient data with third-party advertisers.
                </p>
              </div>

              <h4>1. Information We Collect</h4>
              <p>
                When you interact with Nidarsanam Healthcare through our website, appointment forms, WhatsApp, or clinic visits, we may collect:
              </p>
              <ul>
                <li><strong>Personal Identifiers:</strong> Name, age, phone number, email address, and city of residence.</li>
                <li><strong>Clinical Lifestyle Information:</strong> Primary health concerns, symptom history, daily routine challenges, dietary patterns, and consultation preferences (Online or In-Clinic).</li>
                <li><strong>Communication Records:</strong> Appointment notes, follow-up messages, and feedback provided to Dr. Nidarsin.</li>
              </ul>

              <h4>2. How We Use Your Information</h4>
              <p>Your information is used exclusively to:</p>
              <ul>
                <li>Schedule, confirm, and manage your clinical consultations in Dharmapuri or online video sessions.</li>
                <li>Conduct personalised Panchamahabhuta assessment and formulate tailored food and yoga plans.</li>
                <li>Communicate slot availability, appointment confirmations, and reminders via WhatsApp and email.</li>
                <li>Provide ongoing patient follow-up care and lifestyle reordering guidance.</li>
              </ul>

              <h4>3. Data Security & Confidentiality</h4>
              <p>
                We employ strict procedural and electronic security measures to safeguard all patient submissions. All digital forms are protected with industry-standard SSL encryption. Access to patient records is strictly restricted to Dr. Nidarsin and authorized clinical staff.
              </p>

              <h4>4. Your Rights & Consent</h4>
              <p>
                You retain full rights to access your consultation records, request updates to your contact details, or withdraw your consent for communications at any time by contacting us at <strong>nidarsanamhealthcare@gmail.com</strong> or calling <strong>+91 99523 38765</strong>.
              </p>
            </div>
          ) : (
            <div className="legal-content">
              <div className="legal-highlight-box">
                <ShieldCheck size={20} className="highlight-icon" />
                <p>
                  <strong>Holistic Lifestyle Practice:</strong> Services offered by Nidarsanam Healthcare are centered on classical Naturopathy, Panchamahabhuta assessment, traditional Indian nutrition, and therapeutic yoga led by Dr. Nidarsin (BNYS).
                </p>
              </div>

              <h4>1. Scope of Consultations & Guidance</h4>
              <p>
                Nidarsanam Healthcare provides personalised lifestyle reordering, natural therapies (such as acupuncture), and dietary guidance. Our consultations are designed to address the root causes of lifestyle and metabolic imbalances in a supportive, individualized manner.
              </p>

              <h4>2. Appointment Booking & Cancellations</h4>
              <ul>
                <li><strong>Booking Confirmation:</strong> Appointment requests submitted online are verified based on clinical schedule availability and confirmed via phone or WhatsApp.</li>
                <li><strong>Rescheduling & Cancellation:</strong> If you need to reschedule or cancel your consultation, kindly notify our clinic at least 24 hours in advance so the slot can be offered to another patient.</li>
              </ul>

              <h4>3. Online & In-Clinic Consultations</h4>
              <ul>
                <li><strong>In-Clinic Visits:</strong> Conducted at our registered clinic at <strong>3/850 D, Renuga Devi Kovil Street, Manthoppu, Dharmapuri, Tamil Nadu - 636701</strong>.</li>
                <li><strong>Online Teleconsultations:</strong> Patients are requested to ensure a quiet environment and stable connectivity for the duration of the consultation.</li>
              </ul>

              <h4>4. Intellectual Property</h4>
              <p>
                All editorial content, traditional nutrition guidance, articles in The Nidarsanam Journal, and proprietary methodologies (including The Nidarsanam Method™) are the intellectual property of Nidarsanam Healthcare.
              </p>

              <h4>5. Governing Law & Jurisdiction</h4>
              <p>
                These terms are governed by and construed in accordance with the laws of Tamil Nadu, India. For questions regarding these terms, please write to <strong>nidarsanamhealthcare@gmail.com</strong>.
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="legal-modal-footer">
          <button className="btn btn-primary btn-sm" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalModal;
