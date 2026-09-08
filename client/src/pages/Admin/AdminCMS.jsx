import { useState } from 'react';
import {
  Save,
  CheckCircle2,
  Globe,
  FileText,
  Home,
  Info,
  BookOpen,
  Phone,
  Settings,
  Plus,
  Trash2,
  Sparkles,
  ExternalLink,
  HelpCircle
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import './AdminCMS.css';

const AdminCMS = () => {
  const { content, updateSectionContent, updateGlobalSettings } = useCMS();
  const [activeTab, setActiveTab] = useState('home');
  const [saveNotification, setSaveNotification] = useState(false);

  // Local Editable States initialized from CMSContext
  const [homeForm, setHomeForm] = useState(content?.home || {});
  const [aboutForm, setAboutForm] = useState(content?.about || {});
  const [blogForm, setBlogForm] = useState(content?.blog || {});
  const [contactForm, setContactForm] = useState(content?.contact || {});
  const [settingsForm, setSettingsForm] = useState(content?.settings || {});

  const triggerSaveNotification = () => {
    setSaveNotification(true);
    setTimeout(() => setSaveNotification(false), 3000);
  };

  // Save Home Section
  const handleSaveHome = (e) => {
    e.preventDefault();
    Object.keys(homeForm).forEach((sec) => {
      updateSectionContent('home', sec, homeForm[sec]);
    });
    triggerSaveNotification();
  };

  // Save About Section
  const handleSaveAbout = (e) => {
    e.preventDefault();
    Object.keys(aboutForm).forEach((sec) => {
      updateSectionContent('about', sec, aboutForm[sec]);
    });
    triggerSaveNotification();
  };

  // Save Blog Section
  const handleSaveBlog = (e) => {
    e.preventDefault();
    Object.keys(blogForm).forEach((sec) => {
      updateSectionContent('blog', sec, blogForm[sec]);
    });
    triggerSaveNotification();
  };

  // Save Contact Section
  const handleSaveContact = (e) => {
    e.preventDefault();
    Object.keys(contactForm).forEach((sec) => {
      updateSectionContent('contact', sec, contactForm[sec]);
    });
    triggerSaveNotification();
  };

  // Save Global Settings
  const handleSaveSettings = (e) => {
    e.preventDefault();
    updateGlobalSettings(settingsForm);
    triggerSaveNotification();
  };

  // FAQ Manager helpers
  const handleAddFaq = () => {
    const currentFaqs = contactForm.faqs || [];
    setContactForm({
      ...contactForm,
      faqs: [
        ...currentFaqs,
        {
          question: 'New Question Title',
          answer: 'Detailed informative answer for patient clarity.'
        }
      ]
    });
  };

  const handleUpdateFaq = (index, field, value) => {
    const updated = [...(contactForm.faqs || [])];
    updated[index][field] = value;
    setContactForm({ ...contactForm, faqs: updated });
  };

  const handleDeleteFaq = (index) => {
    const updated = (contactForm.faqs || []).filter((_, i) => i !== index);
    setContactForm({ ...contactForm, faqs: updated });
  };

  return (
    <div className="admin-cms-root">
      {/* Top Header Card */}
      <div className="cms-header-card card">
        <div>
          <span className="section-eyebrow">Content Management System</span>
          <h1 className="cms-title">Website Content & Settings Editor</h1>
          <p className="cms-sub">
            Customize copy, hero imagery, practitioner bios, FAQ items, and clinic settings.
          </p>
        </div>

        {saveNotification && (
          <div className="save-toast animate-fade-in">
            <CheckCircle2 size={18} />
            <span>Changes successfully saved & updated on live website!</span>
          </div>
        )}
      </div>

      {/* Tabs Navigation */}
      <div className="cms-tabs-nav">
        <button
          className={`cms-tab-btn ${activeTab === 'home' ? 'cms-tab-active' : ''}`}
          onClick={() => setActiveTab('home')}
        >
          <Home size={18} />
          <span>Home Page</span>
        </button>

        <button
          className={`cms-tab-btn ${activeTab === 'about' ? 'cms-tab-active' : ''}`}
          onClick={() => setActiveTab('about')}
        >
          <Info size={18} />
          <span>About Us Page</span>
        </button>

        <button
          className={`cms-tab-btn ${activeTab === 'blog' ? 'cms-tab-active' : ''}`}
          onClick={() => setActiveTab('blog')}
        >
          <BookOpen size={18} />
          <span>Journal / Blog Page</span>
        </button>

        <button
          className={`cms-tab-btn ${activeTab === 'contact' ? 'cms-tab-active' : ''}`}
          onClick={() => setActiveTab('contact')}
        >
          <Phone size={18} />
          <span>Contact & FAQs</span>
        </button>

        <button
          className={`cms-tab-btn ${activeTab === 'settings' ? 'cms-tab-active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          <Settings size={18} />
          <span>Global Site Settings</span>
        </button>
      </div>

      {/* =========================================================
          TAB 1: HOME PAGE EDITOR
          ========================================================= */}
      {activeTab === 'home' && (
        <form onSubmit={handleSaveHome} className="cms-tab-content">
          {/* Hero Section */}
          <div className="cms-section-card card">
            <h3 className="cms-card-heading">1. Hero Section</h3>
            <div className="form-field-group">
              <label className="form-label">Hero Headline</label>
              <input
                type="text"
                value={homeForm.hero?.headline || ''}
                onChange={(e) =>
                  setHomeForm({
                    ...homeForm,
                    hero: { ...homeForm.hero, headline: e.target.value }
                  })
                }
                className="form-input"
              />
            </div>

            <div className="form-field-group">
              <label className="form-label">Hero Subheadline</label>
              <textarea
                rows="2"
                value={homeForm.hero?.subheadline || ''}
                onChange={(e) =>
                  setHomeForm({
                    ...homeForm,
                    hero: { ...homeForm.hero, subheadline: e.target.value }
                  })
                }
                className="form-textarea"
              />
            </div>

            <div className="form-row-2">
              <div className="form-field-group">
                <label className="form-label">Supporting Approach Text</label>
                <input
                  type="text"
                  value={homeForm.hero?.supporting_line || ''}
                  onChange={(e) =>
                    setHomeForm({
                      ...homeForm,
                      hero: { ...homeForm.hero, supporting_line: e.target.value }
                    })
                  }
                  className="form-input"
                />
              </div>

              <div className="form-field-group">
                <label className="form-label">Hero Image URL</label>
                <input
                  type="url"
                  value={homeForm.hero?.hero_image || ''}
                  onChange={(e) =>
                    setHomeForm({
                      ...homeForm,
                      hero: { ...homeForm.hero, hero_image: e.target.value }
                    })
                  }
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-field-group">
                <label className="form-label">Primary CTA Text</label>
                <input
                  type="text"
                  value={homeForm.hero?.primary_cta_text || ''}
                  onChange={(e) =>
                    setHomeForm({
                      ...homeForm,
                      hero: { ...homeForm.hero, primary_cta_text: e.target.value }
                    })
                  }
                  className="form-input"
                />
              </div>

              <div className="form-field-group">
                <label className="form-label">Secondary CTA Text</label>
                <input
                  type="text"
                  value={homeForm.hero?.secondary_cta_text || ''}
                  onChange={(e) =>
                    setHomeForm({
                      ...homeForm,
                      hero: { ...homeForm.hero, secondary_cta_text: e.target.value }
                    })
                  }
                  className="form-input"
                />
              </div>
            </div>
          </div>

          {/* Philosophy Section */}
          <div className="cms-section-card card">
            <h3 className="cms-card-heading">2. Philosophy Section</h3>
            <div className="form-field-group">
              <label className="form-label">Large Statement Quote</label>
              <input
                type="text"
                value={homeForm.philosophy?.large_statement || ''}
                onChange={(e) =>
                  setHomeForm({
                    ...homeForm,
                    philosophy: { ...homeForm.philosophy, large_statement: e.target.value }
                  })
                }
                className="form-input"
              />
            </div>

            <div className="form-field-group">
              <label className="form-label">Supporting Text</label>
              <textarea
                rows="4"
                value={homeForm.philosophy?.supporting_text || ''}
                onChange={(e) =>
                  setHomeForm({
                    ...homeForm,
                    philosophy: { ...homeForm.philosophy, supporting_text: e.target.value }
                  })
                }
                className="form-textarea"
              />
            </div>
          </div>

          {/* Practitioner Intro Section */}
          <div className="cms-section-card card">
            <h3 className="cms-card-heading">3. Practitioner Section (Homepage Preview)</h3>
            <div className="form-row-2">
              <div className="form-field-group">
                <label className="form-label">Physician Name</label>
                <input
                  type="text"
                  value={homeForm.practitioner?.name || ''}
                  onChange={(e) =>
                    setHomeForm({
                      ...homeForm,
                      practitioner: { ...homeForm.practitioner, name: e.target.value }
                    })
                  }
                  className="form-input"
                />
              </div>

              <div className="form-field-group">
                <label className="form-label">Qualification Badge</label>
                <input
                  type="text"
                  value={homeForm.practitioner?.qualification || ''}
                  onChange={(e) =>
                    setHomeForm({
                      ...homeForm,
                      practitioner: { ...homeForm.practitioner, qualification: e.target.value }
                    })
                  }
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-field-group">
              <label className="form-label">Professional Background Summary</label>
              <textarea
                rows="3"
                value={homeForm.practitioner?.background_text || ''}
                onChange={(e) =>
                  setHomeForm({
                    ...homeForm,
                    practitioner: { ...homeForm.practitioner, background_text: e.target.value }
                  })
                }
                className="form-textarea"
              />
            </div>
          </div>

          {/* Final CTA Section */}
          <div className="cms-section-card card">
            <h3 className="cms-card-heading">4. Final CTA Section</h3>
            <div className="form-row-2">
              <div className="form-field-group">
                <label className="form-label">Heading</label>
                <input
                  type="text"
                  value={homeForm.final_cta?.heading || ''}
                  onChange={(e) =>
                    setHomeForm({
                      ...homeForm,
                      final_cta: { ...homeForm.final_cta, heading: e.target.value }
                    })
                  }
                  className="form-input"
                />
              </div>
              <div className="form-field-group">
                <label className="form-label">Subheadline</label>
                <input
                  type="text"
                  value={homeForm.final_cta?.subheadline || ''}
                  onChange={(e) =>
                    setHomeForm({
                      ...homeForm,
                      final_cta: { ...homeForm.final_cta, subheadline: e.target.value }
                    })
                  }
                  className="form-input"
                />
              </div>
            </div>
          </div>

          <div className="cms-save-bar">
            <button type="submit" className="btn btn-primary btn-lg">
              <Save size={18} />
              <span>Save Home Page Changes</span>
            </button>
          </div>
        </form>
      )}

      {/* =========================================================
          TAB 2: ABOUT US PAGE EDITOR
          ========================================================= */}
      {activeTab === 'about' && (
        <form onSubmit={handleSaveAbout} className="cms-tab-content">
          <div className="cms-section-card card">
            <h3 className="cms-card-heading">About Hero & Story</h3>
            <div className="form-field-group">
              <label className="form-label">Hero Headline</label>
              <input
                type="text"
                value={aboutForm.hero?.headline || ''}
                onChange={(e) =>
                  setAboutForm({
                    ...aboutForm,
                    hero: { ...aboutForm.hero, headline: e.target.value }
                  })
                }
                className="form-input"
              />
            </div>

            <div className="form-field-group">
              <label className="form-label">Hero Subheadline</label>
              <textarea
                rows="2"
                value={aboutForm.hero?.subheadline || ''}
                onChange={(e) =>
                  setAboutForm({
                    ...aboutForm,
                    hero: { ...aboutForm.hero, subheadline: e.target.value }
                  })
                }
                className="form-textarea"
              />
            </div>

            <div className="form-field-group">
              <label className="form-label">Story Heading</label>
              <input
                type="text"
                value={aboutForm.story?.heading || ''}
                onChange={(e) =>
                  setAboutForm({
                    ...aboutForm,
                    story: { ...aboutForm.story, heading: e.target.value }
                  })
                }
                className="form-input"
              />
            </div>
          </div>

          <div className="cms-section-card card">
            <h3 className="cms-card-heading">Dr. Nidarsin Biography & Clinical Profile</h3>
            <div className="form-field-group">
              <label className="form-label">Educational Qualification Details</label>
              <input
                type="text"
                value={aboutForm.practitioner_detail?.educational_qualification || ''}
                onChange={(e) =>
                  setAboutForm({
                    ...aboutForm,
                    practitioner_detail: {
                      ...aboutForm.practitioner_detail,
                      educational_qualification: e.target.value
                    }
                  })
                }
                className="form-input"
              />
            </div>

            <div className="form-field-group">
              <label className="form-label">Clinical Philosophy</label>
              <textarea
                rows="3"
                value={aboutForm.practitioner_detail?.clinical_philosophy || ''}
                onChange={(e) =>
                  setAboutForm({
                    ...aboutForm,
                    practitioner_detail: {
                      ...aboutForm.practitioner_detail,
                      clinical_philosophy: e.target.value
                    }
                  })
                }
                className="form-textarea"
              />
            </div>

            <div className="form-field-group">
              <label className="form-label">Areas of Special Clinical Interest</label>
              <input
                type="text"
                value={aboutForm.practitioner_detail?.areas_of_interest || ''}
                onChange={(e) =>
                  setAboutForm({
                    ...aboutForm,
                    practitioner_detail: {
                      ...aboutForm.practitioner_detail,
                      areas_of_interest: e.target.value
                    }
                  })
                }
                className="form-input"
              />
            </div>
          </div>

          <div className="cms-save-bar">
            <button type="submit" className="btn btn-primary btn-lg">
              <Save size={18} />
              <span>Save About Page Changes</span>
            </button>
          </div>
        </form>
      )}

      {/* =========================================================
          TAB 3: BLOG PAGE EDITOR
          ========================================================= */}
      {activeTab === 'blog' && (
        <form onSubmit={handleSaveBlog} className="cms-tab-content">
          <div className="cms-section-card card">
            <h3 className="cms-card-heading">Journal Page Settings</h3>
            <div className="form-field-group">
              <label className="form-label">Journal Header Title</label>
              <input
                type="text"
                value={blogForm.hero?.headline || ''}
                onChange={(e) =>
                  setBlogForm({
                    ...blogForm,
                    hero: { ...blogForm.hero, headline: e.target.value }
                  })
                }
                className="form-input"
              />
            </div>

            <div className="form-field-group">
              <label className="form-label">Journal Subtitle</label>
              <input
                type="text"
                value={blogForm.hero?.subheadline || ''}
                onChange={(e) =>
                  setBlogForm({
                    ...blogForm,
                    hero: { ...blogForm.hero, subheadline: e.target.value }
                  })
                }
                className="form-input"
              />
            </div>
          </div>

          <div className="cms-section-card card">
            <h3 className="cms-card-heading">Newsletter Subscription Copy</h3>
            <div className="form-field-group">
              <label className="form-label">Newsletter Heading</label>
              <input
                type="text"
                value={blogForm.newsletter?.heading || ''}
                onChange={(e) =>
                  setBlogForm({
                    ...blogForm,
                    newsletter: { ...blogForm.newsletter, heading: e.target.value }
                  })
                }
                className="form-input"
              />
            </div>

            <div className="form-field-group">
              <label className="form-label">Newsletter Subtitle</label>
              <textarea
                rows="2"
                value={blogForm.newsletter?.subheading || ''}
                onChange={(e) =>
                  setBlogForm({
                    ...blogForm,
                    newsletter: { ...blogForm.newsletter, subheading: e.target.value }
                  })
                }
                className="form-textarea"
              />
            </div>
          </div>

          <div className="cms-save-bar">
            <button type="submit" className="btn btn-primary btn-lg">
              <Save size={18} />
              <span>Save Blog Page Settings</span>
            </button>
          </div>
        </form>
      )}

      {/* =========================================================
          TAB 4: CONTACT & FAQS EDITOR
          ========================================================= */}
      {activeTab === 'contact' && (
        <form onSubmit={handleSaveContact} className="cms-tab-content">
          <div className="cms-section-card card">
            <h3 className="cms-card-heading">Booking Form Settings</h3>
            <div className="form-field-group">
              <label className="form-label">Form Title</label>
              <input
                type="text"
                value={contactForm.form_settings?.title || ''}
                onChange={(e) =>
                  setContactForm({
                    ...contactForm,
                    form_settings: { ...contactForm.form_settings, title: e.target.value }
                  })
                }
                className="form-input"
              />
            </div>

            <div className="form-field-group">
              <label className="form-label">Success Confirmation Message</label>
              <textarea
                rows="3"
                value={contactForm.form_settings?.success_message || ''}
                onChange={(e) =>
                  setContactForm({
                    ...contactForm,
                    form_settings: {
                      ...contactForm.form_settings,
                      success_message: e.target.value
                    }
                  })
                }
                className="form-textarea"
              />
            </div>
          </div>

          {/* FAQ Accordion Items Management */}
          <div className="cms-section-card card">
            <div className="faq-mgr-header">
              <div>
                <h3 className="cms-card-heading">Frequently Asked Questions ({(contactForm.faqs || []).length})</h3>
                <p className="cms-card-sub">Add, modify, or remove patient FAQ items on the contact page.</p>
              </div>
              <button
                type="button"
                onClick={handleAddFaq}
                className="btn btn-secondary btn-sm"
              >
                <Plus size={15} />
                <span>+ Add FAQ Item</span>
              </button>
            </div>

            <div className="faq-mgr-list">
              {(contactForm.faqs || []).map((faq, index) => (
                <div key={index} className="faq-mgr-item">
                  <div className="faq-mgr-item-header">
                    <span className="faq-num">Q{index + 1}</span>
                    <button
                      type="button"
                      onClick={() => handleDeleteFaq(index)}
                      className="btn-delete-faq"
                      title="Delete Question"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="form-field-group">
                    <label className="form-label">Question Text</label>
                    <input
                      type="text"
                      value={faq.question}
                      onChange={(e) => handleUpdateFaq(index, 'question', e.target.value)}
                      className="form-input"
                    />
                  </div>
                  <div className="form-field-group">
                    <label className="form-label">Answer Explanation</label>
                    <textarea
                      rows="3"
                      value={faq.answer}
                      onChange={(e) => handleUpdateFaq(index, 'answer', e.target.value)}
                      className="form-textarea"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="cms-save-bar">
            <button type="submit" className="btn btn-primary btn-lg">
              <Save size={18} />
              <span>Save Contact & FAQs</span>
            </button>
          </div>
        </form>
      )}

      {/* =========================================================
          TAB 5: GLOBAL SETTINGS
          ========================================================= */}
      {activeTab === 'settings' && (
        <form onSubmit={handleSaveSettings} className="cms-tab-content">
          <div className="cms-section-card card">
            <h3 className="cms-card-heading">Brand Identity & Positioning</h3>
            <div className="form-row-2">
              <div className="form-field-group">
                <label className="form-label">Clinic / Brand Name</label>
                <input
                  type="text"
                  value={settingsForm.site_name || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, site_name: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-field-group">
                <label className="form-label">Tagline</label>
                <input
                  type="text"
                  value={settingsForm.tagline || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, tagline: e.target.value })}
                  className="form-input"
                />
              </div>
            </div>
          </div>

          <div className="cms-section-card card">
            <h3 className="cms-card-heading">Clinic Contact & Location Information</h3>
            <div className="form-row-2">
              <div className="form-field-group">
                <label className="form-label">Phone Number</label>
                <input
                  type="text"
                  value={settingsForm.phone_number || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, phone_number: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-field-group">
                <label className="form-label">WhatsApp Number</label>
                <input
                  type="text"
                  value={settingsForm.whatsapp_number || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, whatsapp_number: e.target.value })}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-field-group">
                <label className="form-label">Official Email Address</label>
                <input
                  type="email"
                  value={settingsForm.email || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-field-group">
                <label className="form-label">Clinic City & State</label>
                <input
                  type="text"
                  value={`${settingsForm.clinic_city || 'Dharmapuri'}, ${settingsForm.clinic_state || 'Tamil Nadu'}`}
                  onChange={(e) => {
                    const [city, state] = e.target.value.split(',');
                    setSettingsForm({
                      ...settingsForm,
                      clinic_city: city?.trim() || 'Dharmapuri',
                      clinic_state: state?.trim() || 'Tamil Nadu'
                    });
                  }}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-field-group">
              <label className="form-label">Full Street Address</label>
              <textarea
                rows="2"
                value={settingsForm.clinic_address || ''}
                onChange={(e) => setSettingsForm({ ...settingsForm, clinic_address: e.target.value })}
                className="form-textarea"
              />
            </div>
          </div>

          <div className="cms-section-card card">
            <h3 className="cms-card-heading">Social Media Profiles</h3>
            <div className="form-row-2">
              <div className="form-field-group">
                <label className="form-label">Instagram Profile URL</label>
                <input
                  type="url"
                  value={settingsForm.instagram_url || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, instagram_url: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-field-group">
                <label className="form-label">YouTube Channel URL</label>
                <input
                  type="url"
                  value={settingsForm.youtube_url || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, youtube_url: e.target.value })}
                  className="form-input"
                />
              </div>
            </div>
          </div>

          <div className="cms-section-card card">
            <h3 className="cms-card-heading">SEO & Metadata</h3>
            <div className="form-field-group">
              <label className="form-label">Default Meta Title</label>
              <input
                type="text"
                value={settingsForm.meta_title || ''}
                onChange={(e) => setSettingsForm({ ...settingsForm, meta_title: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-field-group">
              <label className="form-label">Default Meta Description</label>
              <textarea
                rows="2"
                value={settingsForm.meta_description || ''}
                onChange={(e) => setSettingsForm({ ...settingsForm, meta_description: e.target.value })}
                className="form-textarea"
              />
            </div>
          </div>

          <div className="cms-save-bar">
            <button type="submit" className="btn btn-primary btn-lg">
              <Save size={18} />
              <span>Save Global Settings</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AdminCMS;
