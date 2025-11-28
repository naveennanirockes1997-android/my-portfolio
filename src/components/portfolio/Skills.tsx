import { motion } from "framer-motion";
import { Code, Database, Wrench, Sparkles } from "lucide-react";
import { fadeInUp, staggerContainer, staggerItem } from "@/utils/animations";
import { profile } from "@/data/profile";

export const Skills = () => {
  const skillCategories = [
    { title: "Frontend", icon: Code, skills: profile.skills.frontend },
    { title: "Backend", icon: Database, skills: profile.skills.backend },
    { title: "Tools", icon: Wrench, skills: profile.skills.tools },
    { title: "Other", icon: Sparkles, skills: profile.skills.other },
  ];

  return (
    <section id="skills" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Skills & Technologies
          </h2>
          <div className="w-20 h-1 bg-gradient-primary mx-auto mb-16"></div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              variants={staggerItem}
              className="bg-card p-6 rounded-xl shadow-card hover:shadow-glow transition-all"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <category.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">{category.title}</h3>
              </div>

              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, idx) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: catIndex * 0.1 + idx * 0.05 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="px-4 py-2 bg-muted rounded-lg text-sm font-medium hover:bg-primary/10 hover:text-primary transition-all cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
