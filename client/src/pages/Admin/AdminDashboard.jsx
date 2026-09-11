import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  UserPlus,
  PhoneCall,
  BookOpen,
  Download,
  Plus,
  ArrowRight,
  PieChart,
  Eye,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import api from '../../services/api';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [leads, setLeads] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const [leadsRes, blogsRes] = await Promise.all([
          api.get('/v1/leads'),
          api.get('/v1/admin/blogs')
        ]);
        setLeads(leadsRes.data.leads || []);
        setBlogs(blogsRes.data.blogs || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Could not connect to the backend. Please start the server.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // KPI Calculations
  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === 'New').length;
  const contactedLeads = leads.filter((l) => l.status === 'Contacted' || l.status === 'Follow-up').length;
  const publishedBlogs = blogs.filter((b) => b.status === 'Published').length;

  // Source breakdown counts
  const sourceBreakdown = leads.reduce((acc, lead) => {
    const src = lead.source || 'Website';
    acc[src] = (acc[src] || 0) + 1;
    return acc;
  }, {});

  // Status badge styling helper
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'New': return 'status-badge-new';
      case 'Contacted': return 'status-badge-contacted';
      case 'Follow-up': return 'status-badge-followup';
      case 'Converted': return 'status-badge-converted';
      default: return 'status-badge-closed';
    }
  };

  // Export CSV of leads
  const exportLeadsCSV = () => {
    const headers = ['ID', 'Name', 'Age', 'Phone', 'Email', 'City', 'Health Concern', 'Consultation Type', 'Preferred Date', 'Status', 'Source', 'Created Date'];
    const rows = leads.map((l) => [
      l._id, `"${l.name || ''}"`, l.age || '', `"${l.phone || ''}"`, `"${l.email || ''}"`,
      `"${l.city || ''}"`, `"${(l.health_concern || '').replace(/"/g, '""')}"`,
      l.consultation_type || 'Online', l.preferred_date || '', l.status || 'New',
      l.source || 'Website', l.created_at || ''
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `nidarsanam_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="admin-dashboard-root">
      {/* Top Welcome Header */}
      <div className="dashboard-header-card">
        <div>
          <span className="section-eyebrow">Clinical Control Center</span>
          <h1 className="dashboard-title">Good Morning, Clinic Administrator</h1>
          <p className="dashboard-subtitle">
            Overview of patient consultation requests, active leads, and publication metrics.
          </p>
        </div>
        <div className="dashboard-header-actions">
          <button onClick={exportLeadsCSV} className="btn btn-secondary btn-sm" disabled={loading}>
            <Download size={16} />
            <span>Export CSV</span>
          </button>
          <Link to="/admin/leads?action=new" className="btn btn-primary btn-sm">
            <Plus size={16} />
            <span>+ New Lead</span>
          </Link>
        </div>
      </div>

      {/* Connection Error Banner */}
      {error && (
        <div className="admin-alert admin-alert-error" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {/* 4 SUMMARY KPI CARDS */}
      <div className="kpi-grid">
        <div className="kpi-card card">
          <div className="kpi-icon-wrap kpi-icon-total">
            <Users size={24} />
          </div>
          <div className="kpi-info">
            <span className="kpi-label">TOTAL LEADS</span>
            <strong className="kpi-number">{loading ? '—' : totalLeads}</strong>
            <span className="kpi-sub">All patient inquiries</span>
          </div>
        </div>

        <div className="kpi-card card">
          <div className="kpi-icon-wrap kpi-icon-new">
            <UserPlus size={24} />
          </div>
          <div className="kpi-info">
            <span className="kpi-label">NEW LEADS</span>
            <strong className="kpi-number">{loading ? '—' : newLeads}</strong>
            <span className="kpi-sub">Awaiting confirmation</span>
          </div>
        </div>

        <div className="kpi-card card">
          <div className="kpi-icon-wrap kpi-icon-contacted">
            <PhoneCall size={24} />
          </div>
          <div className="kpi-info">
            <span className="kpi-label">IN PROGRESS</span>
            <strong className="kpi-number">{loading ? '—' : contactedLeads}</strong>
            <span className="kpi-sub">Contacted / Follow-up</span>
          </div>
        </div>

        <div className="kpi-card card">
          <div className="kpi-icon-wrap kpi-icon-blogs">
            <BookOpen size={24} />
          </div>
          <div className="kpi-info">
            <span className="kpi-label">PUBLISHED BLOGS</span>
            <strong className="kpi-number">{loading ? '—' : publishedBlogs}</strong>
            <span className="kpi-sub">In Nidarsanam Journal</span>
          </div>
        </div>
      </div>

      {/* CHARTS & ANALYTICS ROW */}
      <div className="analytics-grid">
        {/* Lead Trends placeholder */}
        <div className="card analytics-card">
          <div className="analytics-card-header">
            <div>
              <h3 className="analytics-title">Lead Status Overview</h3>
              <p className="analytics-sub">Current pipeline at a glance</p>
            </div>
          </div>

          {loading ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '120px', color: 'var(--nid-stone)' }}>
              <RefreshCw size={20} style={{ animation: 'spin 1s linear infinite', marginRight: '0.5rem' }} />
              Loading...
            </div>
          ) : (
            <div className="chart-bars-container">
              {['New', 'Contacted', 'Follow-up', 'Converted', 'Closed'].map((status, idx) => {
                const count = leads.filter((l) => l.status === status).length;
                const pct = totalLeads > 0 ? Math.round((count / totalLeads) * 100) : 0;
                return (
                  <div key={status} className="chart-bar-col">
                    <div className="bar-track"><div className="bar-fill" style={{ height: `${Math.max(4, pct)}%` }} /></div>
                    <span className="bar-label">{status.split('-')[0]}</span>
                    <span className="bar-label" style={{ fontWeight: 700 }}>{count}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Source Breakdown */}
        <div className="card analytics-card">
          <div className="analytics-card-header">
            <div>
              <h3 className="analytics-title">Lead Source Breakdown</h3>
              <p className="analytics-sub">Channel distribution</p>
            </div>
            <PieChart size={18} className="analytics-header-icon" />
          </div>

          {loading ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '120px', color: 'var(--nid-stone)' }}>
              <RefreshCw size={20} style={{ animation: 'spin 1s linear infinite', marginRight: '0.5rem' }} />
              Loading...
            </div>
          ) : Object.keys(sourceBreakdown).length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--nid-stone)', fontSize: '0.875rem' }}>
              No lead data yet. Submissions from your website will appear here.
            </div>
          ) : (
            <div className="source-list">
              {Object.entries(sourceBreakdown).map(([sourceName, count], idx) => {
                const pct = Math.round((count / totalLeads) * 100) || 0;
                return (
                  <div key={idx} className="source-item">
                    <div className="source-item-header">
                      <span className="source-name">{sourceName}</span>
                      <strong className="source-count">{count} leads ({pct}%)</strong>
                    </div>
                    <div className="source-bar-track">
                      <div
                        className="source-bar-fill"
                        style={{
                          width: `${pct}%`,
                          backgroundColor: idx === 0 ? 'var(--nid-forest)' : idx === 1 ? 'var(--nid-gold)' : 'var(--nid-brown)'
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* RECENT LEADS TABLE */}
      <div className="card dashboard-table-card">
        <div className="table-card-header">
          <div>
            <h3 className="table-title">Latest Consultation Inquiries</h3>
            <p className="table-subtitle">
              {loading ? 'Loading from database...' : `Showing ${Math.min(leads.length, 5)} of ${totalLeads} total leads`}
            </p>
          </div>
          <Link to="/admin/leads" className="btn btn-secondary btn-sm">
            <span>View All Leads</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Phone</th>
                <th>Health Concern</th>
                <th>Mode</th>
                <th>Preferred Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '2rem', color: 'var(--nid-stone)' }}>
                    Loading leads from database...
                  </td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--nid-stone)' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                      <Users size={28} style={{ opacity: 0.4 }} />
                      <span>No leads yet. Patient appointments submitted via your website will appear here.</span>
                    </div>
                  </td>
                </tr>
              ) : (
                leads.slice(0, 5).map((lead) => (
                  <tr key={lead._id}>
                    <td>
                      <strong>{lead.name}</strong>
                      {lead.city && <span className="cell-sub">{lead.city}</span>}
                    </td>
                    <td>
                      <a href={`tel:${lead.phone}`} className="table-phone-link">
                        {lead.phone}
                      </a>
                    </td>
                    <td>
                      <span className="concern-tag">{lead.health_concern}</span>
                    </td>
                    <td>
                      <span className="consult-type-badge">{lead.consultation_type || 'Online'}</span>
                    </td>
                    <td>
                      <span>{lead.preferred_date || 'Flexible'}</span>
                      <span className="cell-sub">{lead.preferred_time}</span>
                    </td>
                    <td>
                      <span className={`status-badge ${getStatusBadgeClass(lead.status)}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td>
                      <Link to={`/admin/leads?leadId=${lead._id}`} className="btn-table-action">
                        <Eye size={16} />
                        <span>Details</span>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
