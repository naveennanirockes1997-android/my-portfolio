import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Eye, EyeOff, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cardHover, fadeInUp } from "@/utils/animations";
import { useState } from "react";

interface ProjectCardProps {
  project: {
    id: number;
    name: string;
    description: string;
    image: string;
    tech: string[];
    skills: string[];
    highlights: string[];
    github: string;
    live: string;
  };
  onClick: () => void;
}

export const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
  const [showSkills, setShowSkills] = useState(false);

  const toggleSkills = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowSkills(!showSkills);
  };

  return (
    <motion.div
      layout
      variants={cardHover}
      initial="rest"
      whileHover="hover"
      className="relative bg-card/30 rounded-3xl overflow-hidden shadow-2xl cursor-pointer group border border-white/5 backdrop-blur-sm h-full flex flex-col"
      onClick={onClick}
    >
      <div className="relative h-64 overflow-hidden shrink-0">
        <motion.img
          src={project.image}
          alt={project.name}
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        {/* Advanced Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-90 transition-all duration-500 group-hover:opacity-40" />
        
        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Tech Badges (Hidden by default, shown when overlay is active) */}
        <AnimatePresence>
          {showSkills && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="absolute top-4 left-4 flex flex-wrap gap-2 max-w-[80%] z-30"
            >
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-full glass border-white/10 text-primary shadow-glow"
                >
                  {tech}
                </span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Eye Icon on Image */}
        <div className="absolute top-4 right-4 z-30">
          <motion.button
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleSkills}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-glow backdrop-blur-md border ${
              showSkills 
                ? "bg-primary text-white border-primary/50" 
                : "bg-black/20 text-white border-white/10 hover:bg-black/40"
            }`}
            title={showSkills ? "Hide Skills" : "Show Skills"}
          >
            {showSkills ? <EyeOff size={20} /> : <Eye size={20} />}
          </motion.button>
        </div>

        {/* Animated Skills Overlay */}
        <AnimatePresence>
          {showSkills && (
            <motion.div
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              className="absolute inset-0 bg-black/60 z-20 flex flex-col items-center justify-center p-6 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 10 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Sparkles className="text-primary h-4 w-4" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/70">Project Skills</span>
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  {project.skills.map((skill, idx) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg bg-primary/20 border border-primary/30 text-white shadow-sm"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
                <button 
                  onClick={toggleSkills}
                  className="mt-4 text-[10px] font-black uppercase tracking-widest text-primary hover:text-white transition-colors"
                >
                  Close Registry
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-8 relative flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-grow">
            <h3 className="text-2xl font-black tracking-tight group-hover:text-primary transition-colors leading-tight">
              {project.name}
            </h3>
          </div>
          <div className="flex gap-2 shrink-0 ml-4">
            <motion.div 
              whileHover={{ rotate: 45, scale: 1.2 }}
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-all shadow-glow"
            >
              <ExternalLink size={20} />
            </motion.div>
          </div>
        </div>
        
        <p className="text-muted-foreground line-clamp-3 mb-8 leading-relaxed font-medium">
          {project.description}
        </p>

        <div className="mt-auto flex items-center gap-4">
          <Button
            size="sm"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              window.open(project.github, "_blank");
            }}
            className="h-10 px-6 rounded-xl hover:bg-primary/10 border border-primary/20 hover:border-primary/40 transition-all font-bold group/github"
          >
            <Github className="h-4 w-4 mr-2 text-primary group-hover/github:scale-120 transition-transform" />
            Code
          </Button>
          <Button
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              window.open(project.live, "_blank");
            }}
            className="h-10 px-6 bg-primary rounded-xl hover:shadow-glow transition-all font-bold shadow-glow"
          >
            Launch
          </Button>
        </div>
      </div>
      
      {/* Dynamic Hover Glow */}
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-primary/20 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
    </motion.div>
  );
};


