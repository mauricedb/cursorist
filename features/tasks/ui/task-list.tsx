"use client";

import { useMemo, useState } from "react";
import type { Task } from "@/features/tasks/domain/task";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { TaskCreateForm } from "@/features/tasks/ui/task-create-form";

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
    return "text-neutral-600";
  }

  return "text-neutral-500";
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
    <div className="space-y-6">
      {visibleTasks.length > 0 ? (
        <ul className="list-none space-y-3 p-0">
          {visibleTasks.map((task) => (
            <li
              key={task.id}
              className="flex items-start gap-4 rounded-xl border border-neutral-200 bg-white px-4 py-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
            >
              <Checkbox
                id={`task-checkbox-${task.id}`}
                className="mt-0.5 size-6 rounded-full border-2 border-neutral-300 shadow-none after:hidden data-checked:border-[#db4c3f] data-checked:bg-[#db4c3f]"
                checked={task.completed}
                disabled={pendingTaskIds.includes(task.id)}
                onCheckedChange={(checked) => {
                  void markTaskCompletion(task.id, checked === true);
                }}
                aria-label={`Mark "${task.title}" as done`}
              />
              <div className="min-w-0 flex-1">
                <Label
                  htmlFor={`task-checkbox-${task.id}`}
                  className="text-[15px] font-medium leading-snug text-neutral-900"
                >
                  {task.title}
                </Label>
                <p className={`mt-1 text-[13px] ${getDueDateColorClass(task, todayKey)}`}>
                  {task.dueDateLabel}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-[15px] text-neutral-500">{emptyMessage}</p>
      )}

      <TaskCreateForm
        onTaskCreated={(createdTask) => {
          setTasks((currentTasks) => [createdTask, ...currentTasks]);
        }}
      />
    </div>
  );
}
