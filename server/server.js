require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();

// ========== MIDDLEWARE ==========
app.use(helmet({ crossOriginEmbedderPolicy: false }));
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: [
    process.env.CLIENT_URL || 'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:5174',
    'https://nidarsanam-health-care-website.vercel.app',
    /\.vercel\.app$/
  ],
  credentials: true
}));

// Rate limiting — protect against brute force & spam
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests. Please try again in 15 minutes.' }
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10, // max 10 login attempts per 15 min
  message: { success: false, message: 'Too many login attempts. Please try again in 15 minutes.' }
});

const leadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // max 5 contact form submissions per hour per IP
  message: { success: false, message: 'Too many requests. Please try again in an hour.' }
});

app.use('/api', apiLimiter);

// ========== MONGODB CONNECTION ==========
const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/nidarsanam';
const JWT_SECRET = process.env.JWT_SECRET || 'nidarsanam_super_secret_jwt_key_2026_roots_elements';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('🍃 MongoDB connected to Nidarsanam cluster'))
  .catch((err) => console.log('⚠️ MongoDB connection error:', err.message));

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
  consultation_type: { type: String, default: 'Online' },
  preferred_date: String,
  preferred_time: String,
  source: { type: String, default: 'Website' },
  status: { type: String, default: 'New' },
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
  status: { type: String, default: 'Draft' },
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

// Newsletter Subscriber Schema
const subscriberSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  subscribed_at: { type: Date, default: Date.now },
  is_active: { type: Boolean, default: true }
});

// Website Content & Images Schema (CMS)
const siteContentSchema = new mongoose.Schema({
  key: { type: String, unique: true, default: 'main_content' },
  data: { type: mongoose.Schema.Types.Mixed, required: true },
  updated_at: { type: Date, default: Date.now }
});

// ========== MODELS ==========
const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);
const Lead = mongoose.models.Lead || mongoose.model('Lead', leadSchema);
const BlogPost = mongoose.models.BlogPost || mongoose.model('BlogPost', blogPostSchema);
const Subscriber = mongoose.models.Subscriber || mongoose.model('Subscriber', subscriberSchema);
const SiteContent = mongoose.models.SiteContent || mongoose.model('SiteContent', siteContentSchema);

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
    return res.status(401).json({ success: false, message: 'Invalid or expired token. Please log in again.' });
  }
};

// ========== API ROUTES ==========

// ── 1. HEALTH CHECK ──
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    brand: 'Nidarsanam Healthcare',
    db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    time: new Date().toISOString()
  });
});

// ── 2. AUTH ROUTES ──

