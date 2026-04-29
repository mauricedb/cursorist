import type { Task } from "@/features/tasks/domain/task";
import {
  createTaskInDb,
  getAllOpenTasksFromDb,
  getTodayAndOverdueTasksFromDb,
  updateTaskCompletionInDb,
} from "@/features/tasks/infrastructure/prisma-task-repository";

export async function getInboxTasks(): Promise<Task[]> {
  return getAllOpenTasksFromDb();
}

export async function getTodayTasks(): Promise<Task[]> {
  return getTodayAndOverdueTasksFromDb();
}

export async function setTaskCompleted(taskId: string, completed: boolean): Promise<void> {
  await updateTaskCompletionInDb(taskId, completed);
}

type CreateTaskInput = {
  title: string;
  dueDate: Date;
};

export async function createTask(input: CreateTaskInput): Promise<Task> {
  return createTaskInDb(input);
}
