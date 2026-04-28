import Link from "next/link";
import type { ReactNode } from "react";

type TasksLayoutProps = {
  children: ReactNode;
};

const navItems = [
  { href: "/today", label: "Today" },
  { href: "/inbox", label: "Inbox" },
];

export default function TasksLayout({ children }: TasksLayoutProps) {
  return (
    <div className="min-h-screen bg-[#f9f6f1] text-[#2f2b2a]">
      <div className="mx-auto grid w-full max-w-6xl gap-6 px-6 py-8 md:grid-cols-[220px_1fr]">
        <aside className="rounded-2xl border border-[#eadfd3] bg-white p-4">
          <h1 className="mb-4 text-lg font-semibold tracking-tight">Tasks</h1>
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm text-[#5f5752] hover:bg-[#f4ece3] hover:text-[#2f2b2a]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        <main>{children}</main>
      </div>
    </div>
  );
}
