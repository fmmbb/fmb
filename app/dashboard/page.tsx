'use client'
// import { createFileRoute, Link } from "@tanstack/react-router";
import Link from "next/link";
import Cookies from "js-cookie";
import { useEffect,useState } from "react";
// export const Route = createFileRoute("/dashboard")({
//   head: () => ({
//     meta: [
//       { title: "Dashboard — F&M Bank" },
//       {
//         name: "description",
//         content:
//           "Your F&M Bank dashboard: balances, recent activity, savings goals, and quick actions in one clear view.",
//       },
//       { property: "og:title", content: "Dashboard — F&M Bank" },
//       {
//         property: "og:description",
//         content:
//           "Your F&M Bank dashboard: balances, recent activity, savings goals, and quick actions in one clear view.",
//       },
//       { property: "og:type", content: "website" },
//       { name: "twitter:card", content: "summary_large_image" },
//       { name: "robots", content: "noindex" },
//     ],
//   }),
//   component: DashboardPage,
// });

const EASE = "var(--ease)";

const ACCOUNTS = [
  { name: "Everyday Checking", mask: "•• 4182", balance: "$0.00", delta: "+$1,240.00" },
  { name: "High-Yield Savings", mask: "•• 9037", balance: "$0.00", delta: "+$118.42" },
];

const TRANSACTIONS: any[] = [
//   { name: "Whole Foods Market", category: "Groceries", date: "Sep 23", amount: "-$84.12" },
//   { name: "Payroll — Northwind Studio", category: "Income", date: "Sep 22", amount: "+$2,480.00", positive: true },
//   { name: "Con Edison", category: "Utilities", date: "Sep 21", amount: "-$96.40" },
//   { name: "Blue Bottle Coffee", category: "Dining", date: "Sep 20", amount: "-$6.75" },
//   { name: "Transfer to Savings", category: "Transfer", date: "Sep 19", amount: "-$500.00" },
//   { name: "Spotify", category: "Subscriptions", date: "Sep 18", amount: "-$11.99" },
];

const QUICK_ACTIONS = ["Transfer", "Pay a bill", "Deposit check", "Statements"];

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-lg bg-primary text-[13px] font-extrabold text-primary-foreground">
            F&M
          </span>
          <span className="text-[15px] font-semibold tracking-tight">F&M Bank</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#overview" className="text-foreground font-medium">
            Overview
          </a>
          <a href="#activity" className="transition-colors hover:text-foreground">
            Activity
          </a>
          <a href="#goals" className="transition-colors hover:text-foreground">
            Goals
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <span className="hidden font-mono text-[11px] text-muted-foreground sm:block">
            Last sign-in: Sep 24, 8:02 PM
          </span>
          <span className="grid size-8 place-items-center rounded-full bg-accent/10 text-xs font-bold text-accent">
            AL
          </span>
        </div>
      </div>
    </header>
  );
}

