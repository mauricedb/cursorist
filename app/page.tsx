import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const featureBlocks = [
  {
    title: "Capture every thought",
    copy: "Turn quick notes into structured tasks in seconds. Capture naturally and let Cursorist organize the details for you.",
  },
  {
    title: "Simplify your planning",
    copy: "Group work by project, set smart due dates, and keep your week focused with calm, visual timelines.",
  },
  {
    title: "A home for your team's tasks",
    copy: "Coordinate work across teams with shared boards, lightweight comments, and instant updates on progress.",
  },
];

const templateCards = [
  "Content Planner",
  "Weekly Sprint",
  "Personal Goals",
  "Meeting Notes",
  "Launch Checklist",
  "Client Work",
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f9f6f1] text-[#2f2b2a]">
      <header className="border-b border-[#e9dfd3] bg-[#f9f6f1]/95">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <div className="font-semibold tracking-tight">cursorist</div>
          <nav className="hidden items-center gap-8 text-sm text-[#675f59] md:flex">
            <a href="#features" className="hover:text-[#2f2b2a]">
              Features
            </a>
            <a href="#templates" className="hover:text-[#2f2b2a]">
              Templates
            </a>
            <a href="#customers" className="hover:text-[#2f2b2a]">
              Customers
            </a>
          </nav>
          <Button className="rounded-full bg-[#de5f3c] px-5 text-white hover:bg-[#c85332]">
            Get Cursorist
          </Button>
        </div>
      </header>

      <main>
        <section className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-14 md:grid-cols-2 md:py-20">
          <div className="space-y-6">
            <Badge className="rounded-full bg-[#efe5d8] px-4 py-1 text-[#6a5f56] hover:bg-[#e8ddcf]">
              New: AI project planning
            </Badge>
            <h1 className="max-w-xl text-5xl leading-[1.05] font-semibold tracking-tight md:text-6xl">
              Clarity, finally.
            </h1>
            <p className="max-w-md text-base leading-7 text-[#6a635e]">
              Cursorist is your calm task workspace. Capture tasks quickly,
              stay focused, and finish the work that matters most.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/today"
                className="inline-flex items-center justify-center rounded-full bg-[#de5f3c] px-6 py-2 text-sm font-medium text-white hover:bg-[#c85332]"
              >
                Start free
              </Link>
              <Button
                variant="outline"
                className="rounded-full border-[#d8cdbf] bg-transparent px-6 text-[#4f4742]"
              >
                See how it works
              </Button>
            </div>
          </div>
          <Card className="overflow-hidden border-[#eadfd3] bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-medium text-[#5d554f]">
                Today in Cursorist
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-xl border border-[#efe5da] bg-[#fbf8f4] p-4">
                <p className="text-sm font-medium">Product planning</p>
                <p className="mt-1 text-xs text-[#7f7771]">
                  5 tasks due this week
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-[#efe5da] bg-[#fffdf9] p-3 text-xs text-[#69605a]">
                  12 completed
                </div>
                <div className="rounded-xl border border-[#efe5da] bg-[#fffdf9] p-3 text-xs text-[#69605a]">
                  3 upcoming
                </div>
              </div>
              <div className="h-28 rounded-xl bg-linear-to-r from-[#f1eadf] to-[#f7f1e9]" />
            </CardContent>
          </Card>
        </section>

        <section id="features" className="mx-auto w-full max-w-6xl space-y-10 px-6 py-10">
          {featureBlocks.map((block, index) => (
            <Card
              key={block.title}
              className="grid items-center gap-8 border-[#eadfd3] bg-white p-6 md:grid-cols-2 md:p-8"
            >
              <div className={index % 2 === 0 ? "order-1" : "order-1 md:order-2"}>
                <h2 className="text-3xl leading-tight font-semibold tracking-tight text-[#2f2b2a]">
                  {block.title}
                </h2>
                <p className="mt-4 max-w-md text-sm leading-7 text-[#6a635e]">
                  {block.copy}
                </p>
              </div>
              <div className={index % 2 === 0 ? "order-2" : "order-2 md:order-1"}>
                <div className="h-52 rounded-2xl border border-[#efe5da] bg-linear-to-br from-[#f4ece3] via-[#fbf7f2] to-[#f0e6d9]" />
              </div>
            </Card>
          ))}
        </section>

        <section id="templates" className="mx-auto w-full max-w-6xl px-6 py-16 text-center">
          <h3 className="text-3xl font-semibold tracking-tight text-[#2f2b2a]">
            Kickstart your next project with Cursorist templates
          </h3>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {templateCards.map((template) => (
              <Card key={template} className="border-[#eadfd3] bg-white text-left">
                <CardContent className="space-y-3 p-5">
                  <div className="h-24 rounded-xl bg-[#f6f1e8]" />
                  <p className="text-sm font-medium text-[#3d3632]">{template}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="customers" className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-8 md:grid-cols-2">
          <Card className="border-[#eadfd3] bg-white">
            <CardContent className="space-y-4 p-7">
              <h4 className="text-3xl leading-tight font-semibold tracking-tight">
                AI in Cursorist
              </h4>
              <p className="text-sm leading-7 text-[#6a635e]">
                Let AI suggest next tasks, organize priorities, and summarize
                your day so you can keep momentum.
              </p>
            </CardContent>
          </Card>
          <Card className="border-[#eadfd3] bg-white">
            <CardContent className="space-y-4 p-7">
              <h4 className="text-3xl leading-tight font-semibold tracking-tight">
                So intuitive that it feels magical
              </h4>
              <p className="text-sm leading-7 text-[#6a635e]">
                Teams switch to Cursorist for the clean interface, flexible
                workflows, and calm focus-first design.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 py-16 text-center">
          <h5 className="mx-auto max-w-3xl text-4xl leading-tight font-semibold tracking-tight">
            Gain calmness and clarity with the world&apos;s most beloved
            productivity app
          </h5>
          <Button className="mt-8 rounded-full bg-[#de5f3c] px-8 text-white hover:bg-[#c85332]">
            Start free
          </Button>
        </section>
      </main>

      <footer className="border-t border-[#e9dfd3]">
        <div className="mx-auto w-full max-w-6xl px-6 py-10">
          <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-[#675f59]">
            <p className="font-semibold text-[#3d3632]">cursorist</p>
            <div className="flex flex-wrap items-center gap-5">
              <a href="#">Features</a>
              <a href="#">Pricing</a>
              <a href="#">Templates</a>
              <a href="#">Contact</a>
            </div>
          </div>
          <Separator className="my-6 bg-[#e9dfd3]" />
          <p className="text-xs text-[#8a827c]">
            © {new Date().getFullYear()} Cursorist. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
