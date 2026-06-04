import { useState, useEffect } from 'react';
import api from '../utils/api';

const API_URL = '/api/auth';

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await api.get(`${API_URL}/me`);
      setUser(res.data);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username: string, password: string) => {
    const res = await api.post(`${API_URL}/login`, { username, password });
    setUser(res.data);
    return res.data;
  };

  const logout = async () => {
    await api.post(`${API_URL}/logout`, {});
    setUser(null);
  };

  const forgotPassword = async (email: string) => {
    const res = await api.post(`${API_URL}/forgot-password`, { email });
    return res.data;
  };

  const resetPassword = async (email: string, otp: string, newPassword: any) => {
    const res = await api.post(`${API_URL}/reset-password`, { email, otp, newPassword });
    return res.data;
  };

  return { user, loading, login, logout, forgotPassword, resetPassword };
};