function Overview({user}: {user: any}) {
  return (
    <section id="overview" className="scroll-mt-24">
      <div className="grid gap-4 lg:grid-cols-12">
        <div
          className="relative lg:col-span-5 animate-[rise_0.6s_var(--ease)_both]"
        >
          <div className="absolute -inset-3 -z-10 rounded-[28px] bg-accent/10 blur-2xl" />
          <div className="h-full rounded-[24px] border border-white/60 bg-white/55 p-6 shadow-[0_24px_60px_-24px_rgba(13,27,42,0.35)] backdrop-blur-2xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">Total balance</span>
              <span className="rounded-full bg-accent/10 px-2 py-0.5 font-mono text-[11px] text-accent">
                +2.4%
              </span>
            </div>
            <div className="mt-2 font-mono text-4xl font-medium tracking-tight">{user?.amount ?? "$0"}.00</div>
            <p className="mt-1 text-xs text-muted-foreground">Across 2 accounts · updated just now</p>
            <div className="mt-5 flex h-24 items-end gap-1.5">
              {[
                { color: "bg-primary/15", height: 32 },
                { color: "bg-primary/25", height: 40 },
                { color: "bg-primary/40", height: 52 },
                { color: "bg-primary/55", height: 64 },
                { color: "bg-primary/70", height: 80 },
                { color: "bg-accent", height: 100 },
              ].map((bar, i) => (
                <div
                  key={bar.color}
                  className={`w-full origin-bottom rounded-t ${bar.color} animate-[grow_0.8s_var(--ease)_both]`}
                  style={{ height: `${bar.height}%`, animationDelay: `${0.3 + i * 0.05}s` }}
                />
              ))}
            </div>
            <div className="mt-5 grid grid-cols-2 gap-2">
              {QUICK_ACTIONS.map((action) => (
                <button
                  key={action}
                  type="button"
                  className="rounded-xl border border-border bg-white/70 px-3 py-2.5 text-xs font-semibold transition-colors hover:border-accent/40 hover:text-accent"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-1">
          {ACCOUNTS.map((account, i) => (
            <div
              key={account.name}
              className="rounded-2xl border border-white/60 bg-white/55 p-6 backdrop-blur-xl transition-colors hover:border-accent/40"
              style={{ animation: `rise 0.6s ${EASE} ${0.1 + i * 0.07}s both` }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    {account.mask}
                  </div>
                  <h3 className="mt-1 text-base font-semibold">{account.name}</h3>
                </div>
                <span className="rounded-full bg-accent/10 px-2 py-0.5 font-mono text-[11px] text-accent">
                  {account.delta}
                </span>
              </div>
              <div className="mt-4 font-mono text-2xl font-medium tracking-tight">
                {account.balance}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Available now</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Activity() {
  return (
    <section id="activity" className="mt-10 scroll-mt-24">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="font-mono text-xs uppercase tracking-[0.15em] text-accent">
            (a) Recent activity
          </div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight">Where your money moved.</h2>
        </div>
        <a
          href="#"
          className="text-sm font-semibold text-primary transition-colors hover:text-accent"
        >
          View all →
        </a>
      </div>
      <div
        className="overflow-hidden rounded-2xl border border-white/60 bg-white/55 backdrop-blur-xl animate-[rise_0.6s_var(--ease)_0.15s_both]"
      >
        <div className="grid grid-cols-[1fr_auto] border-b border-border bg-white/50 px-5 py-3 font-mono text-[11px] uppercase tracking-wider text-muted-foreground sm:grid-cols-[1fr_8rem_6rem_7rem]">
          <span>Transaction</span>
          <span className="hidden sm:block">Category</span>
          <span className="hidden text-right sm:block">Date</span>
          <span className="text-right">Amount</span>
        </div>
        {!TRANSACTIONS&&'Nothing to show yet'} 
        {TRANSACTIONS && TRANSACTIONS.map((tx) => (
          <div
            key={tx.name + tx.date}
            className="grid grid-cols-[1fr_auto] items-center border-t border-border px-5 py-3.5 transition-colors first:border-t-0 hover:bg-white/60 sm:grid-cols-[1fr_8rem_6rem_7rem]"
          >
            <span className="text-sm font-medium">{tx.name}</span>
            <span className="hidden text-sm text-muted-foreground sm:block">{tx.category}</span>
            <span className="hidden text-right font-mono text-xs text-muted-foreground sm:block">
              {tx.date}
            </span>
            <span
              className={`text-right font-mono text-sm font-medium ${
                tx.positive ? "text-accent" : "text-foreground"
              }`}
            >
              {tx.amount}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Goals() {
  const goal = { name: "Emergency fund", saved: 0, target: 0 };
  const nume = Math.round((goal.saved / goal.target) * 100);
  const pct = nume?nume:0;

  return (
    <section id="goals" className="mt-10 scroll-mt-24">
      <div className="grid gap-4 lg:grid-cols-12">
        <div className="rounded-2xl border border-white/60 bg-white/55 p-6 backdrop-blur-xl lg:col-span-7 animate-[rise_0.6s_var(--ease)_0.2s_both]">
          <div className="font-mono text-xs uppercase tracking-[0.15em] text-accent">(b) Goal</div>
          <div className="mt-3 flex items-end justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold">{goal.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                ${goal.saved.toLocaleString()} of ${goal.target.toLocaleString()} saved
              </p>
            </div>
            <span className="font-mono text-2xl font-medium tracking-tight text-primary">
              {pct}%
            </span>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-border">
            <div
              className="h-full origin-left rounded-full bg-accent animate-[grow_0.8s_var(--ease)_0.4s_both]"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            On track at your current pace of $500/month in automatic transfers.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-white/60 bg-primary/90 p-6 text-primary-foreground backdrop-blur-xl lg:col-span-5 animate-[rise_0.6s_var(--ease)_0.25s_both]">
          <div className="pointer-events-none absolute -right-12 -top-12 size-44 rounded-full bg-accent/25 blur-3xl" />
          <div className="relative">
            <div className="font-mono text-xs uppercase tracking-[0.15em] text-primary-foreground/70">
              (c) Insight
            </div>
            <p className="mt-3 text-balance text-lg font-semibold leading-snug">
              Users earned $118.42 in interest this month — up 6% from August.
            </p>
            <Link
              href="/"
              className="mt-5 inline-flex rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-accent hover:text-primary-foreground"
            >
              Explore more products
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function DashboardPage() {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        if(!user){
            const userCookie = Cookies.get("user");
        
          const userC = userCookie ? JSON.parse(userCookie) : null;
          setUser(userC);
          console.log("User data from cookie:", user);

        }
    },[user])
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background font-sans text-foreground antialiased">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-32 -left-24 h-[460px] w-[460px] rounded-full bg-accent/15 blur-3xl" />
        <div className="absolute top-40 right-[-120px] h-[420px] w-[420px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-[380px] w-[380px] rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="relative">
        <Header />
        <main className="mx-auto max-w-6xl px-6 py-10">
          <div className="mb-8 animate-[riseSoft_0.5s_var(--ease)_both]">
            <div className="font-mono text-xs uppercase tracking-[0.15em] text-accent">
              Dashboard
            </div>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">
              Good evening, {user?.fullName.split(" ")[0]}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Thursday, September 24 · Everything looks healthy.
            </p>
          </div>
          <Overview user={user} />
          <Activity />
          <Goals />
          {/* <p className="mt-10 text-center text-xs leading-relaxed text-muted-foreground">
            F&M Bank is a fictional brand created for this prototype. Balances, transactions, and
            insights are sample data. Equal Housing Lender.
          </p> */}
        </main>
      </div>
    </div>
  );
}
