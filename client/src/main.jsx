import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/index.css';
import './styles/animations.css';

// Immediate one-time migration for any cached old clinic data
try {
  const contentStr = localStorage.getItem('nidarsanam_content');
  if (contentStr && (contentStr.includes('98765') || contentStr.includes('Hosur') || contentStr.includes('contact@nidarsanam.com'))) {
    const parsed = JSON.parse(contentStr);
    if (parsed.settings) {
      parsed.settings.phone_number = '+91 99523 38765';
      parsed.settings.whatsapp_number = '+91 99523 38765';
      parsed.settings.email = 'nidarsanamhealthcare@gmail.com';
      parsed.settings.clinic_address = '3/850 D, Renuga Devi Kovil Street, Manthoppu';
      parsed.settings.clinic_city = 'Dharmapuri';
      parsed.settings.clinic_state = 'Tamil Nadu';
      parsed.settings.clinic_pincode = '636701';
      parsed.settings.clinic_country = 'India';
      parsed.settings.map_lat = 12.1249857;
      parsed.settings.map_lng = 78.1502931;
      parsed.settings.map_link = 'https://maps.app.goo.gl/Hcaec89GsGM5vHYMA';
      parsed.settings.map_embed_url = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.6738953155383!2d78.1477182!3d12.1249857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bac170506314ba5%3A0x3c4e65185c03533!2sNIDARSANAM%20HEALTH%20CARE!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin';
    }
    if (parsed.consultation?.offline) {
      parsed.consultation.offline.address = '3/850 D, Renuga Devi Kovil Street, Manthoppu, Dharmapuri, Tamil Nadu - 636701';
      parsed.consultation.offline.badge = 'Clinic Visit (Dharmapuri)';
      parsed.consultation.offline.description = 'In-person consultation and clinical examination at our clinic in Dharmapuri, Tamil Nadu. Ideal for hands-on assessment and natural therapies.';
    }
    if (parsed.home?.method?.heading && parsed.home.method.heading.includes('different')) {
      parsed.home.method.heading = 'The Right Way to approach lifestyle health.';
    }
    localStorage.setItem('nidarsanam_content', JSON.stringify(parsed));
  } else if (contentStr && contentStr.includes('different way to approach lifestyle health')) {
    const parsed = JSON.parse(contentStr);
    if (parsed.home?.method) {
      parsed.home.method.heading = 'The Right Way to approach lifestyle health.';
    }
    localStorage.setItem('nidarsanam_content', JSON.stringify(parsed));
  }
  if (contentStr && contentStr.includes('Ayurvedic')) {
    const updatedStr = contentStr.replace(/Ayurvedic\s*/g, 'naturopathic ');
    localStorage.setItem('nidarsanam_content', updatedStr);
  }
  // Migrate map link if old or missing
  if (contentStr && (!contentStr.includes('maps.app.goo.gl/Hcaec89GsGM5vHYMA') || contentStr.includes('12.1218'))) {
    try {
      const parsed = JSON.parse(localStorage.getItem('nidarsanam_content') || contentStr);
      if (parsed.settings) {
        parsed.settings.map_lat = 12.1249857;
        parsed.settings.map_lng = 78.1502931;
        parsed.settings.map_link = 'https://maps.app.goo.gl/Hcaec89GsGM5vHYMA';
        parsed.settings.map_embed_url = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.6738953155383!2d78.1477182!3d12.1249857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bac170506314ba5%3A0x3c4e65185c03533!2sNIDARSANAM%20HEALTH%20CARE!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin';
        localStorage.setItem('nidarsanam_content', JSON.stringify(parsed));
      }
    } catch (err) {
      console.warn('Map cache migration notice:', err);
    }
  }
  // Migrate hero image if using HEIC or old unsplash
  if (contentStr && (contentStr.includes('HEIC') || contentStr.includes('photo-1589301760014'))) {
    try {
      const parsed = JSON.parse(localStorage.getItem('nidarsanam_content') || contentStr);
      if (parsed.home?.hero) {
        parsed.home.hero.hero_image = '/home-hero.jpg';
        localStorage.setItem('nidarsanam_content', JSON.stringify(parsed));
      }
    } catch (err) {
      console.warn('Hero image cache migration notice:', err);
    }
  }
} catch (e) {
  console.warn('Cache migration notice:', e);
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
