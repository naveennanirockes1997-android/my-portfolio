import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { profile } from "@/data/profile";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-6">
            <a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href={profile.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Mail className="h-6 w-6" />
            </a>
          </div>

          <div className="text-center">
            <p className="text-muted-foreground flex items-center gap-2">
              Built with <Heart className="h-4 w-4 text-red-500" /> by {profile.name}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              © {currentYear} LoveBul. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
