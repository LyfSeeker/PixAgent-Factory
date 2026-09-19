import { createTask, getAgent, getFactory } from "../../../lib/factory-store";

export const runtime = "nodejs";

export function GET() {
  return Response.json(getFactory());
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as Record<string, unknown> | null;
  const title = typeof body?.title === "string" ? body.title.trim().slice(0, 160) : "";
  const description = typeof body?.description === "string" ? body.description.trim().slice(0, 4_000) : "";
  const agentId = typeof body?.agentId === "string" ? body.agentId : "";
  const evidence = typeof body?.evidence === "string" ? body.evidence.trim().slice(0, 500) : "";
  const nextDecision = typeof body?.nextDecision === "string" ? body.nextDecision.trim().slice(0, 500) : "";
  if (!title || !description || !agentId || !evidence || !nextDecision || !getAgent(agentId)) return Response.json({ error: "A valid owner, task, evidence, and next decision are required." }, { status: 400 });
  return Response.json({ task: createTask({ title, description, agentId, evidence, nextDecision }) }, { status: 201 });
}