// Login
app.post('/api/v1/auth/login', authLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    let admin = await Admin.findOne({ email: email.toLowerCase().trim() });

    // First-time: seed default admin if DB is empty and credentials match
    const DEFAULT_ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@nidarsanam.com';
    const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_DEFAULT_PASSWORD || 'admin123';

    if (!admin && email.toLowerCase().trim() === DEFAULT_ADMIN_EMAIL && password === DEFAULT_ADMIN_PASSWORD) {
      const hash = await bcryptjs.hash(DEFAULT_ADMIN_PASSWORD, 12);
      admin = new Admin({
        name: 'Dr. Nidarsin',
        email: DEFAULT_ADMIN_EMAIL,
        password_hash: hash,
        role: 'admin'
      });
      await admin.save();
      console.log('🌱 Default admin account created on first login');
    }

    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const match = await bcryptjs.compare(password, admin.password_hash);
    if (!match) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    if (!admin.is_active) {
      return res.status(403).json({ success: false, message: 'Admin account is disabled' });
    }

    const token = jwt.sign(
      { _id: admin._id, email: admin.email, name: admin.name },
      JWT_SECRET,
      { expiresIn: '48h' }
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

// Get current admin info (verify token)
app.get('/api/v1/auth/me', verifyAdmin, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id).select('-password_hash');
    if (!admin) return res.status(404).json({ success: false, message: 'Admin not found' });
    res.json({ success: true, admin });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Change password
app.patch('/api/v1/auth/change-password', verifyAdmin, async (req, res) => {
  try {
    const { current_password, new_password } = req.body;
    if (!current_password || !new_password) {
      return res.status(400).json({ success: false, message: 'Current and new password are required' });
    }
    if (new_password.length < 8) {
      return res.status(400).json({ success: false, message: 'New password must be at least 8 characters' });
    }

    const admin = await Admin.findById(req.admin._id);
    if (!admin) return res.status(404).json({ success: false, message: 'Admin not found' });

    const match = await bcryptjs.compare(current_password, admin.password_hash);
    if (!match) {
      return res.status(401).json({ success: false, message: 'Current password is incorrect' });
    }

    admin.password_hash = await bcryptjs.hash(new_password, 12);
    admin.updated_at = new Date();
    await admin.save();

    res.json({ success: true, message: 'Password changed successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── 3. LEADS ROUTES ──

// Public appointment submission
app.post(['/api/v1/leads', '/api/leads'], leadLimiter, async (req, res) => {
  try {
    const { name, age, phone, email, city, health_concern, additional_message, consultation_type, preferred_date, preferred_time } = req.body;

    if (!name || !phone || !email || !health_concern) {
      return res.status(400).json({ success: false, message: 'Missing required fields: name, phone, email, health_concern' });
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
      confirmation_message: 'Thank you. Your appointment request has been received. Our clinical coordination team will contact you shortly.'
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get all leads (Admin only)
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
        { health_concern: { $regex: search, $options: 'i' } },
        { city: { $regex: search, $options: 'i' } }
      ];
    }

    const leads = await Lead.find(query).sort({ created_at: -1 });
    res.json({ success: true, total: leads.length, leads });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Update lead status (Admin)
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
    if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });
    res.json({ success: true, message: 'Status updated', lead });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Add note to lead (Admin)
app.post('/api/v1/leads/:id/notes', verifyAdmin, async (req, res) => {
  try {
    const { note } = req.body;
    if (!note?.trim()) return res.status(400).json({ success: false, message: 'Note text is required' });

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
    if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });
    res.status(201).json({ success: true, message: 'Note added', lead });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Delete lead (Admin)
app.delete('/api/v1/leads/:id', verifyAdmin, async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });
    res.json({ success: true, message: 'Lead deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── 4. BLOG ROUTES ──

// Public: Get published blogs
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

// Public: Get single published blog by slug (increments view count)
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

// Admin: Get ALL blogs (including drafts)
app.get('/api/v1/admin/blogs', verifyAdmin, async (req, res) => {
  try {
    const { status, category, search } = req.query;
    let query = {};
    if (status && status !== 'All') query.status = status;
    if (category && category !== 'All') query.category_name = category;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { category_name: { $regex: search, $options: 'i' } }
      ];
    }

    const blogs = await BlogPost.find(query).sort({ created_at: -1 });
    res.json({ success: true, total: blogs.length, blogs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Admin: Create blog
app.post('/api/v1/blogs', verifyAdmin, async (req, res) => {
  try {
    const wordCount = (req.body.content || '').replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));

    const blogData = {
      ...req.body,
      reading_time_minutes: readingTime,
      published_at: req.body.status === 'Published' ? new Date().toISOString().slice(0, 10) : req.body.published_at || null,
      created_at: new Date(),
      updated_at: new Date()
    };

    const blog = new BlogPost(blogData);
    await blog.save();
    res.status(201).json({ success: true, message: 'Article saved', blog });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ success: false, message: 'A blog with this slug already exists. Please use a unique slug.' });
    }
    res.status(500).json({ success: false, message: err.message });
  }
});

// Admin: Update blog
app.patch('/api/v1/blogs/:id', verifyAdmin, async (req, res) => {
  try {
    const wordCount = (req.body.content || '').replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));

    const updates = {
      ...req.body,
      reading_time_minutes: readingTime,
      updated_at: new Date()
    };

    // Set published_at when publishing for the first time
    if (req.body.status === 'Published' && !req.body.published_at) {
      updates.published_at = new Date().toISOString().slice(0, 10);
    }

    const blog = await BlogPost.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    res.json({ success: true, message: 'Article updated', blog });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ success: false, message: 'A blog with this slug already exists.' });
    }
    res.status(500).json({ success: false, message: err.message });
  }
});

// Admin: Delete blog
app.delete('/api/v1/blogs/:id', verifyAdmin, async (req, res) => {
  try {
    const blog = await BlogPost.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    res.json({ success: true, message: 'Article deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── 5. NEWSLETTER ──
app.post(['/api/v1/public/newsletter', '/api/newsletter'], async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: 'Email is required' });

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

// ── 6. SITE CONTENT & IMAGES (CMS) ──
// Public: Get site content
app.get(['/api/v1/public/content', '/api/content'], async (req, res) => {
  try {
    const doc = await SiteContent.findOne({ key: 'main_content' });
    res.json({ success: true, content: doc ? doc.data : null });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Admin: Update site content & images (Persists to MongoDB)
app.put('/api/v1/admin/content', verifyAdmin, async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) return res.status(400).json({ success: false, message: 'Content data is required' });

    const doc = await SiteContent.findOneAndUpdate(
      { key: 'main_content' },
      { data: content, updated_at: new Date() },
      { upsert: true, new: true }
    );
    res.json({
      success: true,
      message: 'Website content and images saved successfully to MongoDB!',
      content: doc.data
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── 7. START SERVER ──
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🌿 Nidarsanam Healthcare API running on port ${PORT}`);
});
