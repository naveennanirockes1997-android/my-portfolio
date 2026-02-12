import { motion } from "framer-motion";
import { Layout, Cpu, Wrench, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { fadeInUp, staggerContainer, staggerItem } from "@/utils/animations";
import { profile } from "@/data/profile";
import { SkillsGlobe } from "./SkillsGlobe";
import { getApiUrl } from "@/utils/api";

export const Skills = () => {
  const [skills, setSkills] = useState<{name: string, category: string}[]>([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch(getApiUrl('/api/skills'));
        if (response.ok) {
          const data = await response.json();
          setSkills(data);
        }
      } catch (error) {
        console.error("Failed to fetch skills:", error);
      }
    };
    fetchSkills();
  }, []);

  const getSkillsByCategory = (category: string) => {
    const dynamicSkills = Array.isArray(skills) ? skills.filter(s => s.category === category).map(s => s.name) : [];
    // Combine with static profile data if dynamic is empty, or show both
    if (dynamicSkills.length > 0) return dynamicSkills;
    
    // Fallback to static data
    switch(category) {
      case "Frontend": return profile.skills.frontend;
      case "Backend": return profile.skills.backend;
      case "Tools": return profile.skills.tools;
      case "Other": return profile.skills.other;
      default: return [];
    }
  };

  const skillCategories = [
    { title: "Frontend", icon: Layout, skills: getSkillsByCategory("Frontend"), color: "from-violet-600 to-indigo-500" },
    { title: "Backend", icon: Cpu, skills: getSkillsByCategory("Backend"), color: "from-fuchsia-600 to-purple-500" },
    { title: "Tools", icon: Wrench, skills: getSkillsByCategory("Tools"), color: "from-rose-500 to-pink-500" },
    { title: "Digital World", icon: Globe, skills: getSkillsByCategory("Other"), color: "from-indigo-400 to-cyan-500" },
  ];

  return (
    <section id="skills" className="py-32 relative overflow-hidden bg-background">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Expertise</span>
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            Technical <span className="bg-gradient-primary bg-clip-text text-transparent">Arsenal</span>
          </h2>
          <div className="w-24 h-2 bg-gradient-primary mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 items-start max-w-7xl mx-auto">
          {/* 3D Visualization Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-12 overflow-hidden mb-12"
          >
            <div className="relative glass-card p-1 rounded-[2.5rem] shadow-glow border-primary/20 bg-primary/5">
              <SkillsGlobe />
              <div className="absolute bottom-10 left-10 p-6 glass rounded-2xl hidden md:block border-primary/10">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-primary animate-ping" />
                  <span className="text-sm font-bold uppercase tracking-wider">Drag to Explore Ecosystem</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Skill Categories Grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {skillCategories.map((category, catIndex) => (
              <motion.div
                key={category.title}
                variants={staggerItem}
                whileHover={{ y: -10 }}
                className="group relative glass-card p-8 rounded-[2rem] hover:bg-white/[0.03] transition-premium border-white/5 overflow-hidden"
              >
                {/* Accent Line */}
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${category.color} opacity-30 group-hover:opacity-100 transition-opacity`} />
                
                <div className="flex items-center gap-4 mb-8">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} p-0.5 shadow-lg group-hover:rotate-6 transition-transform`}>
                    <div className="w-full h-full bg-card rounded-[inherit] flex items-center justify-center">
                      <category.icon className="h-7 w-7 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-black">{category.title}</h3>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill, idx) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: catIndex * 0.1 + idx * 0.05 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="px-4 py-2 bg-primary/5 rounded-xl text-sm font-bold border border-primary/10 hover:border-primary/40 hover:bg-primary/10 hover:text-primary transition-all cursor-default text-foreground/80"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
