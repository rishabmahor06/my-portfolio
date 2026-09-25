// All portfolio copy lives here — swap this file's content with your own.

export const profile = {
  name: "Rishab Kumar",
  firstName: "Rishab",
  role: "Full Stack Developer",
  rolePrefix: "Full Stack",
  rotatingRoles: [
    "Developer",
    "Frontend Developer",
    "AI Developer",
    "SaaS Products",
    "Agentic AI",
  ],
  badge: "⚡ RSD Expositions (InOptics) — Open to Full Stack roles",
  intro:
    "Full Stack Developer with 2+ years of hands-on experience building scalable MERN and PHP applications with real-time features, AI integration, and secure payment systems. Skilled in creating responsive UIs, optimizing performance, and delivering clean, maintainable code.",
  phone: "+91 7534851282",
  email: "connect.rishabmahor@gmail.com",
  base: "Delhi",
  address: "Delhi, India",
  resumeUrl: "#",
  linkedin: "https://linkedin.com",
  github: "https://github.com",
  footerTitle: "Rishab Kumar — Portfolio",
  copyright: "© 2026 RISHAB KUMAR. ALL RIGHTS RESERVED.",
};

export const navLinks = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Education", id: "education" },
  { label: "Projects", id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Contact", id: "contact" },
];

export const heroStats = [
  { label: "01 / Experience", value: "2+ Years Active" },
  { label: "02 / Built", value: "3+ Live Projects" },
  { label: "03 / Focus", value: "MERN & AI Apps" },
  { label: "04 / Location", value: "Delhi NCR" },
];

export const heroSocials = [
  { label: "Projects", href: "#projects", icon: "social1" },
  { label: "GitHub", href: profile.github, icon: "mail" },
  { label: "LinkedIn", href: profile.linkedin, icon: "social3" },
  { label: "Email", href: `mailto:${profile.email}`, icon: "social4" },
] as const;

export const aboutFacts = [
  { label: "Experience", value: "2+ Years", bold: true },
  { label: "Phone", value: profile.phone },
  { label: "Email", value: profile.email },
  { label: "Base", value: profile.base },
];

export const aboutParagraphs = [
  "I’m Rishab Kumar, a Full Stack Developer with 2+ years of hands-on experience building scalable MERN and PHP applications with real-time features, AI integration, and secure payment systems.",
  "Currently I’m a Full Stack Software Developer at RSD Expositions (InOptics), where I built a QR-based badge generation and scanning system for fast, secure exhibitor verification, handled 50–60% of the frontend workload independently, and automated processes like badge submission, contractor onboarding, and notifications.",
  "I work across **React.js, Next.js, Node.js, Express, MongoDB and MySQL**, and I’m comfortable integrating tools like Socket.io, Google Maps API, OpenAI, Gemini AI, Cloudinary and Razorpay into production-ready products.",
  "Before that, as a Frontend Developer at Eduspray India, I shipped pixel-perfect, cross-browser interfaces and improved performance by 40% through code-splitting, lazy loading, and optimized asset delivery. I care about responsive UIs, clean code, and performance.",
];

export const skillGroups = [
  {
    title: "Frontend",
    icon: "frontend",
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript (ES6+)",
      "React.js",
      "Next.js",
      "Zustand",
      "Tailwind CSS",
      "Responsive Design",
      "WordPress",
      "Shopify",
    ],
  },
  {
    title: "Backend",
    icon: "backend",
    skills: [
      "Node.js",
      "Express.js",
      "RESTful APIs",
      "Socket.io",
      "Authentication & Authorization",
    ],
  },
  {
    title: "Languages",
    icon: "growth",
    skills: ["JavaScript", "TypeScript (familiar)", "PHP (core)"],
  },
  {
    title: "Database",
    icon: "backend",
    skills: ["MongoDB", "MySQL"],
  },
  {
    title: "Integrations",
    icon: "ai",
    skills: [
      "Cloudinary",
      "Imagekit.io",
      "Google Maps API",
      "OpenAI API",
      "Gemini AI",
      "Razorpay",
    ],
  },
  {
    title: "Tools",
    icon: "growth",
    skills: ["Git", "GitHub", "Postman", "VS Code", "Vercel", "Render"],
  },
] as const;

