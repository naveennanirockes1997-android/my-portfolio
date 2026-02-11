const Project = require("./models/Project");
const Skill = require("./models/Skill");
const Experience = require("./models/Experience");
const Certification = require("./models/Certification");
const Admin = require("./models/Admin");

require('dotenv').config();
const connectDB = require("./config/db");

const projects = [
  {
    title: "Zenify - Wellness & Mindfulness Suite",
    description:
      "A serene wellness application offering ambient soundscapes, guided meditations, and personalized habit tracking. Designed for mental clarity and peace.",
    image: "/projects/zenify.png",
    tech: ["React Native", "Framer Motion", "Supabase", "React Context"],
    link: "https://zenify-wellness.vercel.app",
    github: "https://github.com/naveenvasamsetti/zenify",
    tags: ["React Native", "Framer Motion", "Supabase", "React Context"],
    highlights: [
      "Crafted a high-fidelity aesthetic with smooth micro-interactions",
      "Implemented an offline-first audio synchronization system",
      "Built a personalized wellness algorithm for habit suggestions",
    ],
  },
  {
    title: "Nexus AI - SaaS Generation Platform",
    description:
      "Advanced AI-powered platform for content creation, image manipulation, and data analysis using GPT-4 and Stable Diffusion.",
    image: "/projects/nexus-ai.png",
    tech: ["Next.js", "TypeScript", "OpenAI", "Tailwind CSS", "Prisma"],
    link: "https://nexus-ai-demo.vercel.app",
    github: "https://github.com/naveenvasamsetti/nexus-ai",
    tags: ["Next.js", "TypeScript", "OpenAI", "Tailwind CSS", "Prisma"],
    highlights: [
      "Architected a scalable microservices backend for AI processing",
      "Implemented real-time content generation with streaming responses",
      "Integrated multi-model AI orchestration for text and image tasks",
    ],
  },
  {
    title: "CryptoPulse - Real-time Finance Dashboard",
    description:
      "A professional cryptocurrency tracking dashboard with live market data, advanced charting, and portfolio management.",
    image: "/projects/cryptopulse.png",
    tech: ["React", "D3.js", "WebSockets", "Firebase", "Node.js"],
    link: "https://cryptopulse-finance.vercel.app",
    github: "https://github.com/naveenvasamsetti/cryptopulse",
    tags: ["React", "D3.js", "WebSockets", "Firebase", "Node.js"],
    highlights: [
      "Built a high-performance websocket integration for sub-second price updates",
      "Developed custom interactive financial charts using D3.js",
      "Implemented secure portfolio tracking with multiple wallet integrations",
    ],
  },
  {
    title: "EstatePro - Luxury Real Estate Marketplace",
    description:
      "A premium property listing platform featuring virtual tours, interactive maps, and a sophisticated lead management system.",
    image: "/projects/estatepro.png",
    tech: ["React", "Google Maps API", "Cloudinary", "Express", "MongoDB"],
    link: "https://estatepro-luxury.vercel.app",
    github: "https://github.com/naveenvasamsetti/estatepro",
    tags: ["React", "Google Maps API", "Cloudinary", "Express", "MongoDB"],
    highlights: [
      "Integrated Google Maps for intuitive location-based property searching",
      "Implemented a custom 3D virtual tour viewer for luxury listings",
      "Built a robust appointment scheduling system with automated notifications",
    ],
  },
  {
    title: "LearnFlow - Interactive LMS Platform",
    description:
      "A comprehensive learning management system with course creative tools, video streaming, and detailed student analytics.",
    image: "/projects/learnflow.png",
    tech: ["React", "Mux Video", "Redux Toolkit", "PostgreSQL", "Socket.io"],
    link: "https://learnflow-edu.vercel.app",
    github: "https://github.com/naveenvasamsetti/learnflow",
    tags: ["React", "Mux Video", "Redux Toolkit", "PostgreSQL", "Socket.io"],
    highlights: [
      "Optimized video delivery with adaptive bitrate streaming using Mux",
      "Developed an interactive quiz engine with real-time feedback",
      "Built a comprehensive analytics dashboard for course instructors",
    ],
  },
  {
    title: "ShopHub - E-commerce Platform",
    description:
      "Full-featured e-commerce platform with cart, checkout, and payment integration",
    image: "/projects/nexus-ai.png",
    tech: ["React", "Node.js", "MongoDB", "Stripe", "Redux"],
    link: "https://shophub-demo.vercel.app",
    github: "https://github.com/naveenvasamsetti/shophub",
    tags: ["React", "Node.js", "MongoDB", "Stripe", "Redux", "Frontend"],
    highlights: [
      "Built complete shopping cart with real-time inventory updates",
      "Integrated Stripe payment processing with webhook handling",
      "Implemented admin dashboard for product and order management",
    ],
  },
  {
    title: "SocialConnect - Social Media Dashboard",
    description:
      "Analytics dashboard for managing multiple social media accounts with engagement metrics",
    image: "/projects/cryptopulse.png",
    tech: ["React", "TypeScript", "Chart.js", "Tailwind CSS"],
    link: "https://linktr.ee/naveenvasamsetti",
    github: "https://github.com/naveenvasamsetti/socialconnect",
    tags: ["React", "TypeScript", "Chart.js", "Tailwind CSS", "Frontend"],
    highlights: [
      "Real-time data visualization with interactive charts",
      "OAuth integration with Twitter, Facebook, Instagram APIs",
      "Responsive design supporting mobile and tablet devices",
    ],
  },
  {
    title: "TaskFlow - Project Management",
    description:
      "Collaborative task management tool with drag-and-drop kanban boards",
    image: "/projects/estatepro.png",
    tech: ["React", "Express", "PostgreSQL", "Socket.io", "Framer Motion"],
    link: "https://taskflow-demo.vercel.app",
    github: "https://github.com/naveenvasamsetti/taskflow",
    tags: ["React", "Express", "PostgreSQL", "Socket.io", "Framer Motion", "Frontend"],
    highlights: [
      "Real-time collaboration using WebSockets",
      "Drag-and-drop interface with smooth animations",
      "Team management with role-based access control",
    ],
  },
];

