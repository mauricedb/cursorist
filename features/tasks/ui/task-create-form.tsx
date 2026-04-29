"use client";

import { useMemo, useRef, useState } from "react";
import { format } from "date-fns";
import {
  CalendarPlus,
  Flag,
  Plus,
  Tag,
  Zap,
} from "lucide-react";

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
  const inputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState("");
  const [manualDueDate, setManualDueDate] = useState<Date | undefined>();
  const [showCalendar, setShowCalendar] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const dueDateButtonLabel = useMemo(() => {
    if (!manualDueDate) {
      return null;
    }
    return format(manualDueDate, "PPP");
  }, [manualDueDate]);

  const clearForm = () => {
    setTitle("");
    setManualDueDate(undefined);
    setShowCalendar(false);
    setErrorMessage(null);
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
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="rounded-xl border border-neutral-200 bg-white px-2 py-2 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#db4c3f] text-white transition-opacity hover:opacity-90"
            onClick={() => inputRef.current?.focus()}
            aria-label="Focus new task field"
          >
            <Plus className="size-5" strokeWidth={2.5} aria-hidden />
          </button>
          <Input
            ref={inputRef}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Write a new task..."
            aria-label="Task title"
            disabled={isSubmitting}
            className="h-10 min-w-32 flex-1 border-0 bg-transparent px-2 shadow-none focus-visible:ring-0 sm:min-w-0"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className={cn("text-[#db4c3f]", manualDueDate && "bg-neutral-100")}
            onClick={() => setShowCalendar((c) => !c)}
            disabled={isSubmitting}
            aria-label={showCalendar ? "Close due date calendar" : "Open due date calendar"}
          >
            <CalendarPlus className="size-4" strokeWidth={1.75} />
          </Button>
          <div className="flex items-center gap-0.5" aria-hidden>
            <span className="inline-flex size-8 items-center justify-center text-amber-500">
              <Zap className="size-4" strokeWidth={1.75} />
            </span>
            <span className="inline-flex size-8 items-center justify-center text-neutral-400">
              <Tag className="size-4" strokeWidth={1.75} />
            </span>
            <span className="inline-flex size-8 items-center justify-center text-neutral-400">
              <Flag className="size-4" strokeWidth={1.75} />
            </span>
          </div>
        </div>
        {dueDateButtonLabel ? (
          <p className="px-1 pb-1 pl-13 text-xs text-neutral-500">Due {dueDateButtonLabel}</p>
        ) : null}
        {showCalendar ? (
          <div className="mt-2 w-fit rounded-lg border border-neutral-200 bg-white px-2 pb-2 pt-1">
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

      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-9 rounded-lg bg-[#db4c3f] px-5 text-white hover:bg-[#c73d31]"
        >
          {isSubmitting ? "Adding…" : "Add"}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="h-9 rounded-lg border-neutral-300 bg-white text-neutral-700"
          onClick={clearForm}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      </div>

      {errorMessage ? <p className="text-sm text-red-600">{errorMessage}</p> : null}
    </form>
  );
}
