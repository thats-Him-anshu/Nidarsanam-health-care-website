import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    const savedAdmin = localStorage.getItem('nidarsanam_admin');
    return savedAdmin ? JSON.parse(savedAdmin) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('nidarsanam_token') || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem('nidarsanam_token', token);
    } else {
      localStorage.removeItem('nidarsanam_token');
    }
  }, [token]);

  useEffect(() => {
    if (admin) {
      localStorage.setItem('nidarsanam_admin', JSON.stringify(admin));
    } else {
      localStorage.removeItem('nidarsanam_admin');
    }
  }, [admin]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await api.post('/v1/auth/login', { email, password });
      if (res.data && res.data.success) {
        setToken(res.data.token);
        setAdmin(res.data.admin);
        setLoading(false);
        return { success: true };
      }
      setLoading(false);
      return { success: false, message: res.data?.message || 'Login failed' };
    } catch (err) {
      setLoading(false);
      const message = err.response?.data?.message || 'Unable to connect to the server. Please ensure the backend is running.';
      return { success: false, message };
    }
  };

  const changePassword = async (current_password, new_password) => {
    try {
      const res = await api.patch('/v1/auth/change-password', { current_password, new_password });
      return { success: true, message: res.data.message };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Failed to change password' };
    }
  };

  const logout = () => {
    setAdmin(null);
    setToken(null);
    localStorage.removeItem('nidarsanam_admin');
    localStorage.removeItem('nidarsanam_token');
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        token,
        isAuthenticated: !!admin,
        loading,
        login,
        logout,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
