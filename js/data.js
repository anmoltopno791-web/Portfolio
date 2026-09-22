/* =========================================================
   Site content
   Kept separate from rendering logic so it can be swapped
   out (or later fetched from a CMS/API) without touching
   any component code.
   ========================================================= */

const SKILL_GROUPS = [
  {
    name: "Languages",
    skills: [
      { label: "Java", level: 5 },
      { label: "Python", level: 4 },
      { label: "JavaScript (ES6+)", level: 4 },
      { label: "HTML5 / CSS3", level: 4 },
      { label: "SQL", level: 4 },
    ],
  },
  {
    name: "Frameworks",
    skills: [
      { label: "Spring MVC", level: 4 },
      { label: "Spring Boot", level: 4 },
      { label: "Hibernate", level: 4 },
      { label: "Flask", level: 4 },
      { label: "Express.js", level: 4 },
    ],
  },
  {
    name: "MERN Stack",
    skills: [
      { label: "MongoDB", level: 4 },
      { label: "Express.js", level: 4 },
      { label: "React.js", level: 4 },
      { label: "Node.js", level: 4 },
    ],
  },
  {
    name: "Databases & Concepts",
    skills: [
      { label: "MySQL", level: 4 },
      { label: "MongoDB", level: 4 },
      { label: "OOP / MVC", level: 5 },
      { label: "REST API", level: 4 },
      { label: "JWT Auth", level: 4 },
    ],
  },
  {
    name: "Tools",
    skills: [
      { label: "Git / GitHub", level: 4 },
      { label: "VS Code", level: 5 },
      { label: "IntelliJ IDEA", level: 4 },
      { label: "Postman", level: 4 },
      { label: "Eclipse", level: 3 },
    ],
  },
  {
    name: "Learning",
    skills: [
      { label: "React.js (Basics)", level: 3 },
      { label: "Docker Basics", level: 2 },
      { label: "JUnit", level: 2 },
      { label: "DSA", level: 4 },
    ],
  },
];

const PROJECTS = [
  {
    filename: "banking-application",
    title: "Banking Application",
    description:
      "A browser-based banking application with account creation, deposits, withdrawals, transaction history, and client-side validation to prevent overdrafts and duplicate accounts.",
    tags: ["javascript", "html", "css", "dom"],
    demoUrl: "#",
    codeUrl: "#",
  },
  {
    filename: "book-catalog-api",
    title: "Book Catalog API",
    description:
      "A Flask REST API for library book management with CRUD operations, partial matching search, dynamic filtering, and pagination for efficient large-data retrieval.",
    tags: ["python", "flask", "sqlalchemy", "restapi"],
    demoUrl: "#",
    codeUrl: "#",
  },
  {
    filename: "inotebook",
    title: "iNotebook",
    description:
      "A full-stack MERN note-taking app with user authentication, protected routes, MongoDB storage, and complete create-read-update-delete note functionality.",
    tags: ["react", "express", "mongodb", "mern"],
    demoUrl: "#",
    codeUrl: "#",
  },
];

const EXPERIENCE = [
  {
    role: "Full Stack Engineer",
    org: "She Can Foundation",
    date: "May 2026 – Present · 4 mos",
    points: [
      "Contributing as a full stack engineer for an organization focused on empowering women and enabling career growth through technology.",
      "Working across the stack using HTML, JavaScript, and related web technologies to build and maintain features supporting the mission of the foundation.",
    ],
  },
  {
    role: "Back End Developer",
    org: "QSkill",
    date: "Apr 2026 – May 2026 · 2 mos",
    points: [
      "Worked as a junior backend software engineer in a real-world backend environment.",
      "Contributed to backend development tasks by applying object-oriented and API design principles in a professional team setting.",
    ],
  },
];

const EDUCATION = [
  {
    role: "Bachelor of Arts (BA) - Geography",
    org: "Gossner College, Ranchi",
    date: "Completed",
    points: [
      "Completed a non-IT degree, bringing strong analytical thinking and spatial data reasoning skills relevant to software development and data-driven problem solving.",
      "Successfully transitioned into technology through self-directed learning and hands-on project building.",
    ],
  },
  {
    role: "Self-Learning & Certifications",
    org: "Udemy, freeCodeCamp, HackerRank, LeetCode",
    date: "Ongoing",
    points: [
      "Completed coursework in Core Java, Spring Boot, Spring MVC, Hibernate ORM, and Python/Flask.",
      "Consistently practicing Data Structures & Algorithms and solving coding challenges to sharpen logic and efficiency.",
    ],
  },
];

const TERMINAL_LINES = [
  { prompt: "$ whoami", output: "anmol-topno" },
  { prompt: "$ role", output: "junior software developer" },
  { prompt: "$ stack", output: "java · python · javascript · mysql" },
  { prompt: "$ status", output: "open to new opportunities" },
];
