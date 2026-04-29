import { setTaskCompleted } from "@/features/tasks/application/task-service";

type PatchBody = {
  completed?: unknown;
};

const isBoolean = (value: unknown): value is boolean => typeof value === "boolean";

export async function PATCH(request: Request, context: RouteContext<"/api/tasks/[id]">) {
  const { id } = await context.params;

  let body: PatchBody;
  try {
    body = (await request.json()) as PatchBody;
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!isBoolean(body.completed)) {
    return Response.json({ error: 'Field "completed" must be a boolean.' }, { status: 400 });
  }

  try {
    await setTaskCompleted(id, body.completed);
    return Response.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update task.";
    return Response.json({ error: message }, { status: 500 });
  }
}
