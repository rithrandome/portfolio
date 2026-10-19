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
  { label: "Experience", href: "/#experience" },
  { label: "Work", href: "/#work" },
  { label: "Skills", href: "/#skills" },
  { label: "Contact", href: "/#contact" },
];

export const hero = {
  /** written without the final full stop: the hero adds it in the accent colour */
  headline: "I build intelligent systems that make your business easier to run",
  intro:
    "Conversational AI and agents that are grounded, consistent, careful with your data, and tested before they reach your customers.",
  // icon picks the small pulsing glyph shown next to each label (see components/icons.tsx).
  // Each entry has a main line and an optional smaller detail line under it.
  now: [
    {
      label: "Building",
      icon: "tool" as const,
      entries: [
        { title: "AI quote assistant for Kanmani Occasions", detail: "Freelance" },
        { title: "network-ai", detail: "Outreach assistant for job seekers" },
        { title: "anyRAG", detail: "Scope-enforced RAG for any set of documents" },
      ],
    },
    {
      label: "Studying",
      icon: "book" as const,
      entries: [
        {
          title: "Master of Science in Computer Science, specializing in Artificial Intelligence",
          detail: "Georgia Institute of Technology",
        },
      ],
    },
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
  /** shown in the collapsed row */
  oneLiner: string;
  year: string;
  tag: string;
  status?: "in-progress";
  summary: string;
  stack: string[];
  metric?: { value: string; label: string };
  /** the first link is where the whole card goes */
  links: { label: string; href: string; external?: boolean }[];
  visual: ProjectVisual;
};

// Newest first: work in progress at the top, finished projects below.
// Each one is a row on the page that expands to show the rest.
export const projects: Project[] = [
  {
    slug: "network-ai",
    title: "network-ai",
    oneLiner: "Outreach assistant for job seekers",
    year: "2026",
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
  {
    slug: "anyrag",
    title: "anyRAG",
    oneLiner: "Scope-enforced RAG for any set of documents",
    year: "2026",
    tag: "RAG",
    status: "in-progress",
    summary:
      "A RAG chatbot that answers only from the documents it's given and declines everything else, and works on any corpus: point it at dietary guidelines and it's a diet helper, at a company's product docs and it's their support assistant. Retrieval thresholds are calibrated automatically when a new corpus is ingested, because they never transfer between datasets.",
    stack: ["Python", "pgvector", "BM25", "Cross-encoder reranker", "LangGraph", "Bedrock"],
    links: [],
    visual: {
      kind: "flow",
      rows: [
        [
          { label: "question", next: "→" },
          { label: "scope check", next: "→" },
          { label: "hybrid search" },
        ],
        [
          { label: "confidence gate", accent: true, next: "→" },
          { label: "grounded answer or decline", accent: true },
        ],
      ],
    },
  },
  {
    slug: "langchain-doc-helper",
    title: "LangChain Documentation Helper",
    oneLiner: "RAG assistant over the LangChain docs",
    year: "2026",
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
    slug: "console-companion",
    title: "Console Companion",
    oneLiner: "Plain-English questions to AWS Config SQL",
    year: "2024",
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
];

export type Job = {
  dates: string;
  location?: string;
  role: string;
  company: string;
  internship?: boolean;
  summary?: string;
  points?: string[];
  /** shown as a small mono line under the points */
  stack?: string[];
};

// A shorter version of the resume, in full sentences; the complete resume is one click
// away (site.links.resume). Percentages in the text are picked out in the accent colour.
export const experience: Job[] = [
  {
    dates: "Sep 2026 — Present",
    location: "Remote",
    role: "Freelance AI Developer",
    company: "Kanmani Occasions",
    summary:
      "Building an AI service-discovery and quote assistant for an events business. Its prices come from a tested, deterministic quote engine that the AI calls but never calculates itself.",
    stack: ["Python", "Pydantic", "pytest", "FastAPI (next)"],
  },
  {
    dates: "Aug 2023 — Oct 2024",
    location: "Bangalore",
    role: "Application Developer",
    company: "AWS Professional Services",
    summary:
      "Worked inside customer engineering teams in Agile/Scrum sprints, turning their business requirements into cloud applications.",
    points: [
      "Built production frontend tools and API integrations in React and Node.js for a greenfield customer application, raising user satisfaction by 50%.",
      "Deployed secure serverless backends with Amplify, AppSync, Lambda, Cognito and WAF, cutting customers' manual operational work by 70% and improving access control and reliability by 40%.",
      "Built generative AI solutions on Amazon Bedrock with LangChain and RAG, including Console Companion.",
    ],
    stack: ["React", "Node.js", "GraphQL", "Lambda", "Cognito", "Bedrock", "LangChain"],
  },
  {
    dates: "Jun — Jul 2022",
    location: "Gurgaon",
    role: "Data Engineering Intern",
    company: "Beam Suntory",
    internship: true,
    summary:
      "Built a product-mapping pipeline in Python and Pandas, using fuzzy matching, regular expressions and TF-IDF cosine similarity to raise product classification accuracy to 85%+.",
    stack: ["Python", "Pandas", "FuzzyWuzzy", "string_grouper"],
  },
  {
    dates: "Mar — Jul 2020",
    location: "Madurai",
    role: "Summer Intern",
    company: "Sri Mookambika Infosolutions",
    internship: true,
    summary:
      "Built a Django student portal with secure registration and a responsive React Bootstrap admin interface.",
    stack: ["Python", "Django", "React Bootstrap"],
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

// Same pattern as the hero's Now list: the full degree name, with the school underneath.
export const education = [
  {
    degree: "Master of Science in Computer Science, specializing in Artificial Intelligence",
    school: "Georgia Institute of Technology",
    dates: "Jan 2026 — Jan 2028",
    note: "Online · part-time",
    grade: "GPA 4.0",
  },
  {
    degree: "Bachelor of Technology in Instrumentation and Control Engineering",
    school: "National Institute of Technology, Tiruchirappalli",
    dates: "Jul 2019 — Jul 2023",
    note: "Minor in Computer Applications",
    grade: "CGPA 8.34",
  },
];

// Each badge links to its public Credly page, so anyone can verify it.
// Badge images live in public/badges/.
export const certifications = [
  {
    name: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services",
    badge: "/badges/aws-solutions-architect-associate.png",
    href: "https://www.credly.com/badges/a9979e3d-40bd-41c0-baa8-836d5e622cf5/public_url",
  },
  {
    name: "AWS Certified AI Practitioner",
    issuer: "Amazon Web Services",
    badge: "/badges/aws-ai-practitioner.png",
    href: "https://www.credly.com/badges/73eb177c-1f6c-48b2-b0a4-fb8a9774af2c/public_url",
  },
  {
    name: "HashiCorp Certified: Terraform Associate",
    issuer: "HashiCorp",
    badge: "/badges/hashicorp-terraform-associate.png",
    href: "https://www.credly.com/badges/8dbd6792-5990-431e-973d-b765e3a290db/public_url",
  },
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    badge: "/badges/aws-cloud-practitioner.png",
    href: "https://www.credly.com/badges/11a4c90b-fceb-4d15-a682-44d450e53949/public_url",
  },
];

export const contact = {
  headline: "Have a problem AI could help with, or a role to fill? I'd like to hear about it.",
};
