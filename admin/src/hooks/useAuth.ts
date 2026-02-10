import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = '/api/auth';

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await axios.get(`${API_URL}/me`, { withCredentials: true });
      setUser(res.data);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username: string, password: string) => {
    const res = await axios.post(`${API_URL}/login`, { username, password }, { withCredentials: true });
    setUser(res.data);
    return res.data;
  };

  const logout = async () => {
    await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
    setUser(null);
  };

  return { user, loading, login, logout };
};
