import Card from '../../components/ui/Card';
import './Services.css';

const Services = () => {
  const departments = [
    {
      icon: '🫀',
      title: 'Cardiology',
      description: 'Comprehensive heart care including ECG, echocardiography, cardiac catheterization, and preventive cardiology programs.',
      features: ['ECG & Echocardiography', 'Stress Testing', 'Cardiac Rehabilitation'],
    },
    {
      icon: '🦴',
      title: 'Orthopedics',
      description: 'Advanced bone and joint care with minimally invasive surgeries, joint replacements, and sports medicine.',
      features: ['Joint Replacement', 'Sports Medicine', 'Spine Surgery'],
    },
    {
      icon: '🧠',
      title: 'Neurology',
      description: 'Expert neurological care for brain and nervous system disorders with advanced diagnostic capabilities.',
      features: ['EEG & EMG', 'Stroke Management', 'Epilepsy Care'],
    },
    {
      icon: '👶',
      title: 'Pediatrics',
      description: 'Compassionate healthcare for children from newborns to adolescents with specialized pediatric facilities.',
      features: ['Neonatal Care', 'Vaccinations', 'Growth Monitoring'],
    },
    {
      icon: '🩺',
      title: 'General Medicine',
      description: 'Primary care services covering preventive health, chronic disease management, and routine medical needs.',
      features: ['Health Check-ups', 'Chronic Disease Care', 'Preventive Medicine'],
    },
    {
      icon: '🧬',
      title: 'Dermatology',
      description: 'Advanced skin care solutions for all ages including cosmetic dermatology and clinical treatments.',
      features: ['Skin Treatments', 'Laser Therapy', 'Cosmetic Procedures'],
    },
    {
      icon: '👁️',
      title: 'Ophthalmology',
      description: 'Comprehensive eye care including cataract surgery, LASIK, and retinal treatments with modern equipment.',
      features: ['Cataract Surgery', 'LASIK', 'Retinal Care'],
    },
    {
      icon: '🦷',
      title: 'Dental Care',
      description: 'Full-spectrum dental services from routine cleanings to advanced restorative and cosmetic dentistry.',
      features: ['Root Canal', 'Dental Implants', 'Cosmetic Dentistry'],
    },
    {
      icon: '🏃',
      title: 'Physiotherapy',
      description: 'Rehabilitation and physical therapy services to restore mobility and improve quality of life.',
      features: ['Post-Surgery Rehab', 'Sports Injury', 'Pain Management'],
    },
  ];

  return (
    <main className="services-page">
      {/* Page Header */}
      <section className="page-header" id="services-header">
        <div className="page-header-bg">
          <div className="page-header-gradient"></div>
          <div className="page-header-glow"></div>
        </div>
        <div className="container page-header-content">
          <h1 className="page-header-title animate-fade-in-up">Our Services</h1>
          <p className="page-header-subtitle animate-fade-in-up delay-200">
            Comprehensive medical services designed to meet all your healthcare needs.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section" id="services-list">
        <div className="container">
          <div className="services-page-grid">
            {departments.map((dept, index) => (
              <div className="service-detail-card" key={index}>
                <div className="service-card-header">
                  <div className="service-card-icon">{dept.icon}</div>
                  <h3 className="service-card-title">{dept.title}</h3>
                </div>
                <p className="service-card-description">{dept.description}</p>
                <ul className="service-card-features">
                  {dept.features.map((feature, i) => (
                    <li key={i} className="service-feature">
                      <span className="feature-check">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Services;
