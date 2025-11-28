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
    highlights: string[];
    github: string;
    live: string;
  };
  onClick: () => void;
}

export const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
  return (
    <motion.div
      variants={cardHover}
      initial="rest"
      whileHover="hover"
      className="bg-card rounded-xl overflow-hidden shadow-card cursor-pointer group"
      onClick={onClick}
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-60"></div>
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
          {project.name}
        </h3>
        <p className="text-muted-foreground mb-4">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary font-medium"
            >
              {tech}
            </span>
          ))}
        </div>

        <ul className="space-y-2 mb-6">
          {project.highlights.slice(0, 3).map((highlight, idx) => (
            <li key={idx} className="text-sm text-muted-foreground flex items-start">
              <span className="text-primary mr-2">•</span>
              {highlight}
            </li>
          ))}
        </ul>

        <div className="flex gap-3">
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              window.open(project.github, "_blank");
            }}
          >
            <Github className="h-4 w-4 mr-2" />
            Code
          </Button>
          <Button
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              window.open(project.live, "_blank");
            }}
            className="bg-gradient-primary"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Live Demo
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
