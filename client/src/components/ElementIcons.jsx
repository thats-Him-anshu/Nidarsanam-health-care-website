import React from 'react';

/**
 * Minimalist, elegant artisanal SVG icons for the 5 Panchamahabhuta elements:
 * Ākāśa (Space/Ether), Vāyu (Air), Agni (Fire), Jala (Water), Pṛthvi (Earth).
 */

export const AkasaIcon = ({ size = 28, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-label="Ākāśa - Space"
  >
    {/* Celestial expansion & consciousness ring */}
    <circle cx="12" cy="12" r="9.5" strokeOpacity="0.4" strokeDasharray="2 2" />
    <circle cx="12" cy="12" r="6" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="2.2" fill="currentColor" stroke="none" />
    {/* Cardinal spatial axes */}
    <line x1="12" y1="1.5" x2="12" y2="3.5" strokeWidth="1.8" />
    <line x1="12" y1="20.5" x2="12" y2="22.5" strokeWidth="1.8" />
    <line x1="1.5" y1="12" x2="3.5" y2="12" strokeWidth="1.8" />
    <line x1="20.5" y1="12" x2="22.5" y2="12" strokeWidth="1.8" />
  </svg>
);

export const VayuIcon = ({ size = 28, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-label="Vāyu - Air"
  >
    {/* Fluid Prana currents and gentle aerodynamic waves */}
    <path d="M3.5 8h11.5a3 3 0 1 0-3-3" strokeWidth="1.7" />
    <path d="M2 12.5h16.5a2.5 2.5 0 1 0-2.5-2.5" strokeWidth="1.7" />
    <path d="M4.5 17h8a2.2 2.2 0 1 1-2.2 2.2" strokeWidth="1.7" />
  </svg>
);

export const AgniIcon = ({ size = 28, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-label="Agni - Fire"
  >
    {/* Sacred metabolic flame with inner core */}
    <path
      d="M12 2.5c-.6 2.6-2.5 4.6-4 7.2-2 3.3-1.6 7.6 1.4 10.2 3 2.5 7.6 2.5 10.6 0 3-2.6 3.4-6.9 1.4-10.2-1.5-2.6-3.4-4.6-4-7.2-.5 2.2-1.6 3.2-2.7 3.7-1.1-.5-2.2-1.5-2.7-3.7z"
      strokeWidth="1.7"
    />
    <path
      d="M12 12.8c-.4 1-1.3 2-1.3 3.1 0 1.7 1.4 3.1 3.1 3.1 1.7 0 3.1-1.4 3.1-3.1 0-1.1-.9-2.1-1.3-3.1-.4.8-1 1.2-1.8 1.2-.8 0-1.4-.4-1.8-1.2z"
      strokeWidth="1.4"
      strokeOpacity="0.85"
    />
  </svg>
);

export const JalaIcon = ({ size = 28, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-label="Jala - Water"
  >
    {/* Pristine droplet of nourishment with internal fluid ripple */}
    <path
      d="M12 2.8l5.8 5.8a8.2 8.2 0 1 1-11.6 0z"
      strokeWidth="1.7"
    />
    <path
      d="M8 14.5c1.2 1.4 2.8 2 4 2s2.8-.6 4-2"
      strokeWidth="1.5"
      strokeOpacity="0.75"
    />
  </svg>
);

export const PrthviIcon = ({ size = 28, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-label="Pṛthvi - Earth"
  >
    {/* Grounding mountain peak & foundational stability base */}
    <path d="M2.5 20.5h19" strokeWidth="1.8" />
    <path d="M4 17.5h16" strokeWidth="1.4" strokeOpacity="0.5" />
    <path
      d="M4 17.5l6.7-11.2a1.5 1.5 0 0 1 2.6 0L20 17.5"
      strokeWidth="1.7"
    />
    <path d="M12 9.5l3.5 8" strokeWidth="1.4" strokeOpacity="0.5" />
  </svg>
);

/**
 * Helper to render the corresponding minimal elemental icon
 */
export const getElementIcon = (keyOrId = '', size = 28, className = '') => {
  const normalized = String(keyOrId).toLowerCase().trim();
  switch (normalized) {
    case 'akasa':
    case 'aakasha':
    case 'space':
    case 'ether':
      return <AkasaIcon size={size} className={className} />;
    case 'vayu':
    case 'air':
      return <VayuIcon size={size} className={className} />;
    case 'agni':
    case 'fire':
      return <AgniIcon size={size} className={className} />;
    case 'jala':
    case 'water':
      return <JalaIcon size={size} className={className} />;
    case 'prthvi':
    case 'prathvi':
    case 'earth':
    case 'prithvi':
      return <PrthviIcon size={size} className={className} />;
    default:
      return <AkasaIcon size={size} className={className} />;
  }
};
