import { useEffect } from 'react';
import './Legal.css';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Privacy Policy | Nidarsanam Healthcare';
  }, []);

  return (
    <div className="legal-page">
      <div className="legal-hero">
        <div className="legal-hero-inner">
          <span className="legal-eyebrow">Legal</span>
          <h1 className="legal-title">Privacy Policy</h1>
          <p className="legal-subtitle">Last updated: September 2026</p>
        </div>
      </div>

      <div className="legal-content">
        <div className="legal-toc">
          <h3>Contents</h3>
          <ol>
            <li><a href="#information-we-collect">Information We Collect</a></li>
            <li><a href="#how-we-use">How We Use Your Information</a></li>
            <li><a href="#data-sharing">Data Sharing</a></li>
            <li><a href="#data-security">Data Security</a></li>
            <li><a href="#your-rights">Your Rights</a></li>
            <li><a href="#cookies">Cookies</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ol>
        </div>

        <div className="legal-body">
          <p className="legal-intro">
            Nidarsanam Healthcare ("we", "us", or "our") is committed to protecting your privacy.
            This Privacy Policy explains how we collect, use, and safeguard your personal information
            when you visit our website or use our services.
          </p>

          <section id="information-we-collect">
            <h2>1. Information We Collect</h2>
            <h3>Information you provide directly</h3>
            <ul>
              <li><strong>Contact & consultation details</strong>: Name, age, phone number, email address, city, and health concern when you submit a consultation request.</li>
              <li><strong>Communications</strong>: Messages or queries you send via our contact form.</li>
              <li><strong>Newsletter subscription</strong>: Email address when you subscribe to The Nidarsanam Journal.</li>
            </ul>
            <h3>Information collected automatically</h3>
            <ul>
              <li>Browser type and version</li>
              <li>Pages visited and time spent</li>
              <li>Referring website</li>
              <li>General geographic location (country/city level)</li>
            </ul>
          </section>

          <section id="how-we-use">
            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Respond to your consultation enquiries and schedule appointments</li>
              <li>Provide personalised health guidance and follow-up care</li>
              <li>Send The Nidarsanam Journal newsletter (only if you subscribed)</li>
              <li>Improve our website and services</li>
              <li>Comply with applicable legal obligations</li>
            </ul>
            <p>We will <strong>never</strong> use your health information for marketing purposes without your explicit consent.</p>
          </section>

          <section id="data-sharing">
            <h2>3. Data Sharing</h2>
            <p>We do not sell, trade, or rent your personal information to third parties. We may share data with:</p>
            <ul>
              <li><strong>Service providers</strong>: Trusted third-party services (e.g., cloud hosting, email delivery) that assist us in operating our website — bound by strict confidentiality agreements.</li>
              <li><strong>Legal requirements</strong>: If required by law, court order, or governmental authority in India.</li>
            </ul>
          </section>

          <section id="data-security">
            <h2>4. Data Security</h2>
            <p>
              We implement industry-standard security measures including SSL/TLS encryption, secure database storage,
              and access controls to protect your personal information. However, no method of transmission over the
              internet is 100% secure, and we cannot guarantee absolute security.
            </p>
            <p>Your data is stored on secure cloud servers. We retain consultation enquiry data for a maximum of 3 years or until you request deletion.</p>
          </section>

          <section id="your-rights">
            <h2>5. Your Rights</h2>
            <p>Under India's Information Technology Act, 2000 and the Digital Personal Data Protection Act, 2023, you have the right to:</p>
            <ul>
              <li><strong>Access</strong>: Request a copy of the personal data we hold about you.</li>
              <li><strong>Correction</strong>: Ask us to correct inaccurate or incomplete data.</li>
              <li><strong>Deletion</strong>: Request erasure of your personal data (subject to legal obligations).</li>
              <li><strong>Withdraw consent</strong>: Unsubscribe from our newsletter at any time.</li>
            </ul>
            <p>To exercise any of these rights, contact us at the email below.</p>
          </section>

          <section id="cookies">
            <h2>6. Cookies</h2>
            <p>
              We use essential cookies required for the website to function properly. We may also use analytics
              cookies to understand how visitors use our site. You can control cookie preferences through the
              consent banner displayed on your first visit, or through your browser settings.
            </p>
          </section>

          <section id="contact">
            <h2>7. Contact Us</h2>
            <p>If you have questions about this Privacy Policy or wish to exercise your data rights, please contact:</p>
            <div className="legal-contact-box">
              <strong>Nidarsanam Healthcare</strong>
              <span>Dr. Nidarsin, BNYS</span>
              <a href="/contact">Contact Form</a>
            </div>
            <p>We will respond to all requests within 30 days.</p>
          </section>

          <div className="legal-footer-note">
            <p>This policy may be updated periodically. We will notify you of significant changes by posting the new policy on this page with an updated date.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