export const projects = [
  {
    title: "Speed – Real-Time Cab Booking Platform",
    badge: "MERN Stack",
    tag: "01 / Feb – Apr 2025",
    image: null as string | null,
    desc: "Real-time ride-hailing platform with GPS tracking, live updates and dynamic fare calculation. Socket.io powers instant ride updates for 100+ users, Google Maps handles route optimization, and JWT + bcrypt + refresh tokens secure role-based auth.",
    stack: ["MERN Stack", "Socket.io", "Google Maps API", "JWT Auth"],
    live: "#",
    source: "#",
  },
  {
    title: "AI Chat: Media Generation Platform",
    badge: "AI Product",
    tag: "02 / Jul – Aug 2025",
    image: null as string | null,
    desc: "AI-powered chatbot with multimodal chat, image generation and voice interaction. OpenAI GPT-4 and Gemini run with fallback and rate limiting for 99.5% uptime, with JWT auth, chat-history dashboard, and a paginated media gallery on Cloudinary.",
    stack: ["React.js", "Node.js", "OpenAI API", "Google Gemini", "Cloudinary"],
    live: "#",
    source: "#",
  },
  {
    title: "Image Enhancer – High Quality Image Enhancer",
    badge: "Gemini AI",
    tag: "03 / Sep 2025",
    image: null as string | null,
    desc: "MERN platform powered by Gemini AI and Cloudinary, with login/signup and role-based access (user/admin dashboard), Razorpay payments, Context API/Redux state management, and a responsive Tailwind CSS interface.",
    stack: ["React.js", "Node.js", "Gemini AI", "Cloudinary"],
    live: "#",
    source: "#",
  },
];

export const experience = [
  {
    period: "Dec 2025 – Present | Lajpat Nagar, Delhi",
    role: "Full Stack Software Developer",
    company: "RSD Expositions (InOptics)",
    bullets: [
      "Implemented a QR-based badge generation and scanning system, reducing check-in time by 80% and enabling fast, secure exhibitor verification.",
      "Handled 50–60% of the frontend workload independently, ensuring timely delivery.",
      "Optimized payment flows and supported social campaign enhancements.",
      "Improved exhibitor–admin coordination via automated email workflows.",
      "Implemented robust form handling: validation, uploads, error handling, rate limiting.",
      "Enhanced performance and responsiveness across devices.",
      "Automated key processes like badge submission, contractor onboarding, and notifications.",
    ],
    current: true,
  },
  {
    period: "Feb 2024 – Oct 2024 | Karkardooma, Delhi",
    role: "Frontend Developer",
    company: "Eduspray India Pvt. Ltd",
    bullets: [
      "Engineered responsive, pixel-perfect web applications with cross-browser compatibility across Chrome, Firefox, Safari, and Edge.",
      "Collaborated with UI/UX designers to implement pixel-perfect interfaces.",
      "Integrated RESTful APIs with robust error handling and caching, reducing API calls by 35%.",
      "Improved performance by 40% through code-splitting, lazy loading, and optimized asset delivery.",
      "Maintained detailed documentation and testing protocols, reducing onboarding time by 50%.",
    ],
    current: false,
  },
];

export const education = [
  {
    period: "2021 - 2024 | Completed",
    title: "Bachelor of Computer Application",
    school: "Asian International University",
    desc: "",
  },
  {
    period: "2020 - 2021 | Completed",
    title: "Higher Secondary Education",
    school: "K.S.G Inter College, Bareilly, Uttar Pradesh",
    desc: "Math Science",
  },
];

export const footerLinks = [
  { label: "LinkedIn", href: profile.linkedin },
  { label: "GitHub", href: profile.github },
  { label: "Email", href: `mailto:${profile.email}` },
  { label: "Resume", href: profile.resumeUrl },
];
