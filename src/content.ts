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
          { label: '"Which EC2s are stopped?"', next: "→" },
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

// ---------------------------------------------------------------------------
// Case studies: the longer write-ups behind some projects, one page each at
// /projects/<slug>. The page component only lays this out.

type Transcript = {
  title: string;
  /** a reply can carry rows, shown as a small table under its text */
  turns: { from: "you" | "bot"; text: string; rows?: string[][] }[];
};

export type CaseStudy = {
  slug: string;
  title: string;
  subtitle: string;
  facts: { label: string; value: string }[];
  /** shown in a box under the header, e.g. why there's no code */
  note: string;
  problem: string[];
  steps: { text: string; parts: string }[];
  example: { question: string; sql: string; answer: string; rows: string[][] };
  decisions: { title: string; text: string }[];
  transcripts: Transcript[];
  result: { value: string; label: string; text: string[] };
  improvements: { group: string; items: { title: string; text: string }[] }[];
  stack: string[];
};

export const consoleCompanion: CaseStudy = {
  slug: "console-companion",
  title: "Console Companion",
  subtitle: "Plain-English questions about your AWS resources, answered from AWS Config",
  facts: [
    { label: "Year", value: "2024" },
    { label: "Where", value: "AWS Professional Services" },
    { label: "Role", value: "Designed and built end to end" },
    { label: "Result", value: "~90% accuracy" },
  ],
  note: "This was an internal prototype at AWS Professional Services, built to become a customer offering. The code belongs to AWS, so this page describes the design rather than showing it.",
  problem: [
    "AWS Config records the configuration of every resource in an account. It can answer questions like “which EC2 instances are stopped?” or “which Lambda functions still run Node.js 16?” To ask, though, you have to write its own SQL dialect. It supports only part of standard SQL and expects exact property paths like configuration.state.name.",
    "Most people who need these answers don't know either one. Console Companion lets them ask in plain English instead.",
  ],
  steps: [
    { text: "A question comes in through the chat interface.", parts: "Streamlit" },
    {
      text: "A Bedrock Agent works out which resource type the question is about, and retrieves examples from that resource type's knowledge base only.",
      parts: "Bedrock Agent · Knowledge Bases",
    },
    { text: "Using those examples, it writes an AWS Config query.", parts: "Bedrock Agent" },
    {
      text: "A validator checks the query against AWS Config's real limits. If something isn't supported, it sends back a correction and the agent tries again.",
      parts: "Lambda · LangChain",
    },
    { text: "A second function runs the valid query through the AWS Config API.", parts: "Lambda · AWS Config" },
    { text: "The agent turns the result into a short answer or a table.", parts: "Bedrock Agent" },
  ],
  example: {
    question: "Which EC2 instances are stopped?",
    sql: "SELECT resourceId,\n       configuration.instanceType,\n       availabilityZone\nWHERE resourceType = 'AWS::EC2::Instance'\n  AND configuration.state.name = 'stopped'",
    answer: "You have 2 stopped EC2 instances:",
    rows: [
      ["i-0a1b2c3d4e5f60718", "t3.small", "us-east-1a"],
      ["i-09f8e7d6c5b4a3921", "t3.medium", "us-east-1b"],
    ],
  },
  decisions: [
    {
      title: "Knowledge bases split by resource type",
      text: "I wrote the datasets myself: the AWS Config properties for each resource type, and example pairs of questions and SQL. Because they're split by resource type, an EC2 question only retrieves EC2 material. That keeps the prompt small and the examples relevant.",
    },
    {
      title: "A separate validator",
      text: "Most failed queries weren't wrong in logic. They used things Config doesn't support, like joins or properties that don't exist. Rather than asking the model to review its own output, I gave validation to a separate Lambda function with its own prompt, focused only on Config's limits, and fed its corrections back to the agent.",
    },
    {
      title: "Rewritten agent prompts",
      text: "I replaced Bedrock Agents' default prompts for each stage: pre-processing, orchestration, knowledge-base answers and post-processing. The query-writing step got few-shot examples and step-by-step reasoning.",
    },
  ],
  transcripts: [
    {
      title: "Follow-up questions",
      turns: [
        { from: "you", text: "How many S3 buckets do I have?" },
        { from: "bot", text: "You have 10 S3 buckets in this account and region." },
        { from: "you", text: "List all of them." },
        {
          from: "bot",
          text: "Here are your 10 S3 buckets:",
          rows: [
            ["app-assets", "app-assets-dev"],
            ["athena-results", "backups"],
            ["cloudtrail-logs", "config-history"],
            ["lake-curated", "lake-raw"],
            ["lambda-artifacts", "www-static"],
          ],
        },
      ],
    },
    {
      title: "Staying in scope",
      turns: [
        { from: "you", text: "What's the capital of India?" },
        {
          from: "bot",
          text: "I can only help with questions about your AWS resources and their configuration.",
        },
      ],
    },
    {
      title: "Failing clearly",
      turns: [
        { from: "you", text: "List all running EC2 instances." },
        {
          from: "bot",
          text: "The query returned no results. Either there are no running instances in this region, or AWS Config isn't recording EC2 instances here. Can you confirm the account and region?",
        },
      ],
    },
  ],
  result: {
    value: "~90%",
    label: "of test questions answered correctly",
    text: [
      "About 90% of test questions, including reworded versions of the knowledge-base examples, produced the correct query and answer. I ran each one through the chat interface and checked three things: that the agent retrieved the right examples, wrote the right query, and returned the right data.",
      "Every test question was close to an example the agent had already seen. So this shows the workflow works, but not how it handles questions it hasn't seen. That's the first thing I'd change.",
    ],
  },
  improvements: [
    {
      group: "Build it better",
      items: [
        {
          title: "Check queries in code first",
          text: "My validator was one model checking another model's output. Now I'd parse the query and check it in code against Config's supported SQL and the real property names. The model would only fix what fails, with a limit on retries.",
        },
        {
          title: "Own the workflow",
          text: "Bedrock Agents decided the order of steps itself, which made failures hard to trace. I'd make each step explicit (find the resource type, retrieve, write the query, validate, run, summarize), so each one can be logged and tested on its own.",
        },
        {
          title: "Handle large accounts in code",
          text: "Big accounts return thousands of records. I'd page through the results and do the counting and grouping in code, so the model only sees a summary.",
        },
      ],
    },
    {
      group: "Test it better",
      items: [
        {
          title: "A real evaluation set",
          text: "I'd build a set of questions the agent has never seen, and score each one on whether its results match the expected data, not whether the SQL text matches. Running that set after every prompt or dataset change would catch problems before users do. I've since done this on my LangChain documentation assistant with RAGAS and LangSmith.",
        },
      ],
    },
  ],
  stack: ["Bedrock Agents", "Knowledge Bases", "Lambda", "AWS Config", "LangChain", "OpenAPI", "Python", "Streamlit", "S3"],
};
