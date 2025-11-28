import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeInUp, staggerContainer, staggerItem } from "@/utils/animations";
import { profile } from "@/data/profile";

export const Certifications = () => {
  return (
    <section id="certifications" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Certifications
          </h2>
          <div className="w-20 h-1 bg-gradient-primary mx-auto mb-16"></div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {profile.certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              variants={staggerItem}
              whileHover={{ scale: 1.03, y: -8 }}
              className="bg-card p-6 rounded-xl shadow-card hover:shadow-glow transition-all"
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mx-auto mb-4">
                <Award className="h-8 w-8 text-primary" />
              </div>

              <h3 className="text-xl font-bold text-center mb-2">{cert.name}</h3>
              <p className="text-muted-foreground text-center text-sm mb-2">{cert.issuer}</p>
              <p className="text-primary text-center font-semibold mb-4">{cert.date}</p>

              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => window.open(cert.credentialUrl, "_blank")}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View Credential
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
