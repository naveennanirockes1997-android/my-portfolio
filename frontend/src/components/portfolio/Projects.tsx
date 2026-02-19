import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { fadeInUp, staggerContainer, staggerItem } from "@/utils/animations";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";
import { Loader2, Search } from "lucide-react";
import { getApiUrl } from "@/utils/api";

export const Projects = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(getApiUrl('/api/projects'));
        if (response.ok) {
          const data = await response.json();
          // Transform backend model to frontend model
          const transformed = data.map((p: any) => ({
            id: p._id, // MongoDB uses _id
            name: p.title,
            description: p.description,
            image: p.image || "/placeholder.svg",
            tech: p.tags || [],
            skills: p.skills || [],
            highlights: p.highlights || [],
            github: p.github || "#",
            live: p.link || "#",
          }));
          setProjects(transformed);
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);



  const filteredProjects = Array.isArray(projects) ? projects.filter(project => {
    const query = searchQuery.toLowerCase().trim();
    
    // Check if project matches search query (name, description, tech, or skills)
    const matchesSearch = 
      (project.name?.toLowerCase() || "").includes(query) || 
      (project.description?.toLowerCase() || "").includes(query) ||
      (project.tech || []).some((t: string) => t?.toLowerCase().includes(query)) ||
      (project.skills || []).some((s: string) => s?.toLowerCase().includes(query));
                        
    return matchesSearch;
  }) : [];

  return (
    <section id="projects" className="py-32 relative overflow-hidden bg-background">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center mb-20"
        >
          <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Portfolio</span>
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            Creative <span className="bg-gradient-primary bg-clip-text text-transparent">Exhibition</span>
          </h2>
          <div className="w-24 h-2 bg-gradient-primary mx-auto rounded-full mb-8"></div>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto text-lg font-medium">
            Search through my technical builds and explore the registry.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto mb-20">
          <div className="relative group">
            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-3xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
            <div className="relative flex items-center">
              <Search className="absolute left-6 text-muted-foreground/50 group-focus-within:text-primary transition-colors pointer-events-none" size={24} />
              <input 
                id="project-search"
                type="text"
                placeholder="Search projects, skills or tech stack..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-[2rem] py-6 pl-16 pr-8 text-xl outline-none focus:border-primary/50 backdrop-blur-md transition-all placeholder:text-muted-foreground/30 font-medium"
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center p-32">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : (
          <div className="max-w-[95rem] mx-auto">
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-12">
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <ProjectCard
                      project={project}
                      onClick={() => setSelectedProject(project)}
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-32">
                <div className="text-6xl mb-6">🔍</div>
                <p className="text-2xl font-bold text-foreground mb-4">No matching modules</p>
                <p className="text-muted-foreground">Adjust your search or filter criteria to find specific registry entries.</p>
                <button 
                  onClick={() => setSearchQuery("")}
                  className="mt-8 text-primary font-bold hover:underline"
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