const skills = [
  ...["React", "JavaScript", "TypeScript", "HTML5", "CSS3", "Tailwind CSS", "Framer Motion", "Redux"].map(s => ({ name: s, category: "Frontend" })),
  ...["Node.js", "Express.js", "MongoDB", "RESTful APIs", "GraphQL"].map(s => ({ name: s, category: "Backend" })),
  ...["Git", "Webpack", "Vite", "selenium"].map(s => ({ name: s, category: "Tools" })),
  ...["Responsive Design", "Accessibility", "Performance Optimization", "Agile/Scrum"].map(s => ({ name: s, category: "Other" }))
];

const experiences = [
  {
    company: "Etv win",
    position: "Frontend Developer",
    duration: "march 2023 - april 2024",
    description: "Developed and maintained high-performance OTT web application features for ETV Win.",
    highlights: [
      "Built reusable and scalable React components",
      "Integrated web UI with backend APIs",
      "Optimized video player UI",
    ]
  },
  {
    company: "freelance",
    position: "MERN Stack Web Developer",
    duration: "Oct 2024 - present",
    description: "Building RESTful APIs and responsive web platforms for various clients.",
    highlights: [
      "Built 10+ RESTful APIs using Node.js and Express",
      "Developed responsive e-commerce platform",
      "Integrated third-party payment gateways",
    ]
  }
];

const certifications = [
  { title: "JavaScript Algorithms and Data Structures", issuer: "Free Code Camp", date: "2023" },
  { title: "Frontend Developer Professional Certificate", issuer: "udemy", date: "2022" },
  { title: "Back End Development and APIs Node.js", issuer: "Free Code Camp", date: "2021" },
  { title: "MongoDB Certified Developer", issuer: "MongoDB University", date: "2021" }
];

const seedData = async () => {
  try {
    await connectDB();

    await Project.deleteMany();
    await Project.insertMany(projects);
    console.log("Projects seeded");

    await Skill.deleteMany();
    await Skill.insertMany(skills);
    console.log("Skills seeded");

    await Experience.deleteMany();
    await Experience.insertMany(experiences);
    console.log("Experiences seeded");

    await Certification.deleteMany();
    await Certification.insertMany(certifications);
    console.log("Certifications seeded");

    await Admin.deleteMany();
    await Admin.create({
      username: "admin",
      password: "password123",
    });
    console.log("Admin user created (admin / password123)");

    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedData();
