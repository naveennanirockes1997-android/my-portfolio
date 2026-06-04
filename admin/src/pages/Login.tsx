import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, User, Terminal, ShieldCheck, Zap, Mail, ArrowLeft, Hash, Key } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isCapturing, setIsCapturing] = useState(false);
  const { login, forgotPassword, resetPassword } = useAuth();
  const navigate = useNavigate();

  // Recovery Flow States
  const [mode, setMode] = useState<'login' | 'forgot' | 'reset'>('login');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [infoMessage, setInfoMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCapturing(true);
    setError('');
    setInfoMessage('');
    try {
      await login(username, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Unauthorized Access Detected');
      setIsCapturing(false);
    }
  };

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCapturing(true);
    setError('');
    setInfoMessage('');
    try {
      await forgotPassword(email);
      setInfoMessage('Verification code (OTP) sent to your email.');
      setMode('reset');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Access Recovery Request failed');
    } finally {
      setIsCapturing(false);
    }
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setIsCapturing(true);
    setError('');
    setInfoMessage('');
    try {
      await resetPassword(email, otp, newPassword);
      setInfoMessage('Password updated successfully. Access granted.');
      setMode('login');
      // Reset inputs
      setPassword('');
      setOtp('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Verification or update failed');
    } finally {
      setIsCapturing(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden font-['Outfit'] select-none">
      <div className="noise-overlay" />
      
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_50%)]" />
        <motion.div 
          animate={{ 
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-primary/20 blur-[130px] rounded-full" 
        />
        <motion.div 
          animate={{ 
            opacity: [0.2, 0.4, 0.2],
            scale: [1.2, 1, 1.2]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-[20%] -right-[10%] w-[70%] h-[70%] bg-indigo-500/10 blur-[130px] rounded-full" 
        />
        
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50" />
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} 
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[500px] z-10 p-6"
      >
        <div className="relative group">
          {/* Card Outer Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-indigo-500/20 rounded-[3rem] blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
          
          <div className="glass p-10 md:p-14 rounded-[3rem] border-white/5 relative backdrop-blur-3xl shadow-2xl flex flex-col items-center">
            {/* Top Accent Line */}
            <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            
            <motion.div 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-10 text-center"
            >
              <div className="relative inline-block mb-6">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-primary/20 blur-xl rounded-full"
                />
                <div className="relative w-20 h-20 rounded-2xl primary-gradient flex items-center justify-center text-white shadow-glow border border-white/10 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-50" />
                  <ShieldCheck size={40} className="relative z-10" />
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-2 brand-font uppercase italic">
                Portal<span className="text-primary NOT-italic">.</span>Core
              </h1>
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground/50 flex items-center justify-center gap-2">
                <span className="w-8 h-[1px] bg-white/5" />
                {mode === 'login' && "Administrative Entry"}
                {mode === 'forgot' && "Access Recovery Request"}
                {mode === 'reset' && "Access Code Verification"}
                <span className="w-8 h-[1px] bg-white/5" />
              </p>
            </motion.div>

            <AnimatePresence mode="wait">
              {error && (
                <motion.div 
                  key="error-alert"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl mb-8 w-full flex items-center gap-3 text-xs font-bold uppercase tracking-wider"
                >
                  <Terminal size={16} />
                  {error}
                </motion.div>
              )}
              {infoMessage && (
                <motion.div 
                  key="info-alert"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-2xl mb-8 w-full flex items-center gap-3 text-xs font-bold uppercase tracking-wider"
                >
                  <ShieldCheck size={16} />
                  {infoMessage}
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {mode === 'login' && (
                <motion.form 
                  key="login-form"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  onSubmit={handleSubmit} 
                  className="w-full space-y-6"
                >
                  <div className="space-y-2 group/field">
                    <label className="text-[9px] font-black uppercase tracking-[0.3em] ml-4 text-muted-foreground/40 group-focus-within/field:text-primary transition-colors">Identification</label>
                    <div className="relative">
                      <div className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground/30 group-focus-within/field:text-primary transition-colors">
                        <User size={18} />
                      </div>
                      <input 
                        type="text" 
                        placeholder="Admin Username" 
                        className="w-full bg-white/[0.03] border border-white/5 h-16 pl-14 pr-6 rounded-2xl outline-none focus:border-primary/40 focus:bg-white/[0.06] transition-all font-medium text-sm placeholder:text-white/10"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2 group/field">
                    <div className="flex justify-between items-center px-4">
                      <label className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 group-focus-within/field:text-primary transition-colors">Access Key</label>
                      <button 
                        type="button" 
                        onClick={() => {
                          setMode('forgot');
                          setError('');
                          setInfoMessage('');
                        }}
                        className="text-[9px] font-black uppercase tracking-[0.2em] text-primary hover:text-primary/80 transition-colors cursor-pointer"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <div className="relative">
                      <div className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground/30 group-focus-within/field:text-primary transition-colors">
                        <Lock size={18} />
                      </div>
                      <input 
                        type="password" 
                        placeholder="••••••••••••" 
                        className="w-full bg-white/[0.03] border border-white/5 h-16 pl-14 pr-6 rounded-2xl outline-none focus:border-primary/40 focus:bg-white/[0.06] transition-all font-medium text-sm placeholder:text-white/10"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98, y: 0 }}
                    type="submit" 
                    disabled={isCapturing}
                    className="btn-primary w-full h-18 mt-4 disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-3 group/btn relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
                    {isCapturing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Synchronizing...</span>
                      </>
                    ) : (
                      <>
                        <span>Initialize Session</span>
                        <Zap size={16} className="fill-white" />
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}

              {mode === 'forgot' && (
                <motion.form 
                  key="forgot-form"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  onSubmit={handleForgotSubmit} 
                  className="w-full space-y-6"
                >
                  <div className="space-y-2 group/field">
                    <label className="text-[9px] font-black uppercase tracking-[0.3em] ml-4 text-muted-foreground/40 group-focus-within/field:text-primary transition-colors">Registered Email</label>
                    <div className="relative">
                      <div className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground/30 group-focus-within/field:text-primary transition-colors">
                        <Mail size={18} />
                      </div>
                      <input 
                        type="email" 
                        placeholder="admin@example.com" 
                        className="w-full bg-white/[0.03] border border-white/5 h-16 pl-14 pr-6 rounded-2xl outline-none focus:border-primary/40 focus:bg-white/[0.06] transition-all font-medium text-sm placeholder:text-white/10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button 
                      type="button"
                      onClick={() => {
                        setMode('login');
                        setError('');
                        setInfoMessage('');
                      }}
                      className="w-1/3 bg-white/[0.03] hover:bg-white/[0.06] text-white border border-white/5 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                    >
                      <ArrowLeft size={16} />
                      Back
                    </button>
                    <motion.button 
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98, y: 0 }}
                      type="submit" 
                      disabled={isCapturing}
                      className="btn-primary flex-1 h-18 disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-3 group/btn relative overflow-hidden"
                    >
                      {isCapturing ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Generating Code...</span>
                        </>
                      ) : (
                        <>
                          <span>Send OTP</span>
                          <Zap size={16} className="fill-white" />
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.form>
              )}

              {mode === 'reset' && (
                <motion.form 
                  key="reset-form"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  onSubmit={handleResetSubmit} 
                  className="w-full space-y-6"
                >
                  <div className="space-y-2 group/field">
                    <label className="text-[9px] font-black uppercase tracking-[0.3em] ml-4 text-muted-foreground/40 group-focus-within/field:text-primary transition-colors">One-Time Password (OTP)</label>
                    <div className="relative">
                      <div className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground/30 group-focus-within/field:text-primary transition-colors">
                        <Hash size={18} />
                      </div>
                      <input 
                        type="text" 
                        placeholder="Enter 6-digit OTP" 
                        maxLength={6}
                        className="w-full bg-white/[0.03] border border-white/5 h-16 pl-14 pr-6 rounded-2xl outline-none focus:border-primary/40 focus:bg-white/[0.06] transition-all font-medium text-sm placeholder:text-white/10 tracking-[0.2em] font-mono text-center"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2 group/field">
                    <label className="text-[9px] font-black uppercase tracking-[0.3em] ml-4 text-muted-foreground/40 group-focus-within/field:text-primary transition-colors">New Access Key</label>
                    <div className="relative">
                      <div className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground/30 group-focus-within/field:text-primary transition-colors">
                        <Key size={18} />
                      </div>
                      <input 
                        type="password" 
                        placeholder="••••••••••••" 
                        className="w-full bg-white/[0.03] border border-white/5 h-16 pl-14 pr-6 rounded-2xl outline-none focus:border-primary/40 focus:bg-white/[0.06] transition-all font-medium text-sm placeholder:text-white/10"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2 group/field">
                    <label className="text-[9px] font-black uppercase tracking-[0.3em] ml-4 text-muted-foreground/40 group-focus-within/field:text-primary transition-colors">Confirm New Access Key</label>
                    <div className="relative">
                      <div className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground/30 group-focus-within/field:text-primary transition-colors">
                        <Key size={18} />
                      </div>
                      <input 
                        type="password" 
                        placeholder="••••••••••••" 
                        className="w-full bg-white/[0.03] border border-white/5 h-16 pl-14 pr-6 rounded-2xl outline-none focus:border-primary/40 focus:bg-white/[0.06] transition-all font-medium text-sm placeholder:text-white/10"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button 
                      type="button"
                      onClick={() => {
                        setMode('forgot');
                        setError('');
                        setInfoMessage('');
                      }}
                      className="w-1/3 bg-white/[0.03] hover:bg-white/[0.06] text-white border border-white/5 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                    >
                      <ArrowLeft size={16} />
                      Back
                    </button>
                    <motion.button 
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98, y: 0 }}
                      type="submit" 
                      disabled={isCapturing}
                      className="btn-primary flex-1 h-18 disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-3 group/btn relative overflow-hidden"
                    >
                      {isCapturing ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Updating Key...</span>
                        </>
                      ) : (
                        <>
                          <span>Verify & Reset</span>
                          <Zap size={16} className="fill-white" />
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>

            <div className="mt-12 flex items-center gap-6 opacity-20 grayscale">
               <div className="w-8 h-8 rounded-lg border border-white/20 flex items-center justify-center text-[10px] font-black">2FA</div>
               <div className="w-8 h-8 rounded-lg border border-white/20 flex items-center justify-center text-[10px] font-black">SSD</div>
               <div className="w-8 h-8 rounded-lg border border-white/20 flex items-center justify-center text-[10px] font-black">SSL</div>
            </div>
            
            <p className="mt-8 text-[8px] font-black uppercase tracking-[0.4em] text-muted-foreground/20">
              Secured by End-to-End Encryption Architecture
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
