import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTodayAndOverdueTasks } from "@/features/tasks/infrastructure/mock-tasks";
import { TaskList } from "@/features/tasks/ui/task-list";

export default function TodayPage() {
  const todayTasks = getTodayAndOverdueTasks();

  return (
    <section className="space-y-4">
      <header>
        <h2 className="text-3xl font-semibold tracking-tight">Today</h2>
        <p className="mt-1 text-sm text-[#6a635e]">
          Tasks you need to finish today.
        </p>
      </header>

      <Card className="border-[#eadfd3] bg-white">
        <CardHeader>
          <CardTitle className="text-base">Due today and overdue</CardTitle>
        </CardHeader>
        <CardContent>
          <TaskList
            initialTasks={todayTasks}
            emptyMessage="No tasks due today or overdue."
            mode="today-and-overdue"
          />
        </CardContent>
      </Card>
    </section>
  );
}
