require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();

// ========== MIDDLEWARE ==========
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: [
    process.env.CLIENT_URL || 'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:5174'
  ],
  credentials: true
}));

// ========== MONGODB CONNECTION (With graceful fallback) ==========
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/nidarsanam';
const JWT_SECRET = process.env.JWT_SECRET || 'nidarsanam_super_secret_jwt_key_2026_roots_elements';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('🍃 MongoDB connected to Nidarsanam cluster'))
  .catch((err) => console.log('⚠️ MongoDB connection note (running with fallback if local):', err.message));

// ========== SCHEMAS ==========

// Admin Schema
const adminSchema = new mongoose.Schema({
  name: { type: String, default: 'Dr. Nidarsin' },
  email: { type: String, unique: true, required: true },
  password_hash: { type: String, required: true },
  role: { type: String, default: 'admin' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  is_active: { type: Boolean, default: true }
});

// Lead Schema
const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  phone: { type: String, required: true },
  email: { type: String, required: true },
  city: String,
  health_concern: { type: String, required: true },
  additional_message: String,
  consultation_type: { type: String, default: 'Online' }, // "Online" or "Offline"
  preferred_date: String,
  preferred_time: String,
  source: { type: String, default: 'Website' },
  status: { type: String, default: 'New' }, // New, Contacted, Follow-up, Converted, Closed
  notes: [
    {
      note: String,
      created_at: { type: Date, default: Date.now },
      created_by_name: String
    }
  ],
  follow_ups: [
    {
      follow_up_date: String,
      follow_up_time: String,
      note: String,
      status: { type: String, default: 'Pending' }
    }
  ],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

// Blog Post Schema
const blogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true, required: true },
  excerpt: String,
  content: String,
  featured_image_url: String,
  category_name: String,
  author: { type: String, default: 'Dr. Nidarsin, BNYS' },
  status: { type: String, default: 'Draft' }, // Draft, Published, Scheduled
  published_at: String,
  key_takeaways: [String],
  seo_title: String,
  meta_description: String,
  focus_keyword: String,
  view_count: { type: Number, default: 0 },
  reading_time_minutes: { type: Number, default: 5 },
  is_featured: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

// Website Content Schema
const websiteContentSchema = new mongoose.Schema({
  page: { type: String, required: true },
  section: { type: String, required: true },
  content: mongoose.Schema.Types.Mixed,
  updated_at: { type: Date, default: Date.now }
});

// Site Settings Schema
const siteSettingsSchema = new mongoose.Schema({
  setting_key: { type: String, unique: true, required: true },
  setting_value: mongoose.Schema.Types.Mixed,
  updated_at: { type: Date, default: Date.now }
});

// Newsletter Subscriber Schema
const subscriberSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  subscribed_at: { type: Date, default: Date.now },
  is_active: { type: Boolean, default: true }
});

// ========== MODELS ==========
const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);
const Lead = mongoose.models.Lead || mongoose.model('Lead', leadSchema);
const BlogPost = mongoose.models.BlogPost || mongoose.model('BlogPost', blogPostSchema);
const WebsiteContent = mongoose.models.WebsiteContent || mongoose.model('WebsiteContent', websiteContentSchema);
const SiteSettings = mongoose.models.SiteSettings || mongoose.model('SiteSettings', siteSettingsSchema);
const Subscriber = mongoose.models.Subscriber || mongoose.model('Subscriber', subscriberSchema);

// ========== AUTH MIDDLEWARE ==========
const verifyAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'No authorization token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

// ========== API ROUTES ==========

