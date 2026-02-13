import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  FolderOpen, 
  Settings, 
  LogOut, 
  Plus, 
  Globe, 
  Cpu, 
  Activity,
  Search,
  Trash2,
  Edit2,
  X,
  Terminal,
  TrendingUp,
  BarChart3,
  Wrench,
  Briefcase,
  Award,
  FileText,
  Upload,
  Rocket
} from 'lucide-react';
import axios from 'axios';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('Overview');
  const [skills, setSkills] = useState<any[]>([]);
  const [experiences, setExperiences] = useState<any[]>([]);
  const [certifications, setCertifications] = useState<any[]>([]);
  const [skillForm, setSkillForm] = useState({ name: '', category: 'Frontend' as 'Frontend' | 'Backend' | 'Tools' | 'Other' });
  const [expForm, setExpForm] = useState({ company: '', position: '', duration: '', description: '', highlights: '' });
  const [certForm, setCertForm] = useState({ title: '', issuer: '', date: '', link: '', image: '' });
  const [profile, setProfile] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  // Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    tags: '',
    link: '',
    github: '',
    highlights: '',
    skills: ''
  });

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/projects');
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSkills = async () => {
    try {
      const res = await axios.get('/api/skills');
      setSkills(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchExperiences = async () => {
    try {
      const res = await axios.get('/api/experience');
      setExperiences(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCertifications = async () => {
    try {
      const res = await axios.get('/api/certifications');
      setCertifications(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProfile = async () => {
    try {
      const res = await axios.get('/api/profile');
      setProfile(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchSkills();
    fetchExperiences();
    fetchCertifications();
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleOpenModal = (project: any = null) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title,
        description: project.description,
        image: project.image || '',
        tags: project.tags?.join(', ') || '',
        link: project.link || '',
        github: project.github || '',
        highlights: project.highlights?.join('\n') || '',
        skills: project.skills?.join(', ') || ''
      });
    } else {
      setEditingProject(null);
      setFormData({
        title: '',
        description: '',
        image: '',
        tags: '',
        link: '',
        github: '',
        highlights: '',
        skills: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this module?')) {
      try {
        await axios.delete(`/api/projects/${id}`, { withCredentials: true });
        fetchProjects();
      } catch (err: any) {
        const message = err.response?.data?.message || 'Access Denied';
        alert(`Deletion Failed: ${message}`);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
        skills: formData.skills.split(',').map(s => s.trim()).filter(s => s),
        highlights: formData.highlights.split('\n').map(h => h.trim()).filter(h => h)
      };

      if (editingProject) {
        await axios.put(`/api/projects/${editingProject._id}`, payload, { withCredentials: true });
      } else {
        await axios.post('/api/projects', payload, { withCredentials: true });
      }
      
      setIsModalOpen(false);
      fetchProjects();
    } catch (err: any) {
      const message = err.response?.data?.message || 'Synchronization Error';
      alert(`Operation Failed: ${message}`);
    }
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Overview' },
    { icon: FolderOpen, label: 'Projects' },
    { icon: Wrench, label: 'Skills' },
    { icon: Briefcase, label: 'Experience' },
    { icon: Award, label: 'Certifications' },
    { icon: FileText, label: 'Resume' },
    { icon: BarChart3, label: 'Analytics' },
    { icon: Globe, label: 'Domain' },
    { icon: Settings, label: 'System' },
  ];

  const handleAddExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/experience', {
        ...expForm,
        highlights: expForm.highlights.split('\n').map(h => h.trim()).filter(h => h)
      }, { withCredentials: true });
      setExpForm({ company: '', position: '', duration: '', description: '', highlights: '' });
      fetchExperiences();
    } catch (err: any) {
      alert('Failed to add experience');
    }
  };

  const handleDeleteExperience = async (id: string) => {
    if (window.confirm('Delete this role?')) {
      try {
        await axios.delete(`/api/experience/${id}`, { withCredentials: true });
        fetchExperiences();
      } catch (err: any) {
        alert('Deletion failed');
      }
    }
  };

  const handleAddCertification = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/certifications', certForm, { withCredentials: true });
      setCertForm({ title: '', issuer: '', date: '', link: '', image: '' });
      fetchCertifications();
    } catch (err: any) {
      alert('Failed to add certification');
    }
  };

  const handleDeleteCertification = async (id: string) => {
    if (window.confirm('Erase this certification?')) {
      try {
        await axios.delete(`/api/certifications/${id}`, { withCredentials: true });
        fetchCertifications();
      } catch (err: any) {
        alert('Deletion failed');
      }
    }
  };

  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/skills', skillForm, { withCredentials: true });
      setSkillForm({ name: '', category: 'Frontend' });
      fetchSkills();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to add skill');
    }
  };

  const handleDeleteSkill = async (id: string) => {
    if (window.confirm('Erase this competence from the matrix?')) {
      try {
        await axios.delete(`/api/skills/${id}`, { withCredentials: true });
        fetchSkills();
      } catch (err: any) {
        alert(err.response?.data?.message || 'Failed to delete skill');
      }
    }
  };

  const handleUpdateResume = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      alert('Please select a PDF file first');
      return;
    }

    const formData = new FormData();
    formData.append('resume', selectedFile);

    try {
      setIsUploading(true);
      await axios.post('/api/profile/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      });
      fetchProfile();
      setSelectedFile(null);
      alert('Resume synchronized successfully');
    } catch (err: any) {
      alert('Upload failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setIsUploading(false);
    }
  };

  const ProjectRegistry = () => (
    <section>
      <div className="flex items-center justify-between mb-8 px-2">
        <h2 className="text-2xl font-black tracking-tighter uppercase tracking-widest text-sm flex items-center gap-2">
          <Terminal size={18} className="text-primary" />
          Repository <span className="text-primary">Registry</span>
        </h2>
        <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">
          {projects.length} Entries found
        </div>
      </div>
      
      <div className="glass rounded-[2.5rem] overflow-hidden border-white/5 relative group">
         <div className="max-w-full overflow-x-auto">
           <table className="w-full text-left border-collapse min-w-[800px]">
              <thead className="bg-white/5 backdrop-blur-md">
                <tr>
                  <th className="p-6 text-[9px] font-black tracking-[0.3em] uppercase text-muted-foreground/40">Module Intelligence</th>
                  <th className="p-6 text-[9px] font-black tracking-[0.3em] uppercase text-muted-foreground/40">Logic Stack</th>
                  <th className="p-6 text-[9px] font-black tracking-[0.3em] uppercase text-center text-muted-foreground/40">Protocol</th>
                  <th className="p-6 text-[9px] font-black tracking-[0.3em] uppercase text-right text-muted-foreground/40">Sequence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="p-20 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <motion.div 
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Activity size={32} className="text-primary/40" />
                        </motion.div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40">Decrypting Registry Data...</span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  <AnimatePresence mode="popLayout">
                    {Array.isArray(projects) && projects.map((p, idx) => (
                      <motion.tr 
                        key={p._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ delay: idx * 0.05 }}
                        className="hover:bg-white/[0.03] transition-all group/row"
                      >
                        <td className="p-6">
                           <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 overflow-hidden ring-1 ring-white/5 group-hover/row:ring-primary/20 transition-all">
                                 <img src={p.image || "/placeholder.svg"} loading="eager" className="w-full h-full object-cover opacity-40 group-hover/row:opacity-100 group-hover/row:scale-110 transition-all duration-500" alt="" />
                              </div>
                              <div>
                                 <div className="font-bold text-sm leading-none mb-1 group-hover/row:text-primary transition-colors uppercase tracking-tight">{p.title}</div>
                                 <div className="text-[10px] text-muted-foreground/40 font-medium truncate max-w-[200px] uppercase tracking-wide">ID: {p._id.substring(18)}</div>
                              </div>
                           </div>
                        </td>
                        <td className="p-6">
                           <div className="flex flex-wrap gap-1.5">
                              {Array.isArray(p.tags) && p.tags.slice(0, 3).map((t: string) => (
                                <span key={t} className="text-[8px] font-black text-primary/60 px-2 py-0.5 bg-primary/5 rounded-full border border-primary/10 uppercase tracking-tighter">#{t}</span>
                              ))}
                           </div>
                        </td>
                        <td className="p-6 text-center">
                          <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/5 text-green-500 text-[9px] font-black uppercase tracking-[0.2em] rounded-full border border-green-500/10">
                            <div className="w-1 h-1 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
                            Prod Active
                          </div>
                        </td>
                        <td className="p-6 text-right">
                           <div className="flex items-center justify-end gap-2 pr-4">
                              <motion.button 
                                whileHover={{ scale: 1.1, backgroundColor: 'rgba(99,102,241,0.1)' }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleOpenModal(p)}
                                className="w-9 h-9 rounded-lg bg-white/5 text-muted-foreground hover:text-primary transition-all flex items-center justify-center"
                              >
                                <Edit2 size={14} />
                              </motion.button>
                              <motion.button 
                                whileHover={{ scale: 1.1, backgroundColor: 'rgba(239,68,68,0.1)' }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleDelete(p._id)}
                                className="w-9 h-9 rounded-lg bg-white/5 text-muted-foreground hover:text-red-500 transition-all flex items-center justify-center"
                              >
                                <Trash2 size={14} />
                              </motion.button>
                           </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                )}
              </tbody>
           </table>
         </div>
      </div>
    </section>
  );

  return (
    <div className="flex min-h-screen bg-background text-foreground font-['Outfit'] relative overflow-hidden">
      <div className="noise-overlay" />
      
      {/* Background Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Sidebar */}
      <aside className="w-[280px] border-r border-white/5 flex flex-col z-20 sticky top-0 h-screen bg-background/80 backdrop-blur-2xl">
        <div className="p-8">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl primary-gradient flex items-center justify-center text-white font-black shadow-glow group-hover:rotate-12 transition-all duration-500 text-sm">
              {user?.username?.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="text-lg font-black tracking-tighter leading-none brand-font uppercase">Admin<span className="text-primary">.</span>Core</div>
              <div className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 mt-1">v2.4.0 System</div>
            </div>
          </motion.div>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {menuItems.map((item, i) => (
            <motion.button 
              key={item.label}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setActiveSection(item.label)}
              className={`w-full flex items-center justify-between p-4 rounded-xl transition-all group ${
                activeSection === item.label 
                  ? 'bg-primary/10 text-primary shadow-[inset_0_0_20px_rgba(99,102,241,0.05)]' 
                  : 'text-muted-foreground/50 hover:text-foreground hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={18} className={activeSection === item.label ? 'text-primary' : 'group-hover:text-primary transition-colors'} />
                <span className="font-bold tracking-tight text-sm uppercase tracking-widest text-[11px]">{item.label}</span>
              </div>
              {activeSection === item.label && <motion.div layoutId="activeDot" className="w-[5px] h-[5px] rounded-full bg-primary shadow-glow" />}
            </motion.button>
          ))}
        </nav>

        <div className="p-6 space-y-4">
          <div className="glass p-5 rounded-2xl border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:rotate-12 transition-transform">
              <TrendingUp size={32} />
            </div>
            <div className="text-[9px] font-black uppercase tracking-widest text-primary mb-1">Grid Status</div>
            <div className="text-xs font-bold flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
               <span className="opacity-80 uppercase tracking-widest text-[9px]">All Systems Green</span>
            </div>
          </div>

          <motion.button 
            whileHover={{ x: 4, color: '#f87171' }}
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400/50 transition-all font-bold group text-xs uppercase tracking-widest"
          >
            <LogOut size={16} /> 
            <span>Terminate</span>
          </motion.button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 lg:p-12 z-10 max-w-[1600px] mx-auto overflow-y-auto">
        {activeSection === 'Overview' && (
          <>
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-none mb-2">
                  System <span className="text-primary italic">Intelligence</span>
                </h1>
                <p className="text-sm md:text-base text-muted-foreground/60 font-medium tracking-tight">Managing core engine modules. Authorized session for <span className="text-foreground">{user?.username}</span>.</p>
              </motion.div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="relative group/search">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/30 group-focus-within/search:text-primary transition-colors" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search registry..." 
                    className="bg-white/5 border border-white/5 rounded-xl h-12 pl-11 pr-4 outline-none focus:border-primary/50 transition-all w-48 md:w-64 text-xs font-medium"
                  />
                </div>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleOpenModal()} 
                  className="btn-primary h-12 px-6 flex items-center gap-2 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/10 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700" />
                  <Plus size={18} /> <span className="font-black uppercase tracking-[0.2em] text-[10px]">Deploy Module</span>
                </motion.button>
              </div>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                { label: 'Outreach Matrix', value: '1,280', icon: Activity, trend: '+12%', color: 'text-primary' },
                { label: 'Engine Load', value: '14.2%', icon: Cpu, trend: 'Optimal', color: 'text-indigo-400' },
                { label: 'Registry Size', value: (Array.isArray(projects) ? projects.length : 0).toString().padStart(2, '0'), icon: FolderOpen, trend: 'Updated', color: 'text-emerald-400' },
                { label: 'Active Links', value: (Array.isArray(projects) ? projects.filter(p => p.link).length : 0).toString().padStart(2, '0'), icon: Globe, trend: 'Connected', color: 'text-amber-400' },
              ].map((stat, i) => (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="glass p-6 rounded-[2rem] relative overflow-hidden group hover:border-primary/20 transition-all duration-500"
                >
                  <div className="absolute -top-2 -right-2 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                    <stat.icon size={80} />
                  </div>
                  <div className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 mb-1">{stat.label}</div>
                  <div className="text-3xl font-black mb-3 brand-font">{stat.value}</div>
                  <div className={`text-[10px] font-black uppercase tracking-widest ${stat.color} flex items-center gap-2`}>
                    <div className="h-0.5 w-6 bg-current/20 rounded-full" />
                    {stat.trend}
                  </div>
                </motion.div>
              ))}
            </div>
            
            <ProjectRegistry />
          </>
        )}

        {activeSection === 'Projects' && (
          <div className="space-y-8">
            <header>
              <h1 className="text-4xl font-black tracking-tighter uppercase italic">Module <span className="text-primary NOT-italic">Registry</span></h1>
              <p className="text-muted-foreground/60 text-sm mt-2 font-medium tracking-widest uppercase">Direct access to core repository entries</p>
            </header>
            <ProjectRegistry />
          </div>
        )}

        {activeSection === 'Analytics' && (
          <div className="space-y-8">
            <header>
              <h1 className="text-4xl font-black tracking-tighter uppercase italic">Traffic <span className="text-primary NOT-italic">Analytics</span></h1>
              <p className="text-muted-foreground/60 text-sm mt-2 font-medium tracking-widest uppercase">Real-time engagement telemetry</p>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass p-8 rounded-[2rem] min-h-[400px] flex flex-col justify-between">
                <div>
                   <div className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">Usage Frequency</div>
                   <h3 className="text-2xl font-black italic">Network Load</h3>
                </div>
                <div className="flex-1 flex items-end gap-3 mt-8">
                   {[40, 70, 45, 90, 65, 80, 50, 95, 60, 85].map((h, i) => (
                     <motion.div 
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        className="flex-1 bg-primary/20 rounded-t-lg border-t border-primary/40 relative group"
                     >
                        <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-20 transition-opacity rounded-t-lg" />
                     </motion.div>
                   ))}
                </div>
              </div>
              <div className="glass p-8 rounded-[2rem] flex flex-col justify-center items-center text-center">
                 <div className="w-20 h-20 rounded-full border-4 border-primary/20 border-t-primary animate-spin mb-6" />
                 <h3 className="text-xl font-black uppercase tracking-tighter">Calculating Nodes</h3>
                 <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 mt-2">Decrypting global traffic patterns...</p>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'Domain' && (
          <div className="space-y-8">
            <header>
              <h1 className="text-4xl font-black tracking-tighter uppercase italic">Domain <span className="text-primary NOT-italic">Protocol</span></h1>
              <p className="text-muted-foreground/60 text-sm mt-2 font-medium tracking-widest uppercase">Network resolution and secure endpoints</p>
            </header>
            <div className="glass p-10 rounded-[2rem] max-w-2xl">
               <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                     <div>
                        <div className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40 mb-1">Primary Endpoint</div>
                        <div className="text-sm font-bold">naveen.io</div>
                     </div>
                     <div className="text-[10px] font-black text-green-500 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20 uppercase tracking-widest">Active</div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                     <div>
                        <div className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40 mb-1">SSL Certificate</div>
                        <div className="text-sm font-bold">SHA-256 Deployment</div>
                     </div>
                     <div className="text-[10px] font-black text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20 uppercase tracking-widest">Secure</div>
                  </div>
               </div>
            </div>
          </div>
        )}

        {activeSection === 'Skills' && (
          <div className="space-y-8">
            <header>
              <h1 className="text-4xl font-black tracking-tighter uppercase italic">Competence <span className="text-primary NOT-italic">Matrix</span></h1>
              <p className="text-muted-foreground/60 text-sm mt-2 font-medium tracking-widest uppercase">Technical expertise and arsenal distribution</p>
            </header>

            <div className="grid lg:grid-cols-12 gap-8">
              {/* Add Skill Form */}
              <div className="lg:col-span-4">
                <div className="glass p-8 rounded-[2rem] sticky top-8">
                  <h3 className="text-lg font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                    <Plus size={18} className="text-primary" />
                    Inject Skill
                  </h3>
                  <form onSubmit={handleAddSkill} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[9px] font-black uppercase tracking-[0.3em] ml-2 text-muted-foreground/50">Skill Prototype</label>
                      <input 
                        className="w-full bg-white/5 border border-white/5 rounded-xl h-12 px-4 outline-none focus:border-primary/50 transition-all text-sm font-medium" 
                        placeholder="e.g. React, Docker"
                        value={skillForm.name}
                        onChange={e => setSkillForm({...skillForm, name: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black uppercase tracking-[0.3em] ml-2 text-muted-foreground/50">Category Sector</label>
                      <select 
                        className="w-full bg-white/5 border border-white/5 rounded-xl h-12 px-4 outline-none focus:border-primary/50 transition-all text-sm font-black uppercase"
                        value={skillForm.category}
                        onChange={e => setSkillForm({...skillForm, category: e.target.value as any})}
                      >
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="Tools">Tools</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <button 
                      type="submit" 
                      className="w-full h-12 rounded-xl primary-gradient text-white font-black uppercase tracking-[0.3em] text-[10px] mt-2 shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                      Authorize Injection
                    </button>
                  </form>
                </div>
              </div>

              {/* Skills Display */}
              <div className="lg:col-span-8">
                <div className="grid md:grid-cols-2 gap-6">
                  {['Frontend', 'Backend', 'Tools', 'Other'].map(cat => (
                    <div key={cat} className="glass p-6 rounded-[2rem]">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-4 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {cat} Sector
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {Array.isArray(skills) && skills.filter(s => s.category === cat).map(skill => (
                          <div 
                            key={skill._id} 
                            className="group flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/5 hover:border-primary/30 transition-all"
                          >
                            <span className="text-xs font-bold">{skill.name}</span>
                            <button 
                              type="button"
                              onClick={() => handleDeleteSkill(skill._id)}
                              className="text-muted-foreground/20 hover:text-red-500 transition-colors"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                        {(!Array.isArray(skills) || skills.filter(s => s.category === cat).length === 0) && (
                          <span className="text-[10px] uppercase font-black text-muted-foreground/20 italic p-2">Empty Sector</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'Experience' && (
          <div className="space-y-8">
            <header>
              <h1 className="text-4xl font-black tracking-tighter uppercase italic">Professional <span className="text-primary NOT-italic">Registry</span></h1>
              <p className="text-muted-foreground/60 text-sm mt-2 font-medium tracking-widest uppercase">Chronological record of system integrations</p>
            </header>

            <div className="grid lg:grid-cols-12 gap-8">
              <div className="lg:col-span-4">
                <div className="glass p-8 rounded-[2rem] sticky top-8">
                   <h3 className="text-lg font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                    <Plus size={18} className="text-primary" />
                    New Record
                  </h3>
                  <form onSubmit={handleAddExperience} className="space-y-4">
                    <input className="w-full bg-white/5 border border-white/5 rounded-xl h-12 px-4 text-sm" placeholder="Organization" value={expForm.company} onChange={e => setExpForm({...expForm, company: e.target.value})} />
                    <input className="w-full bg-white/5 border border-white/5 rounded-xl h-12 px-4 text-sm" placeholder="Role/Position" value={expForm.position} onChange={e => setExpForm({...expForm, position: e.target.value})} />
                    <input className="w-full bg-white/5 border border-white/5 rounded-xl h-12 px-4 text-sm" placeholder="Duration (e.g. 2021-2023)" value={expForm.duration} onChange={e => setExpForm({...expForm, duration: e.target.value})} />
                    <textarea className="w-full bg-white/5 border border-white/5 rounded-xl p-4 text-sm resize-none h-24" placeholder="Brief Summary" value={expForm.description} onChange={e => setExpForm({...expForm, description: e.target.value})} />
                    <button type="submit" className="w-full h-12 rounded-xl primary-gradient text-white font-black uppercase tracking-[0.2em] text-[10px]">Add to Chronology</button>
                  </form>
                </div>
              </div>
              <div className="lg:col-span-8 space-y-4">
                {Array.isArray(experiences) && experiences.map(exp => (
                  <div key={exp._id} className="glass p-6 rounded-[2rem] group flex justify-between items-start">
                    <div>
                      <div className="text-xs font-black uppercase tracking-widest text-primary mb-1">{exp.duration}</div>
                      <h4 className="text-xl font-black">{exp.position}</h4>
                      <p className="text-sm font-bold text-muted-foreground/60">{exp.company}</p>
                    </div>
                    <button onClick={() => handleDeleteExperience(exp._id)} className="p-3 rounded-xl bg-red-500/5 text-red-500/20 group-hover:text-red-500 transition-all">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === 'Certifications' && (
          <div className="space-y-8">
            <header>
              <h1 className="text-4xl font-black tracking-tighter uppercase italic">Authorization <span className="text-primary NOT-italic">Codes</span></h1>
              <p className="text-muted-foreground/60 text-sm mt-2 font-medium tracking-widest uppercase">Verified technical credentials and licenses</p>
            </header>

            <div className="grid lg:grid-cols-12 gap-8">
              <div className="lg:col-span-4">
                <div className="glass p-8 rounded-[2rem] sticky top-8">
                   <h3 className="text-lg font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                    <Plus size={18} className="text-primary" />
                    New Credential
                  </h3>
                  <form onSubmit={handleAddCertification} className="space-y-4">
                    <input className="w-full bg-white/5 border border-white/5 rounded-xl h-12 px-4 text-sm" placeholder="Credential Name" value={certForm.title} onChange={e => setCertForm({...certForm, title: e.target.value})} />
                    <input className="w-full bg-white/5 border border-white/5 rounded-xl h-12 px-4 text-sm" placeholder="Issuing Authority" value={certForm.issuer} onChange={e => setCertForm({...certForm, issuer: e.target.value})} />
                    <input className="w-full bg-white/5 border border-white/5 rounded-xl h-12 px-4 text-sm" placeholder="Issue Date" value={certForm.date} onChange={e => setCertForm({...certForm, date: e.target.value})} />
                    <button type="submit" className="w-full h-12 rounded-xl primary-gradient text-white font-black uppercase tracking-[0.2em] text-[10px]">Log Certification</button>
                  </form>
                </div>
              </div>
              <div className="lg:col-span-8 grid md:grid-cols-2 gap-4">
                {Array.isArray(certifications) && certifications.map(cert => (
                  <div key={cert._id} className="glass p-6 rounded-[2rem] group flex justify-between items-start">
                    <div>
                      <h4 className="font-black leading-tight mb-1">{cert.title}</h4>
                      <div className="text-[10px] font-black uppercase text-muted-foreground/40">{cert.issuer} • {cert.date}</div>
                    </div>
                    <button onClick={() => handleDeleteCertification(cert._id)} className="p-3 rounded-xl bg-red-500/5 text-red-500/20 group-hover:text-red-500 transition-all">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === 'Resume' && (
          <div className="space-y-8">
            <header>
              <h1 className="text-4xl font-black tracking-tighter uppercase italic">Resume <span className="text-primary NOT-italic">Protocol</span></h1>
              <p className="text-muted-foreground/60 text-sm mt-2 font-medium tracking-widest uppercase">Manage binary asset paths for specialized credentials</p>
            </header>

            <div className="grid lg:grid-cols-12 gap-8">
              <div className="lg:col-span-12 xl:col-span-5">
                <div className="glass p-8 rounded-[2rem] sticky top-8">
                  <h3 className="text-lg font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                    <FileText size={18} className="text-primary" />
                    Upload Module
                  </h3>
                  <form onSubmit={handleUpdateResume} className="space-y-6">
                    <div className="space-y-4">
                      <div 
                        className={`relative border-2 border-dashed rounded-[2rem] p-12 transition-all group flex flex-col items-center justify-center text-center ${
                          selectedFile ? 'border-primary bg-primary/5' : 'border-white/10 hover:border-primary/30'
                        }`}
                      >
                        <input 
                          type="file"
                          accept=".pdf"
                          onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                          className="absolute inset-0 opacity-0 cursor-pointer z-10"
                        />
                        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <Upload size={32} className={selectedFile ? 'text-primary' : 'text-muted-foreground/40'} />
                        </div>
                        {selectedFile ? (
                          <>
                            <p className="text-sm font-bold text-primary truncate max-w-full px-4">{selectedFile.name}</p>
                            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 mt-1">Ready for deployment</p>
                          </>
                        ) : (
                          <>
                            <p className="text-sm font-bold uppercase tracking-tight">Drop Resume PDF</p>
                            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 mt-1">Maximum Size: 10MB</p>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
                      <div className="flex items-start gap-3">
                        <Activity size={16} className="text-primary mt-0.5" />
                        <div>
                          <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40 mb-1">Active Registry Path</p>
                          <p className="text-[10px] font-bold leading-relaxed text-primary break-all">
                            {profile?.resumeUrl || 'Default Internal Registry'}
                          </p>
                        </div>
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      disabled={!selectedFile || isUploading}
                      className={`w-full h-14 rounded-xl font-black uppercase tracking-[0.3em] text-[10px] shadow-glow transition-all flex items-center justify-center gap-3 ${
                        !selectedFile || isUploading 
                        ? 'bg-white/5 text-muted-foreground/20 cursor-not-allowed' 
                        : 'primary-gradient text-white hover:scale-[1.02] active:scale-[0.98]'
                      }`}
                    >
                      {isUploading ? (
                        <>
                          <Activity size={16} className="animate-spin" />
                          Synchronizing...
                        </>
                      ) : (
                        <>
                          <Rocket size={16} />
                          Execute Injection
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>

              <div className="lg:col-span-12 xl:col-span-7">
                <div className="glass p-8 rounded-[2rem] h-full flex flex-col items-center justify-center text-center min-h-[400px]">
                  {profile?.resumeUrl ? (
                    <div className="w-full h-full flex flex-col items-center">
                       <div className="w-full flex-1 bg-white/5 rounded-2xl overflow-hidden mb-6 flex items-center justify-center">
                          <FileText size={80} className="text-primary/20" />
                       </div>
                       <h3 className="text-xl font-black uppercase tracking-tighter italic">Preview Node <span className="text-primary">Status</span></h3>
                       <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 mt-2 max-w-xs mx-auto">
                         The encrypted binary is currently hosted and accessible at the network endpoint.
                       </p>
                       <button 
                        onClick={() => window.open(profile.resumeUrl.startsWith('http') ? profile.resumeUrl : `${axios.defaults.baseURL || ''}${profile.resumeUrl}`, '_blank')}
                        className="mt-6 px-10 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest transition-all text-primary"
                      >
                        Verify Live Deployment
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                         <Globe size={32} className="text-muted-foreground" />
                      </div>
                      <h3 className="text-xl font-black uppercase tracking-tighter">System Idle</h3>
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 mt-2 max-w-xs mx-auto">
                        No custom resume detected in the registry. 
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'System' && (
          <div className="space-y-8">
            <header>
              <h1 className="text-4xl font-black tracking-tighter uppercase italic">Core <span className="text-primary NOT-italic">System</span></h1>
              <p className="text-muted-foreground/60 text-sm mt-2 font-medium tracking-widest uppercase">Administrative overhead and security logs</p>
            </header>
            <div className="glass p-8 rounded-[2rem] font-mono text-[11px] space-y-2 max-h-[500px] overflow-y-auto">
               <div className="text-primary font-black mb-4 uppercase tracking-[0.2em]">[SYSTEM LOGS]</div>
               <div className="text-muted-foreground/40 italic flex gap-4"><span>[11:58:21]</span> <span className="text-green-500/60 uppercase font-bold">Success</span> Authentication sequence complete.</div>
               <div className="text-muted-foreground/40 italic flex gap-4"><span>[11:58:24]</span> <span className="text-primary uppercase font-bold">Info</span> Synchronizing with remote Git registry.</div>
               <div className="text-muted-foreground/40 italic flex gap-4"><span>[11:58:34]</span> <span className="text-amber-500 uppercase font-bold">Warning</span> Latency spike detected in API node 4.</div>
               <div className="text-muted-foreground/40 italic flex gap-4"><span>[11:59:02]</span> <span className="text-green-500/60 uppercase font-bold">Success</span> Database backup executed: dev.db.bak</div>
               <div className="animate-pulse flex gap-4 text-primary font-black"><span>[11:59:15]</span> Monitoring system vitals...</div>
            </div>
          </div>
        )}
      </main>

      {/* CRUD Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-background/95 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="glass w-full max-w-xl rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden max-h-[90vh] overflow-y-auto"
            >
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-primary opacity-50" />
               
               <button 
                 onClick={() => setIsModalOpen(false)}
                 className="absolute top-8 right-8 text-muted-foreground/40 hover:text-white transition-colors"
               >
                 <X size={20} />
               </button>

               <div className="mb-8">
                 <h2 className="text-3xl font-black italic tracking-tighter">
                   {editingProject ? 'RECONFIGURE' : 'INITIALIZE'} <span className="text-primary uppercase">MODULE</span>
                 </h2>
                 <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 mt-1">Registry Entry Protocol</p>
               </div>

               <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase tracking-[0.3em] ml-2 text-muted-foreground/50 text-gradient">Module Signature</label>
                    <input 
                      className="w-full bg-white/5 border border-white/5 rounded-xl h-12 px-4 outline-none focus:border-primary/50 transition-all text-sm font-medium" 
                      placeholder="Project Name"
                      value={formData.title}
                      onChange={e => setFormData({...formData, title: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase tracking-[0.3em] ml-2 text-muted-foreground/50 text-gradient">Executive Brief</label>
                    <textarea 
                      className="w-full bg-white/5 border border-white/5 rounded-xl p-4 outline-none focus:border-primary/50 transition-all text-sm font-medium min-h-[80px] resize-none" 
                      placeholder="Describe system purpose..."
                      value={formData.description}
                      onChange={e => setFormData({...formData, description: e.target.value})}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] font-black uppercase tracking-[0.3em] ml-2 text-muted-foreground/50 text-gradient">Asset Path</label>
                      <input 
                        className="w-full bg-white/5 border border-white/5 rounded-xl h-12 px-4 outline-none focus:border-primary/50 transition-all text-sm font-medium" 
                        placeholder="/projects/file.png"
                        value={formData.image}
                        onChange={e => setFormData({...formData, image: e.target.value})}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black uppercase tracking-[0.3em] ml-2 text-muted-foreground/50 text-gradient">Logic Tags</label>
                      <input 
                        className="w-full bg-white/5 border border-white/5 rounded-xl h-12 px-4 outline-none focus:border-primary/50 transition-all text-sm font-medium" 
                        placeholder="Comma separated"
                        value={formData.tags}
                        onChange={e => setFormData({...formData, tags: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] font-black uppercase tracking-[0.3em] ml-2 text-muted-foreground/50 text-gradient">System Skills</label>
                      <input 
                        className="w-full bg-white/5 border border-white/5 rounded-xl h-12 px-4 outline-none focus:border-primary/50 transition-all text-sm font-medium" 
                        placeholder="Project specific skills"
                        value={formData.skills}
                        onChange={e => setFormData({...formData, skills: e.target.value})}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black uppercase tracking-[0.3em] ml-2 text-muted-foreground/50 text-gradient">Network Endpoint</label>
                      <input 
                        className="w-full bg-white/5 border border-white/5 rounded-xl h-12 px-4 outline-none focus:border-primary/50 transition-all text-sm font-medium" 
                        placeholder="https://..."
                        value={formData.link}
                        onChange={e => setFormData({...formData, link: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] font-black uppercase tracking-[0.3em] ml-2 text-muted-foreground/50 text-gradient">Source Registry</label>
                      <input 
                        className="w-full bg-white/5 border border-white/5 rounded-xl h-12 px-4 outline-none focus:border-primary/50 transition-all text-sm font-medium" 
                        placeholder="GitHub URL"
                        value={formData.github}
                        onChange={e => setFormData({...formData, github: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase tracking-[0.3em] ml-2 text-muted-foreground/50 text-gradient">Core Protocols (Highlights)</label>
                    <textarea 
                      className="w-full bg-white/5 border border-white/5 rounded-xl p-4 outline-none focus:border-primary/50 transition-all text-sm font-medium min-h-[80px] resize-none" 
                      placeholder="One highlight per line..."
                      value={formData.highlights}
                      onChange={e => setFormData({...formData, highlights: e.target.value})}
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full h-14 mt-4 rounded-xl primary-gradient text-white font-black uppercase tracking-[0.3em] text-[11px] shadow-glow hover:scale-[1.01] active:scale-[0.98] transition-all"
                  >
                     {editingProject ? 'Synchronize Data' : 'Execute Creation'}
                  </button>
               </form>

               <div className="mt-8 pt-6 border-t border-white/5 text-center">
                  <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/20 italic">
                    All deployments are logged to the primary security matrix.
                  </p>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
