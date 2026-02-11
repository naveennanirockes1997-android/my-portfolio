import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeInUp, staggerContainer, staggerItem } from "@/utils/animations";
import { profile } from "@/data/profile";
import { useState, useEffect } from "react";
import { getApiUrl } from "@/utils/api";

export const Certifications = () => {
  const [certs, setCerts] = useState<any[]>([]);

  useEffect(() => {
    const fetchCerts = async () => {
      try {
        const response = await fetch(getApiUrl('/api/certifications'));
        if (response.ok) {
          const data = await response.json();
          setCerts(data);
        }
      } catch (error) {
        console.error("Failed to fetch certifications:", error);
      }
    };
    fetchCerts();
  }, []);

  const displayCerts = certs.length > 0 ? certs.map(c => ({
    id: c._id,
    name: c.title,
    issuer: c.issuer,
    date: c.date,
    credentialUrl: c.link || "#"
  })) : profile.certifications;

  return (
    <section id="certifications" className="py-32 relative overflow-hidden bg-background">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-primary/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center mb-24"
        >
          <span className="text-primary font-black tracking-[0.3em] uppercase text-[10px] mb-4 block">Proven Expertise</span>
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            Global <span className="bg-gradient-primary bg-clip-text text-transparent">Recognition</span>
          </h2>
          <div className="w-24 h-2 bg-gradient-primary mx-auto rounded-full"></div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {displayCerts.map((cert, index) => (
            <motion.div
              key={cert.id}
              variants={staggerItem}
              whileHover={{ y: -12 }}
              className="group relative glass-card p-8 rounded-[2.5rem] hover:bg-white/[0.03] transition-premium border-white/5 overflow-hidden"
            >
              {/* Card Accent */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-primary opacity-20 group-hover:opacity-100 transition-opacity" />
              
              <div className="flex items-center justify-between mb-8">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-glow">
                  <Award size={32} />
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">{cert.date}</div>
                  <div className="text-xs font-bold text-muted-foreground">{cert.issuer}</div>
                </div>
              </div>

              <h3 className="text-2xl font-black mb-6 group-hover:text-primary transition-colors leading-tight">
                {cert.name}
              </h3>

              <Button
                variant="outline"
                size="sm"
                className="w-full h-12 rounded-xl glass border-white/10 hover:border-primary/50 hover:bg-primary/5 transition-all font-bold tracking-wide"
                onClick={() => window.open(cert.credentialUrl, "_blank")}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Validate Credential
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
