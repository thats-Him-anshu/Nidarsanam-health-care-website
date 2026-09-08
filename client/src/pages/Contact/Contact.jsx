import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Calendar,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Globe,
  Building,
  Navigation
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import './Contact.css';

const Contact = () => {
  const { content, submitLead } = useCMS();
  const [searchParams] = useSearchParams();
  const typeParam = searchParams.get('type');

  const contactData = content?.contact || {};
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

  const hero = contactData.hero || {};
  const formSettings = contactData.form_settings || {};
  const consultationOptions = contactData.consultation_options || {};
  const whenToContact = contactData.when_to_contact || [];
  const faqs = contactData.faqs || [];

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    phone: '',
    email: '',
    city: '',
    consultation_type: typeParam === 'offline' ? 'Offline' : 'Online',
    health_concern: 'Type 2 Diabetes & Blood Sugar',
    preferred_date: '',
    preferred_time: '10:00 AM - 01:00 PM (Morning)',
    additional_message: '',
    consent: true
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);

  // FAQ Accordion State
  const [expandedFaq, setExpandedFaq] = useState(null);

  // Calculate min date (tomorrow)
  const tomorrowStr = new Date(Date.now() + 24 * 3600 * 1000).toISOString().slice(0, 10);

  useEffect(() => {
    if (typeParam === 'offline') {
      setFormData((prev) => ({ ...prev, consultation_type: 'Offline' }));
    } else if (typeParam === 'online') {
      setFormData((prev) => ({ ...prev, consultation_type: 'Online' }));
    }
  }, [typeParam]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Full Name is required';
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else {
      const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
      if (cleanPhone.length < 10) {
        errors.phone = 'Please enter a valid 10-digit Indian phone number';
      }
    }
    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formData.health_concern.trim()) {
      errors.health_concern = 'Please select or describe your primary health concern';
    }
    if (!formData.consent) {
      errors.consent = 'Consent is required to submit your consultation request';
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await submitLead(formData);
      setSubmitResult(result);
      setIsSubmitting(false);
    } catch (err) {
      setIsSubmitting(false);
      setFormErrors({ submit: err.message || 'Submission failed. Please try again or WhatsApp us directly.' });
    }
  };

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const selectConsultationType = (type) => {
    setFormData((prev) => ({ ...prev, consultation_type: type }));
    const formElement = document.getElementById('booking-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="contact-page-root">
      {/* 1. HERO */}
      <section className="contact-hero-section">
        <div className="container">
          <div className="contact-hero-content">
            <span className="section-eyebrow animate-fade-in">Schedule Your Consultation</span>
            <h1 className="contact-hero-title animate-fade-in">
              {hero.headline || "Let's Begin Your Health Journey."}
            </h1>
            <p className="contact-hero-subtitle animate-fade-in">
              {hero.subheadline || 'Whether you are visiting us online from anywhere in the world or in person at our clinic, your journey begins with a conversation.'}
            </p>
          </div>
        </div>
      </section>

      <div className="container contact-main-container">
        {/* 2. CONSULTATION OPTIONS (ONLINE / OFFLINE CARDS) */}
        <div className="consultation-types-grid">
          {/* Online Option */}
          <div
            className={`card consult-card ${formData.consultation_type === 'Online' ? 'consult-card-selected' : ''}`}
            onClick={() => selectConsultationType('Online')}
          >
            <div className="consult-badge">
              <Globe size={16} />
              <span>{consultationOptions.online?.badge || 'Available Worldwide'}</span>
            </div>
            <h3 className="consult-title">{consultationOptions.online?.title || 'Online Consultation'}</h3>
            <p className="consult-desc">
              {consultationOptions.online?.description || 'Comprehensive video consultation suitable for people across India & globally. Detailed assessment & digital guidance.'}
            </p>
            <button className="btn btn-secondary btn-sm consult-select-btn">
              <span>{formData.consultation_type === 'Online' ? '✓ Selected for Booking' : 'Book Online Consultation'}</span>
            </button>
          </div>

          {/* Offline Option */}
          <div
            className={`card consult-card ${formData.consultation_type === 'Offline' ? 'consult-card-selected' : ''}`}
            onClick={() => selectConsultationType('Offline')}
          >
            <div className="consult-badge">
              <Building size={16} />
              <span>{consultationOptions.offline?.badge || 'Clinic Visit (Dharmapuri)'}</span>
            </div>
            <h3 className="consult-title">{consultationOptions.offline?.title || 'In-Clinic Consultation'}</h3>
            <p className="consult-desc">
              {consultationOptions.offline?.description || 'In-person clinical evaluation and therapies at Nidarsanam Healthcare, Dharmapuri, Tamil Nadu. Ideal for hands-on assessment.'}
            </p>
            <button className="btn btn-secondary btn-sm consult-select-btn">
              <span>{formData.consultation_type === 'Offline' ? '✓ Selected for Booking' : 'Book Clinic Consultation'}</span>
            </button>
          </div>
        </div>

        {/* 3. MAIN FORM & QUICK INFO GRID */}
        <div className="form-and-info-grid" id="booking-form">
          {/* Left: Booking Form */}
          <div className="booking-form-wrapper card">
            {submitResult ? (
              <div className="booking-success-box animate-fade-in">
                <div className="success-icon-wrap">
                  <CheckCircle2 size={56} className="success-icon" />
                </div>
                <h2 className="success-title">Appointment Request Received</h2>
                <p className="success-desc">
                  {submitResult.confirmation_message || formSettings.success_message}
                </p>

                <div className="success-summary-card">
                  <div className="summary-row">
                    <span>Patient Name:</span>
                    <strong>{formData.name}</strong>
                  </div>
                  <div className="summary-row">
                    <span>Consultation Type:</span>
                    <strong>{formData.consultation_type} Consultation</strong>
                  </div>
                  <div className="summary-row">
                    <span>Preferred Date & Slot:</span>
                    <strong>{formData.preferred_date || 'Flexible'} • {formData.preferred_time}</strong>
                  </div>
                  <div className="summary-row">
                    <span>Health Concern:</span>
                    <strong>{formData.health_concern}</strong>
                  </div>
                </div>

                <div className="success-actions">
                  <a
                    href={`https://wa.me/${(settings.whatsapp_number || '919952338765').replace(/[^0-9]/g, '')}?text=Hello%20Dr.%20Nidarsin,%20I%20have%20submitted%20an%20appointment%20request%20for%20${encodeURIComponent(formData.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    <MessageCircle size={18} />
                    <span>Quick Confirm on WhatsApp</span>
                  </a>
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      setSubmitResult(null);
                      setFormData({
                        name: '',
                        age: '',
                        phone: '',
                        email: '',
                        city: '',
                        consultation_type: 'Online',
                        health_concern: 'Type 2 Diabetes & Blood Sugar',
                        preferred_date: '',
                        preferred_time: '10:00 AM - 01:00 PM (Morning)',
                        additional_message: '',
                        consent: true
                      });
                    }}
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="appointment-form" noValidate>
                <div className="form-header">
                  <span className="section-eyebrow">Direct Consultation Request</span>
                  <h2 className="form-title">{formSettings.title || 'Book an Appointment'}</h2>
                  <p className="form-subtitle">
                    Fill in your details below. Dr. Nidarsin's clinical desk will confirm your appointment schedule.
                  </p>
                </div>

                {formErrors.submit && (
                  <div className="form-alert form-alert-error">
                    <AlertCircle size={18} />
                    <span>{formErrors.submit}</span>
                  </div>
                )}

                {/* Consultation Type Selector */}
                <div className="form-field-group">
                  <label className="form-label">Consultation Mode *</label>
                  <div className="consultation-radio-group">
                    <label className={`radio-pill ${formData.consultation_type === 'Online' ? 'radio-pill-active' : ''}`}>
                      <input
                        type="radio"
                        name="consultation_type"
                        value="Online"
                        checked={formData.consultation_type === 'Online'}
                        onChange={handleInputChange}
                      />
                      <Globe size={16} />
                      <span>Online (video/voice consultation)</span>
                    </label>
                    <label className={`radio-pill ${formData.consultation_type === 'Offline' ? 'radio-pill-active' : ''}`}>
                      <input
                        type="radio"
                        name="consultation_type"
                        value="Offline"
                        checked={formData.consultation_type === 'Offline'}
                        onChange={handleInputChange}
                      />
                      <Building size={16} />
                      <span>In-Clinic (Dharmapuri, Tamil Nadu)</span>
                    </label>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="form-row-2">
                  <div className="form-field-group">
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="e.g. Raj Kumar"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`form-input ${formErrors.name ? 'form-input-error' : ''}`}
                    />
                    {formErrors.name && <span className="field-error">{formErrors.name}</span>}
                  </div>

                  <div className="form-field-group">
                    <label className="form-label">Age</label>
                    <input
                      type="number"
                      name="age"
                      placeholder="e.g. 35"
                      min="1"
                      max="120"
                      value={formData.age}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-field-group">
                    <label className="form-label">Phone Number * (Indian format)</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+91 9XXXXXXXXX"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`form-input ${formErrors.phone ? 'form-input-error' : ''}`}
                    />
                    {formErrors.phone && <span className="field-error">{formErrors.phone}</span>}
                  </div>

                  <div className="form-field-group">
                    <label className="form-label">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`form-input ${formErrors.email ? 'form-input-error' : ''}`}
                    />
                    {formErrors.email && <span className="field-error">{formErrors.email}</span>}
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-field-group">
                    <label className="form-label">City / Location</label>
                    <input
                      type="text"
                      name="city"
                      placeholder="e.g. Bengaluru, Dharmapuri, Chennai..."
                      value={formData.city}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>

                  <div className="form-field-group">
                    <label className="form-label">Primary Health Concern *</label>
                    <select
                      name="health_concern"
                      value={formData.health_concern}
                      onChange={handleInputChange}
                      className="form-input"
                    >
                      <option value="Type 2 Diabetes & Blood Sugar">Type 2 Diabetes & Blood Sugar</option>
                      <option value="PCOS / PCOD & Hormonal Health">PCOS / PCOD & Hormonal Health</option>
                      <option value="Blood Pressure & Cardiovascular Balance">Blood Pressure & Cardiovascular Balance</option>
                      <option value="Cholesterol & Lipid Management">Cholesterol & Lipid Management</option>
                      <option value="Thyroid-Related Lifestyle Concerns">Thyroid-Related Lifestyle Concerns</option>
                      <option value="Digestive & Gut Health Issues">Digestive & Gut Health Issues</option>
                      <option value="Weight & Metabolic Health Reordering">Weight & Metabolic Health Reordering</option>
                      <option value="Therapeutic Yoga & Breathing Guidance">Therapeutic Yoga & Breathing Guidance</option>
                      <option value="General Preventive Lifestyle Reordering">General Preventive Lifestyle Reordering</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                </div>

                {/* Scheduling */}
                <div className="form-row-2">
                  <div className="form-field-group">
                    <label className="form-label">Preferred Date</label>
                    <input
                      type="date"
                      name="preferred_date"
                      min={tomorrowStr}
                      value={formData.preferred_date}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>

                  <div className="form-field-group">
                    <label className="form-label">Preferred Time Slot</label>
                    <select
                      name="preferred_time"
                      value={formData.preferred_time}
                      onChange={handleInputChange}
                      className="form-input"
                    >
                      <option value="10:00 AM - 01:00 PM (Morning)">10:00 AM - 01:00 PM (Morning)</option>
                      <option value="02:00 PM - 05:00 PM (Afternoon)">02:00 PM - 05:00 PM (Afternoon)</option>
                      <option value="05:00 PM - 08:00 PM (Evening)">05:00 PM - 08:00 PM (Evening)</option>
                    </select>
                  </div>
                </div>

                {/* Additional Health History */}
                <div className="form-field-group">
                  <label className="form-label">Additional Health Notes (Optional)</label>
                  <textarea
                    name="additional_message"
                    rows="3"
                    placeholder="Briefly describe your symptoms, daily routine challenges, or specific questions for Dr. Nidarsin..."
                    value={formData.additional_message}
                    onChange={handleInputChange}
                    className="form-textarea"
                  />
                </div>

                {/* Data Protection Consent */}
                <div className="form-consent-box">
                  <label className="consent-checkbox-label">
                    <input
                      type="checkbox"
                      name="consent"
                      checked={formData.consent}
                      onChange={handleInputChange}
                    />
                    <span>
                      I consent to Nidarsanam Healthcare storing my contact information securely to arrange and coordinate my consultation in accordance with the Indian Digital Personal Data Protection (DPDP) Act.
                    </span>
                  </label>
                  {formErrors.consent && <span className="field-error">{formErrors.consent}</span>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary btn-lg btn-submit-appointment"
                >
                  <Send size={18} />
                  <span>{isSubmitting ? 'Submitting Request...' : 'Request Appointment'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right: 4 Clickable Contact Cards + Clinic Info */}
          <div className="contact-details-col">
            <div className="contact-cards-grid">
              {/* Call */}
              <a href={`tel:${settings.phone_number || '+919952338765'}`} className="card contact-action-card">
                <div className="contact-action-icon-box">
                  <Phone size={22} />
                </div>
                <div className="contact-action-text">
                  <span className="action-card-label">CALL US DIRECTLY</span>
                  <strong className="action-card-value">{settings.phone_number || '+91 99523 38765'}</strong>
                  <span className="action-card-hint">Mon – Sat, 9:00 AM – 7:30 PM</span>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/${(settings.whatsapp_number || '919952338765').replace(/[^0-9]/g, '')}?text=Hello%20Nidarsanam%20Healthcare,%20I%20would%20like%20to%20enquire%20about%20consultation.`}
                target="_blank"
                rel="noopener noreferrer"
                className="card contact-action-card"
              >
                <div className="contact-action-icon-box contact-icon-whatsapp">
                  <MessageCircle size={22} />
                </div>
                <div className="contact-action-text">
                  <span className="action-card-label">WHATSAPP CHAT</span>
                  <strong className="action-card-value">{settings.whatsapp_number || '+91 99523 38765'}</strong>
                  <span className="action-card-hint">Fastest response for slot confirmation</span>
                </div>
              </a>

              {/* Email */}
              <a href={`mailto:${settings.email || 'nidarsanamhealthcare@gmail.com'}`} className="card contact-action-card">
                <div className="contact-action-icon-box">
                  <Mail size={22} />
                </div>
                <div className="contact-action-text">
                  <span className="action-card-label">EMAIL US</span>
                  <strong className="action-card-value">{settings.email || 'nidarsanamhealthcare@gmail.com'}</strong>
                  <span className="action-card-hint">Reports & program enquiries</span>
                </div>
              </a>

              {/* Clinic Location */}
              <a
                href={settings.map_link || 'https://maps.app.goo.gl/Hcaec89GsGM5vHYMA'}
                target="_blank"
                rel="noopener noreferrer"
                className="card contact-action-card"
              >
                <div className="contact-action-icon-box">
                  <MapPin size={22} />
                </div>
                <div className="contact-action-text">
                  <span className="action-card-label">VISIT OUR CLINIC</span>
                  <strong className="action-card-value">{settings.clinic_city || 'Dharmapuri'}, {settings.clinic_state || 'Tamil Nadu'}</strong>
                  <span className="action-card-hint">Click for Google Maps directions</span>
                </div>
              </a>
            </div>

            {/* When to Contact Guidance */}
            <div className="when-to-contact-card card">
              <h3 className="when-title">When to Reach Out</h3>
              <div className="when-items-list">
                {whenToContact.map((item, idx) => (
                  <div key={idx} className="when-item">
                    <CheckCircle2 size={16} className="when-icon" />
                    <div>
                      <strong>{item.title}:</strong> <span>{item.description}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Emergency Disclaimer */}
              <div className="emergency-box">
                <AlertCircle size={18} className="emergency-icon" />
                <p>
                  <strong>Medical Emergency Notice:</strong> {contactData.emergency_disclaimer}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4. OUR LOCATION + INTERACTIVE CLINIC MAP */}
        <div className="clinic-location-section" id="location">
          <div className="section-header">
            <span className="section-eyebrow">Clinic & Directions</span>
            <h2 className="section-title">Visit Nidarsanam Healthcare</h2>
            <p className="section-subtitle">
              Located in Dharmapuri, Tamil Nadu — serving patients in-clinic and online across India.
            </p>
          </div>

          <div className="location-card card">
            <div className="location-grid">
              <div className="location-info-col">
                <div className="location-badge">
                  <MapPin size={16} />
                  <span>Dharmapuri Clinic</span>
                </div>
                <h3 className="location-name">Nidarsanam Healthcare Clinic</h3>
                <p className="location-address">
                  {settings.clinic_address || '3/850 D, Renuga Devi Kovil Street, Manthoppu'}<br />
                  {settings.clinic_city || 'Dharmapuri'}, {settings.clinic_state || 'Tamil Nadu'} - {settings.clinic_pincode || '636701'}<br />
                  India
                </p>

                <div className="location-timings">
                  <div className="timing-row">
                    <Clock size={16} />
                    <span><strong>Monday – Saturday:</strong> 9:00 AM – 7:30 PM</span>
                  </div>
                  <div className="timing-row">
                    <Clock size={16} />
                    <span><strong>Sunday:</strong> Prior Appointment Only</span>
                  </div>
                </div>

                <a
                  href={settings.map_link || 'https://maps.app.goo.gl/Hcaec89GsGM5vHYMA'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary mt-3 btn-directions"
                >
                  <Navigation size={16} />
                  <span>Get Directions on Google Maps</span>
                </a>
              </div>

              <div className="location-map-col">
                <div className="map-iframe-container">
                  <iframe
                    title="Nidarsanam Healthcare Location Map"
                    src={settings.map_embed_url || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.6738953155383!2d78.1477182!3d12.1249857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bac170506314ba5%3A0x3c4e65185c03533!2sNIDARSANAM%20HEALTH%20CARE!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5. FAQ ACCORDION (8 ACCORDION ITEMS) */}
        <div className="faq-section" id="faqs">
          <div className="section-header">
            <span className="section-eyebrow">Common Enquiries</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">
              Clear answers regarding our consultation process, traditional diet guidance, and therapy programs.
            </p>
          </div>

          <div className="faq-accordion-list">
            {faqs.map((faq, index) => {
              const isOpen = expandedFaq === index;
              return (
                <div
                  key={index}
                  className={`faq-item-card ${isOpen ? 'faq-item-open' : ''}`}
                >
                  <button
                    className="faq-question-btn"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                  >
                    <span className="faq-q-number">0{index + 1}.</span>
                    <span className="faq-question-text">{faq.question}</span>
                    <span className="faq-toggle-icon">
                      {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="faq-answer-pane animate-fade-in">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
