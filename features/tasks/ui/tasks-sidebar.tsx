"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, Inbox } from "lucide-react";

import { cn } from "@/lib/utils";

const navItems = [
  { href: "/inbox", label: "Inbox", icon: Inbox },
  { href: "/today", label: "Today", icon: Calendar },
] as const;

export function TasksSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-[240px] shrink-0 flex-col border-r border-neutral-200/80 bg-[#f7f7f6] px-4 py-8">
      <Link href="/today" className="mb-10 flex items-center gap-2.5 px-1">
        <span
          className="flex size-9 shrink-0 items-center justify-center rounded-md bg-[#db4c3f] text-[15px] font-bold text-white"
          aria-hidden
        >
          C
        </span>
        <span className="text-[17px] font-semibold tracking-tight text-neutral-900">Cursorist</span>
      </Link>
      <nav className="flex flex-col gap-1" aria-label="Task views">
        {navItems.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] font-medium transition-colors",
                active
                  ? "bg-white text-neutral-900 shadow-sm ring-1 ring-black/5"
                  : "text-neutral-600 hover:bg-white/60 hover:text-neutral-900",
              )}
              aria-current={active ? "page" : undefined}
            >
              <Icon className="size-[18px] shrink-0 opacity-80" strokeWidth={1.75} aria-hidden />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
