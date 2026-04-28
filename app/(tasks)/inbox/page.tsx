import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllTasks } from "@/features/tasks/infrastructure/mock-tasks";

export default function InboxPage() {
  const allTasks = getAllTasks().filter((task) => !task.completed);

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
        <CardContent className="space-y-3">
          {allTasks.map((task) => (
            <div
              key={task.id}
              className="rounded-lg border border-[#efe5da] bg-[#fffdf9] px-4 py-3"
            >
              <p className="text-sm font-medium">{task.title}</p>
              <p className="mt-1 text-xs text-[#756d68]">Due: {task.dueDateLabel}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}
