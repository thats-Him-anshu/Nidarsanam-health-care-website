import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './AdminLogin.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // If already logged in, redirect to admin dashboard
  if (isAuthenticated) {
    navigate('/admin/dashboard', { replace: true });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Please enter your email and password.');
      return;
    }

    const res = await login(email, password);
    if (res.success) {
      navigate('/admin/dashboard');
    } else {
      setError(res.message || 'Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="admin-login-root">
      <div className="admin-login-card">
        {/* Header */}
        <div className="admin-login-header">
          <Link to="/" className="admin-login-brand">
            <div className="admin-login-emblem">
              <img
                src="/logo.png"
                alt="Nidarsanam Logo"
                className="admin-login-logo-img"
                onError={(e) => {
                  if (!e.target.src.endsWith('/logo.PNG')) {
                    e.target.src = '/logo.PNG';
                  }
                }}
              />
            </div>
            <div>
              <span className="admin-brand-title">Nidarsanam</span>
              <span className="admin-brand-tagline">HEALTHCARE CMS</span>
            </div>
          </Link>
          <h2 className="admin-login-heading">Clinical &amp; Content Portal</h2>
          <p className="admin-login-sub">Secure access for clinic administrators and physicians</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="admin-alert admin-alert-error">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="admin-form-group">
            <label className="admin-form-label">Email</label>
            <div className="admin-input-wrap">
              <Mail size={18} className="admin-input-icon" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@nidarsanam.com"
                className="admin-form-input"
                autoComplete="username"
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Password</label>
            <div className="admin-input-wrap">
              <Lock size={18} className="admin-input-icon" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="admin-form-input"
                autoComplete="current-password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary btn-lg btn-admin-login"
          >
            <Shield size={18} />
            <span>{loading ? 'Authenticating...' : 'Sign In to Admin Portal'}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        <div className="admin-login-footer">
          <Link to="/" className="back-to-site-link">
            ← Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
