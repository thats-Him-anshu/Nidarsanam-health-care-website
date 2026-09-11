import { useState } from 'react';
import { Lock, CheckCircle2, AlertCircle, Shield, Mail, Key } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminSettings = () => {
  const { admin, changePassword } = useAuth();

  // Change Password Form
  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [pwdLoading, setPwdLoading] = useState(false);
  const [pwdSuccess, setPwdSuccess] = useState('');
  const [pwdError, setPwdError] = useState('');

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPwdSuccess('');
    setPwdError('');

    if (newPwd.length < 8) {
      setPwdError('New password must be at least 8 characters long.');
      return;
    }
    if (newPwd !== confirmPwd) {
      setPwdError('New password and confirmation do not match.');
      return;
    }
    if (currentPwd === newPwd) {
      setPwdError('New password must be different from the current password.');
      return;
    }

    setPwdLoading(true);
    const res = await changePassword(currentPwd, newPwd);
    setPwdLoading(false);

    if (res.success) {
      setPwdSuccess('Password changed successfully! Use your new password on next login.');
      setCurrentPwd('');
      setNewPwd('');
      setConfirmPwd('');
    } else {
      setPwdError(res.message || 'Failed to change password. Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: '680px', margin: '0 auto' }}>
      {/* Page Header */}
      <div style={{ marginBottom: '2rem' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--nid-gold)', display: 'block', marginBottom: '0.5rem' }}>
          Admin Portal
        </span>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--nid-charcoal)', margin: '0 0 0.5rem 0', fontFamily: 'var(--font-serif)' }}>
          Admin Settings
        </h1>
        <p style={{ color: 'var(--nid-stone)', margin: 0 }}>
          Manage your admin account credentials and portal security.
        </p>
      </div>

      {/* Admin Profile Card */}
      <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--nid-cream-dark)' }}>
          <div style={{
            width: '56px', height: '56px', borderRadius: '50%',
            background: 'var(--nid-forest)', display: 'flex', alignItems: 'center',
            justifyContent: 'center', color: 'white', flexShrink: 0
          }}>
            <Shield size={24} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--nid-charcoal)' }}>
              {admin?.name || 'Dr. Nidarsin'}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--nid-stone)', fontSize: '0.875rem', marginTop: '0.2rem' }}>
              <Mail size={14} />
              {admin?.email || 'admin@nidarsanam.com'}
            </div>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <span style={{
              padding: '0.3rem 0.75rem', borderRadius: '999px',
              background: 'rgba(27, 77, 62, 0.1)', color: 'var(--nid-forest)',
              fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em'
            }}>
              Administrator
            </span>
          </div>
        </div>
        <p style={{ margin: '1rem 0 0 0', fontSize: '0.875rem', color: 'var(--nid-stone)' }}>
          This is your clinic admin account. Only you have access to this portal.
          Keep your password confidential and change it regularly.
        </p>
      </div>

      {/* Change Password Card */}
      <div className="card" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(27, 77, 62, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--nid-forest)' }}>
            <Key size={18} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: 'var(--nid-charcoal)' }}>Change Password</h2>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--nid-stone)' }}>Use a strong password (min. 8 characters)</p>
          </div>
        </div>

        {/* Success Alert */}
        {pwdSuccess && (
          <div style={{
            background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '8px',
            padding: '0.875rem 1rem', marginBottom: '1.25rem',
            display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#166534'
          }}>
            <CheckCircle2 size={18} />
            <span style={{ fontSize: '0.9rem' }}>{pwdSuccess}</span>
          </div>
        )}

        {/* Error Alert */}
        {pwdError && (
          <div style={{
            background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '8px',
            padding: '0.875rem 1rem', marginBottom: '1.25rem',
            display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#991b1b'
          }}>
            <AlertCircle size={18} />
            <span style={{ fontSize: '0.9rem' }}>{pwdError}</span>
          </div>
        )}

        <form onSubmit={handleChangePassword}>
          <div className="admin-form-group" style={{ marginBottom: '1rem' }}>
            <label className="admin-form-label">Current Password</label>
            <div className="admin-input-wrap">
              <Lock size={16} className="admin-input-icon" />
              <input
                type="password"
                required
                value={currentPwd}
                onChange={(e) => setCurrentPwd(e.target.value)}
                placeholder="Enter your current password"
                className="admin-form-input"
                autoComplete="current-password"
              />
            </div>
          </div>

          <div className="admin-form-group" style={{ marginBottom: '1rem' }}>
            <label className="admin-form-label">New Password</label>
            <div className="admin-input-wrap">
              <Lock size={16} className="admin-input-icon" />
              <input
                type="password"
                required
                value={newPwd}
                onChange={(e) => setNewPwd(e.target.value)}
                placeholder="New password (min. 8 characters)"
                className="admin-form-input"
                autoComplete="new-password"
              />
            </div>
          </div>

          <div className="admin-form-group" style={{ marginBottom: '1.5rem' }}>
            <label className="admin-form-label">Confirm New Password</label>
            <div className="admin-input-wrap">
              <Lock size={16} className="admin-input-icon" />
              <input
                type="password"
                required
                value={confirmPwd}
                onChange={(e) => setConfirmPwd(e.target.value)}
                placeholder="Re-enter new password"
                className="admin-form-input"
                autoComplete="new-password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={pwdLoading}
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            <Lock size={16} />
            <span>{pwdLoading ? 'Changing Password...' : 'Change Password'}</span>
          </button>
        </form>
      </div>

      {/* Info Note */}
      <div style={{
        background: 'rgba(212, 165, 116, 0.08)', border: '1px solid rgba(212, 165, 116, 0.3)',
        borderRadius: '10px', padding: '1rem 1.25rem', marginTop: '1.25rem',
        fontSize: '0.85rem', color: 'var(--nid-stone)', lineHeight: '1.6'
      }}>
        <strong style={{ color: 'var(--nid-charcoal)' }}>Security Note:</strong> After changing your password, 
        your current browser session remains active. On your next login (or on any other device), 
        you will need to use the new password.
      </div>
    </div>
  );
};

export default AdminSettings;
