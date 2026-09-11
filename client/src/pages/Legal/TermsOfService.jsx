import { useEffect } from 'react';
import './Legal.css';

const TermsOfService = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Terms of Service | Nidarsanam Healthcare';
  }, []);

  return (
    <div className="legal-page">
      <div className="legal-hero">
        <div className="legal-hero-inner">
          <span className="legal-eyebrow">Legal</span>
          <h1 className="legal-title">Terms of Service</h1>
          <p className="legal-subtitle">Last updated: September 2026</p>
        </div>
      </div>

      <div className="legal-content">
        <div className="legal-toc">
          <h3>Contents</h3>
          <ol>
            <li><a href="#acceptance">Acceptance of Terms</a></li>
            <li><a href="#services">Our Services</a></li>
            <li><a href="#medical-disclaimer">Medical Disclaimer</a></li>
            <li><a href="#user-responsibilities">Your Responsibilities</a></li>
            <li><a href="#intellectual-property">Intellectual Property</a></li>
            <li><a href="#limitation">Limitation of Liability</a></li>
            <li><a href="#governing-law">Governing Law</a></li>
          </ol>
        </div>

        <div className="legal-body">
          <p className="legal-intro">
            Please read these Terms of Service carefully before using the Nidarsanam Healthcare website.
            By accessing or using our website, you agree to be bound by these terms.
          </p>

          <section id="acceptance">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using this website (<strong>nidarsanam.com</strong>), you accept and agree to be bound
              by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not
              use this website.
            </p>
          </section>

          <section id="services">
            <h2>2. Our Services</h2>
            <p>Nidarsanam Healthcare provides:</p>
            <ul>
              <li>Educational content on naturopathy, traditional Indian food, therapeutic yoga, and lifestyle health</li>
              <li>Consultation request forms for scheduling appointments with Dr. Nidarsin, BNYS</li>
              <li>The Nidarsanam Journal — a wellness newsletter and blog</li>
              <li>General health information based on traditional Indian wisdom and evidence-based naturopathy</li>
            </ul>
            <p>Submission of a consultation request does not guarantee appointment confirmation. Our team will contact you to confirm availability.</p>
          </section>

          <section id="medical-disclaimer">
            <h2>3. Medical Disclaimer</h2>
            <div className="legal-callout">
              <strong>⚠️ Important</strong>
              <p>
                The content on this website is for <strong>informational and educational purposes only</strong>.
                It is not intended to be a substitute for professional medical advice, diagnosis, or treatment.
              </p>
            </div>
            <ul>
              <li>Always seek the advice of your physician or other qualified health provider for any medical condition.</li>
              <li>Never disregard professional medical advice or delay in seeking it because of something you have read on this website.</li>
              <li>Naturopathy and lifestyle medicine complement — they do not replace — emergency medical care.</li>
              <li>Results of lifestyle interventions vary from person to person.</li>
            </ul>
          </section>

          <section id="user-responsibilities">
            <h2>4. Your Responsibilities</h2>
            <p>By using this website, you agree to:</p>
            <ul>
              <li>Provide accurate and truthful information in consultation requests</li>
              <li>Not use the website for any unlawful purpose</li>
              <li>Not attempt to gain unauthorised access to any part of the website</li>
              <li>Not reproduce, distribute, or commercially exploit our content without written permission</li>
              <li>Respect the privacy and personal information of other users</li>
            </ul>
          </section>

          <section id="intellectual-property">
            <h2>5. Intellectual Property</h2>
            <p>
              All content on this website — including text, articles, images, graphics, logos, and design —
              is the property of Nidarsanam Healthcare and is protected by Indian copyright law.
            </p>
            <p>You may share our content for personal, non-commercial purposes with proper attribution to Nidarsanam Healthcare.</p>
          </section>

          <section id="limitation">
            <h2>6. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Nidarsanam Healthcare shall not be liable for any
              indirect, incidental, or consequential damages arising from your use of, or inability to use,
              this website or its content.
            </p>
            <p>
              We do not guarantee that the website will be error-free, uninterrupted, or free of viruses.
            </p>
          </section>

          <section id="governing-law">
            <h2>7. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of India.
              Any disputes arising under these terms shall be subject to the exclusive jurisdiction of
              the courts in India.
            </p>
            <p>
              If you have any questions about these Terms, please <a href="/contact">contact us</a>.
            </p>
          </section>

          <div className="legal-footer-note">
            <p>We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to this page.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
