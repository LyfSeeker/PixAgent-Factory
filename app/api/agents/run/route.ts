import OpenAI from "openai";
import { getAgent, getTask, startTask, updateTask } from "../../../../lib/factory-store";

export const runtime = "nodejs";

type AgentTask = {
  taskId?: unknown;
  agentId?: unknown;
  agentName?: unknown;
  role?: unknown;
  task?: unknown;
  skills?: unknown;
  tools?: unknown;
};

function text(value: unknown, limit: number) {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return Response.json({ error: "OpenAI is not configured on the server." }, { status: 503 });
  }

  let body: AgentTask;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Send a JSON task payload." }, { status: 400 });
  }

  const storedTask = getTask(text(body.taskId, 100));
  const storedAgent = storedTask ? getAgent(storedTask.agentId) : undefined;
  const agentName = storedAgent?.name ?? text(body.agentName, 80);
  const role = storedAgent?.role ?? text(body.role, 120);
  const task = storedTask?.description ?? text(body.task, 4_000);
  const skills = storedAgent?.skills ?? (Array.isArray(body.skills) ? body.skills.filter((skill): skill is string => typeof skill === "string").slice(0, 8) : []);
  const tools = storedAgent?.tools ?? (Array.isArray(body.tools) ? body.tools.filter((tool): tool is string => typeof tool === "string").slice(0, 8) : []);

  if (!agentName || !role || !task) {
    return Response.json({ error: "Agent name, role, and a scoped task are required." }, { status: 400 });
  }

  if (storedTask) startTask(storedTask.id);
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const response = await client.responses.create({
    model: process.env.OPENAI_MODEL ?? "gpt-5.6-luna",
    store: false,
    instructions: [
      "You are one worker in PixAgent Factory, a software studio.",
      "Work only on the task below. Do not invent dependencies, claim to have executed tools, or make decisions outside the stated scope.",
      "Return a compact progress report with: proposed work, evidence to produce, blocker (or none), and next decision.",
    ].join(" "),
    input: `Worker: ${agentName}\nRole: ${role}\nAllowed skills: ${skills.join(", ") || "None listed"}\nAllowed tools: ${tools.join(", ") || "None listed"}\n\nScoped task:\n${task}`,
  });

  if (storedTask) updateTask(storedTask.id, { status: "needs_review", output: response.output_text });
  return Response.json({
    agentId: text(body.agentId, 80),
    taskId: storedTask?.id,
    output: response.output_text,
  });
}
