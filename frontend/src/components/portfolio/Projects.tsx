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
  const [selectedTech, setSelectedTech] = useState<string>("All");
  const [allSkills, setAllSkills] = useState<string[]>([]);

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

    const fetchSkills = async () => {
      try {
        const response = await fetch(getApiUrl('/api/skills'));
        if (response.ok) {
          const data = await response.json();
          setAllSkills(data.map((s: any) => s.name));
        }
      } catch (error) {
        console.error("Failed to fetch skills:", error);
      }
    };

    fetchProjects();
    fetchSkills();
  }, []);

  const allTechs = ["All", ...Array.from(new Set([
    ...projects.flatMap(p => [...p.tech, ...p.skills]),
    ...allSkills
  ]))];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.skills.some((s: string) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesTech = selectedTech === "All" || 
                        project.tech.includes(selectedTech) || 
                        project.skills.includes(selectedTech);
                        
    return matchesSearch && matchesTech;
  });

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
            Search through my technical builds or filter by specific <span className="text-foreground">Skills</span> to explore the registry.
          </p>
        </motion.div>

        {/* Search & Skills List Filter */}
        <div className="max-w-4xl mx-auto mb-20 space-y-8">
          <div className="relative group">
            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-3xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
            <div className="relative flex items-center">
              <Search className="absolute left-6 text-muted-foreground/50 group-focus-within:text-primary transition-colors" size={24} />
              <input 
                type="text"
                placeholder="Search projects, skills or tech stack..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-[2rem] py-6 pl-16 pr-8 text-xl outline-none focus:border-primary/50 backdrop-blur-md transition-all placeholder:text-muted-foreground/30 font-medium"
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {allTechs.map((tech) => (
              <motion.button
                key={tech}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedTech(tech)}
                className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                  selectedTech === tech 
                  ? "bg-primary text-white shadow-glow" 
                  : "bg-white/5 text-muted-foreground/60 hover:bg-white/10 hover:text-primary border border-white/5"
                }`}
              >
                {tech}
              </motion.button>
            ))}
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
                  onClick={() => {setSearchQuery(""); setSelectedTech("All");}}
                  className="mt-8 text-primary font-bold hover:underline"
                >
                  Reset Parameters
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
