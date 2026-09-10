import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const CMSContext = createContext(null);

// Initial Default Content matching Master Prompt specifications
const DEFAULT_CONTENT = {
  settings: {
    site_name: 'Nidarsanam Healthcare',
    tagline: 'The path to real health.',
    positioning: 'Understand. Personalise. Reorder.',
    phone_number: '+91 99523 38765',
    whatsapp_number: '+91 99523 38765',
    email: 'nidarsanamhealthcare@gmail.com',
    clinic_address: '3/850 D, Renuga Devi Kovil Street, Manthoppu',
    clinic_city: 'Dharmapuri',
    clinic_state: 'Tamil Nadu',
    clinic_pincode: '636701',
    clinic_country: 'India',
    map_lat: 12.1249857,
    map_lng: 78.1502931,
    map_link: 'https://maps.app.goo.gl/Hcaec89GsGM5vHYMA',
    map_embed_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.6738953155383!2d78.1477182!3d12.1249857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bac170506314ba5%3A0x3c4e65185c03533!2sNIDARSANAM%20HEALTH%20CARE!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin',
    instagram_url: 'https://instagram.com/nidarsanam',
    facebook_url: 'https://facebook.com/nidarsanam',
    youtube_url: 'https://youtube.com/nidarsanam',
    meta_title: 'Nidarsanam Healthcare — Rooted in Traditional Wisdom, Designed for Modern Health',
    meta_description: 'A personalised lifestyle health practice combining Panchamahabhuta assessment, traditional Indian food, therapeutic yoga, and naturopathy under Dr. Nidarsin (BNYS).'
  },
  home: {
    hero: {
      headline: 'Rebuild Your Health. Return to Your Roots.',
      subheadline: 'A personalised lifestyle approach rooted in traditional Indian food, therapeutic yoga and a deeper understanding of the individual.',
      supporting_line: 'Panchamahabhuta-based assessment • Traditional Food • Therapeutic Yoga • Lifestyle Reordering',
      primary_cta_text: 'Book an Appointment',
      primary_cta_link: '/contact',
      secondary_cta_text: 'Discover Our Approach',
      secondary_cta_link: '#philosophy',
      hero_image: '/home-hero.jpg',
    },
    philosophy: {
      large_statement: 'We don\'t begin with the condition. We begin by understanding the individual.',
      supporting_text: 'At Nidarsanam Healthcare, we look beyond isolated symptoms and explore individual lifestyle patterns, food habits, movement, sleep and daily routines.\n\nOur approach begins with a Panchamahabhuta-based traditional assessment framework and uses that understanding to help personalise food, yoga, lifestyle and appropriate naturopathic approaches.',
      cta_text: 'Explore Our Approach',
      cta_link: '/about',
      image: '/home-phylosophy.jpg',
    },
    panchamahabhuta: {
      heading: 'Understand Before You Reorder.',
      subheading: 'Our assessment begins with the individual through the lens of the five fundamental elements.',
      disclaimer: 'Panchamahabhuta is a traditional framework and does not replace conventional medical diagnosis, laboratory testing or emergency medical care.',
      elements: [
        {
          id: 'akasa',
          name: 'Ākāśa',
          english: 'Space / Ether',
          symbol: '🌌',
          colorKey: 'akasa',
          attribute: 'Expansion & Consciousness',
          description: 'The element of expansion, mental clarity, consciousness, and spatial balance within bodily systems and thought processes.',
          significance: 'Governs bodily cavities, channels, mental peace, and the ability to process life without internal tension.'
        },
        {
          id: 'vayu',
          name: 'Vāyu',
          english: 'Air / Motion',
          symbol: '💨',
          colorKey: 'vayu',
          attribute: 'Movement & Flow',
          description: 'The element of movement, respiration, nerve impulses, and circulation of vital energy throughout the physiology.',
          significance: 'Governs breathing, sensory perception, peristalsis, and the nervous system flow.'
        },
        {
          id: 'agni',
          name: 'Agni',
          english: 'Fire / Energy',
          symbol: '🔥',
          colorKey: 'agni',
          attribute: 'Transformation & Metabolism',
          description: 'The element of metabolic fire, digestion, enzymatic transformation, body temperature, and cellular energy.',
          significance: 'Governs digestive strength (Jatharagni), absorption of nutrients, and metabolic vitality.'
        },
        {
          id: 'jala',
          name: 'Jala',
          english: 'Water / Nourishment',
          symbol: '💧',
          colorKey: 'jala',
          attribute: 'Nourishment & Fluidity',
          description: 'The element of fluid harmony, hydration, lubrication of joints, cellular nourishment, and adaptability.',
          significance: 'Maintains plasma, lymphatic flow, mucous membranes, emotional stability, and cohesion.'
        },
        {
          id: 'prthvi',
          name: 'Pṛthvi',
          english: 'Earth / Structure',
          symbol: '🌍',
          colorKey: 'prthvi',
          attribute: 'Stability & Grounding',
          description: 'The element of physical structure, skeletal strength, muscular density, stamina, and grounding stability.',
          significance: 'Provides the foundation for bones, tissues, resilience against physical stress, and restorative grounding.'
        }
      ]
    },
    method: {
      heading: 'The Right Way to approach lifestyle health.',
      subheading: 'The Nidarsanam Method™ provides a clear, progressive roadmap from root evaluation to long-term vitality.',
      steps: [
        {
          number: '01',
          title: 'ASSESS',
          description: 'In-depth Panchamahabhuta-based assessment, clinical intake, and lifestyle review.',
          icon: 'Compass'
        },
        {
          number: '02',
          title: 'UNDERSTAND',
          description: 'Decode individual biorhythms, digestive fire, sleep patterns, and daily habits.',
          icon: 'Eye'
        },
        {
          number: '03',
          title: 'PERSONALISE',
          description: 'Formulate a unique health blueprint tailored specifically to your body and lifestyle.',
          icon: 'FileText'
        },
        {
          number: '04',
          title: 'NOURISH',
          description: 'Culturally familiar traditional Indian food guidance rich in regional biodiversity.',
          icon: 'Utensils'
        },
        {
          number: '05',
          title: 'MOVE',
          description: 'Prescribed therapeutic yoga postures, breathwork (Pranayama), and restorative movement.',
          icon: 'Activity'
        },
        {
          number: '06',
          title: 'REORDER',
          description: 'Harmonise daily routines (Dinacharya), meal timings, and restorative circadian sleep.',
          icon: 'Clock'
        },
        {
          number: '07',
          title: 'REVIEW',
          description: 'Continuous monitoring, follow-up consultations, and seasonal refinement of your plan.',
          icon: 'RefreshCw'
        }
      ]
    },
    approaches: [
      {
        id: 'food',
        title: 'Traditional Indian Food',
        subtitle: 'Culturally familiar, bio-diverse nutrition',
        description: 'Personalised diet plans based on traditional Indian foods, with plans reviewed and revised regularly according to individual progress.',
        image: '/home-3pillar-indianfood.jpg',
        highlights: ['Heritage rice & millet varieties', 'Indigenous greens & regional vegetables', 'Digestive spices & herbal infusions', 'Regular plan revisions'],
        cta_text: 'Explore Nutrition',
        cta_link: '/about'
      },
      {
        id: 'yoga',
        title: 'Therapeutic Yoga',
        subtitle: 'Targeted Asanas & Pranayama',
        description: 'Structured therapeutic yoga programs designed around individual needs and delivered through online guidance where appropriate.',
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
        highlights: ['Targeted therapeutic Asanas', 'Pranayama for nervous system balance', 'Gentle restorative sequences', 'Personalised online guidance'],
        cta_text: 'Explore Movement',
        cta_link: '/about'
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle Reordering',
        subtitle: 'Circadian Harmony',
        description: 'Practical guidance to reorganise food habits, movement, sleep and everyday routines.',
        image: '/home-3pillar-Circadian.jpg',
        highlights: ['Meal timing synchronisation', 'Sleep hygiene & circadian alignment', 'Stress management techniques', 'Sustainable daily routines'],
        cta_text: 'Explore Lifestyle',
        cta_link: '/about'
      }
    ],
    natural_therapies: {
      heading: 'Personalised Support Beyond Food',
      description: 'Where appropriate, our approach may also incorporate naturopathic and natural therapeutic modalities such as acupuncture alongside lifestyle-based interventions.',
      therapies: [
        { name: 'Acupuncture', description: 'Gentle meridian stimulation to support systemic balance, pain relief, and energetic regulation.', icon: 'Sparkles' },
        { name: 'Naturopathic Therapies', description: 'natural modalities to aid metabolic and elimination and increase vital energy.', icon: 'Leaf' },
        { name: 'Lifestyle Guidance', description: 'Structured behavioural counseling, stress modulation, and restorative habits.', icon: 'Sun' }
      ]
    },
    areas_we_support: {
      heading: 'Lifestyle Support for Better Health',
      subheading: 'Our approach is personalised to the individual and is not a one-size-fits-all protocol.',
      areas: [
        { title: 'PCOS / PCOD', description: 'Hormonal and menstrual regularity through balanced food habits, yoga, and circadian rhythm alignment.' },
        { title: 'Type 2 Diabetes', description: 'Metabolic balance and blood sugar harmony via unpolished grains, meal spacing, and therapeutic movement.' },
        { title: 'Blood Pressure Concerns', description: 'Cardiovascular ease supported through calming Pranayama, sodium-potassium balance, and stress regulation.' },
        { title: 'Cholesterol Management', description: 'Lipid balance through functional Indian spices, natural fibre, and liver-supporting food patterns.' },
        { title: 'Thyroid-Related Lifestyle', description: 'Thyroid vitality supported through nutrient-rich regional foods, yoga postures, and metabolic stimulation.' },
        { title: 'Weight Management', description: 'Sustainable body composition through digestive fire enhancement and mindful meal patterns, without starvation diets.' },
        { title: 'Metabolic Health', description: 'Optimising insulin sensitivity, cellular energy, and gut microbiome diversity.' },
        { title: 'Digestive & Lifestyle Concerns', description: 'Relief from chronic bloating, sluggish digestion, acidity, and sleep disruption.' },
        { title: 'Insomnia', description: 'Restoring circadian sleep architecture, nervous system relaxation, and natural melatonin rhythm without dependence on sedatives.' },
        { title: 'Skin-Related Disorders', description: 'Root-cause management for chronic skin concerns, eczema, psoriasis, and acne through gut-skin axis harmony and natural blood purification.' },
        { title: 'Psychological Counseling', description: 'Compassionate mind-body guidance, stress modulation, emotional balance, and therapeutic relaxation techniques.' },
        { title: 'Pain Management Without Steroids', description: 'Non-steroidal pain relief through clinical acupuncture, anti-inflammatory natural nutrition, and therapeutic yoga alignment.' },
        { title: 'All Kinds of Lifestyle Disorders', description: 'Holistic assessment and individualized lifestyle reordering for chronic modern lifestyle and metabolic conditions.' }
      ]
    },
    why_traditional_food: {
      heading: 'Food That Feels Like Home.',
      subheading: 'We believe healthy eating doesn\'t have to mean abandoning the food we grew up with.',
      description: 'Our program focuses on culturally familiar Indian foods and practical eating patterns rather than unnecessarily complicated or alien diet plans. We celebrate the deep nutritional wisdom embedded in traditional Indian home cooking.',
      gallery: [
        { title: 'Traditional Rice Varieties', subtitle: 'Unpolished, aromatic heritage grains rich in micronutrients', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80' },
        { title: 'Ancient Millets', subtitle: 'Ragi, Jowar, Bajra, Foxtail & Barnyard millets for sustained glucose release', image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80' },
        { title: 'Native Pulses & Legumes', subtitle: 'Traditional slow-cooked dals providing plant protein and gut-friendly fibre', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80' },
        { title: 'Regional Greens & Veggies', subtitle: 'Seasonal Keerai, gourds, and native botanicals for cellular antioxidant protection', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80' },
        { title: 'Therapeutic Indian Spices', subtitle: 'Turmeric, jeera, black pepper, ginger, and fenugreek acting as natural digestive catalysts', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80' }
      ]
    },
    practitioner: {
      heading: 'Meet Your Practitioner',
      name: 'Dr. Nidarsin',
      qualification: 'BNYS (Bachelor of Naturopathy & Yogic Sciences)',
      title: 'Naturopathy Physician & Holistic Lifestyle Consultant',
      image: '/profile.png',
      qualifications_text: 'Graduated with a Bachelor of Naturopathy and Yogic Sciences (BNYS) from a premier recognized medical institution, equipped with comprehensive training in clinical diagnostics, nutrition, yoga therapy, and acupuncture.',
      background_text: 'With years of clinical practice in non-invasive lifestyle medicine, Dr. Nidarsin has guided hundreds of individuals through metabolic, hormonal, and digestive reordering by integrating traditional Indian wisdom with contemporary medical understanding.',
      philosophy_text: 'True healing happens when we address the root imbalances rather than merely managing symptomatic complaints. By aligning our food, movement, and daily routines with our inherent constitutional balance, the body\'s self-regulatory mechanisms flourish.',
      cta_text: 'Read Dr. Nidarsin\'s Full Story',
      cta_link: '/about'
    },
    final_cta: {
      heading: 'Ready to Reorder Your Lifestyle?',
      subheadline: 'Start with understanding. Build a sustainable plan that fits your real everyday life.',
      primary_button_text: 'Book an Appointment',
      primary_button_link: '/contact',
      secondary_button_text: 'Contact Our Team',
      secondary_button_link: '/contact'
    }
  },
  about: {
    hero: {
      headline: 'The Right Way to Look at Health.',
      subheadline: 'Understanding the individual before designing the approach.',
      image: '/aboutUs-ourJourney.jpg'
    },
    story: {
      heading: 'Why Nidarsanam?',
      paragraphs: [
        'Nidarsanam Healthcare was founded upon a fundamental realisation: most chronic lifestyle issues in modern society do not stem from a deficiency of information, but from a disconnect between our daily habits and our biological roots.',
        'In today\'s fast-paced environment, individuals are often handed fragmented solutions—quick-fix diets, extreme fitness regimes, or isolated supplements. At Nidarsanam, we believe meaningful, lasting health begins with deep understanding.',
        'Our philosophy uniquely unites the time-tested wisdom of traditional Indian food systems, Panchamahabhuta-based assessment, therapeutic yoga, and evidence-informed naturopathic care into a structured, compassionate practice.'
      ]
    },
    philosophy_quote: {
      quote: 'We don\'t begin with the condition. We begin with the individual.',
      explanation: 'Every person carries a unique constitutional makeup, digestive rhythm, sleep cycle, emotional landscape, and daily routine. Therefore, Nidarsanam follows a truly personalised approach rather than applying rigid, one-size-fits-all protocols.'
    },
    five_pillars: [
      { number: '1', title: 'FOOD', description: 'Personalised traditional Indian food-based guidance celebrating regional ingredients and digestive fire.', icon: 'Utensils' },
      { number: '2', title: 'MOVEMENT', description: 'Structured therapeutic yoga, targeted postures, and Pranayama designed around individual physiology.', icon: 'Activity' },
      { number: '3', title: 'LIFESTYLE', description: 'Realigning daily circadian routines, meal pacing, and restorative sleep habits.', icon: 'Sun' },
      { number: '4', title: 'NATURAL THERAPIES', description: 'Appropriate naturopathic modalities, including acupuncture and naturopathy applications where indicated.', icon: 'Sparkles' },
      { number: '5', title: 'REVIEW', description: 'Regular monitoring, objective progress tracking, and seasonal refinement of your personalized plan.', icon: 'CheckCircle2' }
    ],
    practitioner_detail: {
      heading: 'Meet Dr. Nidarsin',
      name: 'Dr. Nidarsin, BNYS',
      title: 'Naturopathy Physician',
      image: '/profile.png',
      educational_qualification: 'Bachelor of Naturopathy and Yogic Sciences (BNYS) — Full-time 5.5-year medical degree including intensive clinical internship.',
      professional_background: 'Extensive experience in clinical lifestyle medicine, metabolic disorder management, therapeutic yoga prescription, and classical acupuncture.',
      clinical_philosophy: 'Viewing the patient as a whole human being. Health is not just the absence of disease, but a state of dynamic physical, physiological, and mental vitality.',
      areas_of_interest: 'Metabolic health, insulin resistance, PCOS management, digestive gut-brain axis, and traditional Indian food science.',
      patient_care_approach: 'Empathetic listening, clear educational guidance, sustainable step-by-step habit formation, and close clinical follow-up.'
    },
    differentiators: [
      { id: '1', title: 'Personalised', description: 'No generic, one-size-fits-all plans. Every recommendation is custom-crafted for your lifestyle.' },
      { id: '2', title: 'Traditional', description: 'Deeply rooted in Indian food traditions, naturopathic principles, and ancestral wisdom.' },
      { id: '3', title: 'Structured', description: 'Clear, milestone-driven programs with step-by-step accountability and supportive guidance.' },
      { id: '4', title: 'Progressive', description: 'Plans evolve as your body responds, digestion strengthens, and biomarkers improve.' },
      { id: '5', title: 'Practical', description: 'Designed for real life, family meals, work schedules, and social occasions—no impossible diets.' },
      { id: '6', title: 'Holistic', description: 'Considers food, movement, routine, mental calmness, and environment simultaneously.' }
    ],
    promise: {
      statement: 'Understand. Personalise. Reorder.',
      supporting_text: 'We are committed to making healthy living practical, understandable, and deeply sustainable for you and your family.'
    }
  },
  blog: {
    hero: {
      headline: 'The Nidarsanam Journal',
      subheadline: 'Traditional food. Lifestyle wisdom. Practical health education.',
      image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=80'
    },
    newsletter: {
      heading: 'Stay Connected With Nidarsanam',
      subheading: 'Receive practical insights on traditional Indian food, lifestyle wisdom, and holistic wellness straight to your inbox.',
      button_text: 'Subscribe to Journal'
    }
  },
  contact: {
    hero: {
      headline: 'Let\'s Begin Your Health Journey.',
      subheadline: 'Whether you are visiting us online from anywhere in the world or in person at our clinic, your journey begins with a conversation.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80'
    },
    form_settings: {
      title: 'Book an Appointment',
      success_message: 'Thank you. Your appointment request has been received. Our clinical coordination team will contact you shortly to confirm your preferred slot.'
    },
    consultation_options: {
      online: {
        title: 'Online Consultation',
        description: 'Comprehensive video consultation suitable for patients across India and internationally. Includes detailed health assessment and digital plan delivery.',
        badge: 'Available Worldwide'
      },
      offline: {
        title: 'In-Clinic Consultation',
        description: 'In-person consultation and clinical examination at our clinic in Dharmapuri, Tamil Nadu. Ideal for hands-on assessment and natural therapies.',
        badge: 'Clinic Visit (Dharmapuri)'
      }
    },
    when_to_contact: [
      { title: 'For New Appointments', description: 'Use the booking form or WhatsApp us directly to schedule your initial Panchamahabhuta assessment.' },
      { title: 'For Program Enquiries', description: 'Have questions about our therapeutic yoga, food guidance, or naturopathy? Call or email our team.' },
      { title: 'For Online Consultation', description: 'Remote guidance available via high-definition video calls with digital chart sharing.' },
      { title: 'For Existing Patient Follow-ups', description: 'Reach out via WhatsApp or phone for routine reviews, plan refinements, and query resolutions.' }
    ],
    emergency_disclaimer: 'For medical emergencies, severe chest pain, acute breathing distress, or sudden trauma, please immediately contact your local emergency medical service or visit the nearest hospital emergency department.',
    faqs: [
      {
        question: 'Do you offer online consultations?',
        answer: 'Yes, we conduct comprehensive online consultations for patients across India and globally. The session includes a detailed Panchamahabhuta-based assessment, discussion of lifestyle and health history, followed by a personalized digital plan and ongoing follow-up support.'
      },
      {
        question: 'Can I visit the clinic in person?',
        answer: 'Absolutely. You are welcome to visit our clinic in Dharmapuri, Tamil Nadu for in-person consultations, clinical evaluation, and appropriate naturopathic therapies such as acupuncture. Prior appointment booking is recommended.'
      },
      {
        question: 'How does the initial assessment work?',
        answer: 'The initial consultation is a comprehensive 45-60 minute evaluation where Dr. Nidarsin explores your complete health history, digestive strength, meal patterns, sleep quality, stress factors, and constitutional element balance (Panchamahabhuta) before designing your program.'
      },
      {
        question: 'What is Panchamahabhuta-based assessment?',
        answer: 'Panchamahabhuta is the classical Indian framework of five foundational elements (Space, Air, Fire, Water, Earth). By evaluating how these elements manifest in your metabolism, tissues, and daily biorhythms, we identify the root imbalances driving your symptoms.'
      },
      {
        question: 'How often is the diet plan revised?',
        answer: 'Diet plans are reviewed and refined every 2 to 4 weeks depending on your progress, digestive adaptability, seasonal changes, and symptom evolution. We believe in progressive nourishment rather than static diet charts.'
      },
      {
        question: 'Do you provide therapeutic yoga online?',
        answer: 'Yes. Our therapeutic yoga sequences are customized according to your physical capabilities and health priorities, delivered with step-by-step video guidance, breathing protocols, and posture corrections.'
      },
      {
        question: 'Can I book an appointment directly through the website?',
        answer: 'Yes! Simply fill out the Appointment Booking Form on our Contact page with your preferred date and time. Our team will verify slot availability and send you a confirmation via WhatsApp and email.'
      },
      {
        question: 'Do you provide personalised diet plans based on Indian food?',
        answer: 'Yes, this is a core specialty at Nidarsanam. We do not prescribe alien or unsustainable Western fad diets. We design balanced nutrition using culturally familiar regional Indian grains, traditional dals, native greens, vegetables, and therapeutic spices that fit naturally into your home cooking.'
      }
    ]
  }
};

// Initial Categories
const DEFAULT_CATEGORIES = [
  { id: 'cat_1', name: 'Traditional Indian Food', slug: 'traditional-indian-food', count: 0, icon: '🌾' },
  { id: 'cat_2', name: 'Nutrition', slug: 'nutrition', count: 0, icon: '🥗' },
  { id: 'cat_3', name: 'Yoga', slug: 'yoga', count: 0, icon: '🧘' },
  { id: 'cat_4', name: 'Lifestyle', slug: 'lifestyle', count: 0, icon: '☀️' },
  { id: 'cat_5', name: 'Naturopathy', slug: 'naturopathy', count: 0, icon: '🌿' },
  { id: 'cat_6', name: 'Panchamahabhuta', slug: 'panchamahabhuta', count: 0, icon: '🌌' },
  { id: 'cat_7', name: 'Women\'s Health', slug: 'womens-health', count: 0, icon: '🌸' },
  { id: 'cat_8', name: 'Metabolic Health', slug: 'metabolic-health', count: 0, icon: '⚡' },
  { id: 'cat_9', name: 'Healthy Living', slug: 'healthy-living', count: 0, icon: '🌱' }
];

// Initial Blogs (starts empty; create and manage blogs via Admin CMS)
const DEFAULT_BLOGS = [];

// Initial Sample Leads
const DEFAULT_LEADS = [
  {
    _id: 'lead_1',
    name: 'Raj Kumar',
    age: 36,
    phone: '+91 99523 38765',
    email: 'raj.kumar@example.com',
    city: 'Bengaluru',
    health_concern: 'Type 2 Diabetes & Sluggish Digestion',
    additional_message: 'Looking for sustainable Indian food guidance and therapeutic yoga to manage blood sugar without crash diets.',
    consultation_type: 'Online',
    preferred_date: '2026-09-05',
    preferred_time: '10:30 AM',
    source: 'Website Appointment Form',
    status: 'New',
    created_at: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    notes: [
      {
        _id: 'n_1',
        note: 'Lead submitted via website. Expressed interest in online consultation for diabetes management.',
        created_at: new Date(Date.now() - 22 * 3600 * 1000).toISOString(),
        created_by_name: 'System'
      }
    ],
    follow_ups: [
      {
        _id: 'f_1',
        follow_up_date: '2026-09-02',
        follow_up_time: '11:00 AM',
        note: 'Call to confirm WhatsApp consultation link and medical history intake form.',
        status: 'Pending'
      }
    ]
  },
  {
    _id: 'lead_2',
    name: 'Priya Sharma',
    age: 29,
    phone: '+91 94455 12345',
    email: 'priya.sharma@example.com',
    city: 'Dharmapuri',
    health_concern: 'PCOS & Irregular Sleep Patterns',
    additional_message: 'Want in-person consultation and guidance on natural therapies and traditional food recipes for hormonal balance.',
    consultation_type: 'Offline',
    preferred_date: '2026-09-08',
    preferred_time: '04:00 PM',
    source: 'Contact Page',
    status: 'Contacted',
    created_at: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
    notes: [
      {
        _id: 'n_2',
        note: 'Spoke with patient on phone. Scheduled clinic consultation in Dharmapuri. Sent clinic location map via WhatsApp.',
        created_at: new Date(Date.now() - 40 * 3600 * 1000).toISOString(),
        created_by_name: 'Clinic Coordinator'
      }
    ],
    follow_ups: []
  },
  {
    _id: 'lead_3',
    name: 'Anand Sundaram',
    age: 48,
    phone: '+91 98400 98765',
    email: 'anand.s@example.com',
    city: 'Chennai',
    health_concern: 'Hypertension & Cholesterol Lifestyle Management',
    additional_message: 'Referred by a friend. Interested in therapeutic Pranayama and lifestyle reordering.',
    consultation_type: 'Online',
    preferred_date: '2026-09-12',
    preferred_time: '06:00 PM',
    source: 'Website',
    status: 'Follow-up',
    created_at: new Date(Date.now() - 72 * 3600 * 1000).toISOString(),
    notes: [
      {
        _id: 'n_3',
        note: 'Initial intake call completed. Patient sent latest lipid profile report.',
        created_at: new Date(Date.now() - 60 * 3600 * 1000).toISOString(),
        created_by_name: 'Dr. Nidarsin'
      }
    ],
    follow_ups: [
      {
        _id: 'f_2',
        follow_up_date: '2026-09-10',
        follow_up_time: '05:30 PM',
        note: 'Review post-consultation food journal and yoga practice feedback.',
        status: 'Pending'
      }
    ]
  }
];

export const CMSProvider = ({ children }) => {
  // Helper to ensure stale cached contact info is automatically upgraded
  const sanitizeContent = (data) => {
    if (!data) return DEFAULT_CONTENT;
    const settings = data.settings || {};
    const hasOldData =
      settings.clinic_city === 'Hosur' ||
      settings.email === 'contact@nidarsanam.com' ||
      (settings.phone_number && settings.phone_number.includes('98765'));

    let updated = data;
    if (hasOldData) {
      updated = {
        ...updated,
        settings: {
          ...settings,
          phone_number: '+91 99523 38765',
          whatsapp_number: '+91 99523 38765',
          email: 'nidarsanamhealthcare@gmail.com',
          clinic_address: '3/850 D, Renuga Devi Kovil Street, Manthoppu',
          clinic_city: 'Dharmapuri',
          clinic_state: 'Tamil Nadu',
          clinic_pincode: '636701',
          clinic_country: 'India',
          map_lat: 12.1249857,
          map_lng: 78.1502931,
          map_link: 'https://maps.app.goo.gl/Hcaec89GsGM5vHYMA',
          map_embed_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.6738953155383!2d78.1477182!3d12.1249857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bac170506314ba5%3A0x3c4e65185c03533!2sNIDARSANAM%20HEALTH%20CARE!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin'
        }
      };
    } else if (!settings.map_link || settings.map_lat === 12.1218) {
      updated = {
        ...updated,
        settings: {
          ...settings,
          map_lat: 12.1249857,
          map_lng: 78.1502931,
          map_link: 'https://maps.app.goo.gl/Hcaec89GsGM5vHYMA',
          map_embed_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.6738953155383!2d78.1477182!3d12.1249857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bac170506314ba5%3A0x3c4e65185c03533!2sNIDARSANAM%20HEALTH%20CARE!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin'
        }
      };
    }

    if (updated?.home?.hero) {
      if (
        !updated.home.hero.hero_image ||
        updated.home.hero.hero_image.includes('unsplash') ||
        updated.home.hero.hero_image.includes('HEIC') ||
        updated.home.hero.hero_image === 'home-hero.HEIC'
      ) {
        updated = {
          ...updated,
          home: {
            ...updated.home,
            hero: {
              ...updated.home.hero,
              hero_image: '/home-hero.jpg'
            }
          }
        };
      }
    }

    if (updated?.home?.philosophy) {
      if (!updated.home.philosophy.image || updated.home.philosophy.image.includes('unsplash')) {
        updated = {
          ...updated,
          home: {
            ...updated.home,
            philosophy: {
              ...updated.home.philosophy,
              image: '/home-phylosophy.jpg'
            }
          }
        };
      }
    }

    if (updated?.home?.approaches) {
      updated = {
        ...updated,
        home: {
          ...updated.home,
          approaches: updated.home.approaches.map(a => {
            if (a.id === 'food' && (!a.image || a.image.includes('unsplash'))) {
              return { ...a, image: '/home-3pillar-indianfood.jpg' };
            }
            if (a.id === 'lifestyle') {
              const needsImg = !a.image || a.image.includes('unsplash');
              const needsSub = a.subtitle?.includes('Dinacharya');
              if (needsImg || needsSub) {
                return {
                  ...a,
                  image: needsImg ? '/home-3pillar-Circadian.jpg' : a.image,
                  subtitle: 'Circadian Harmony'
                };
              }
            }
            return a;
          })
        }
      };
    }

    if (updated?.home?.practitioner) {
      if (!updated.home.practitioner.image || updated.home.practitioner.image.includes('unsplash')) {
        updated = {
          ...updated,
          home: {
            ...updated.home,
            practitioner: {
              ...updated.home.practitioner,
              image: '/profile.png'
            }
          }
        };
      }
    }

    if (updated?.about?.hero) {
      if (!updated.about.hero.image || updated.about.hero.image.includes('unsplash')) {
        updated = {
          ...updated,
          about: {
            ...updated.about,
            hero: {
              ...updated.about.hero,
              image: '/aboutUs-ourJourney.jpg'
            }
          }
        };
      }
    }

    if (updated?.about?.practitioner_detail) {
      if (!updated.about.practitioner_detail.image || updated.about.practitioner_detail.image.includes('unsplash')) {
        updated = {
          ...updated,
          about: {
            ...updated.about,
            practitioner_detail: {
              ...updated.about.practitioner_detail,
              image: '/profile.png'
            }
          }
        };
      }
    }

    if (updated?.home?.method?.heading && updated.home.method.heading.includes('different')) {
      updated = {
        ...updated,
        home: {
          ...updated.home,
          method: {
            ...updated.home?.method,
            heading: 'The Right Way to approach lifestyle health.'
          }
        }
      };
    }

    if (updated?.home?.natural_therapies?.therapies) {
      const therapies = updated.home.natural_therapies.therapies.map(t => {
        if (t.name?.toLowerCase().includes('naturopathic') && t.description?.includes('Hydrotherapy')) {
          return {
            ...t,
            description: 'natural modalities to aid metabolic and elimination and increase vital energy.'
          };
        }
        return t;
      });
      updated = {
        ...updated,
        home: {
          ...updated.home,
          natural_therapies: {
            ...updated.home?.natural_therapies,
            therapies
          }
        }
      };
    }

    if (updated?.home?.areas_we_support?.areas) {
      const hasInsomnia = updated.home.areas_we_support.areas.some(a => a.title?.toLowerCase().includes('insomnia'));
      if (!hasInsomnia) {
        updated = {
          ...updated,
          home: {
            ...updated.home,
            areas_we_support: {
              ...updated.home?.areas_we_support,
              areas: DEFAULT_CONTENT.home.areas_we_support.areas
            }
          }
        };
      }
    }

    if (updated?.about?.hero?.headline && updated.about.hero.headline.includes('Different')) {
      updated = {
        ...updated,
        about: {
          ...updated.about,
          hero: {
            ...updated.about?.hero,
            headline: 'The Right Way to Look at Health.'
          }
        }
      };
    }

    if (updated?.about?.five_pillars) {
      updated = {
        ...updated,
        about: {
          ...updated.about,
          five_pillars: updated.about.five_pillars.map(p => {
            if (p.title === 'LIFESTYLE' || p.number === '3') {
              return {
                ...p,
                description: p.description.replace(/\s*\(Dinacharya\)/gi, '').replace(/\s*Dinacharya/gi, '')
              };
            }
            if (p.title === 'NATURAL THERAPIES' || p.number === '4') {
              return {
                ...p,
                description: p.description.replace('herbal applications', 'naturopathy applications')
              };
            }
            return p;
          })
        }
      };
    }

    if (updated?.about?.differentiators) {
      updated = {
        ...updated,
        about: {
          ...updated.about,
          differentiators: updated.about.differentiators.map(d => {
            if ((d.id === '2' || d.title === 'Traditional') && d.description && d.description.includes('Ayurvedic')) {
              return {
                ...d,
                description: d.description.replace(/Ayurvedic\s*/gi, 'naturopathic ')
              };
            }
            return d;
          })
        }
      };
    }

    return updated;
  };

  // Website Content
  const [content, setContent] = useState(() => {
    try {
      const saved = localStorage.getItem('nidarsanam_content');
      if (!saved) return DEFAULT_CONTENT;
      const parsed = JSON.parse(saved);
      const sanitized = sanitizeContent(parsed);
      if (sanitized !== parsed) {
        localStorage.setItem('nidarsanam_content', JSON.stringify(sanitized));
      }
      return sanitized;
    } catch (e) {
      console.error('Error reading localStorage:', e);
      return DEFAULT_CONTENT;
    }
  });

  // Watch content and auto-correct if old settings or headings ever appear
  useEffect(() => {
    const rawSettings = content?.settings || {};
    const hasOldSettings =
      rawSettings.clinic_city === 'Hosur' ||
      rawSettings.email === 'contact@nidarsanam.com' ||
      (rawSettings.phone_number && rawSettings.phone_number.includes('98765'));

    const hasOldMethodHeading =
      content?.home?.method?.heading && content.home.method.heading.includes('different');

    const hasOldNaturopathicDesc = content?.home?.natural_therapies?.therapies?.some(
      t => t.name?.toLowerCase().includes('naturopathic') && t.description?.includes('Hydrotherapy')
    );

    const hasOldAreas = !content?.home?.areas_we_support?.areas?.some(
      a => a.title?.toLowerCase().includes('insomnia')
    );

    const hasOldAboutHeadline =
      content?.about?.hero?.headline && content.about.hero.headline.includes('Different');

    const hasOldPillars = content?.about?.five_pillars?.some(
      p => p.description?.includes('Dinacharya') || p.description?.includes('herbal applications')
    );

    if (hasOldSettings || hasOldMethodHeading || hasOldNaturopathicDesc || hasOldAreas || hasOldAboutHeadline || hasOldPillars) {
      setContent(prev => sanitizeContent(prev));
    }
  }, [content]);

  // Blogs
  const [blogs, setBlogs] = useState(() => {
    const saved = localStorage.getItem('nidarsanam_blogs');
    if (!saved) return DEFAULT_BLOGS;
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        // Automatically filter out legacy sample dummy articles
        const cleaned = parsed.filter(b => !['blog_1', 'blog_2', 'blog_3', 'blog_4'].includes(b._id));
        if (cleaned.length !== parsed.length) {
          localStorage.setItem('nidarsanam_blogs', JSON.stringify(cleaned));
        }
        return cleaned;
      }
      return DEFAULT_BLOGS;
    } catch {
      return DEFAULT_BLOGS;
    }
  });

  // Categories
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('nidarsanam_categories');
    return saved ? JSON.parse(saved) : DEFAULT_CATEGORIES;
  });

  // Leads
  const [leads, setLeads] = useState(() => {
    const saved = localStorage.getItem('nidarsanam_leads');
    return saved ? JSON.parse(saved) : DEFAULT_LEADS;
  });

  // Subscribers
  const [subscribers, setSubscribers] = useState(() => {
    const saved = localStorage.getItem('nidarsanam_subscribers');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('nidarsanam_content', JSON.stringify(content));
  }, [content]);

  useEffect(() => {
    localStorage.setItem('nidarsanam_blogs', JSON.stringify(blogs));
  }, [blogs]);

  useEffect(() => {
    localStorage.setItem('nidarsanam_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('nidarsanam_leads', JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem('nidarsanam_subscribers', JSON.stringify(subscribers));
  }, [subscribers]);

  // Lead Actions
  const submitLead = async (leadData) => {
    const newLead = {
      _id: 'lead_' + Date.now(),
      ...leadData,
      source: leadData.source || 'Website Appointment Form',
      status: 'New',
      created_at: new Date().toISOString(),
      notes: [
        {
          _id: 'note_' + Date.now(),
          note: `Appointment requested for ${leadData.preferred_date || 'TBD'} at ${leadData.preferred_time || 'TBD'}.`,
          created_at: new Date().toISOString(),
          created_by_name: 'Website System'
        }
      ],
      follow_ups: []
    };

    // Try backend if available
    try {
      await api.post('/v1/leads', leadData);
    } catch (e) {
      console.log('Saved lead to local state:', e.message);
    }

    setLeads((prev) => [newLead, ...prev]);
    return {
      success: true,
      lead_id: newLead._id,
      confirmation_message: content.contact.form_settings.success_message
    };
  };

  const updateLeadStatus = (leadId, newStatus) => {
    setLeads((prev) =>
      prev.map((l) =>
        l._id === leadId
          ? {
            ...l,
            status: newStatus,
            updated_at: new Date().toISOString(),
            notes: [
              ...(l.notes || []),
              {
                _id: 'note_' + Date.now(),
                note: `Status updated to "${newStatus}"`,
                created_at: new Date().toISOString(),
                created_by_name: 'Admin'
              }
            ]
          }
          : l
      )
    );
  };

  const addLeadNote = (leadId, noteText, author = 'Admin') => {
    if (!noteText.trim()) return;
    setLeads((prev) =>
      prev.map((l) =>
        l._id === leadId
          ? {
            ...l,
            notes: [
              ...(l.notes || []),
              {
                _id: 'note_' + Date.now(),
                note: noteText.trim(),
                created_at: new Date().toISOString(),
                created_by_name: author
              }
            ]
          }
          : l
      )
    );
  };

  const addLeadFollowUp = (leadId, followUpData) => {
    setLeads((prev) =>
      prev.map((l) =>
        l._id === leadId
          ? {
            ...l,
            follow_ups: [
              ...(l.follow_ups || []),
              {
                _id: 'fu_' + Date.now(),
                ...followUpData,
                status: 'Pending',
                created_at: new Date().toISOString()
              }
            ]
          }
          : l
      )
    );
  };

  const deleteLead = (leadId) => {
    setLeads((prev) => prev.filter((l) => l._id !== leadId));
  };

  const exportLeadsCSV = () => {
    const headers = ['ID', 'Name', 'Age', 'Phone', 'Email', 'City', 'Health Concern', 'Consultation Type', 'Preferred Date', 'Preferred Time', 'Status', 'Source', 'Created Date'];
    const rows = leads.map((l) => [
      l._id,
      `"${l.name || ''}"`,
      l.age || '',
      `"${l.phone || ''}"`,
      `"${l.email || ''}"`,
      `"${l.city || ''}"`,
      `"${(l.health_concern || '').replace(/"/g, '""')}"`,
      l.consultation_type || 'Online',
      l.preferred_date || '',
      l.preferred_time || '',
      l.status || 'New',
      l.source || 'Website',
      l.created_at || ''
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `nidarsanam_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // CMS Content Updates
  const updateSectionContent = (page, section, newSectionData) => {
    setContent((prev) => ({
      ...prev,
      [page]: {
        ...prev[page],
        [section]: newSectionData
      }
    }));
  };

  const updateGlobalSettings = (newSettings) => {
    setContent((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        ...newSettings
      }
    }));
  };

  // Blog Actions
  const addBlog = (blogData) => {
    const slug = (blogData.slug || blogData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
    const wordCount = (blogData.content || '').replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));

    const newBlog = {
      _id: 'blog_' + Date.now(),
      ...blogData,
      slug,
      reading_time_minutes: readingTime,
      view_count: 0,
      published_at: blogData.status === 'Published' ? new Date().toISOString().slice(0, 10) : null,
      created_at: new Date().toISOString()
    };

    setBlogs((prev) => [newBlog, ...prev]);
    return newBlog;
  };

  const updateBlog = (blogId, updatedFields) => {
    setBlogs((prev) =>
      prev.map((b) =>
        b._id === blogId
          ? {
            ...b,
            ...updatedFields,
            updated_at: new Date().toISOString()
          }
          : b
      )
    );
  };

  const deleteBlog = (blogId) => {
    setBlogs((prev) => prev.filter((b) => b._id !== blogId));
  };

  const incrementBlogView = (slug) => {
    setBlogs((prev) =>
      prev.map((b) => (b.slug === slug ? { ...b, view_count: (b.view_count || 0) + 1 } : b))
    );
  };

  // Newsletter subscription
  const subscribeNewsletter = (name, email) => {
    const newSubscriber = {
      _id: 'sub_' + Date.now(),
      name,
      email,
      subscribed_at: new Date().toISOString()
    };
    setSubscribers((prev) => [newSubscriber, ...prev]);
    return { success: true, message: 'Thank you for subscribing to The Nidarsanam Journal!' };
  };

  return (
    <CMSContext.Provider
      value={{
        content,
        blogs,
        categories,
        leads,
        subscribers,
        submitLead,
        updateLeadStatus,
        addLeadNote,
        addLeadFollowUp,
        deleteLead,
        exportLeadsCSV,
        updateSectionContent,
        updateGlobalSettings,
        addBlog,
        updateBlog,
        deleteBlog,
        incrementBlogView,
        subscribeNewsletter
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};

export default CMSContext;
