import { PrismaClient } from "../generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { mockTasks } from "../features/tasks/infrastructure/mock-tasks";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./dev.db",
});

const prisma = new PrismaClient({ adapter });

const toUtcDate = (dateKey: string) => new Date(`${dateKey}T00:00:00.000Z`);

async function main() {
  await prisma.task.deleteMany();
  await prisma.task.createMany({
    data: mockTasks.map((task) => ({
      id: task.id,
      title: task.title,
      dueDate: toUtcDate(task.dueDate),
      completed: task.completed,
    })),
  });
}

main()
  .catch((error) => {
    console.error("Seeding failed", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
