const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('./models/Project');

dotenv.config();

const connectDB = require('./config/db');

const projects = [
  {
    title: "Zenify - Wellness & Mindfulness Suite",
    description: "A serene wellness application offering ambient soundscapes, guided meditations, and personalized habit tracking. Designed for mental clarity and peace.",
    image: "/projects/zenify.png",
    tech: ["React Native", "Framer Motion", "Supabase", "React Context"],
    link: "https://zenify-wellness.vercel.app",
    github: "https://github.com/naveenvasamsetti/zenify",
    tags: ["React Native", "Framer Motion", "Supabase", "React Context"],
    highlights: [
      "Crafted a high-fidelity aesthetic with smooth micro-interactions",
      "Implemented an offline-first audio synchronization system",
      "Built a personalized wellness algorithm for habit suggestions",
    ]
  },
  {
    title: "Nexus AI - SaaS Generation Platform",
    description: "Advanced AI-powered platform for content creation, image manipulation, and data analysis using GPT-4 and Stable Diffusion.",
    image: "/projects/nexus-ai.png",
    tech: ["Next.js", "TypeScript", "OpenAI", "Tailwind CSS", "Prisma"],
    link: "https://nexus-ai-demo.vercel.app",
    github: "https://github.com/naveenvasamsetti/nexus-ai",
    tags: ["Next.js", "TypeScript", "OpenAI", "Tailwind CSS", "Prisma"],
    highlights: [
      "Architected a scalable microservices backend for AI processing",
      "Implemented real-time content generation with streaming responses",
      "Integrated multi-model AI orchestration for text and image tasks",
    ]
  },
  {
    title: "CryptoPulse - Real-time Finance Dashboard",
    description: "A professional cryptocurrency tracking dashboard with live market data, advanced charting, and portfolio management.",
    image: "/projects/cryptopulse.png",
    tech: ["React", "D3.js", "WebSockets", "Firebase", "Node.js"],
    link: "https://cryptopulse-finance.vercel.app",
    github: "https://github.com/naveenvasamsetti/cryptopulse",
    tags: ["React", "D3.js", "WebSockets", "Firebase", "Node.js"],
    highlights: [
      "Built a high-performance websocket integration for sub-second price updates",
      "Developed custom interactive financial charts using D3.js",
      "Implemented secure portfolio tracking with multiple wallet integrations",
    ]
  },
  {
    title: "EstatePro - Luxury Real Estate Marketplace",
    description: "A premium property listing platform featuring virtual tours, interactive maps, and a sophisticated lead management system.",
    image: "/projects/estatepro.png",
    tech: ["React", "Google Maps API", "Cloudinary", "Express", "MongoDB"],
    link: "https://estatepro-luxury.vercel.app",
    github: "https://github.com/naveenvasamsetti/estatepro",
    tags: ["React", "Google Maps API", "Cloudinary", "Express", "MongoDB"],
    highlights: [
      "Integrated Google Maps for intuitive location-based property searching",
      "Implemented a custom 3D virtual tour viewer for luxury listings",
      "Built a robust appointment scheduling system with automated notifications",
    ]
  },
  {
    title: "LearnFlow - Interactive LMS Platform",
    description: "A comprehensive learning management system with course creative tools, video streaming, and detailed student analytics.",
    image: "/projects/learnflow.png",
    tech: ["React", "Mux Video", "Redux Toolkit", "PostgreSQL", "Socket.io"],
    link: "https://learnflow-edu.vercel.app",
    github: "https://github.com/naveenvasamsetti/learnflow",
    tags: ["React", "Mux Video", "Redux Toolkit", "PostgreSQL", "Socket.io"],
    highlights: [
      "Optimized video delivery with adaptive bitrate streaming using Mux",
      "Developed an interactive quiz engine with real-time feedback",
      "Built a comprehensive analytics dashboard for course instructors",
    ]
  }
];

const Admin = require('./models/Admin');

const seedData = async () => {
  try {
    await connectDB();

    await Project.deleteMany();
    console.log('Projects cleared');

    await Project.insertMany(projects);
    console.log('Projects imported');

    // Seed Admin
    await Admin.deleteMany();
    await Admin.create({
      username: 'admin',
      password: 'password123'
    });
    console.log('Admin user created (admin / password123)');

    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedData();
