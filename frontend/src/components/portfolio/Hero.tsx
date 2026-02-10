import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { Github, Linkedin, Mail, ChevronDown, Download, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";
import { staggerContainer, staggerItem } from "@/utils/animations";
import { FloatingShapes } from "./FloatingShapes";
import { useEffect } from "react";

export const Hero = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 0.9]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToProjects = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const openResume = () => {
    window.open("/resume", "_blank", "noopener,noreferrer");
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero"
    >
      <div className="absolute inset-0 z-0">
        <FloatingShapes />
      </div>

      {/* Premium Background Blurs */}
      <div className="premium-blur w-[500px] h-[500px] bg-primary/20 top-[-10%] left-[-10%]" />
      <div className="premium-blur w-[400px] h-[400px] bg-primary/10 bottom-[-10%] right-[-10%]" />

      <motion.div
        style={{ 
          rotateX, 
          rotateY, 
          transformStyle: "preserve-3d",
          opacity,
          scale
        }}
        className="container mx-auto px-6 py-32 relative z-10 perspective-1000"
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div 
            variants={staggerItem}
            style={{ transform: "translateZ(50px)" }}
            className="flex justify-center mb-8"
          >
            <span className="flex items-center gap-2 px-6 py-2 rounded-full glass text-primary text-sm font-bold tracking-widest uppercase border-primary/20">
              <Sparkles className="w-4 h-4 animate-pulse" />
              Visionary Web Developer
            </span>
          </motion.div>

          <motion.h1 
            variants={staggerItem}
            style={{ transform: "translateZ(100px)" }}
            className="text-6xl md:text-9xl font-black mb-8 leading-[1] tracking-tighter"
          >
            Crafting <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent text-glow inline-block">
              Modern
            </span>{" "}
            <span className="relative inline-block">
              <span className="relative z-10 italic">Magic</span>
              <motion.span 
                initial={{ width: 0 }}
                animate={{ width: "110%" }}
                transition={{ delay: 1.5, duration: 1, ease: "circOut" }}
                className="absolute bottom-4 left-[-5%] h-4 bg-primary/20 -z-1"
              />
            </span>
          </motion.h1>

          <motion.div
            variants={staggerItem}
            style={{ transform: "translateZ(60px)" }}
            className="mb-12"
          >
            <p className="text-xl md:text-3xl text-foreground font-semibold mb-2">
              Hi, I'm <span className="text-primary">{profile.name}</span>
            </p>
            <p className="text-lg md:text-xl text-muted-foreground font-medium tracking-widest uppercase">
              {profile.title}
            </p>
          </motion.div>

          <motion.div 
            variants={staggerItem}
            style={{ transform: "translateZ(80px)" }}
            className="flex flex-wrap items-center justify-center gap-6 mb-16"
          >
            <Button 
              size="lg" 
              onClick={scrollToProjects}
              className="h-16 px-10 text-lg font-bold bg-primary hover:bg-primary/90 rounded-2xl shadow-glow transition-all active:scale-95 group relative overflow-hidden"
            >
              <span className="relative z-10">Examine Portfolios</span>
              <motion.div 
                className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"
              />
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="ml-2 inline-block relative z-10"
              >
                &rarr;
              </motion.span>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              onClick={openResume}
              className="h-16 px-8 text-lg font-bold rounded-2xl border-2 border-primary/30 hover:border-primary bg-primary/5 hover:bg-primary text-foreground hover:text-white transition-all duration-300 group"
            >
              <Download className="mr-2 h-5 w-5 group-hover:animate-bounce" />
              Resume
            </Button>

            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToContact}
              className="w-16 h-16 rounded-2xl glass flex items-center justify-center text-primary group"
            >
              <Mail className="h-6 w-6 group-hover:rotate-12 transition-transform" />
            </motion.button>
          </motion.div>

          <motion.div
            variants={staggerItem}
            className="flex items-center justify-center gap-8"
          >
            {[
              { icon: Github, href: profile.social.github, label: "Github" },
              { icon: Linkedin, href: profile.social.linkedin, label: "LinkedIn" },
            ].map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, color: "hsl(var(--primary))" }}
                className="flex items-center gap-2 text-muted-foreground transition-colors font-semibold"
              >
                <social.icon className="h-6 w-6" />
                <span className="hidden sm:inline">{social.label}</span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/50"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary/50 to-transparent" />
      </motion.div>
    </section>
  );
};
