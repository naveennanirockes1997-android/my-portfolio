export const profile = {
  name: "Naveen Vasamsetti",
  title: "Frontend & MERN Stack Developer",
  email: "naveen.vasamsetti@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  summary: "Passionate frontend developer with 3+ years of experience building responsive, user-centric web applications using React, Node.js, and modern JavaScript frameworks. Specialized in creating performant, accessible interfaces with clean code architecture.",
  
  social: {
    github: "https://github.com/naveenvasamsetti",
    linkedin: "https://linkedin.com/in/naveenvasamsetti",
    twitter: "https://twitter.com/naveenvasamsetti",
  },

  skills: {
    frontend: ["React", "JavaScript", "TypeScript", "HTML5", "CSS3", "Tailwind CSS", "Framer Motion", "Redux"],
    backend: ["Node.js", "Express.js", "MongoDB", "RESTful APIs", "GraphQL"],
    tools: ["Git", "Webpack", "Vite", "Docker", "Jest", "Cypress"],
    other: ["Responsive Design", "Accessibility", "Performance Optimization", "Agile/Scrum"],
  },

  experience: [
    {
      id: 1,
      company: "TechCorp Solutions",
      position: "Senior Frontend Developer",
      duration: "Jan 2022 - Present",
      location: "San Francisco, CA",
      responsibilities: [
        "Led development of customer-facing dashboard serving 50K+ users using React and TypeScript",
        "Improved page load performance by 40% through code-splitting and lazy loading",
        "Mentored 3 junior developers and established frontend coding standards",
        "Implemented comprehensive accessibility improvements achieving WCAG 2.1 AA compliance",
      ],
    },
    {
      id: 2,
      company: "Digital Innovations Inc",
      position: "Full Stack Developer",
      duration: "Jun 2020 - Dec 2021",
      location: "Remote",
      responsibilities: [
        "Built 10+ RESTful APIs using Node.js and Express serving mobile and web clients",
        "Developed responsive e-commerce platform handling 10K+ daily transactions",
        "Integrated third-party payment gateways (Stripe, PayPal) with 99.9% uptime",
        "Collaborated with design team to implement pixel-perfect UI components",
      ],
    },
  ],

  projects: [
    {
      id: 1,
      name: "ShopHub - E-commerce Platform",
      description: "Full-featured e-commerce platform with cart, checkout, and payment integration",
      image: "/src/assets/project-ecommerce.jpg",
      tech: ["React", "Node.js", "MongoDB", "Stripe", "Redux"],
      highlights: [
        "Built complete shopping cart with real-time inventory updates",
        "Integrated Stripe payment processing with webhook handling",
        "Implemented admin dashboard for product and order management",
      ],
      github: "https://github.com/naveenvasamsetti/shophub",
      live: "https://shophub-demo.vercel.app",
    },
    {
      id: 2,
      name: "SocialConnect - Social Media Dashboard",
      description: "Analytics dashboard for managing multiple social media accounts with engagement metrics",
      image: "/src/assets/project-social.jpg",
      tech: ["React", "TypeScript", "Chart.js", "Tailwind CSS"],
      highlights: [
        "Real-time data visualization with interactive charts",
        "OAuth integration with Twitter, Facebook, Instagram APIs",
        "Responsive design supporting mobile and tablet devices",
      ],
      github: "https://github.com/naveenvasamsetti/socialconnect",
      live: "https://socialconnect-demo.vercel.app",
    },
    {
      id: 3,
      name: "TaskFlow - Project Management",
      description: "Collaborative task management tool with drag-and-drop kanban boards",
      image: "/src/assets/project-taskmanager.jpg",
      tech: ["React", "Express", "PostgreSQL", "Socket.io", "Framer Motion"],
      highlights: [
        "Real-time collaboration using WebSockets",
        "Drag-and-drop interface with smooth animations",
        "Team management with role-based access control",
      ],
      github: "https://github.com/naveenvasamsetti/taskflow",
      live: "https://taskflow-demo.vercel.app",
    },
  ],

  certifications: [
    {
      id: 1,
      name: "AWS Certified Developer - Associate",
      issuer: "Amazon Web Services",
      date: "2023",
      credentialUrl: "#",
    },
    {
      id: 2,
      name: "Meta Frontend Developer Professional Certificate",
      issuer: "Meta (Coursera)",
      date: "2022",
      credentialUrl: "#",
    },
    {
      id: 3,
      name: "MongoDB Certified Developer",
      issuer: "MongoDB University",
      date: "2021",
      credentialUrl: "#",
    },
  ],
};
