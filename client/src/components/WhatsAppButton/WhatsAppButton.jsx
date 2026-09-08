import { Phone } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import './WhatsAppButton.css';

export const WhatsAppIcon = ({ size = 26, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.66c-.19.53-.97.98-1.34 1.04-.37.06-.84.1-2.68-.66-2.35-.98-3.87-3.36-3.99-3.51-.12-.16-.95-1.27-.95-2.42 0-1.15.6-1.72.82-1.95.21-.23.47-.29.62-.29.16 0 .31 0 .45.01.14.01.34-.05.53.4.2.47.67 1.62.73 1.74.06.12.1.26.02.41-.08.16-.12.26-.24.4-.12.14-.25.31-.36.42-.12.12-.24.24-.1.48.14.23.61 1.01 1.31 1.63.9.8 1.66 1.05 1.9 1.17.23.12.37.1.51-.06.14-.16.6-.7.76-.94.16-.24.32-.2.53-.12.21.08 1.36.64 1.59.76.24.12.39.18.45.28.06.1.06.57-.13 1.1z" />
  </svg>
);

const WhatsAppButton = () => {
  const { content } = useCMS();
  const rawNumber = content?.settings?.whatsapp_number || content?.settings?.phone_number || '99523 38765';
  let cleanNumber = rawNumber.replace(/[^0-9]/g, '');
  if (cleanNumber.length === 10) {
    cleanNumber = '91' + cleanNumber;
  }

  const message = encodeURIComponent('Hello Nidarsanam Healthcare, I would like to enquire about a consultation.');
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${message}`;
  const telUrl = `tel:+${cleanNumber}`;

  return (
    <div className="floating-actions-container">
      {/* Direct Phone Call Button */}
      <a
        href={telUrl}
        className="floating-action-btn direct-call-float-btn"
        aria-label="Direct Call to +91 99523 38765"
        title="Direct Call to +91 99523 38765"
      >
        <div className="call-pulse-ring"></div>
        <Phone size={24} className="call-btn-icon" />
      </a>

      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-action-btn whatsapp-float-btn"
        aria-label="Chat on WhatsApp at +91 99523 38765"
        title="Chat on WhatsApp"
      >
        <div className="whatsapp-pulse-ring"></div>
        <WhatsAppIcon size={30} className="whatsapp-btn-icon" />
      </a>
    </div>
  );
};

export default WhatsAppButton;
