import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { modalVariants } from "@/utils/animations";

interface ProjectModalProps {
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
  } | null;
  onClose: () => void;
}

export const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="bg-card rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-glow"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative h-80 overflow-hidden rounded-t-2xl">
            <img
              src={project.image}
              alt={project.name}
              loading="eager"
              className="w-full h-full object-cover"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="p-8">
            <h2 className="text-3xl font-bold mb-4">{project.name}</h2>
            <p className="text-lg text-muted-foreground mb-6">{project.description}</p>

            <div className="flex flex-wrap gap-2 mb-8">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 text-sm rounded-full bg-primary/10 text-primary font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mb-8 p-6 glass rounded-2xl border-primary/10">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Project Related Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 text-xs rounded-xl bg-primary/5 text-primary-foreground/70 border border-primary/10 font-bold uppercase tracking-wider"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Key Features</h3>
              <ul className="space-y-3">
                {project.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-primary font-bold mr-3">✓</span>
                    <span className="text-muted-foreground">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => window.open(project.github, "_blank")}
                className="flex-1 rounded-xl border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all group/github"
              >
                <Github className="h-5 w-5 mr-2 text-primary group-hover/github:scale-110 transition-transform" />
                View Source Code
              </Button>
              <Button
                onClick={() => window.open(project.live, "_blank")}
                className="flex-1 bg-gradient-primary"
              >
                <ExternalLink className="h-5 w-5 mr-2" />
                Visit Live Site
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
