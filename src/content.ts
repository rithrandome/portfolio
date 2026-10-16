// All of the site's copy lives here. Components only decide how it looks,
// so updating a project, a date or a link never means touching a component.

export const site = {
  name: "Rithwik",
  role: "Applied AI Engineer",
  location: "Saskatoon, Canada",
  url: "https://rithwik.vercel.app",
  description:
    "Applied AI engineer building agentic systems and the evaluation around them.",
  links: {
    resume: "/resume.pdf",
    github: "https://github.com/rithrandome",
    linkedin: "https://linkedin.com/in/vrithwik",
    email: "rithuv20@gmail.com",
  },
};

export const nav = [
  { label: "Work", href: "/#work" },
  { label: "Experience", href: "/#experience" },
  { label: "Skills", href: "/#skills" },
  { label: "Contact", href: "/#contact" },
];

export const hero = {
  eyebrow: `${site.role} · ${site.location}`,
  headline: "I build AI agents,",
  headlineAccent: "and the checks that keep them honest.",
  intro:
    "At AWS I built a Bedrock agent that turns plain-English questions into AWS Config SQL. Now I'm doing my master's at Georgia Tech and building RAG and agent projects that come with real evals.",
  now: [
    { label: "building", value: "network-ai, an outreach agent" },
    { label: "studying", value: "M.S. CS @ Georgia Tech (AI)" },
    { label: "open to", value: "Applied AI / SWE roles, Canada", highlight: true },
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
      "Plain-English questions in, valid AWS Config SQL out. Resource-partitioned knowledge bases ground it, a separate validator checks the query, and execution errors loop back for a fix.",
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
      "A RAG assistant over the LangChain docs: sitemap ingestion, a query-rewrite step before retrieval, and a six-evaluator test suite so I know when a change makes it worse.",
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
      "Outreach for job seekers that doesn't sound like a template. It finds people, lets you choose what to mention, and drafts only from that. Code validators reject anything made up and retry.",
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

export const certifications = [
  { issuer: "AWS", name: "Solutions Architect Associate" },
  { issuer: "AWS", name: "AI Practitioner" },
  { issuer: "HashiCorp", name: "Terraform Associate" },
  { issuer: "AWS", name: "Cloud Practitioner" },
];

export const contact = {
  headline: "Hiring for an AI or software role in Canada? I'd like to hear about it.",
};