// 1. AUTH ROUTES
app.post('/api/v1/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password required' });
    }

    let admin = await Admin.findOne({ email: email.toLowerCase() });

    // Seed default admin if none exists
    if (!admin && email.toLowerCase() === 'admin@nidarsanam.com' && password === 'admin123') {
      const hash = await bcryptjs.hash('admin123', 10);
      admin = new Admin({
        name: 'Dr. Nidarsin',
        email: 'admin@nidarsanam.com',
        password_hash: hash,
        role: 'admin'
      });
      await admin.save();
    }

    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const match = await bcryptjs.compare(password, admin.password_hash);
    if (!match) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { _id: admin._id, email: admin.email, name: admin.name },
      JWT_SECRET,
      { expiresIn: '40h' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      token,
      admin: { _id: admin._id, name: admin.name, email: admin.email }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 2. LEADS ROUTES (Public Appointment Submission)
app.post(['/api/v1/leads', '/api/leads'], async (req, res) => {
  try {
    const { name, age, phone, email, city, health_concern, additional_message, consultation_type, preferred_date, preferred_time } = req.body;

    if (!name || !phone || !email || !health_concern) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const lead = new Lead({
      name,
      age: age ? Number(age) : null,
      phone,
      email,
      city,
      health_concern,
      additional_message,
      consultation_type: consultation_type || 'Online',
      preferred_date,
      preferred_time,
      source: req.body.source || 'Website Appointment Form',
      notes: [
        {
          note: `Appointment requested for ${preferred_date || 'Flexible'} (${preferred_time || 'General slot'}).`,
          created_by_name: 'Website System'
        }
      ]
    });

    await lead.save();

    res.status(201).json({
      success: true,
      message: 'Appointment request received',
      lead_id: lead._id,
      confirmation_message: 'Thank you. Your appointment request has been received. Our clinical coordination team will contact you shortly to confirm your preferred slot.'
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get Leads (Admin Only)
app.get(['/api/v1/leads', '/api/leads'], verifyAdmin, async (req, res) => {
  try {
    const { status, search } = req.query;
    let query = {};
    if (status && status !== 'All') query.status = status;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { health_concern: { $regex: search, $options: 'i' } }
      ];
    }

    const leads = await Lead.find(query).sort({ created_at: -1 });
    res.json({ success: true, total: leads.length, leads });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Update Lead Status (Admin)
app.patch('/api/v1/leads/:id/status', verifyAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      {
        status,
        updated_at: new Date(),
        $push: {
          notes: {
            note: `Status updated to "${status}"`,
            created_by_name: req.admin?.name || 'Admin'
          }
        }
      },
      { new: true }
    );
    res.json({ success: true, message: 'Status updated', lead });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Add Note to Lead (Admin)
app.post('/api/v1/leads/:id/notes', verifyAdmin, async (req, res) => {
  try {
    const { note } = req.body;
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          notes: {
            note,
            created_by_name: req.admin?.name || 'Admin',
            created_at: new Date()
          }
        }
      },
      { new: true }
    );
    res.status(201).json({ success: true, message: 'Note added', lead });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 3. BLOG ROUTES (Public)
app.get(['/api/v1/public/blogs', '/api/blogs'], async (req, res) => {
  try {
    const { category } = req.query;
    let query = { status: 'Published' };
    if (category && category !== 'All') query.category_name = category;

    const blogs = await BlogPost.find(query).sort({ created_at: -1 });
    res.json({ success: true, total: blogs.length, blogs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get(['/api/v1/public/blogs/:slug', '/api/blogs/:slug'], async (req, res) => {
  try {
    const blog = await BlogPost.findOneAndUpdate(
      { slug: req.params.slug, status: 'Published' },
      { $inc: { view_count: 1 } },
      { new: true }
    );
    if (!blog) return res.status(404).json({ success: false, message: 'Article not found' });
    res.json({ success: true, blog });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Blog CMS (Admin)
app.post('/api/v1/blogs', verifyAdmin, async (req, res) => {
  try {
    const blog = new BlogPost(req.body);
    await blog.save();
    res.status(201).json({ success: true, message: 'Blog saved', blog });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 4. NEWSLETTER ROUTE (Public)
app.post(['/api/v1/public/newsletter', '/api/newsletter'], async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: 'Email required' });

    await Subscriber.updateOne(
      { email: email.toLowerCase() },
      { name, email: email.toLowerCase(), subscribed_at: new Date(), is_active: true },
      { upsert: true }
    );

    res.status(201).json({ success: true, message: 'Subscribed to The Nidarsanam Journal!' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    brand: 'Nidarsanam Healthcare',
    theme: 'Roots & Elements',
    time: new Date().toISOString()
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🌿 Nidarsanam Healthcare API running on port ${PORT}`);
});
