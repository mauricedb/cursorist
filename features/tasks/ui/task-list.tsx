"use client";

import { useMemo, useState } from "react";
import type { Task } from "@/features/tasks/domain/task";

type TaskListProps = {
  initialTasks: Task[];
  emptyMessage: string;
  mode: "all-open" | "today-and-overdue";
};

const getTodayKey = () => new Date().toISOString().split("T")[0];

const getDueDateColorClass = (task: Task, todayKey: string) => {
  if (task.dueDate < todayKey) {
    return "text-red-600";
  }

  if (!task.completed && task.dueDate === todayKey) {
    return "text-green-600";
  }

  return "text-[#756d68]";
};

export function TaskList({ initialTasks, emptyMessage, mode }: TaskListProps) {
  const [tasks, setTasks] = useState(initialTasks);
  const [pendingTaskIds, setPendingTaskIds] = useState<string[]>([]);

  const visibleTasks = useMemo(() => {
    const todayKey = getTodayKey();

    if (mode === "today-and-overdue") {
      return tasks.filter((task) => !task.completed && task.dueDate <= todayKey);
    }

    return tasks.filter((task) => !task.completed);
  }, [mode, tasks]);

  const todayKey = getTodayKey();

  const markTaskCompletion = async (taskId: string, completed: boolean) => {
    setPendingTaskIds((currentIds) => [...currentIds, taskId]);
    setTasks((currentTasks) =>
      currentTasks.map((currentTask) =>
        currentTask.id === taskId ? { ...currentTask, completed } : currentTask,
      ),
    );

    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed }),
      });

      if (!response.ok) {
        throw new Error("Failed to update task completion.");
      }
    } catch {
      setTasks((currentTasks) =>
        currentTasks.map((currentTask) =>
          currentTask.id === taskId ? { ...currentTask, completed: !completed } : currentTask,
        ),
      );
    } finally {
      setPendingTaskIds((currentIds) => currentIds.filter((id) => id !== taskId));
    }
  };

  return (
    <div className="space-y-3">
      {visibleTasks.length > 0 ? (
        visibleTasks.map((task) => (
          <div
            key={task.id}
            className="flex items-start gap-3 rounded-lg border border-[#efe5da] bg-[#fffdf9] px-4 py-3"
          >
            <input
              type="checkbox"
              className="mt-0.5 h-4 w-4 accent-[#6b8f5a]"
              checked={task.completed}
              disabled={pendingTaskIds.includes(task.id)}
              onChange={(event) => {
                void markTaskCompletion(task.id, event.target.checked);
              }}
              aria-label={`Mark "${task.title}" as done`}
            />
            <div>
              <p className="text-sm font-medium">{task.title}</p>
              <p className={`mt-1 text-xs ${getDueDateColorClass(task, todayKey)}`}>
                Due: {task.dueDateLabel}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-sm text-[#756d68]">{emptyMessage}</p>
      )}
    </div>
  );
}
