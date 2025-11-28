import { motion } from "framer-motion";
import { Code2, Rocket, Users } from "lucide-react";
import { fadeInUp } from "@/utils/animations";
import { profile } from "@/data/profile";
import { AnimatedCube } from "./AnimatedCube";

export const About = () => {
  const highlights = [
    {
      icon: Code2,
      title: "Clean Code",
      description: "Writing maintainable, scalable code with best practices",
    },
    {
      icon: Rocket,
      title: "Performance",
      description: "Optimizing for speed and user experience",
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Working effectively in agile team environments",
    },
  ];

  return (
    <section id="about" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
            About Me
          </h2>
          <div className="w-20 h-1 bg-gradient-primary mx-auto mb-12"></div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-12"
          >
            <AnimatedCube />
          </motion.div>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-lg text-muted-foreground text-center mb-16 leading-relaxed"
          >
            {profile.summary} I'm passionate about creating intuitive user experiences
            and solving complex problems with elegant solutions. When I'm not coding,
            you'll find me exploring new technologies, contributing to open source, or
            mentoring aspiring developers.
          </motion.p>

          <div className="grid md:grid-cols-3 gap-8">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { duration: 0.6, delay: index * 0.2 }
                  }
                }}
                className="text-center p-6 rounded-xl bg-card shadow-card hover:shadow-glow transition-all"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                  <item.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
