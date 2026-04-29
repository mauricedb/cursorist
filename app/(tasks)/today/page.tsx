import { format } from "date-fns";

import { getTodayTasks } from "@/features/tasks/application/task-service";
import { TaskList } from "@/features/tasks/ui/task-list";

export default async function TodayPage() {
  const todayTasks = await getTodayTasks();

  return (
    <section className="mx-auto max-w-3xl space-y-8">
      <header>
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900">Today</h1>
        <p className="mt-1.5 text-[15px] text-neutral-500">{format(new Date(), "EEE, MMM d")}</p>
      </header>

      <TaskList
        initialTasks={todayTasks}
        emptyMessage="No tasks due today or overdue."
        mode="today-and-overdue"
      />
    </section>
  );
}
