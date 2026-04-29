"use client";

import { useMemo, useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import type { Task } from "@/features/tasks/domain/task";
import { cn } from "@/lib/utils";

type TaskCreateFormProps = {
  onTaskCreated: (task: Task) => void;
};

type CreateTaskResponse = {
  task?: Task;
  error?: string;
};

export function TaskCreateForm({ onTaskCreated }: TaskCreateFormProps) {
  const [title, setTitle] = useState("");
  const [manualDueDate, setManualDueDate] = useState<Date | undefined>();
  const [showCalendar, setShowCalendar] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const dueDateButtonLabel = useMemo(() => {
    if (!manualDueDate) {
      return "Pick due date (optional)";
    }

    return format(manualDueDate, "PPP");
  }, [manualDueDate]);

  const clearForm = () => {
    setTitle("");
    setManualDueDate(undefined);
    setShowCalendar(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title.trim()) {
      setErrorMessage("Task title is required.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          manualDueDate: manualDueDate?.toISOString(),
        }),
      });

      const payload = (await response.json()) as CreateTaskResponse;
      if (!response.ok || !payload.task) {
        throw new Error(payload.error ?? "Failed to create task.");
      }

      onTaskCreated(payload.task);
      clearForm();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to create task.";
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 space-y-3 rounded-lg border border-[#efe5da] bg-[#fffdf9] p-4">
      <Input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder='Add task (e.g. "Add Playwright tests tomorrow")'
        aria-label="Task title"
        disabled={isSubmitting}
      />

      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            variant="outline"
            className={cn("justify-start text-left font-normal", !manualDueDate && "text-muted-foreground")}
            onClick={() => setShowCalendar((current) => !current)}
            disabled={isSubmitting}
          >
            <CalendarIcon />
            {dueDateButtonLabel}
          </Button>
          {manualDueDate ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setManualDueDate(undefined)}
              disabled={isSubmitting}
            >
              <XIcon />
              Clear date
            </Button>
          ) : null}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add task"}
          </Button>
        </div>
        {showCalendar ? (
          <div className="w-fit rounded-lg border border-[#efe5da] bg-white">
            <Calendar
              mode="single"
              selected={manualDueDate}
              onSelect={(date) => {
                setManualDueDate(date);
                setShowCalendar(false);
              }}
            />
          </div>
        ) : null}
      </div>

      {errorMessage ? <p className="text-sm text-red-600">{errorMessage}</p> : null}
    </form>
  );
}
