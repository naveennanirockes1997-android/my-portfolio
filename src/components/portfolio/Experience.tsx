import { motion } from "framer-motion";
import { Briefcase, MapPin, Calendar } from "lucide-react";
import { fadeInUp, slideInLeft } from "@/utils/animations";
import { profile } from "@/data/profile";

export const Experience = () => {
  return (
    <section id="experience" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Work Experience
          </h2>
          <div className="w-20 h-1 bg-gradient-primary mx-auto mb-16"></div>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-12">
          {profile.experience.map((job, index) => (
            <motion.div
              key={job.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInLeft}
              transition={{ delay: index * 0.2 }}
              className="relative pl-8 border-l-2 border-primary/30"
            >
              <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-primary shadow-glow"></div>

              <div className="bg-card p-6 rounded-xl shadow-card hover:shadow-glow transition-all">
                <div className="flex flex-wrap items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-1">{job.position}</h3>
                    <p className="text-lg text-primary font-semibold">{job.company}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{job.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{job.location}</span>
                    </div>
                  </div>
                </div>

                <ul className="space-y-3">
                  {job.responsibilities.map((responsibility, idx) => (
                    <li key={idx} className="flex items-start text-muted-foreground">
                      <span className="text-primary mr-3 mt-1">▸</span>
                      <span>{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
