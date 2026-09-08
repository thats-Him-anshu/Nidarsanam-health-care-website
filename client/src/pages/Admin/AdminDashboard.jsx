import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  UserPlus,
  PhoneCall,
  BookOpen,
  Download,
  Plus,
  ArrowRight,
  TrendingUp,
  PieChart,
  Calendar,
  Globe,
  MessageCircle,
  Eye
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { leads, blogs, exportLeadsCSV } = useCMS();
  const [timeframe, setTimeframe] = useState('weekly');

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
          <button onClick={exportLeadsCSV} className="btn btn-secondary btn-sm">
            <Download size={16} />
            <span>Export CSV</span>
          </button>
          <Link to="/admin/leads?action=new" className="btn btn-primary btn-sm">
            <Plus size={16} />
            <span>+ New Lead</span>
          </Link>
        </div>
      </div>

      {/* 4 SUMMARY KPI CARDS */}
      <div className="kpi-grid">
        <div className="kpi-card card">
          <div className="kpi-icon-wrap kpi-icon-total">
            <Users size={24} />
          </div>
          <div className="kpi-info">
            <span className="kpi-label">TOTAL LEADS</span>
            <strong className="kpi-number">{totalLeads}</strong>
            <span className="kpi-sub">All patient inquiries</span>
          </div>
        </div>

        <div className="kpi-card card">
          <div className="kpi-icon-wrap kpi-icon-new">
            <UserPlus size={24} />
          </div>
          <div className="kpi-info">
            <span className="kpi-label">NEW LEADS</span>
            <strong className="kpi-number">{newLeads}</strong>
            <span className="kpi-sub">Awaiting confirmation</span>
          </div>
        </div>

        <div className="kpi-card card">
          <div className="kpi-icon-wrap kpi-icon-contacted">
            <PhoneCall size={24} />
          </div>
          <div className="kpi-info">
            <span className="kpi-label">IN PROGRESS</span>
            <strong className="kpi-number">{contactedLeads}</strong>
            <span className="kpi-sub">Contacted / Follow-up</span>
          </div>
        </div>

        <div className="kpi-card card">
          <div className="kpi-icon-wrap kpi-icon-blogs">
            <BookOpen size={24} />
          </div>
          <div className="kpi-info">
            <span className="kpi-label">PUBLISHED BLOGS</span>
            <strong className="kpi-number">{publishedBlogs}</strong>
            <span className="kpi-sub">In Nidarsanam Journal</span>
          </div>
        </div>
      </div>

      {/* CHARTS & ANALYTICS ROW */}
      <div className="analytics-grid">
        {/* Lead Trends Bar Chart */}
        <div className="card analytics-card">
          <div className="analytics-card-header">
            <div>
              <h3 className="analytics-title">Leads Received Trends</h3>
              <p className="analytics-sub">Inbound appointment volume</p>
            </div>
            <div className="chart-toggle-group">
              <button
                className={`chart-toggle-btn ${timeframe === 'daily' ? 'active' : ''}`}
                onClick={() => setTimeframe('daily')}
              >
                Daily
              </button>
              <button
                className={`chart-toggle-btn ${timeframe === 'weekly' ? 'active' : ''}`}
                onClick={() => setTimeframe('weekly')}
              >
                Weekly
              </button>
              <button
                className={`chart-toggle-btn ${timeframe === 'monthly' ? 'active' : ''}`}
                onClick={() => setTimeframe('monthly')}
              >
                Monthly
              </button>
            </div>
          </div>

          {/* Dynamic Mocked Trend Visual */}
          <div className="chart-bars-container">
            <div className="chart-bar-col">
              <div className="bar-track"><div className="bar-fill" style={{ height: '45%' }} /></div>
              <span className="bar-label">Mon</span>
            </div>
            <div className="chart-bar-col">
              <div className="bar-track"><div className="bar-fill" style={{ height: '65%' }} /></div>
              <span className="bar-label">Tue</span>
            </div>
            <div className="chart-bar-col">
              <div className="bar-track"><div className="bar-fill" style={{ height: '80%' }} /></div>
              <span className="bar-label">Wed</span>
            </div>
            <div className="chart-bar-col">
              <div className="bar-track"><div className="bar-fill" style={{ height: '55%' }} /></div>
              <span className="bar-label">Thu</span>
            </div>
            <div className="chart-bar-col">
              <div className="bar-track"><div className="bar-fill" style={{ height: '90%' }} /></div>
              <span className="bar-label">Fri</span>
            </div>
            <div className="chart-bar-col">
              <div className="bar-track"><div className="bar-fill" style={{ height: '70%' }} /></div>
              <span className="bar-label">Sat</span>
            </div>
            <div className="chart-bar-col">
              <div className="bar-track"><div className="bar-fill" style={{ height: '35%' }} /></div>
              <span className="bar-label">Sun</span>
            </div>
          </div>
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
        </div>
      </div>

      {/* RECENT LEADS TABLE */}
      <div className="card dashboard-table-card">
        <div className="table-card-header">
          <div>
            <h3 className="table-title">Latest Consultation Inquiries</h3>
            <p className="table-subtitle">Showing recent patient submissions</p>
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
              {leads.slice(0, 5).map((lead) => (
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
