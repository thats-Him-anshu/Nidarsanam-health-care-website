import { useState, useMemo, useEffect } from 'react';
import {
  Clock,
  Calendar,
  ArrowRight,
  Sparkles,
  Mail,
  CheckCircle2,
  BookOpen,
  RefreshCw
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import ArticleModal from '../../components/ArticleModal';
import api from '../../services/api';
import './Blog.css';

const Blog = () => {
  const { content, subscribeNewsletter } = useCMS();
  const [activeArticle, setActiveArticle] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [blogsLoading, setBlogsLoading] = useState(true);

  // Fetch published blogs from API on mount
  useEffect(() => {
    const fetchBlogs = async () => {
      setBlogsLoading(true);
      try {
        const res = await api.get('/v1/public/blogs');
        setBlogs(res.data.blogs || []);
      } catch (err) {
        console.error('Failed to fetch blogs:', err.message);
        setBlogs([]);
      } finally {
        setBlogsLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Newsletter State
  const [subName, setSubName] = useState('');
  const [subEmail, setSubEmail] = useState('');
  const [subSuccess, setSubSuccess] = useState(false);

  const blogHero = content?.blog?.hero || {};
  const newsletter = content?.blog?.newsletter || {};

  // All published blogs (already filtered by API, but keep local filter as safety)
  const publishedBlogs = useMemo(() => {
    return blogs.filter((b) => b.status === 'Published');
  }, [blogs]);

  // Featured Article
  const featuredArticle = useMemo(() => {
    return publishedBlogs.find((b) => b.is_featured) || publishedBlogs[0] || null;
  }, [publishedBlogs]);

  const handleOpenArticle = (article) => {
    setActiveArticle(article);
    // View count is automatically incremented by the backend GET /api/v1/public/blogs/:slug endpoint
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!subEmail) return;
    await subscribeNewsletter(subName, subEmail);
    setSubSuccess(true);
    setSubName('');
    setSubEmail('');
  };

  return (
    <div className="blog-page-root">
      {/* 1. HERO */}
      <section className="blog-hero-section">
        <div className="container">
          <div className="blog-hero-content">
            <span className="section-eyebrow animate-fade-in">Editorial & Clinical Insights</span>
            <h1 className="blog-hero-title animate-fade-in">
              {blogHero.headline || 'The Nidarsanam Journal'}
            </h1>
            <p className="blog-hero-subtitle animate-fade-in">
              {blogHero.subheadline || 'Traditional food. Lifestyle wisdom. Practical health education.'}
            </p>
          </div>
        </div>
      </section>

      <div className="container blog-main-container">
        {/* 2. FEATURED ARTICLE */}
        {featuredArticle && (
          <div className="featured-article-card" onClick={() => handleOpenArticle(featuredArticle)}>
            <div className="featured-img-col">
              <img
                src={featuredArticle.featured_image_url || 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1000&q=80'}
                alt={featuredArticle.title}
                className="featured-img"
              />
              <span className="featured-tag">
                <Sparkles size={13} /> Featured Story
              </span>
            </div>
            <div className="featured-content-col">
              <div className="featured-badge-row">
                <span className="badge badge-forest">{featuredArticle.category_name}</span>
                <span className="featured-read-time">
                  <Clock size={13} /> {featuredArticle.reading_time_minutes || 5} min read
                </span>
              </div>
              <h2 className="featured-title">{featuredArticle.title}</h2>
              <p className="featured-excerpt">{featuredArticle.excerpt}</p>
              <div className="featured-footer">
                <span className="featured-date">
                  <Calendar size={14} /> {featuredArticle.published_at || 'Recent'}
                </span>
                <button className="btn btn-primary btn-sm btn-read-featured">
                  <span>Read Article</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 3. BLOG GRID */}
        <div className="blog-grid-section">
          {publishedBlogs.length === 0 ? (
            <div className="no-blogs-card">
              <BookOpen size={48} className="no-blogs-icon" />
              <h3>No articles found</h3>
              <p>We haven't published any articles yet. Please check back soon!</p>
            </div>
          ) : (
            <div className="grid-3 blog-grid">
              {publishedBlogs.map((blog) => (
                <div
                  key={blog._id}
                  className="card blog-card"
                  onClick={() => handleOpenArticle(blog)}
                >
                  <div className="blog-card-img-wrap">
                    <img
                      src={blog.featured_image_url || 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80'}
                      alt={blog.title}
                      className="blog-card-img"
                    />
                    <span className="blog-card-cat-badge">{blog.category_name}</span>
                  </div>

                  <div className="blog-card-body">
                    <div className="blog-card-meta">
                      <span className="blog-meta-item">
                        <Calendar size={13} /> {blog.published_at || 'Recent'}
                      </span>
                      <span className="blog-meta-dot">•</span>
                      <span className="blog-meta-item">
                        <Clock size={13} /> {blog.reading_time_minutes || 5} min read
                      </span>
                    </div>

                    <h3 className="blog-card-title">{blog.title}</h3>
                    <p className="blog-card-excerpt">{blog.excerpt}</p>

                    <div className="blog-card-footer">
                      <span className="blog-read-more-link">
                        <span>Read Article</span>
                        <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 5. NEWSLETTER SECTION */}
        <div className="newsletter-card">
          <div className="newsletter-grid">
            <div className="newsletter-text-col">
              <div className="newsletter-badge">
                <Mail size={16} />
                <span>Nidarsanam Journal Dispatch</span>
              </div>
              <h2 className="newsletter-title">{newsletter.heading || 'Stay Connected With Nidarsanam'}</h2>
              <p className="newsletter-desc">
                {newsletter.subheading || 'Receive practical insights on traditional Indian food, lifestyle wisdom, and holistic wellness.'}
              </p>
            </div>

            <div className="newsletter-form-col">
              {subSuccess ? (
                <div className="newsletter-success-box">
                  <CheckCircle2 size={24} className="sub-success-icon" />
                  <h4>Thank You for Subscribing!</h4>
                  <p>You are now part of our wellness community. Look out for our upcoming journal editions.</p>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
                  <div className="form-group-row">
                    <input
                      type="text"
                      placeholder="Your Full Name"
                      value={subName}
                      onChange={(e) => setSubName(e.target.value)}
                      className="newsletter-input"
                    />
                    <input
                      type="email"
                      placeholder="Your Email Address *"
                      required
                      value={subEmail}
                      onChange={(e) => setSubEmail(e.target.value)}
                      className="newsletter-input"
                    />
                  </div>
                  <button type="submit" className="btn btn-gold btn-newsletter">
                    <span>{newsletter.button_text || 'Subscribe to Journal'}</span>
                    <ArrowRight size={16} />
                  </button>
                  <span className="newsletter-privacy-note">
                    We respect your privacy. No spam. Unsubscribe anytime.
                  </span>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 6. ARTICLE READER MODAL */}
      {activeArticle && (
        <ArticleModal
          article={activeArticle}
          relatedArticles={publishedBlogs.filter((b) => b._id !== activeArticle._id)}
          onClose={() => setActiveArticle(null)}
          onSelectRelated={(rel) => handleOpenArticle(rel)}
        />
      )}
    </div>
  );
};

export default Blog;
