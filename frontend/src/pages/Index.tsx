import { lazy, Suspense } from "react";
import { Header } from "@/components/portfolio/Header";
import { Hero } from "@/components/portfolio/Hero";
import { Footer } from "@/components/portfolio/Footer";
import { Loader2 } from "lucide-react";

const About = lazy(() => import("@/components/portfolio/About").then(module => ({ default: module.About })));
const Projects = lazy(() => import("@/components/portfolio/Projects").then(module => ({ default: module.Projects })));
const Experience = lazy(() => import("@/components/portfolio/Experience").then(module => ({ default: module.Experience })));
const Skills = lazy(() => import("@/components/portfolio/Skills").then(module => ({ default: module.Skills })));
const Certifications = lazy(() => import("@/components/portfolio/Certifications").then(module => ({ default: module.Certifications })));
const ContactForm = lazy(() => import("@/components/portfolio/ContactForm").then(module => ({ default: module.ContactForm })));

const SectionLoader = () => (
  <div className="py-20 flex justify-center items-center">
    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <div className="noise-overlay" />
      <Header />
      <main>
        <Hero />
        <Suspense fallback={<SectionLoader />}>
          <About />
          <Projects />
          <Experience />
          <Skills />
          <Certifications />
          <ContactForm />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Index;

