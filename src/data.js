import HeroImage from "/assets/hero-img.webp";

const Image = {
  HeroImage,
};

export default Image;

import ToolPython from "/assets/tools/python.svg";
import ToolDjango from "/assets/tools/django.svg";
import ToolFastAPI from "/assets/tools/fastapi.svg";
import ToolReact from "/assets/tools/reactjs.png";
import ToolNext from "/assets/tools/nextjs.png";
import ToolJS from "/assets/tools/js.png";
import ToolTS from "/assets/tools/ts.png";
import ToolTailwind from "/assets/tools/tailwind.png";
import ToolBootstrap from "/assets/tools/bootstrap.png";
import ToolHTML from "/assets/tools/html.png";
import ToolZustand from "/assets/tools/zustand.png";
import ToolRedux from "/assets/tools/redux.svg";
import ToolNode from "/assets/tools/nodejs.png";
import ToolPostgres from "/assets/tools/postgresql.svg";
import ToolRedis from "/assets/tools/redis.svg";
import ToolMongo from "/assets/tools/mongodb.svg";
import ToolSupabase from "/assets/tools/supabase.svg";
import ToolFirebase from "/assets/tools/firebase.png";
import ToolMySQL from "/assets/tools/mysql.png";
import ToolDocker from "/assets/tools/docker.svg";
import ToolAWS from "/assets/tools/aws.svg";
import ToolNGINX from "/assets/tools/nginx.svg";
import ToolCelery from "/assets/tools/celery.svg";
import ToolSocketIO from "/assets/tools/socketio.svg";
import ToolGit from "/assets/tools/git.svg";
import ToolGitHub from "/assets/tools/github.png";
import ToolPostman from "/assets/tools/postman.svg";
import ToolVite from "/assets/tools/vite.png";
import ToolVSCode from "/assets/tools/vscode.png";

export const listTools = [
  // Backend & Languages
  {
    id: 1,
    gambar: ToolPython,
    nama: "Python",
    ket: "Core Programming Language",
    category: "Backend",
    dad: "100",
  },
  {
    id: 2,
    gambar: ToolDjango,
    nama: "Django",
    ket: "Full-Stack Web Framework",
    category: "Backend",
    dad: "150",
  },
  {
    id: 3,
    gambar: ToolDjango,
    nama: "Django REST Framework",
    ket: "REST APIs & JWT Auth",
    category: "Backend",
    dad: "200",
  },
  {
    id: 4,
    gambar: ToolFastAPI,
    nama: "FastAPI",
    ket: "High-Performance Async API",
    category: "Backend",
    dad: "250",
  },
  {
    id: 5,
    gambar: ToolNode,
    nama: "Node JS",
    ket: "JavaScript Runtime",
    category: "Backend",
    dad: "300",
  },
  {
    id: 6,
    gambar: ToolCelery,
    nama: "Celery",
    ket: "Distributed Task Processing",
    category: "Backend",
    dad: "350",
  },
  {
    id: 7,
    gambar: ToolSocketIO,
    nama: "Socket.IO",
    ket: "Real-Time WebSockets",
    category: "Backend",
    dad: "400",
  },

  // Frontend
  {
    id: 8,
    gambar: ToolReact,
    nama: "React JS",
    ket: "Frontend UI Library",
    category: "Frontend",
    dad: "450",
  },
  {
    id: 9,
    gambar: ToolNext,
    nama: "Next JS",
    ket: "Fullstack React Framework",
    category: "Frontend",
    dad: "500",
  },
  {
    id: 10,
    gambar: ToolJS,
    nama: "JavaScript",
    ket: "Modern ES6+ Language",
    category: "Frontend",
    dad: "550",
  },
  {
    id: 11,
    gambar: ToolTS,
    nama: "TypeScript",
    ket: "Typed JavaScript",
    category: "Frontend",
    dad: "600",
  },
  {
    id: 12,
    gambar: ToolTailwind,
    nama: "Tailwind CSS",
    ket: "Utility-First CSS",
    category: "Frontend",
    dad: "650",
  },
  {
    id: 13,
    gambar: ToolZustand,
    nama: "Zustand",
    ket: "Lightweight State Management",
    category: "Frontend",
    dad: "700",
  },
  {
    id: 14,
    gambar: ToolRedux,
    nama: "Redux Toolkit",
    ket: "Global State Management",
    category: "Frontend",
    dad: "750",
  },
  {
    id: 15,
    gambar: ToolBootstrap,
    nama: "Bootstrap",
    ket: "Responsive Framework",
    category: "Frontend",
    dad: "800",
  },
  {
    id: 16,
    gambar: ToolHTML,
    nama: "HTML5 & CSS3",
    ket: "Web Standards & Styling",
    category: "Frontend",
    dad: "850",
  },

  // Databases & Storage
  {
    id: 17,
    gambar: ToolPostgres,
    nama: "PostgreSQL",
    ket: "Relational Database & ACID",
    category: "Database",
    dad: "900",
  },
  {
    id: 18,
    gambar: ToolRedis,
    nama: "Redis",
    ket: "In-Memory Caching & Broker",
    category: "Database",
    dad: "950",
  },
  {
    id: 19,
    gambar: ToolMongo,
    nama: "MongoDB",
    ket: "NoSQL Document Store",
    category: "Database",
    dad: "1000",
  },
  {
    id: 20,
    gambar: ToolSupabase,
    nama: "Supabase",
    ket: "Postgres BaaS & Real-Time",
    category: "Database",
    dad: "1050",
  },
  {
    id: 21,
    gambar: ToolFirebase,
    nama: "Firebase",
    ket: "Cloud Auth & Firestore",
    category: "Database",
    dad: "1100",
  },
  {
    id: 22,
    gambar: ToolMySQL,
    nama: "MySQL",
    ket: "Relational Database",
    category: "Database",
    dad: "1150",
  },

  // DevOps & Cloud
  {
    id: 23,
    gambar: ToolDocker,
    nama: "Docker",
    ket: "Containerization & Compose",
    category: "DevOps",
    dad: "1200",
  },
  {
    id: 24,
    gambar: ToolAWS,
    nama: "AWS (EC2 & S3)",
    ket: "Cloud Compute & Storage",
    category: "DevOps",
    dad: "1250",
  },
  {
    id: 25,
    gambar: ToolNGINX,
    nama: "NGINX",
    ket: "Web Server & Reverse Proxy",
    category: "DevOps",
    dad: "1300",
  },

  // Tools & Testing
  {
    id: 26,
    gambar: ToolGit,
    nama: "Git",
    ket: "Version Control System",
    category: "Tools",
    dad: "1350",
  },
  {
    id: 27,
    gambar: ToolGitHub,
    nama: "GitHub",
    ket: "Code Repository & Actions",
    category: "Tools",
    dad: "1400",
  },
  {
    id: 28,
    gambar: ToolPostman,
    nama: "Postman",
    ket: "API Testing & Mocking",
    category: "Tools",
    dad: "1450",
  },
  {
    id: 29,
    gambar: ToolVite,
    nama: "Vite",
    ket: "Next-Gen Build Tool",
    category: "Tools",
    dad: "1500",
  },
  {
    id: 30,
    gambar: ToolVSCode,
    nama: "VS Code",
    ket: "Primary Code Editor",
    category: "Tools",
    dad: "1550",
  },
];

