// All of the site's copy lives here. Components only decide how it looks,
// so updating a project, a date or a link never means touching a component.

export const site = {
  /** short form, used in the nav logo */
  name: "Rithwik",
  fullName: "Rithwik Veera Balaji Kumar",
  location: "Saskatoon, Canada",
  url: "https://rithwik.vercel.app",
  description:
    "Rithwik Veera Balaji Kumar builds dependable AI applications and software in Saskatoon, focusing on practical workflows, evaluation, and cloud engineering.",
  links: {
    resume: "/resume.pdf",
    github: "https://github.com/rithrandome",
    linkedin: "https://linkedin.com/in/vrithwik",
    email: "rithuv20@gmail.com",
    /** this site's own repo, linked from the footer */
    source: "https://github.com/rithrandome/portfolio",
  },
};

export const nav = [
  { label: "Work", href: "/#work" },
  { label: "Experience", href: "/#experience" },
  { label: "Skills", href: "/#skills" },
  { label: "Contact", href: "/#contact" },
];

export const hero = {
  /** written without the final full stop: the hero adds it in the accent colour */
  headline: "I build intelligent systems that make your business easier to run",
  intro:
    "Conversational AI and agents that are grounded, consistent, careful with your data, and tested before they reach your customers.",
  now: [
    { label: "Building", value: "network-ai, an outreach assistant for job seekers" },
    { label: "Studying", value: "M.S. in CS (AI), Georgia Tech" },
    { label: "Open to", value: "Full-time roles and freelance projects" },
  ],
};

export type FlowStep = {
  label: string;
  /** highlighted in the accent colour: the parts doing the interesting work */
  accent?: boolean;
  /** connector drawn after this step: "→" passes forward, "⇄" is a check-and-retry loop */
  next?: "→" | "⇄";
};

export type ProjectVisual =
  | { kind: "flow"; rows: FlowStep[][] }
  | {
      kind: "metrics";
      caption: string;
      bars: { label: string; value: number }[];
      footnote: string;
    };

export type Project = {
  slug: string;
  title: string;
  tag: string;
  status?: "in-progress";
  summary: string;
  stack: string[];
  metric?: { value: string; label: string };
  /** the first link is where the whole card goes */
  links: { label: string; href: string; external?: boolean }[];
  visual: ProjectVisual;
};

export const projects: Project[] = [
  {
    slug: "console-companion",
    title: "Console Companion",
    tag: "Built at AWS ProServe",
    summary:
      "The goal was to let users ask questions about AWS Config without writing SQL themselves. I built a Bedrock Agents chatbot with resource-specific knowledge bases, an independent validator for AWS Config query limits, and an error-correction loop that lets the agent retry failed queries.",
    stack: ["Bedrock Agents", "Knowledge Bases", "Lambda", "LangChain", "Streamlit"],
    metric: { value: "~90%", label: "SQL accuracy" },
    links: [{ label: "Case study", href: "/projects/console-companion" }],
    visual: {
      kind: "flow",
      rows: [
        [
          { label: '"Which EC2s are untagged?"', next: "→" },
          { label: "Bedrock Agent", accent: true, next: "→" },
          { label: "KB: EC2" },
        ],
        [
          { label: "SQL", next: "⇄" },
          { label: "Validator", accent: true, next: "→" },
          { label: "AWS Config", next: "→" },
          { label: "answer" },
        ],
      ],
    },
  },
  {
    slug: "langchain-doc-helper",
    title: "LangChain Documentation Helper",
    tag: "RAG · Evaluation",
    summary:
      "I built a documentation assistant that retrieves relevant material from the LangChain docs and uses query rewriting to improve the questions it searches with. Across a 50-question golden set, six RAGAS/LangSmith evaluators reported 94% faithfulness and 89% answer relevance. Request-level tracing also lets me inspect individual runs.",
    stack: ["Python", "Ollama", "Pinecone", "RAGAS", "LangSmith", "Streamlit"],
    metric: { value: "94%", label: "faithfulness" },
    links: [
      {
        label: "GitHub",
        href: "https://github.com/rithrandome/langchain-doc-helper",
        external: true,
      },
    ],
    visual: {
      kind: "metrics",
      caption: "RAGAS + LangSmith · 50-question golden set",
      bars: [
        { label: "faithfulness", value: 94 },
        { label: "answer relevance", value: 89 },
      ],
      footnote: "+ 4 more evaluators · request-level tracing",
    },
  },
  {
    slug: "network-ai",
    title: "network-ai",
    tag: "Agents",
    status: "in-progress",
    summary:
      "I started network-ai because I was tired of explaining my background, goals, and approach to a new chat every time I needed help with outreach. It combines Exa people search with user-selected context to draft messages, then uses code-based validators to reject unsupported details and retry the draft.",
    stack: ["Python", "Exa", "FastAPI", "React (next)"],
    links: [],
    visual: {
      kind: "flow",
      rows: [
        [
          { label: "Exa search", next: "→" },
          { label: "you pick context", next: "→" },
        ],
        [
          { label: "draft", accent: true, next: "⇄" },
          { label: "validators", accent: true, next: "→" },
          { label: "message" },
        ],
      ],
    },
  },
];

