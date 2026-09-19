import { getTask, updateTask, type TaskStatus } from "../../../../../lib/factory-store";

const statuses: TaskStatus[] = ["queued", "running", "blocked", "needs_review", "done"];

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  if (!getTask(id)) return Response.json({ error: "Task not found." }, { status: 404 });
  const body = await request.json().catch(() => null) as Record<string, unknown> | null;
  const status = statuses.includes(body?.status as TaskStatus) ? body?.status as TaskStatus : undefined;
  const blocker = typeof body?.blocker === "string" ? body.blocker.slice(0, 500) : body?.blocker === null ? null : undefined;
  const evidence = typeof body?.evidence === "string" ? body.evidence.slice(0, 500) : undefined;
  const nextDecision = typeof body?.nextDecision === "string" ? body.nextDecision.slice(0, 500) : undefined;
  const task = updateTask(id, { status, blocker, evidence, nextDecision });
  return Response.json({ task });
}
