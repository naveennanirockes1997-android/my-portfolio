import { motion } from "framer-motion";
import { Briefcase, MapPin, Calendar, Building2 } from "lucide-react";
import { fadeInUp, slideInLeft, staggerContainer } from "@/utils/animations";
import { profile } from "@/data/profile";
import { useState, useEffect } from "react";
import { getApiUrl } from "@/utils/api";

export const Experience = () => {
  const [experiences, setExperiences] = useState<any[]>([]);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await fetch(getApiUrl('/api/experience'));
        if (response.ok) {
          const data = await response.json();
          setExperiences(data);
        }
      } catch (error) {
        console.error("Failed to fetch experience:", error);
      }
    };
    fetchExperiences();
  }, []);

  const displayExperiences = experiences.length > 0 ? experiences.map(exp => ({
    id: exp._id,
    company: exp.company,
    position: exp.position,
    duration: exp.duration,
    description: exp.description,
    responsibilities: exp.highlights,
    location: "Remote / On-site" // Adding default location
  })) : profile.experience;

  return (
    <section id="experience" className="py-32 relative overflow-hidden bg-background">
      {/* Background Decorative Blur */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -translate-x-1/2" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center mb-24"
        >
          <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Carrier Path</span>
          <h2 className="text-4xl md:text-6xl font-black mb-6">Professional <span className="bg-gradient-primary bg-clip-text text-transparent">Journey</span></h2>
          <div className="w-24 h-2 bg-gradient-primary mx-auto rounded-full"></div>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-16"
          >
            {displayExperiences.map((job, index) => (
              <motion.div
                key={job.id}
                variants={{
                  hidden: { opacity: 0, x: -50 },
                  visible: { 
                    opacity: 1, 
                    x: 0,
                    transition: { type: "spring", stiffness: 100, delay: index * 0.2 }
                  }
                }}
                className="relative group"
              >
                {/* Timeline Visuals */}
                <div className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-primary/50 via-primary/20 to-transparent ml-[15px] hidden md:block" />
                <div className="absolute left-0 top-0 ml-[4px] w-6 h-6 rounded-full glass border-2 border-primary group-hover:bg-primary transition-premium shadow-glow hidden md:block z-10" />

                <div className="md:ml-16 bg-card dark:bg-card/30 p-8 md:p-10 rounded-[2.5rem] glass-card hover:bg-white/[0.03] transition-premium border border-white/5 relative overflow-hidden">
                  {/* Hover Accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="relative z-10">
                    <div className="flex flex-wrap items-start justify-between gap-6 mb-8">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 text-primary">
                          <Building2 size={24} />
                          <span className="text-xl font-black tracking-tight">{job.company}</span>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-black text-foreground">{job.position}</h3>
                      </div>
                      
                      <div className="flex flex-col md:items-end gap-3">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-bold border-primary/20 text-primary">
                          <Calendar size={16} />
                          {job.duration}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground text-sm font-semibold pl-4">
                          <MapPin size={16} />
                          {job.location}
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-4">
                      {job.responsibilities.map((responsibility, idx) => (
                        <motion.div 
                          key={idx}
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: index * 0.1 + idx * 0.1 }}
                          className="flex items-start gap-4 p-4 rounded-2xl bg-secondary/30 border border-white/5 hover:border-primary/20 transition-all"
                        >
                          <div className="mt-1.5 w-2 h-2 rounded-full bg-primary shadow-glow shrink-0" />
                          <p className="text-muted-foreground leading-relaxed font-medium">{responsibility}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

