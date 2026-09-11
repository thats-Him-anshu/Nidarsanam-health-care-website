import { useState, useMemo, useEffect, useCallback } from 'react';
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
  X,
  FileText,
  RefreshCw,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import ArticleModal from '../../components/ArticleModal';
import RichTextEditor from '../../components/RichTextEditor/RichTextEditor';
import api from '../../services/api';
import './AdminBlogs.css';

const AdminBlogs = () => {
  const { categories } = useCMS();

  // API State
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [apiError, setApiError] = useState('');
  const [saveSuccess, setSaveSuccess] = useState('');

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Preview & Editor Modals
  const [previewArticle, setPreviewArticle] = useState(null);
  const [editingBlog, setEditingBlog] = useState(null);
  const [isNewBlog, setIsNewBlog] = useState(false);

  // Blog Editor Form State
  const defaultForm = {
    title: '',
    slug: '',
    excerpt: '',
    category_name: categories[0]?.name || 'Traditional Indian Food',
    author: 'Dr. Nidarsin, BNYS',
    featured_image_url: '',
    content: '<h2>Introduction</h2>\n<p>Write your article content here...</p>\n<h3>Key Points</h3>\n<p>Explain the traditional Indian food and lifestyle significance.</p>',
    status: 'Published',
    key_takeaway_1: '',
    key_takeaway_2: '',
    key_takeaway_3: '',
    seo_title: '',
    meta_description: '',
    focus_keyword: ''
  };
  const [editorForm, setEditorForm] = useState(defaultForm);

  // ── Fetch blogs from API ──
  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    setApiError('');
    try {
      const res = await api.get('/v1/admin/blogs');
      setBlogs(res.data.blogs || []);
    } catch (err) {
      setApiError(err.response?.data?.message || 'Failed to load blogs. Is the backend running?');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  // Filtered Blogs
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesStatus = statusFilter === 'All' || blog.status === statusFilter;
      const matchesCategory = categoryFilter === 'All' || blog.category_name === categoryFilter;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        blog.title?.toLowerCase().includes(q) ||
        blog.excerpt?.toLowerCase().includes(q) ||
        blog.category_name?.toLowerCase().includes(q);
      return matchesStatus && matchesCategory && matchesSearch;
    });
  }, [blogs, statusFilter, categoryFilter, searchQuery]);

  // ── Open Create Modal ──
  const handleOpenCreate = () => {
    setIsNewBlog(true);
    setEditorForm({ ...defaultForm, category_name: categories[0]?.name || 'Traditional Indian Food' });
    setEditingBlog({});
    setSaveSuccess('');
    setApiError('');
  };

  // ── Open Edit Modal ──
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
    setSaveSuccess('');
    setApiError('');
  };

  // ── Duplicate Blog ──
  const handleDuplicate = async (blog) => {
    const copy = {
      ...blog,
      title: `${blog.title} (Copy)`,
      slug: `${blog.slug}-copy-${Date.now()}`,
      status: 'Draft',
      published_at: null
    };
    delete copy._id;
    delete copy.__v;
    delete copy.created_at;
    delete copy.updated_at;
    try {
      const res = await api.post('/v1/blogs', copy);
      setBlogs((prev) => [res.data.blog, ...prev]);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to duplicate article');
    }
  };

  // ── Auto-slug generator on title change ──
  const handleTitleChange = (val) => {
    const generatedSlug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    setEditorForm((prev) => ({
      ...prev,
      title: val,
      slug: isNewBlog || !prev.slug ? generatedSlug : prev.slug,
      seo_title: prev.seo_title || `${val} | Nidarsanam Healthcare`
    }));
  };

  // ── Save Blog (Create or Update via API) ──
  const handleSaveBlog = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess('');
    setApiError('');

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

    try {
      if (isNewBlog) {
        const res = await api.post('/v1/blogs', blogPayload);
        setBlogs((prev) => [res.data.blog, ...prev]);
        setSaveSuccess('Article created successfully!');
      } else {
        const res = await api.patch(`/v1/blogs/${editingBlog._id}`, blogPayload);
        setBlogs((prev) => prev.map((b) => b._id === editingBlog._id ? res.data.blog : b));
        setSaveSuccess('Article updated successfully!');
      }
      setTimeout(() => {
        setEditingBlog(null);
        setSaveSuccess('');
      }, 1200);
    } catch (err) {
      setApiError(err.response?.data?.message || 'Failed to save article. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  // ── Delete Blog ──
  const handleDelete = async (blog) => {
    if (!window.confirm(`Delete "${blog.title}"? This cannot be undone.`)) return;
    try {
      await api.delete(`/v1/blogs/${blog._id}`);
      setBlogs((prev) => prev.filter((b) => b._id !== blog._id));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete article');
    }
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

          <button onClick={fetchBlogs} className="btn btn-secondary btn-sm" title="Refresh from database">
            <RefreshCw size={15} />
          </button>

          <button onClick={handleOpenCreate} className="btn btn-primary btn-sm">
            <Plus size={15} />
            <span>+ Write New Article</span>
          </button>
        </div>
      </div>

      {/* API Error Banner */}
      {apiError && !editingBlog && (
        <div className="admin-alert admin-alert-error" style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertCircle size={18} />
          <span>{apiError}</span>
        </div>
      )}

      {/* Blogs Table */}
      <div className="blogs-table-card card">
        <div className="blogs-table-header">
          <div>
            <h3 className="blogs-table-title">
              Articles in Nidarsanam Journal ({loading ? '…' : filteredBlogs.length})
            </h3>
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
              {loading ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '3.5rem 1rem', color: 'var(--nid-stone)' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                      <RefreshCw size={28} style={{ opacity: 0.4, animation: 'spin 1s linear infinite' }} />
                      <p style={{ margin: 0 }}>Loading articles from database...</p>
                    </div>
                  </td>
                </tr>
              ) : filteredBlogs.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '3.5rem 1rem', color: 'var(--nid-stone)' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                      <FileText size={32} style={{ opacity: 0.4 }} />
                      <p style={{ margin: 0, fontWeight: 600, color: 'var(--nid-charcoal)' }}>No articles found</p>
                      <p style={{ margin: 0, fontSize: '0.875rem' }}>Click &quot;+ Write New Article&quot; above to publish your first journal article.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredBlogs.map((blog) => (
                  <tr key={blog._id}>
                    <td>
                      <div className="blog-cell-media">
                        {blog.featured_image_url && (
                          <img
                            src={blog.featured_image_url}
                            alt={blog.title}
                            className="blog-cell-thumb"
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                        )}
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
                      <span className="cell-sub">⏱️ {blog.reading_time_minutes || 5} min read</span>
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
                          onClick={() => handleDelete(blog)}
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

      {/* Create / Edit Blog Modal */}
      {editingBlog && (
        <div className="blog-modal-backdrop" onClick={() => setEditingBlog(null)}>
          <div className="blog-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="blog-modal-header">
              <h3>{isNewBlog ? 'Create New Journal Article' : 'Edit Article Content'}</h3>
              <button className="blog-modal-close" onClick={() => setEditingBlog(null)}>
                <X size={20} />
              </button>
            </div>

            {/* Save feedback */}
            {saveSuccess && (
              <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '8px', padding: '0.75rem 1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#166534' }}>
                <CheckCircle2 size={16} /> {saveSuccess}
              </div>
            )}
            {apiError && (
              <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '8px', padding: '0.75rem 1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#991b1b' }}>
                <AlertCircle size={16} /> {apiError}
              </div>
            )}

            <form onSubmit={handleSaveBlog} className="blog-modal-form">
              {/* Basic Info */}
              <div className="form-field-group">
                <label className="form-label">Article Title *</label>
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
                    placeholder="auto-generated-from-title"
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
                    placeholder="https://images.unsplash.com/..."
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
                <label className="form-label">Short Excerpt (Summary for cards &amp; search)</label>
                <textarea
                  rows="2"
                  value={editorForm.excerpt}
                  onChange={(e) => setEditorForm({ ...editorForm, excerpt: e.target.value })}
                  placeholder="Brief 2-line preview shown on blog cards..."
                  className="form-textarea"
                />
              </div>

              {/* Rich Body Content */}
              <div className="form-field-group">
                <label className="form-label">Article Content</label>
                <RichTextEditor
                  value={editorForm.content}
                  onChange={(html) => setEditorForm((prev) => ({ ...prev, content: html }))}
                  placeholder="Write your article content here — use the toolbar for headings, lists, bold, links..."
                />
              </div>

              {/* Key Takeaways */}
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
                  <label className="form-label">Focus Keyword (SEO)</label>
                  <input
                    type="text"
                    placeholder="e.g. traditional Indian breakfast"
                    value={editorForm.focus_keyword}
                    onChange={(e) => setEditorForm({ ...editorForm, focus_keyword: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="modal-footer-actions">
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setEditingBlog(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm" disabled={saving}>
                  {saving ? 'Saving...' : isNewBlog ? 'Publish Article' : 'Save Changes'}
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
