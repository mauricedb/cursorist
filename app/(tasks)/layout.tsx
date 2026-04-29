import type { ReactNode } from "react";

import { TasksSidebar } from "@/features/tasks/ui/tasks-sidebar";

type TasksLayoutProps = {
  children: ReactNode;
};

export default function TasksLayout({ children }: TasksLayoutProps) {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <div className="flex min-h-screen">
        <TasksSidebar />
        <main className="min-w-0 flex-1 bg-white px-6 py-10 sm:px-10 lg:px-14">{children}</main>
      </div>
    </div>
  );
}