export type Job = {
  dates: string;
  role: string;
  company: string;
  internship?: boolean;
  summary?: string;
  points?: string[];
};

export const experience: Job[] = [
  {
    dates: "Aug 2023 — Oct 2024",
    role: "Application Developer",
    company: "AWS Professional Services",
    points: [
      "Customer-facing delivery in Agile sprints",
      "React and Node frontends on serverless AWS backends",
      "Designed and built Console Companion, a GenAI agent on Bedrock",
    ],
  },
  {
    dates: "Jun 2022 — Jul 2022",
    role: "Data Engineering Intern",
    company: "Beam Suntory",
    internship: true,
    summary:
      "Built a product-mapping pipeline in Python and Pandas that matched messy catalog entries using fuzzy matching and TF-IDF similarity, reaching 85%+ classification accuracy.",
  },
  {
    dates: "Mar 2020 — Jul 2020",
    role: "Summer Intern",
    company: "Sri Mookambika Infosolutions",
    internship: true,
    summary:
      "Built a Django student portal with registration and an admin dashboard, with a React Bootstrap frontend.",
  },
];

export const skills = [
  { group: "Languages", items: ["Python", "TypeScript", "JavaScript", "SQL"] },
  {
    group: "AI & Data",
    items: ["Bedrock Agents", "LangChain", "LangGraph", "RAG", "RAGAS", "LangSmith", "Pinecone"],
  },
  { group: "Full-Stack", items: ["React", "Next.js", "Node.js", "FastAPI", "Streamlit"] },
  { group: "Cloud & DevOps", items: ["Lambda", "S3", "AWS Config", "Terraform", "Git"] },
];

export const education = [
  {
    school: "Georgia Tech",
    degree: "M.S. Computer Science, AI specialization · part-time",
    dates: "2026 — 2028",
  },
  { school: "NIT Trichy", degree: "B.Tech, Instrumentation and Control Engineering", dates: "2019 — 2023" },
];

// Each badge links to its public Credly page, so anyone can verify it.
export const certifications = [
  {
    issuer: "AWS",
    name: "Solutions Architect Associate",
    href: "https://www.credly.com/badges/a9979e3d-40bd-41c0-baa8-836d5e622cf5/public_url",
  },
  {
    issuer: "AWS",
    name: "AI Practitioner",
    href: "https://www.credly.com/badges/73eb177c-1f6c-48b2-b0a4-fb8a9774af2c/public_url",
  },
  {
    issuer: "HashiCorp",
    name: "Terraform Associate",
    href: "https://www.credly.com/badges/8dbd6792-5990-431e-973d-b765e3a290db/public_url",
  },
  {
    issuer: "AWS",
    name: "Cloud Practitioner",
    href: "https://www.credly.com/badges/11a4c90b-fceb-4d15-a682-44d450e53949/public_url",
  },
];

export const contact = {
  headline: "Have a problem AI could help with, or a role to fill? I'd like to hear about it.",
};
