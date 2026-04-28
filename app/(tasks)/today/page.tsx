import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTodayTasks } from "@/features/tasks/infrastructure/mock-tasks";

export default function TodayPage() {
  const todayTasks = getTodayTasks();

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
          <CardTitle className="text-base">Due today</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {todayTasks.length > 0 ? (
            todayTasks.map((task) => (
              <div
                key={task.id}
                className="rounded-lg border border-[#efe5da] bg-[#fffdf9] px-4 py-3"
              >
                <p className="text-sm font-medium">{task.title}</p>
                <p className="mt-1 text-xs text-[#756d68]">
                  Due: {task.dueDateLabel}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-[#756d68]">No tasks due today.</p>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
