import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { useAuth } from './hooks/useAuth';
import axios from 'axios';
import './index.css';

// Configure global API URL for Render
axios.defaults.baseURL = import.meta.env.VITE_API_URL || '';
axios.defaults.withCredentials = true;

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background relative overflow-hidden">
      <div className="noise-overlay" />
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        className="w-12 h-12 border-2 border-primary/20 border-t-primary rounded-full mb-4 shadow-glow"
      />
      <div className="text-[10px] font-black uppercase tracking-[0.5em] text-primary/50 animate-pulse">Syncing Session</div>
    </div>
  );
  if (!user) return <Navigate to="/login" />;
  
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route 
          path="/dashboard/*" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
}

export default App;
