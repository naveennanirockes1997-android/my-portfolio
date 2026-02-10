export const profile = {
  name: "Naveen Vasamsetti",
  title: "Frontend web developer & MERN Stack Developer",
  email: "naveenvasamsetti86@gmail.com",

  phone: "+91 7075158164",
  location: "kakinada, andhra pradesh",
  summary: "Passionate frontend developer with 2+ years of experience building responsive, user-centric web applications using React, Node.js, and modern JavaScript frameworks. Specialized in creating performant, accessible interfaces with clean code architecture.",
  resume: "/resumeAsDocument.pdf",
  
  social: {
    github: "https://github.com/naveenvasamsetti",
    linkedin: "https://linkedin.com/in/naveenvasamsetti",
    twitter: "https://twitter.com/naveenvasamsetti",
  },

  skills: {
    frontend: ["React", "JavaScript", "TypeScript", "HTML5", "CSS3", "Tailwind CSS", "Framer Motion", "Redux"],
    backend: ["Node.js", "Express.js", "MongoDB", "RESTful APIs", "GraphQL"],
    tools: ["Git", "Webpack", "Vite", "selenium"],
    other: ["Responsive Design", "Accessibility", "Performance Optimization", "Agile/Scrum"],
  },

  experience: [
    {
      id: 1,
      company: "Etv win",
      position: "Frontend Developer",
      duration: "march 2023 - april 2024",
      location: "ramoji film city, Hyderabad",
      responsibilities: [
        "Developed and maintained high-performance OTT web application features for ETV Win, ensuring smooth video playback and responsive UI across devices.",
        "Built reusable and scalable React components for homepage, categories, search, episodes, and player pages",
        "Integrated the web UI with backend APIs for authentication, subscriptions, shows, movies, and watch-history",
        "Optimized video player UI (seek bar, subtitles, playback speed, continue-watching)",
        "Converted UI/UX designs into production-ready, responsive layouts using Tailwind CSS and modern JavaScript",
      ],
    },
    {
      id: 2,
      company: "freelance",
      position: "MERN Stack Web Developer",
      duration: "Oct 2024 - present",
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
      name: "Zenify - Wellness & Mindfulness Suite",
      description: "A serene wellness application offering ambient soundscapes, guided meditations, and personalized habit tracking. Designed for mental clarity and peace.",
      image: "/projects/zenify.png",
      tech: ["React Native", "Framer Motion", "Supabase", "React Context"],
      highlights: [
        "Crafted a high-fidelity aesthetic with smooth micro-interactions",
        "Implemented an offline-first audio synchronization system",
        "Built a personalized wellness algorithm for habit suggestions",
      ],
      github: "https://github.com/naveenvasamsetti/zenify",
      live: "https://zenify-wellness.vercel.app",
    },
    {
      id: 2,
      name: "Nexus AI - SaaS Generation Platform",
      description: "Advanced AI-powered platform for content creation, image manipulation, and data analysis using GPT-4 and Stable Diffusion.",
      image: "/projects/nexus-ai.png",
      tech: ["Next.js", "TypeScript", "OpenAI", "Tailwind CSS", "Prisma"],
      highlights: [
        "Architected a scalable microservices backend for AI processing",
        "Implemented real-time content generation with streaming responses",
        "Integrated multi-model AI orchestration for text and image tasks",
      ],
      github: "https://github.com/naveenvasamsetti/nexus-ai",
      live: "https://nexus-ai-demo.vercel.app",
    },
    {
      id: 3,
      name: "CryptoPulse - Real-time Finance Dashboard",
      description: "A professional cryptocurrency tracking dashboard with live market data, advanced charting, and portfolio management.",
      image: "/projects/cryptopulse.png",
      tech: ["React", "D3.js", "WebSockets", "Firebase", "Node.js"],
      highlights: [
        "Built a high-performance websocket integration for sub-second price updates",
        "Developed custom interactive financial charts using D3.js",
        "Implemented secure portfolio tracking with multiple wallet integrations",
      ],
      github: "https://github.com/naveenvasamsetti/cryptopulse",
      live: "https://cryptopulse-finance.vercel.app",
    },
    {
      id: 4,
      name: "EstatePro - Luxury Real Estate Marketplace",
      description: "A premium property listing platform featuring virtual tours, interactive maps, and a sophisticated lead management system.",
      image: "/projects/estatepro.png",
      tech: ["React", "Google Maps API", "Cloudinary", "Express", "MongoDB"],
      highlights: [
        "Integrated Google Maps for intuitive location-based property searching",
        "Implemented a custom 3D virtual tour viewer for luxury listings",
        "Built a robust appointment scheduling system with automated notifications",
      ],
      github: "https://github.com/naveenvasamsetti/estatepro",
      live: "https://estatepro-luxury.vercel.app",
    },
    {
      id: 5,
      name: "LearnFlow - Interactive LMS Platform",
      description: "A comprehensive learning management system with course creative tools, video streaming, and detailed student analytics.",
      image: "/projects/learnflow.png",
      tech: ["React", "Mux Video", "Redux Toolkit", "PostgreSQL", "Socket.io"],
      highlights: [
        "Optimized video delivery with adaptive bitrate streaming using Mux",
        "Developed an interactive quiz engine with real-time feedback",
        "Built a comprehensive analytics dashboard for course instructors",
      ],
      github: "https://github.com/naveenvasamsetti/learnflow",
      live: "https://learnflow-edu.vercel.app",
    },
    {
      id: 6,
      name: "ShopHub - E-commerce Platform",
      description: "Full-featured e-commerce platform with cart, checkout, and payment integration",
      image: "/projects/nexus-ai.png", // Reusing image since old assets were broken
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
      id: 7,
      name: "SocialConnect - Social Media Dashboard",
      description: "Analytics dashboard for managing multiple social media accounts with engagement metrics",
      image: "/projects/cryptopulse.png", // Reusing image since old assets were broken
      tech: ["React", "TypeScript", "Chart.js", "Tailwind CSS"],
      highlights: [
        "Real-time data visualization with interactive charts",
        "OAuth integration with Twitter, Facebook, Instagram APIs",
        "Responsive design supporting mobile and tablet devices",
      ],
      github: "https://github.com/naveenvasamsetti/socialconnect",
      live: "https://linktr.ee/naveenvasamsetti",
    },
    {
      id: 8,
      name: "TaskFlow - Project Management",
      description: "Collaborative task management tool with drag-and-drop kanban boards",
      image: "/projects/estatepro.png", // Reusing image since old assets were broken
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
      name: "JavaScript Algorithms and Data Structures",
      issuer: "Free Code Camp",
      date: "2023",
      credentialUrl: "#",
    },
    {
      id: 2,
      name: "Frontend Developer Professional Certificate",
      issuer: "udemy",
      date: "2022",
      credentialUrl: "#",
    },
     {
      id: 3,
      name: "Back End Development and APIs Node.js",
      issuer: "Free Code Camp",
      date: "2021",
      credentialUrl: "#",
    },
    {
      id:4 ,
      name: "MongoDB Certified Developer",
      issuer: "MongoDB University",
      date: "2021",
      credentialUrl: "#",
    },
  ],
};
