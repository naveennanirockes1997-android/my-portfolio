import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useDarkMode } from "@/hooks/useDarkMode";
import { profile } from "@/data/profile";

export const Header = () => {
  const { isDark, toggle } = useDarkMode();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollToSection = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: scrolled ? 24 : 0, opacity: 1 }}
      className={`fixed left-0 right-0 z-50 transition-all duration-700 flex justify-center`}
    >
      <nav className={`
        ${scrolled 
          ? "w-[95%] md:w-[60%] max-w-4xl glass shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-[2.5rem] border-white/5" 
          : "w-full bg-transparent border-transparent"} 
        transition-all duration-700 px-8 py-5
      `}>
        <div className="flex items-center justify-between">
          <motion.a
            href="#"
            className="flex items-center gap-1 group"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-primary flex items-center justify-center text-white font-black shadow-glow group-hover:rotate-6 transition-all duration-500">
              {profile.name.charAt(0)}
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter leading-none">
                {profile.name.split(' ')[0]}
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-black mt-1">
                Developer
              </span>
            </div>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                whileHover={{ y: -2 }}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="px-5 py-2 text-xs font-black uppercase tracking-widest text-foreground/60 hover:text-primary transition-all rounded-xl hover:bg-primary/5 active:scale-95"
              >
                {link.name}
              </motion.a>
            ))}
            
            <div className="mx-4 w-[1px] h-4 bg-white/10" />
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggle}
              className="w-12 h-12 rounded-2xl hover:bg-primary/10 hover:text-primary transition-all active:scale-90"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggle}
              className="w-10 h-10 rounded-xl"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 rounded-xl relative overflow-hidden group"
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="lg:hidden absolute top-full left-0 right-0 mt-6 p-4 glass rounded-[2.5rem] border-white/5 shadow-2xl space-y-2"
            >
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="flex items-center justify-between p-5 rounded-2xl text-sm font-black uppercase tracking-[0.2em] bg-white/5 hover:bg-primary/10 hover:text-primary transition-all group"
                >
                  {link.name}
                  <motion.span
                    initial={{ x: -10, opacity: 0 }}
                    whileHover={{ x: 0, opacity: 1 }}
                    className="text-primary"
                  >
                    &rarr;
                  </motion.span>
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};


