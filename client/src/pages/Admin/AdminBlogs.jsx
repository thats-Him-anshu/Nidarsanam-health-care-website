import { useState, useMemo } from 'react';
import {
  Search,
  Plus,
  Edit3,
  Trash2,
  Copy,
  Eye,
  Calendar,
  Clock,
  Sparkles,
  CheckCircle2,
  X,
  Tag,
  Share2,
  ArrowRight,
  Globe,
  FileText
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import ArticleModal from '../../components/ArticleModal';
import './AdminBlogs.css';

const AdminBlogs = () => {
  const { blogs, categories, addBlog, updateBlog, deleteBlog } = useCMS();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Preview & Editor Modals
  const [previewArticle, setPreviewArticle] = useState(null);
  const [editingBlog, setEditingBlog] = useState(null);
  const [isNewBlog, setIsNewBlog] = useState(false);

  // Blog Editor Form State
  const [editorForm, setEditorForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    category_name: 'Traditional Indian Food',
    author: 'Dr. Nidarsin, BNYS',
    featured_image_url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1000&q=80',
    content: '<h2>Heading</h2><p>Article body content here...</p>',
    status: 'Published',
    key_takeaway_1: '',
    key_takeaway_2: '',
    key_takeaway_3: '',
    seo_title: '',
    meta_description: '',
    focus_keyword: ''
  });

  // Filtered Blogs
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesStatus = statusFilter === 'All' || blog.status === statusFilter;
      const matchesCategory = categoryFilter === 'All' || blog.category_name === categoryFilter;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        blog.title.toLowerCase().includes(q) ||
        blog.excerpt?.toLowerCase().includes(q) ||
        blog.category_name?.toLowerCase().includes(q);

      return matchesStatus && matchesCategory && matchesSearch;
    });
  }, [blogs, statusFilter, categoryFilter, searchQuery]);

  // Open Create Modal
  const handleOpenCreate = () => {
    setIsNewBlog(true);
    setEditorForm({
      title: '',
      slug: '',
      excerpt: '',
      category_name: categories[0]?.name || 'Traditional Indian Food',
      author: 'Dr. Nidarsin, BNYS',
      featured_image_url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1000&q=80',
      content: `<h2>Traditional Nutritional Wisdom</h2>\n<p>Write your in-depth clinical and dietary article here...</p>\n<h3>Key Principles</h3>\n<p>Explain the traditional Indian food and lifestyle significance.</p>`,
      status: 'Published',
      key_takeaway_1: 'Balanced meals support steady digestive fire (Agni).',
      key_takeaway_2: 'Culturally familiar ingredients enhance nutrient bioavailability.',
      key_takeaway_3: 'Daily routine alignment prevents chronic metabolic stagnation.',
      seo_title: '',
      meta_description: '',
      focus_keyword: ''
    });
    setEditingBlog({});
  };

  // Open Edit Modal
  const handleOpenEdit = (blog) => {
    setIsNewBlog(false);
    setEditorForm({
      title: blog.title || '',
      slug: blog.slug || '',
      excerpt: blog.excerpt || '',
      category_name: blog.category_name || 'Traditional Indian Food',
      author: blog.author || 'Dr. Nidarsin, BNYS',
      featured_image_url: blog.featured_image_url || '',
      content: blog.content || '',
      status: blog.status || 'Draft',
      key_takeaway_1: blog.key_takeaways?.[0] || '',
      key_takeaway_2: blog.key_takeaways?.[1] || '',
      key_takeaway_3: blog.key_takeaways?.[2] || '',
      seo_title: blog.seo_title || '',
      meta_description: blog.meta_description || '',
      focus_keyword: blog.focus_keyword || ''
    });
    setEditingBlog(blog);
  };

  // Duplicate Blog
  const handleDuplicate = (blog) => {
    const copy = {
      ...blog,
      title: `${blog.title} (Copy)`,
      slug: `${blog.slug}-copy-${Date.now()}`,
      status: 'Draft',
      published_at: null
    };
    delete copy._id;
    addBlog(copy);
  };

  // Auto-slug generator on title change
  const handleTitleChange = (val) => {
    const generatedSlug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    setEditorForm((prev) => ({
      ...prev,
      title: val,
      slug: isNewBlog || !prev.slug ? generatedSlug : prev.slug,
      seo_title: `${val} | Nidarsanam Healthcare`
    }));
  };

  // Save Blog Form
  const handleSaveBlog = (e) => {
    e.preventDefault();
    const takeaways = [
      editorForm.key_takeaway_1,
      editorForm.key_takeaway_2,
      editorForm.key_takeaway_3
    ].filter(Boolean);

    const blogPayload = {
      title: editorForm.title,
      slug: editorForm.slug || editorForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      excerpt: editorForm.excerpt,
      category_name: editorForm.category_name,
      author: editorForm.author,
      featured_image_url: editorForm.featured_image_url,
      content: editorForm.content,
      status: editorForm.status,
      key_takeaways: takeaways,
      seo_title: editorForm.seo_title,
      meta_description: editorForm.meta_description,
      focus_keyword: editorForm.focus_keyword
    };

    if (isNewBlog) {
      addBlog(blogPayload);
    } else if (editingBlog?._id) {
      updateBlog(editingBlog._id, blogPayload);
    }

    setEditingBlog(null);
  };

  return (
    <div className="admin-blogs-root">
      {/* Top Controls Bar */}
      <div className="blogs-controls-card card">
        <div className="blogs-search-wrap">
          <Search size={18} className="blogs-search-icon" />
          <input
            type="text"
            placeholder="Search articles by title, topic, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="blogs-search-input"
          />
        </div>

        <div className="blogs-filters-wrap">
          <div className="blogs-filter-group">
            <span className="filter-label">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="blogs-filter-select"
            >
              <option value="All">All Statuses</option>
              <option value="Published">Published</option>
              <option value="Draft">Drafts</option>
            </select>
          </div>

          <div className="blogs-filter-group">
            <span className="filter-label">Category:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="blogs-filter-select"
            >
              <option value="All">All Categories</option>
              {categories.map((c) => (
                <option key={c.id || c._id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <button onClick={handleOpenCreate} className="btn btn-primary btn-sm">
            <Plus size={15} />
            <span>+ Create New Blog</span>
          </button>
        </div>
      </div>

      {/* Blogs Table */}
      <div className="blogs-table-card card">
        <div className="blogs-table-header">
          <div>
            <h3 className="blogs-table-title">Articles in Nidarsanam Journal ({filteredBlogs.length})</h3>
            <p className="blogs-table-sub">Manage publications, drafting, SEO metadata, and category assignments.</p>
          </div>
        </div>

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Article</th>
                <th>Category</th>
                <th>Author</th>
                <th>Status</th>
                <th>Metrics</th>
                <th>Published Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBlogs.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '3.5rem 1rem', color: 'var(--nid-stone)' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                      <FileText size={32} style={{ opacity: 0.4 }} />
                      <p style={{ margin: 0, fontWeight: 600, color: 'var(--nid-charcoal)' }}>No articles found</p>
                      <p style={{ margin: 0, fontSize: '0.875rem' }}>Click &quot;+ Write New Article&quot; above to create your first journal article.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredBlogs.map((blog) => (
                  <tr key={blog._id}>
                  <td>
                    <div className="blog-cell-media">
                      <img
                        src={blog.featured_image_url}
                        alt={blog.title}
                        className="blog-cell-thumb"
                      />
                      <div>
                        <strong className="blog-cell-title">{blog.title}</strong>
                        <span className="cell-sub">Slug: /{blog.slug}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-forest">{blog.category_name}</span>
                  </td>
                  <td>
                    <span className="blog-cell-author">{blog.author || 'Dr. Nidarsin'}</span>
                  </td>
                  <td>
                    <span
                      className={`status-badge ${
                        blog.status === 'Published' ? 'status-badge-converted' : 'status-badge-new'
                      }`}
                    >
                      {blog.status}
                    </span>
                  </td>
                  <td>
                    <span className="cell-sub">👁️ {blog.view_count || 0} views</span>
                    <span className="cell-sub">⏱️ {blog.reading_time_minutes || 5} min</span>
                  </td>
                  <td>
                    <span>{blog.published_at || 'Not Published'}</span>
                  </td>
                  <td>
                    <div className="blog-row-actions">
                      <button
                        className="btn-blog-action"
                        onClick={() => setPreviewArticle(blog)}
                        title="Preview Article"
                      >
                        <Eye size={15} />
                      </button>
                      <button
                        className="btn-blog-action"
                        onClick={() => handleOpenEdit(blog)}
                        title="Edit Article"
                      >
                        <Edit3 size={15} />
                      </button>
                      <button
                        className="btn-blog-action"
                        onClick={() => handleDuplicate(blog)}
                        title="Duplicate as Draft"
                      >
                        <Copy size={15} />
                      </button>
                      <button
                        className="btn-blog-action btn-blog-delete"
                        onClick={() => {
                          if (window.confirm(`Delete "${blog.title}"?`)) {
                            deleteBlog(blog._id);
                          }
                        }}
                        title="Delete Article"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
            </tbody>
          </table>
        </div>
      </div>

      {/* =========================================================
          CREATE / EDIT BLOG MODAL STUDIO
          ========================================================= */}
      {editingBlog && (
        <div className="blog-modal-backdrop" onClick={() => setEditingBlog(null)}>
          <div className="blog-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="blog-modal-header">
              <h3>{isNewBlog ? 'Create New Journal Article' : 'Edit Article Content'}</h3>
              <button
                className="blog-modal-close"
                onClick={() => setEditingBlog(null)}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveBlog} className="blog-modal-form">
              {/* Basic Info */}
              <div className="form-field-group">
                <label className="form-label">Article Title * (10 - 200 chars)</label>
                <input
                  type="text"
                  required
                  value={editorForm.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. Traditional Indian Breakfasts: What Makes a Balanced Plate?"
                  className="form-input"
                />
              </div>

              <div className="form-row-2">
                <div className="form-field-group">
                  <label className="form-label">SEO URL Slug</label>
                  <input
                    type="text"
                    value={editorForm.slug}
                    onChange={(e) => setEditorForm({ ...editorForm, slug: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-field-group">
                  <label className="form-label">Category</label>
                  <select
                    value={editorForm.category_name}
                    onChange={(e) => setEditorForm({ ...editorForm, category_name: e.target.value })}
                    className="form-input"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id || cat._id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-field-group">
                  <label className="form-label">Featured Image URL</label>
                  <input
                    type="url"
                    value={editorForm.featured_image_url}
                    onChange={(e) => setEditorForm({ ...editorForm, featured_image_url: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-field-group">
                  <label className="form-label">Author Name</label>
                  <input
                    type="text"
                    value={editorForm.author}
                    onChange={(e) => setEditorForm({ ...editorForm, author: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-field-group">
                <label className="form-label">Short Excerpt (Summary for cards & search)</label>
                <textarea
                  rows="2"
                  value={editorForm.excerpt}
                  onChange={(e) => setEditorForm({ ...editorForm, excerpt: e.target.value })}
                  placeholder="Brief 2-line preview..."
                  className="form-textarea"
                />
              </div>

              {/* Rich Body Content */}
              <div className="form-field-group">
                <label className="form-label">Article Rich Content (HTML or formatted text)</label>
                <textarea
                  rows="8"
                  required
                  value={editorForm.content}
                  onChange={(e) => setEditorForm({ ...editorForm, content: e.target.value })}
                  className="form-textarea form-textarea-code"
                />
              </div>

              {/* Key Takeaways Builder */}
              <div className="takeaways-builder-box">
                <span className="builder-title">Key Clinical Takeaways (Bullet highlights)</span>
                <input
                  type="text"
                  placeholder="Takeaway 1..."
                  value={editorForm.key_takeaway_1}
                  onChange={(e) => setEditorForm({ ...editorForm, key_takeaway_1: e.target.value })}
                  className="form-input mb-2"
                />
                <input
                  type="text"
                  placeholder="Takeaway 2..."
                  value={editorForm.key_takeaway_2}
                  onChange={(e) => setEditorForm({ ...editorForm, key_takeaway_2: e.target.value })}
                  className="form-input mb-2"
                />
                <input
                  type="text"
                  placeholder="Takeaway 3..."
                  value={editorForm.key_takeaway_3}
                  onChange={(e) => setEditorForm({ ...editorForm, key_takeaway_3: e.target.value })}
                  className="form-input"
                />
              </div>

              {/* Publishing Status */}
              <div className="form-row-2">
                <div className="form-field-group">
                  <label className="form-label">Publication Status</label>
                  <select
                    value={editorForm.status}
                    onChange={(e) => setEditorForm({ ...editorForm, status: e.target.value })}
                    className="form-input"
                  >
                    <option value="Published">Published (Live Publicly)</option>
                    <option value="Draft">Draft (Private to Admin)</option>
                  </select>
                </div>

                <div className="form-field-group">
                  <label className="form-label">Focus Keyword</label>
                  <input
                    type="text"
                    placeholder="e.g. traditional breakfast"
                    value={editorForm.focus_keyword}
                    onChange={(e) => setEditorForm({ ...editorForm, focus_keyword: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="modal-footer-actions">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => setEditingBlog(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Save & Publish Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewArticle && (
        <ArticleModal
          article={previewArticle}
          onClose={() => setPreviewArticle(null)}
        />
      )}
    </div>
  );
};

export default AdminBlogs;
