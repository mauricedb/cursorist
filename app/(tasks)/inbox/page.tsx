import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getInboxTasks } from "@/features/tasks/application/task-service";
import { TaskList } from "@/features/tasks/ui/task-list";

export default async function InboxPage() {
  const allTasks = await getInboxTasks();

  return (
    <section className="space-y-4">
      <header>
        <h2 className="text-3xl font-semibold tracking-tight">Inbox</h2>
        <p className="mt-1 text-sm text-[#6a635e]">
          All tasks you need to complete.
        </p>
      </header>

      <Card className="border-[#eadfd3] bg-white">
        <CardHeader>
          <CardTitle className="text-base">All open tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <TaskList
            initialTasks={allTasks}
            emptyMessage="No open tasks."
            mode="all-open"
          />
        </CardContent>
      </Card>
    </section>
  );
}
