import { createTask } from "@/features/tasks/application/task-service";
import { parseDueDateFromTaskTitle } from "@/features/tasks/domain/due-date-parser";

type CreateTaskBody = {
  title?: unknown;
  manualDueDate?: unknown;
};

const isString = (value: unknown): value is string => typeof value === "string";

const toUtcStartOfDay = (value: Date) =>
  new Date(Date.UTC(value.getUTCFullYear(), value.getUTCMonth(), value.getUTCDate()));

const parseManualDueDate = (value: unknown): Date | null => {
  if (value === undefined || value === null || value === "") {
    return null;
  }

  if (!isString(value)) {
    throw new Error('Field "manualDueDate" must be an ISO date string.');
  }

  const parsedDate = new Date(value);
  if (Number.isNaN(parsedDate.getTime())) {
    throw new Error('Field "manualDueDate" must be a valid date string.');
  }

  return toUtcStartOfDay(parsedDate);
};

export async function POST(request: Request) {
  let body: CreateTaskBody;
  try {
    body = (await request.json()) as CreateTaskBody;
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!isString(body.title) || body.title.trim().length === 0) {
    return Response.json({ error: 'Field "title" must be a non-empty string.' }, { status: 400 });
  }

  let manualDueDate: Date | null;
  try {
    manualDueDate = parseManualDueDate(body.manualDueDate);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid manual due date.";
    return Response.json({ error: message }, { status: 400 });
  }

  const parsedFromText = parseDueDateFromTaskTitle(body.title);
  const finalTitle = parsedFromText.title.trim();
  if (!finalTitle) {
    return Response.json({ error: "Task title cannot be empty after parsing date text." }, { status: 400 });
  }

  const resolvedDueDate = manualDueDate ?? parsedFromText.dueDate;
  if (!resolvedDueDate) {
    return Response.json(
      { error: "Set a due date by typing one in the title or selecting one from the date picker." },
      { status: 400 },
    );
  }

  try {
    const task = await createTask({
      title: finalTitle,
      dueDate: resolvedDueDate,
    });

    return Response.json({ task }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create task.";
    return Response.json({ error: message }, { status: 500 });
  }
}