import ProyekIntraview from "/assets/proyek/intraview.jpg";
import ProyekJamilah from "/assets/proyek/jamilah.jpg";
import ProyekStoryWeaver from "/assets/proyek/storyweaver.jpg";

export const listProyek = [
  {
    id: 1,
    image: ProyekIntraview,
    title: "Intraview",
    subtitle: "A comprehensive, full-stack mock interview and skill-assessment platform...",
    fullDescription: "Intraview is a comprehensive, full-stack mock interview and skill-assessment platform built with React and Django. It connects candidates with expert interviewers, features a robust token-locking economy for bookings, and incorporates AI mock interviews powered by Google Gemini and LiveKit/Tavus avatars with real-time feedback.",
    borderColor: "#10B981",
    gradient: "linear-gradient(145deg, #10B981, #000)",
    url: "https://github.com/ijazahmd-dev/intraview",
    githubUrl: "https://github.com/ijazahmd-dev/intraview",
    liveUrl: "https://intraview.ijazdev.xyz/",
    dad: "100",
  },
  {
    id: 2,
    image: ProyekJamilah,
    title: "Jamilah",
    subtitle: "A luxury e-commerce platform for women's modest fashion and prayer wear...",
    fullDescription: "Jamilah is a comprehensive, full-featured e-commerce platform specialized in luxury Islamic prayer dresses and modest wear for women. Built with modern high-standard e-commerce capabilities, it includes complete catalog and variant management, multi-tiered coupon systems, custom wallet integration, secure online checkout, and an executive admin dashboard.",
    borderColor: "#059669",
    gradient: "linear-gradient(145deg, #059669, #000)",
    url: "https://github.com/ijazahmd-dev/Jamilah",
    githubUrl: "https://github.com/ijazahmd-dev/Jamilah",
    liveUrl: "https://jamilah.onrender.com/",
    dad: "200",
  },
  {
    id: 3,
    image: ProyekStoryWeaver,
    title: "StoryWeaver",
    subtitle: "An AI-powered creative story and character generation platform...",
    fullDescription: "StoryWeaver is a full-stack web application leveraging artificial intelligence to craft elegant, intricate tales and dynamic characters. Built with a React 19 frontend and a FastAPI backend, it harnesses Supabase for secure data management and integrates advanced AI models from Google Gemini and Groq to generate rich, immersive narratives based on user-defined personas and plot prompts.",
    borderColor: "#8B5CF6",
    gradient: "linear-gradient(145deg, #8B5CF6, #000)",
    url: "https://github.com/ijazahmd-dev/ai-story-generator",
    githubUrl: "https://github.com/ijazahmd-dev/ai-story-generator",
    liveUrl: "https://ai-story-generator-olive-ten.vercel.app/",
    dad: "300",
  },
];
