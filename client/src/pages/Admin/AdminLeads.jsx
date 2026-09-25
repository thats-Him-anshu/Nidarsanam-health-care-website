import { useState, useMemo, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  Download,
  Plus,
  Filter,
  Phone,
  MessageCircle,
  Mail,
  Calendar,
  Clock,
  Trash2,
  Edit3,
  CheckCircle2,
  X,
  User,
  MapPin,
  FileText,
  AlertCircle,
  Sparkles,
  ChevronRight,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import './AdminLeads.css';

const AdminLeads = () => {
  const { admin } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  // API State
  const [leads, setLeads] = useState([]);
  const [loadingLeads, setLoadingLeads] = useState(true);
  const [apiError, setApiError] = useState('');

  // Search & Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');

  // Lead Detail Modal State
  const [activeLead, setActiveLead] = useState(null);
  const [newNoteText, setNewNoteText] = useState('');

  // Follow-up Form State
  const [showFollowUpForm, setShowFollowUpForm] = useState(false);
  const [fuDate, setFuDate] = useState('');
  const [fuTime, setFuTime] = useState('11:00 AM');
  const [fuNote, setFuNote] = useState('');

  // Manual New Lead Modal State
  const [showNewLeadModal, setShowNewLeadModal] = useState(false);
  const [newLeadForm, setNewLeadForm] = useState({
    name: '',
    age: '',
    phone: '',
    email: '',
    city: '',
    consultation_type: 'Online',
    health_concern: 'Type 2 Diabetes',
    preferred_date: '',
    preferred_time: '10:00 AM',
    additional_message: '',
    source: 'Admin Manual Entry'
  });

  // Fetch leads from API
  const fetchLeads = useCallback(async () => {
    setLoadingLeads(true);
    setApiError('');
    try {
      const res = await api.get('/v1/leads');
      setLeads(res.data.leads || []);
    } catch (err) {
      setApiError(err.response?.data?.message || 'Failed to load leads. Is the backend running?');
    } finally {
      setLoadingLeads(false);
    }
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  // Query parameter handling
  useEffect(() => {
    const leadId = searchParams.get('leadId');
    const action = searchParams.get('action');
    if (leadId) {
      const found = leads.find((l) => l._id === leadId);
      if (found) setActiveLead(found);
    }
    if (action === 'new') {
      setShowNewLeadModal(true);
    }
  }, [searchParams, leads]);

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
      const matchesType = typeFilter === 'All' || lead.consultation_type === typeFilter;

      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        lead.name?.toLowerCase().includes(q) ||
        lead.phone?.toLowerCase().includes(q) ||
        lead.email?.toLowerCase().includes(q) ||
        lead.health_concern?.toLowerCase().includes(q) ||
        lead.city?.toLowerCase().includes(q);

      return matchesStatus && matchesType && matchesSearch;
    });
  }, [leads, statusFilter, typeFilter, searchQuery]);

  // Status Badge Class
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'New': return 'status-badge-new';
      case 'Contacted': return 'status-badge-contacted';
      case 'Follow-up': return 'status-badge-followup';
      case 'Converted': return 'status-badge-converted';
      default: return 'status-badge-closed';
    }
  };

  // Update lead status via API
  const handleUpdateStatus = async (leadId, newStatus) => {
    try {
      const res = await api.patch(`/v1/leads/${leadId}/status`, { status: newStatus });
      const updated = res.data.lead;
      setLeads((prev) => prev.map((l) => l._id === leadId ? updated : l));
      if (activeLead?._id === leadId) setActiveLead(updated);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update status');
    }
  };

  // Add note via API
  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNoteText.trim() || !activeLead) return;
    try {
      const res = await api.post(`/v1/leads/${activeLead._id}/notes`, { note: newNoteText });
      const updated = res.data.lead;
      setLeads((prev) => prev.map((l) => l._id === activeLead._id ? updated : l));
      setActiveLead(updated);
      setNewNoteText('');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add note');
    }
  };

  // Schedule Follow-Up (local for now, stored in note)
  const handleScheduleFollowUp = async (e) => {
    e.preventDefault();
    if (!fuDate || !activeLead) return;
    const noteText = `Follow-up scheduled: ${fuDate} at ${fuTime}${fuNote ? '. Note: ' + fuNote : ''}`;
    try {
      const res = await api.post(`/v1/leads/${activeLead._id}/notes`, { note: noteText });
      const updated = res.data.lead;
      setLeads((prev) => prev.map((l) => l._id === activeLead._id ? updated : l));
      setActiveLead(updated);
      setFuDate('');
      setFuNote('');
      setShowFollowUpForm(false);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to schedule follow-up');
    }
  };

  // Delete lead via API
  const handleDeleteLead = async (leadId) => {
    if (!window.confirm('Delete this lead? This cannot be undone.')) return;
    try {
      await api.delete(`/v1/leads/${leadId}`);
      setLeads((prev) => prev.filter((l) => l._id !== leadId));
      if (activeLead?._id === leadId) setActiveLead(null);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete lead');
    }
  };

  // Export CSV
  const exportLeadsCSV = () => {
    const headers = ['ID', 'Name', 'Age', 'Phone', 'Email', 'City', 'Health Concern', 'Consultation Type', 'Preferred Date', 'Preferred Time', 'Status', 'Source', 'Created Date'];
    const rows = filteredLeads.map((l) => [
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

  // Handle Manual Lead Create (via public form API)
  const handleCreateManualLead = async (e) => {
    e.preventDefault();
    if (!newLeadForm.name || !newLeadForm.phone) return;
    try {
      const res = await api.post('/v1/leads', { ...newLeadForm, source: 'Admin Manual Entry' });
      await fetchLeads(); // refresh list from DB
      setShowNewLeadModal(false);
      setNewLeadForm({
        name: '',
        age: '',
        phone: '',
        email: '',
        city: '',
        consultation_type: 'Online',
        health_concern: 'Type 2 Diabetes',
        preferred_date: '',
        preferred_time: '10:00 AM',
        additional_message: '',
        source: 'Admin Manual Entry'
      });
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create lead');
    }
  };

  return (
    <div className="admin-leads-root">
      {/* Top Controls Bar */}
      <div className="leads-controls-card card">
        <div className="leads-search-wrap">
          <Search size={18} className="leads-search-icon" />
          <input
            type="text"
            placeholder="Search leads by patient name, phone, email, city, or concern..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="leads-search-input"
          />
          {searchQuery && (
            <button className="leads-search-clear" onClick={() => setSearchQuery('')}>
              Clear
            </button>
          )}
        </div>

        <div className="leads-filters-wrap">
          {/* Status Filter */}
          <div className="leads-filter-select-wrap">
            <span className="filter-label">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="leads-filter-select"
            >
              <option value="All">All Statuses</option>
              <option value="New">New Inquiries</option>
              <option value="Contacted">Contacted</option>
              <option value="Follow-up">Follow-up Needed</option>
              <option value="Converted">Converted Patients</option>
              <option value="Closed">Closed / Archived</option>
            </select>
          </div>

          {/* Type Filter */}
          <div className="leads-filter-select-wrap">
            <span className="filter-label">Mode:</span>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="leads-filter-select"
            >
              <option value="All">All Modes</option>
              <option value="Online">Online Video</option>
              <option value="Offline">In-Clinic Dharmapuri</option>
            </select>
          </div>

          {/* Action Buttons */}
          <button onClick={exportLeadsCSV} className="btn btn-secondary btn-sm">
            <Download size={15} />
            <span>Export CSV</span>
          </button>

          <button onClick={() => setShowNewLeadModal(true)} className="btn btn-primary btn-sm">
            <Plus size={15} />
            <span>+ Add Patient Lead</span>
          </button>
        </div>
      </div>

      {/* Leads Table Card */}
      <div className="leads-table-card card">
        <div className="leads-table-header">
          <div>
            <h3 className="leads-table-title">
              Patient Leads Database ({filteredLeads.length})
            </h3>
            <p className="leads-table-sub">
              Manage incoming consultation requests, follow-ups, and clinical coordination.
            </p>
          </div>
        </div>

        {filteredLeads.length === 0 ? (
          <div className="no-leads-placeholder">
            <AlertCircle size={40} className="no-leads-icon" />
            <h4>No Leads Found</h4>
            <p>No records match your selected filters. Try changing your search query or status filter.</p>
          </div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Patient Details</th>
                  <th>Contact Info</th>
                  <th>Health Concern</th>
                  <th>Mode</th>
                  <th>Preferred Schedule</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead) => (
                  <tr key={lead._id}>
                    <td>
                      <strong className="lead-patient-name">{lead.name}</strong>
                      <div className="lead-meta-row">
                        {lead.age && <span>{lead.age} yrs</span>}
                        {lead.city && <span>• {lead.city}</span>}
                      </div>
                    </td>
                    <td>
                      <a href={`tel:${lead.phone}`} className="lead-phone-link">
                        {lead.phone}
                      </a>
                      <span className="cell-sub">{lead.email}</span>
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
                      <select
                        value={lead.status}
                        onChange={(e) => handleUpdateStatus(lead._id, e.target.value)}
                        className={`status-select ${getStatusBadgeClass(lead.status)}`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Follow-up">Follow-up</option>
                        <option value="Converted">Converted</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>
                    <td>
                      <div className="lead-action-buttons">
                        <button
                          className="btn-lead-action btn-lead-view"
                          onClick={() => setActiveLead(lead)}
                          title="View Full Profile & Notes"
                        >
                          <Edit3 size={15} />
                          <span>View</span>
                        </button>
                        <a
                          href={`https://wa.me/${(lead.phone || '').replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(lead.name)},%20Nidarsanam%20Healthcare%20following%20up%20on%20your%20consultation%20request.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-lead-action btn-lead-wa"
                          title="WhatsApp Patient"
                        >
                          <MessageCircle size={15} />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* =========================================================
          LEAD DETAIL DRAWER / MODAL
          ========================================================= */}
      {activeLead && (
        <div className="lead-modal-backdrop" onClick={() => setActiveLead(null)}>
          <div className="lead-modal-container" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="lead-modal-header">
              <div className="lead-modal-title-area">
                <span className="lead-modal-badge">{activeLead.consultation_type || 'Online'} Consultation</span>
                <h2 className="lead-modal-name">{activeLead.name}</h2>
                <span className="lead-modal-id">Lead Ref: #{activeLead._id}</span>
              </div>
              <button
                className="lead-modal-close"
                onClick={() => setActiveLead(null)}
              >
                <X size={22} />
              </button>
            </div>

            {/* Modal Scroll Content */}
            <div className="lead-modal-body">
              {/* Status & Quick Action Bar */}
              <div className="lead-status-action-bar">
                <div className="status-changer-wrap">
                  <label>Current Status:</label>
                  <select
                    value={activeLead.status}
                    onChange={(e) => {
                      handleUpdateStatus(activeLead._id, e.target.value);
                    }}
                    className={`status-select-lg ${getStatusBadgeClass(activeLead.status)}`}
                  >
                    <option value="New">New Inquiry</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Follow-up">Follow-up Scheduled</option>
                    <option value="Converted">Converted Patient</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>

                <div className="lead-quick-contact-btns">
                  <a
                    href={`tel:${activeLead.phone}`}
                    className="btn btn-secondary btn-sm"
                  >
                    <Phone size={15} />
                    <span>Call</span>
                  </a>
                  <a
                    href={`https://wa.me/${(activeLead.phone || '').replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(activeLead.name)},%20this%20is%20Dr.%20Nidarsin's%20clinical%20team%20from%20Nidarsanam%20Healthcare.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-gold btn-sm"
                  >
                    <MessageCircle size={15} />
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href={`mailto:${activeLead.email}`}
                    className="btn btn-secondary btn-sm"
                  >
                    <Mail size={15} />
                    <span>Email</span>
                  </a>
                </div>
              </div>

              {/* Patient Information Grid */}
              <div className="lead-details-grid">
                <div className="lead-detail-box">
                  <span className="detail-box-label">Phone Number</span>
                  <strong className="detail-box-val">{activeLead.phone}</strong>
                </div>

                <div className="lead-detail-box">
                  <span className="detail-box-label">Email Address</span>
                  <strong className="detail-box-val">{activeLead.email}</strong>
                </div>

                <div className="lead-detail-box">
                  <span className="detail-box-label">City / Age</span>
                  <strong className="detail-box-val">
                    {activeLead.city || 'Not specified'} • {activeLead.age ? `${activeLead.age} yrs` : 'Age N/A'}
                  </strong>
                </div>

                <div className="lead-detail-box">
                  <span className="detail-box-label">Preferred Date & Slot</span>
                  <strong className="detail-box-val">
                    {activeLead.preferred_date || 'Flexible'} • {activeLead.preferred_time}
                  </strong>
                </div>
              </div>

              {/* Health Concern & Notes */}
              <div className="lead-concern-section">
                <h4 className="lead-section-heading">Primary Health Concern & Message</h4>
                <div className="lead-concern-card">
                  <strong className="lead-concern-title">{activeLead.health_concern}</strong>
                  {activeLead.additional_message && (
                    <p className="lead-concern-text">"{activeLead.additional_message}"</p>
                  )}
                </div>
              </div>

              {/* Internal Clinical & Admin Notes */}
              <div className="lead-notes-section">
                <div className="lead-notes-header">
                  <h4 className="lead-section-heading">Internal Clinical Notes History</h4>
                </div>

                {/* Add Note Form */}
                <form onSubmit={handleAddNote} className="add-note-form">
                  <textarea
                    rows="2"
                    placeholder="Add clinical observation, consultation summary, or callback update..."
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    className="note-textarea"
                  />
                  <button type="submit" className="btn btn-primary btn-sm">
                    Save Note
                  </button>
                </form>

                {/* Notes Timeline List */}
                <div className="notes-timeline">
                  {(activeLead.notes || []).length === 0 ? (
                    <span className="no-notes-text">No internal notes added yet.</span>
                  ) : (
                    activeLead.notes.map((note) => (
                      <div key={note._id} className="note-timeline-item">
                        <div className="note-meta">
                          <strong>{note.created_by_name || 'Admin'}</strong>
                          <span>{new Date(note.created_at).toLocaleString()}</span>
                        </div>
                        <p className="note-body">{note.note}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Follow-up Scheduler */}
              <div className="lead-followup-section">
                <div className="followup-header">
                  <h4 className="lead-section-heading">Scheduled Follow-ups</h4>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setShowFollowUpForm(!showFollowUpForm)}
                  >
                    <Calendar size={14} />
                    <span>{showFollowUpForm ? 'Cancel' : '+ Schedule Follow-up'}</span>
                  </button>
                </div>

                {showFollowUpForm && (
                  <form onSubmit={handleScheduleFollowUp} className="followup-form animate-fade-in">
                    <div className="form-row-2">
                      <div className="form-field-group">
                        <label className="form-label">Follow-up Date *</label>
                        <input
                          type="date"
                          required
                          value={fuDate}
                          onChange={(e) => setFuDate(e.target.value)}
                          className="form-input"
                        />
                      </div>
                      <div className="form-field-group">
                        <label className="form-label">Time Slot</label>
                        <input
                          type="text"
                          value={fuTime}
                          onChange={(e) => setFuTime(e.target.value)}
                          placeholder="e.g. 11:00 AM"
                          className="form-input"
                        />
                      </div>
                    </div>
                    <div className="form-field-group">
                      <label className="form-label">Follow-up Purpose</label>
                      <input
                        type="text"
                        placeholder="e.g. Call to review 2-week traditional food journal"
                        value={fuNote}
                        onChange={(e) => setFuNote(e.target.value)}
                        className="form-input"
                      />
                    </div>
                    <button type="submit" className="btn btn-primary btn-sm mt-2">
                      Confirm Schedule
                    </button>
                  </form>
                )}

                {/* Follow-ups List */}
                <div className="followups-list">
                  {(activeLead.follow_ups || []).map((fu) => (
                    <div key={fu._id} className="followup-card">
                      <Clock size={16} className="fu-icon" />
                      <div>
                        <strong>{fu.follow_up_date} at {fu.follow_up_time}</strong>
                        <p>{fu.note || 'General check-in'}</p>
                      </div>
                      <span className="badge badge-forest">{fu.status || 'Pending'}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Danger Zone: Delete Lead */}
              <div className="lead-danger-zone">
                <button
                  className="btn-delete-lead"
                  onClick={() => handleDeleteLead(activeLead._id)}
                >
                  <Trash2 size={16} />
                  <span>Delete This Lead Record</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          MANUAL NEW LEAD MODAL
          ========================================================= */}
      {showNewLeadModal && (
        <div className="lead-modal-backdrop" onClick={() => setShowNewLeadModal(false)}>
          <div className="lead-modal-container lead-modal-new" onClick={(e) => e.stopPropagation()}>
            <div className="lead-modal-header">
              <h3>Create Patient Lead Record</h3>
              <button
                className="lead-modal-close"
                onClick={() => setShowNewLeadModal(false)}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateManualLead} className="new-lead-form">
              <div className="form-row-2">
                <div className="form-field-group">
                  <label className="form-label">Patient Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={newLeadForm.name}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, name: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-field-group">
                  <label className="form-label">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 XXXXX XXXXX"
                    value={newLeadForm.phone}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-field-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    placeholder="patient@example.com"
                    value={newLeadForm.email}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, email: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-field-group">
                  <label className="form-label">City</label>
                  <input
                    type="text"
                    placeholder="Dharmapuri, Bengaluru, etc."
                    value={newLeadForm.city}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, city: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-field-group">
                  <label className="form-label">Consultation Mode</label>
                  <select
                    value={newLeadForm.consultation_type}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, consultation_type: e.target.value })}
                    className="form-input"
                  >
                    <option value="Online">Online (Video/Voice Consultation)</option>
                    <option value="Offline">In-Clinic (Dharmapuri)</option>
                  </select>
                </div>
                <div className="form-field-group">
                  <label className="form-label">Health Concern</label>
                  <input
                    type="text"
                    placeholder="e.g. Type 2 Diabetes, PCOS..."
                    value={newLeadForm.health_concern}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, health_concern: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="modal-footer-actions">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => setShowNewLeadModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLeads;
