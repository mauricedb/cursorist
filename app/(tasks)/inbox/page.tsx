import { getInboxTasks } from "@/features/tasks/application/task-service";
import { TaskList } from "@/features/tasks/ui/task-list";

export default async function InboxPage() {
  const allTasks = await getInboxTasks();

  return (
    <section className="mx-auto max-w-3xl space-y-8">
      <header>
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900">Inbox</h1>
        <p className="mt-1.5 text-[15px] text-neutral-500">All open tasks in one place.</p>
      </header>

      <TaskList initialTasks={allTasks} emptyMessage="No open tasks." mode="all-open" />
    </section>
  );
}
