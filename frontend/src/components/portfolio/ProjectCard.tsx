import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cardHover } from "@/utils/animations";

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
  return (
    <motion.div
      layout
      variants={cardHover}
      initial="rest"
      whileHover="hover"
      className="relative bg-card/30 rounded-3xl overflow-hidden shadow-2xl cursor-pointer group border border-white/5 backdrop-blur-sm"
      onClick={onClick}
    >
      <div className="relative h-64 overflow-hidden">
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
        
        {/* Tech & Skills Badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2 max-w-[80%]">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-full glass border-white/10 text-primary shadow-glow"
            >
              {tech}
            </span>
          ))}
          {project.skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-full bg-primary/20 backdrop-blur-md border border-primary/20 text-white shadow-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="p-8 relative">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-black tracking-tight group-hover:text-primary transition-colors">
            {project.name}
          </h3>
          <motion.div 
            whileHover={{ rotate: 45, scale: 1.2 }}
            className="w-10 h-10 rounded-full glass flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-all shadow-glow"
          >
            <ExternalLink size={20} />
          </motion.div>
        </div>
        
        <p className="text-muted-foreground line-clamp-3 mb-8 leading-relaxed font-medium">
          {project.description}
        </p>

        <div className="flex items-center gap-4">
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

