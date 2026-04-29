import { prisma } from "@/lib/prisma";
import type { Task as TaskView } from "@/features/tasks/domain/task";

const formatDateKey = (date: Date) => date.toISOString().split("T")[0];

const formatDateLabel = (date: Date) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);

const mapToTaskView = (task: { id: string; title: string; dueDate: Date; completed: boolean }): TaskView => ({
  id: task.id,
  title: task.title,
  dueDate: formatDateKey(task.dueDate),
  dueDateLabel: formatDateLabel(task.dueDate),
  completed: task.completed,
});

const getStartOfTodayUtc = () => {
  const todayKey = new Date().toISOString().split("T")[0];
  return new Date(`${todayKey}T00:00:00.000Z`);
};

export async function getAllOpenTasksFromDb(): Promise<TaskView[]> {
  const tasks = await prisma.task.findMany({
    where: { completed: false },
    orderBy: [{ dueDate: "asc" }, { title: "asc" }],
  });

  return tasks.map(mapToTaskView);
}

export async function getTodayAndOverdueTasksFromDb(): Promise<TaskView[]> {
  const startOfTodayUtc = getStartOfTodayUtc();
  const tasks = await prisma.task.findMany({
    where: {
      completed: false,
      dueDate: {
        lte: startOfTodayUtc,
      },
    },
    orderBy: [{ dueDate: "asc" }, { title: "asc" }],
  });

  return tasks.map(mapToTaskView);
}

export async function updateTaskCompletionInDb(
  taskId: string,
  completed: boolean,
): Promise<void> {
  await prisma.task.update({
    where: { id: taskId },
    data: { completed },
  });
}
