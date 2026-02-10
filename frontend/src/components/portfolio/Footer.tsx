import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { profile } from "@/data/profile";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-white/5 py-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center gap-12">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-primary flex items-center justify-center text-white font-black shadow-glow">
              {profile.name.charAt(0)}
            </div>
            <span className="text-2xl font-black tracking-tighter">
              {profile.name.split(' ')[0]}<span className="text-primary">.dev</span>
            </span>
          </div>

          <div className="flex items-center gap-8">
            {[
              { icon: Github, href: profile.social.github, label: "GitHub" },
              { icon: Linkedin, href: profile.social.linkedin, label: "LinkedIn" },
              { icon: Mail, href: `mailto:${profile.email}`, label: "Email" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-muted-foreground hover:text-primary hover:scale-110 transition-all duration-500 border-white/10 group"
                aria-label={social.label}
              >
                <social.icon className="h-6 w-6 group-hover:rotate-12 transition-transform" />
              </a>
            ))}
          </div>

          <div className="text-center space-y-4">
            <p className="text-muted-foreground font-medium flex items-center justify-center gap-2">
              Designed & Engineered with <Heart className="h-4 w-4 text-primary fill-primary animate-pulse" /> by {profile.name}
            </p>
            <div className="flex items-center justify-center gap-6 text-sm font-black uppercase tracking-widest text-muted-foreground/40">
              <span>© {currentYear}</span>
              <div className="w-1 h-1 rounded-full bg-white/20" />
              <span>Available for Hire</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
