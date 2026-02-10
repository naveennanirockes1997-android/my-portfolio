import { motion } from "framer-motion";
import { Code2, Rocket, Users, Target, Zap, Heart } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/utils/animations";
import { profile } from "@/data/profile";
import { AnimatedCube } from "./AnimatedCube";

export const About = () => {
  const highlights = [
    {
      icon: Code2,
      title: "Clean Code",
      description: "Architecting sustainable, pixel-perfect solutions.",
      color: "blue"
    },
    {
      icon: Rocket,
      title: "Performance",
      description: "Blazing fast experiences under 1s load time.",
      color: "purple"
    },
    {
      icon: Heart,
      title: "UX Driven",
      description: "Empathy-led design focusing on user delight.",
      color: "pink"
    },
  ];

  const stats = [
    { label: "Experience", value: "2+ Years" },
    { label: "Projects", value: "15+" },
    { label: "Clients", value: "10+" },
    { label: "Coffee", value: "Infinite" },
  ];

  return (
    <section id="about" className="py-40 relative overflow-hidden bg-background">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center max-w-[85rem] mx-auto">
          {/* Left Side: Visuals */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, type: "spring" }}
            viewport={{ once: true }}
            className="relative order-2 lg:order-1"
          >
            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full scale-110 animate-pulse pointer-events-none" />
            <div className="relative z-10 glass-card p-4 rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border-white/10 group">
              <div className="relative overflow-hidden rounded-[2.5rem] bg-background/50">
                <AnimatedCube />
              </div>
              
              {/* Floating Stat badged */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -top-10 -right-10 p-6 glass rounded-[2rem] border-white/10 shadow-glow hidden xl:block"
              >
                <div className="text-3xl font-black text-primary">2+</div>
                <div className="text-[10px] uppercase tracking-widest font-black text-muted-foreground mt-1">Years XP</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="space-y-12 order-1 lg:order-2"
          >
            <div className="space-y-6">
              <motion.div 
                variants={fadeInUp}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-white/10 text-[10px] font-black uppercase tracking-[0.3em] text-primary"
              >
                <Zap size={12} className="fill-primary" />
                Evolution of Craft
              </motion.div>
              
              <h2 className="text-5xl md:text-7xl font-black leading-[1.1] tracking-tighter">
                Engineering <br />
                <span className="text-primary italic">Ambition</span>
              </h2>
              
              <p className="text-xl md:text-2xl font-medium leading-relaxed text-foreground/80 max-w-xl">
                I'm a <span className="text-primary font-bold">MERN stack virtuoso</span> dedicated to pushing the boundaries of what's possible in the digital realm.
              </p>
            </div>
            
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl font-medium">
              {profile.summary} Beyond the technical architectures, I'm a lifelong learner committed to user-centric delight. 
              My mission is to create digital products that don't just solve problems—they <span className="text-foreground font-black underline decoration-primary decoration-4 underline-offset-8 transition-all hover:text-primary">inspire action</span>.
            </p>

            <div className="grid grid-cols-2 gap-8 pt-8">
              {stats.map((stat, idx) => (
                <div key={stat.label} className="group cursor-default">
                  <div className="text-4xl md:text-5xl font-black text-foreground group-hover:text-primary transition-colors duration-500">
                    {stat.value}
                  </div>
                  <div className="text-[10px] uppercase font-black tracking-[.25em] text-muted-foreground mt-2 flex items-center gap-2">
                    <div className="w-4 h-[2px] bg-primary/30 group-hover:w-8 group-hover:bg-primary transition-all duration-500" />
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 mt-40 max-w-6xl mx-auto"
        >
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { type: "spring", stiffness: 100, delay: index * 0.1 }
                }
              }}
              whileHover={{ y: -10 }}
              className="group p-8 rounded-[2rem] glass-card hover:bg-white/[0.05] transition-premium flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                <item.icon size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed font-medium">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
