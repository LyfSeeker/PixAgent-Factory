export type TaskStatus = "queued" | "running" | "blocked" | "needs_review" | "done";

export type FactoryAgent = {
  id: string;
  name: string;
  role: string;
  skills: string[];
  tools: string[];
  environment: "Local" | "Remote";
  capacity: number;
};

export type FactoryTask = {
  id: string;
  title: string;
  description: string;
  agentId: string;
  status: TaskStatus;
  blocker: string | null;
  evidence: string;
  nextDecision: string;
  output: string | null;
  updatedAt: string;
  runCount: number;
};

const now = () => new Date().toISOString();

const agents: FactoryAgent[] = [
  { id: "maya", name: "Maya Park", role: "Frontend Engineer", skills: ["React", "Next.js", "TypeScript"], tools: ["UI editor", "Browser", "Component tests"], environment: "Local", capacity: 2 },
  { id: "alex", name: "Alex Rivera", role: "Backend Engineer", skills: ["Node.js", "PostgreSQL", "APIs"], tools: ["Database", "API client", "Terminal"], environment: "Remote", capacity: 2 },
  { id: "leo", name: "Leo Bennett", role: "UI / UX Engineer", skills: ["Design systems", "Tailwind", "UX"], tools: ["Figma", "Visual checks", "Tokens"], environment: "Local", capacity: 1 },
  { id: "sara", name: "Sara Okafor", role: "QA Engineer", skills: ["Playwright", "Testing", "Debugging"], tools: ["Playwright", "Test runner", "Trace viewer"], environment: "Remote", capacity: 2 },
  { id: "max", name: "Max Chen", role: "Code Reviewer", skills: ["Architecture", "Security", "Review"], tools: ["Diff viewer", "Policy gates", "CI evidence"], environment: "Local", capacity: 1 },
];

const tasks: FactoryTask[] = [
  { id: "task-api", title: "Define event API contract", description: "Draft the event endpoints, validation rules, and error taxonomy for the student events service.", agentId: "alex", status: "running", blocker: null, evidence: "OpenAPI schema and contract tests", nextDecision: "Publish the v1 contract", output: null, updatedAt: now(), runCount: 0 },
  { id: "task-dashboard", title: "Build event dashboard", description: "Implement the responsive event dashboard against the approved API contract and include an empty state.", agentId: "maya", status: "queued", blocker: "Waiting for API schema v1", evidence: "Responsive page and visual test", nextDecision: "Confirm empty-state copy", output: null, updatedAt: now(), runCount: 0 },
  { id: "task-qa", title: "Verify registration flow", description: "Reproduce the registration conflict and document the expected API error response.", agentId: "sara", status: "blocked", blocker: "API returns 409 without an error code", evidence: "Playwright trace and failing spec", nextDecision: "Classify the conflict response", output: null, updatedAt: now(), runCount: 0 },
  { id: "task-review", title: "Review deployment plan", description: "Review the staged deployment plan for security and rollback readiness.", agentId: "max", status: "needs_review", blocker: "Human approval required", evidence: "Security checklist and green CI run", nextDecision: "Approve staged deployment", output: null, updatedAt: now(), runCount: 0 },
];

export function getFactory() {
  return { agents, tasks };
}

export function getTask(id: string) {
  return tasks.find((task) => task.id === id);
}

export function getAgent(id: string) {
  return agents.find((agent) => agent.id === id);
}

export function createTask(input: Pick<FactoryTask, "title" | "description" | "agentId" | "evidence" | "nextDecision">) {
  const task: FactoryTask = { id: `task-${crypto.randomUUID()}`, ...input, status: "queued", blocker: null, output: null, updatedAt: now(), runCount: 0 };
  tasks.unshift(task);
  return task;
}

export function updateTask(id: string, change: Partial<Pick<FactoryTask, "status" | "blocker" | "evidence" | "nextDecision" | "output">>) {
  const task = getTask(id);
  if (!task) return undefined;
  Object.assign(task, change, { updatedAt: now() });
  return task;
}

export function startTask(id: string) {
  const task = getTask(id);
  if (!task) return undefined;
  task.status = "running";
  task.blocker = null;
  task.runCount += 1;
  task.updatedAt = now();
  return task;
}
