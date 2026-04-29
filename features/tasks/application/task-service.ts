import type { Task } from "@/features/tasks/domain/task";
import {
  getAllOpenTasksFromDb,
  getTodayAndOverdueTasksFromDb,
} from "@/features/tasks/infrastructure/prisma-task-repository";

export async function getInboxTasks(): Promise<Task[]> {
  return getAllOpenTasksFromDb();
}

export async function getTodayTasks(): Promise<Task[]> {
  return getTodayAndOverdueTasksFromDb();
}
