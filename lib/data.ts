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
  siteUrl: "https://rishabmahor.vercel.app",
  linkedin: "https://www.linkedin.com/in/rishab-kumar-b45890316",
  github: "https://github.com/rishabmahor06",
  instagram: "https://www.instagram.com/rishab_mahor06",
  x: "https://x.com/home",
  // opens a WhatsApp chat directly (wa.me needs the number with country code, digits only)
  whatsapp: `https://wa.me/917534851282?text=${encodeURIComponent(
    "Hi Rishab, I saw your portfolio and would like to connect.",
  )}`,
  footerTitle: "Rishab Kumar | Portfolio",
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
  { label: "01 / Experience", value: "2+ Years" },
  { label: "02 / Built", value: "3+ Live Projects" },
];

export const socials = [
  { label: "LinkedIn", href: profile.linkedin, icon: "linkedin" },
  { label: "GitHub", href: profile.github, icon: "github" },
  { label: "Instagram", href: profile.instagram, icon: "instagram" },
  { label: "X", href: profile.x, icon: "x" },
  { label: "WhatsApp", href: profile.whatsapp, icon: "whatsapp" },
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

export const projects = [
  {
    title: "Speed: Cab Booking Platform",
    badge: "MERN Stack",
    image: "/projects/speed.png" as string | null,
    stack: ["Node.js", "React.js","Express.js", "MongoDB", "Tailwind CSS","Socket.io", "Google Maps API", "JWT Auth" ],
    live: "https://uber-frontend-swart.vercel.app",
    source: "https://github.com/rishabmahor06/uber-frontend",
  },
  {
    title: "AI Chat: Platform",
    badge: "AI Product",
    image: "/projects/ai-chat.png" as string | null,
    stack: ["React.js", "Node.js", "OpenAI API", "Google Gemini", "Cloudinary"],
    live: "https://genz-ai-mu.vercel.app",
    source: "https://github.com/rishabmahor06/genz-ai",
  },
  {
    title: "Image Enhancer: High Quality",
    badge: "Gemini AI",
    image: "/projects/image-enhancer.png" as string | null,
    stack: ["React.js", "Node.js", "Gemini AI", "Cloudinary"],
    live: "https://imageenhancer-beta.vercel.app",
    source: "https://github.com/rishabmahor06/imageenhancer",
  },
  {
    title: "Inoptics.in: Event Management",
    badge: "Saas Product",
    image: "/projects/inoptics.in.png" as string | null,
    stack: ["React.js", "Node.js", "Php","Laravel", "Zustand", "Cloudflare", "Php Mailer", "Bluehost"],
    live: "https://inoptics.in",
    source: "https://inoptics.in",
  },
  {
    title: "optikamumbai.in: Event Management",
    badge: "Saas Product",
    image: "/projects/optikamumbai.in.png" as string | null,
    stack: ["React.js", "Node.js", "Php","Laravel", "Zustand", "Google Recaptcha", "Php Mailer", "Bluehost"],
    live: "https://optikamumbai.in",
    source: "https://optikamumbai.in",
  },
  {
    title: "The Indian Optician Magazine",
    badge: "Magazine Website",
    image: "/projects/the-indian-optician-magazine.png" as string | null,
    stack: ["Wordpress",],
    live: "https://tionet.in",
    source: "https://tionet.in",
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
  ...socials.map(({ label, href }) => ({ label, href })),
  { label: "Email", href: `mailto:${profile.email}` },
  { label: "Resume", href: profile.resumeUrl },
];
