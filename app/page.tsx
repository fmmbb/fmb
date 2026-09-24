
// export const Route = createFileRoute("/")({
//   head: () => ({
//     meta: [
//       { title: "F&M Bank — Banking that earns your trust" },
//       {
//         name: "description",
//         content:
//           "F&M Bank pairs the security of a traditional institution with the clarity of a modern app. Open an account in minutes.",
//       },
//       { property: "og:title", content: "F&M Bank — Banking that earns your trust" },
//       {
//         property: "og:description",
//         content:
//           "Everyday accounts, competitive rates, and cards built for the way you actually move money — all in one place.",
//       },
//       { property: "og:type", content: "website" },
//       { name: "twitter:card", content: "summary_large_image" },
//     ],
//   }),
//   component: Index,
// });
import Link from 'next/link'
const EASE = "var(--ease)";

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="/" className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-lg bg-primary text-[13px] font-extrabold text-primary-foreground">
            F&M
          </span>
          <span className="text-[15px] font-semibold tracking-tight">F&M Bank</span>
        </a>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#products" className="transition-colors hover:text-foreground">
            Personal
          </a>
          <a href="#rates" className="transition-colors hover:text-foreground">
            Rates
          </a>
          <a href="#security" className="transition-colors hover:text-foreground">
            Security
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:block"
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-accent"
          >
            Open an account
          </Link>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-16 pb-12 md:pt-24 md:pb-16">
      <div className="grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-md animate-[riseSoft_0.5s_var(--ease)_both]">
            <span className="size-1.5 rounded-full bg-accent" />
            Member FDIC · Equal Housing Lender
          </div>
          <h1 className="max-w-[16ch] text-balance text-5xl font-extrabold leading-[1.02] tracking-tight md:text-6xl animate-[rise_0.6s_var(--ease)_both]">
            Banking that earns your trust, every single day.
          </h1>
          <p className="mt-6 max-w-[46ch] text-pretty text-lg leading-relaxed text-muted-foreground animate-[rise_0.6s_var(--ease)_0.1s_both]">
            F&M Bank pairs the security of a traditional institution with the clarity of a modern
            app. Open an account in minutes and see exactly where your money works.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3 animate-[rise_0.6s_var(--ease)_0.2s_both]">
            <Link
              href="/signup"
              className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-accent"
            >
              Open an account
            </Link>
            <a
              href="#products"
              className="rounded-lg border border-border bg-card/60 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur-md transition-colors hover:border-foreground/30"
            >
              Explore products
            </a>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-6 animate-[rise_0.6s_var(--ease)_0.3s_both]">
            <div>
              <div className="font-mono text-2xl font-medium tracking-tight">4.5%</div>
              <div className="mt-1 text-xs text-muted-foreground">High-yield savings</div>
            </div>
            <div>
              <div className="font-mono text-2xl font-medium tracking-tight">$0</div>
              <div className="mt-1 text-xs text-muted-foreground">Monthly fees</div>
            </div>
            <div>
              <div className="font-mono text-2xl font-medium tracking-tight">24/7</div>
              <div className="mt-1 text-xs text-muted-foreground">Human support</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="relative animate-[rise_0.7s_var(--ease)_0.15s_both]">
            <div className="absolute -inset-4 -z-10 rounded-[28px] bg-accent/10 blur-2xl" />
            <div className="rounded-[24px] border border-white/60 bg-white/55 p-5 shadow-[0_24px_60px_-24px_rgba(13,27,42,0.35)] backdrop-blur-2xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">Total balance</span>
                <span className="rounded-full bg-accent/10 px-2 py-0.5 font-mono text-[11px] text-accent">
                  +2.4%
                </span>
              </div>
              <div className="mt-2 font-mono text-3xl font-medium tracking-tight">$48,290.16</div>
              <div className="mt-5 flex h-24 items-end gap-1.5">
                {[
                  { color: "bg-primary/15", height: 30 },
                  { color: "bg-primary/25", height: 44 },
                  { color: "bg-primary/40", height: 58 },
                  { color: "bg-primary/55", height: 72 },
                  { color: "bg-primary/70", height: 86 },
                  { color: "bg-accent", height: 100 },
                ].map((bar, i) => (
                  <div
                    key={bar.color}
                    className={`w-full origin-bottom rounded-t ${bar.color} animate-[grow_0.8s_var(--ease)_both]`}
                    style={{ height: `${bar.height}%`, animationDelay: `${0.3 + i * 0.05}s` }}
                  />
                ))}
              </div>
              <div className="mt-5 space-y-2.5">
                <div className="flex items-center justify-between rounded-xl bg-white/70 px-3 py-2.5">
                  <span className="text-sm font-medium">Savings</span>
                  <span className="font-mono text-sm">$32,140.00</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-white/70 px-3 py-2.5">
                  <span className="text-sm font-medium">Checking</span>
                  <span className="font-mono text-sm">$16,150.16</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const PRODUCTS = [
  {
    initial: "C",
    title: "Everyday Checking",
    description: "No monthly fees, no minimums, and free nationwide ATM access.",
    highlight: "$0 / month",
  },
  {
    initial: "S",
    title: "High-Yield Savings",
    description: "Grow your balance with a competitive rate that adjusts with the market.",
    highlight: "4.5% APY",
  },
  {
    initial: "C",
    title: "Rewards Card",
    description: "Earn cash back on everyday spending with no annual fee.",
    highlight: "2% cash back",
  },
  {
    initial: "L",
    title: "Personal Loans",
    description: "Fixed rates and flexible terms for the moments that matter.",
    highlight: "From 6.9% APR",
  },
];

function Products() {
  return (
    <section id="products" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-14">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="font-mono text-xs uppercase tracking-[0.15em] text-accent">(a) Products</div>
          <h2 className="mt-2 max-w-[18ch] text-balance text-3xl font-bold tracking-tight md:text-4xl">
            Everything your money needs, in one place.
          </h2>
        </div>
        <Link
          href="/signup"
          className="text-sm font-semibold text-primary transition-colors hover:text-accent"
        >
          See all products →
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {PRODUCTS.map((product, i) => (
          <div
            key={product.title}
            className="rounded-2xl border border-white/60 bg-white/55 p-6 backdrop-blur-xl transition-colors hover:border-accent/40"
            style={{ animation: `rise 0.6s ${EASE} ${0.1 + i * 0.06}s both` }}
          >
            <div className="mb-4 grid size-10 place-items-center rounded-xl bg-primary/10 text-lg font-bold text-primary">
              {product.initial}
            </div>
            <h3 className="text-base font-semibold">{product.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{product.description}</p>
            <div className="mt-4 font-mono text-xs text-accent">{product.highlight}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

const RATES = [
  { product: "High-Yield Savings", rate: "4.50% APY", minimum: "$500" },
  { product: "12-Month CD", rate: "4.75% APY", minimum: "$1,000" },
  { product: "Personal Loan", rate: "6.90% APR", minimum: "$2,000" },
];

function Rates() {
  return (
    <section id="rates" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-14">
      <div className="rounded-[28px] border border-white/60 bg-white/45 p-8 backdrop-blur-2xl md:p-12">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="font-mono text-xs uppercase tracking-[0.15em] text-accent">(b) Rates</div>
            <h2 className="mt-2 max-w-[14ch] text-balance text-3xl font-bold tracking-tight">
              Rates that respect your patience.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Transparent, market-adjusted rates with no hidden penalties. Rates shown are
              illustrative and subject to change.
            </p>
          </div>
          <div className="lg:col-span-8">
            <div className="overflow-hidden rounded-2xl border border-border bg-white/70">
              <div className="grid grid-cols-3 border-b border-border bg-white/50 px-5 py-3 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                <span>Product</span>
                <span className="text-right">Rate</span>
                <span className="text-right">Min. open</span>
              </div>
              {RATES.map((row) => (
                <div
                  key={row.product}
                  className="grid grid-cols-3 items-center border-t border-border px-5 py-4 first:border-t-0"
                >
                  <span className="text-sm font-medium">{row.product}</span>
                  <span className="text-right font-mono text-sm font-medium text-primary">
                    {row.rate}
                  </span>
                  <span className="text-right font-mono text-sm text-muted-foreground">
                    {row.minimum}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const SECURITY = [
  {
    tag: "FDIC",
    title: "Insured deposits",
    description: "Deposits held at an FDIC-insured bank, up to applicable limits.",
  },
  {
    tag: "256-BIT",
    title: "Encryption",
    description: "Bank-grade encryption protects your data in transit and at rest.",
  },
  {
    tag: "24/7",
    title: "Monitoring",
    description: "Continuous fraud detection watches over every transaction.",
  },
  {
    tag: "EQUAL",
    title: "Housing Lender",
    description: "We lend to everyone, fairly and without discrimination.",
  },
];

function Security() {
  return (
    <section id="security" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-14">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="font-mono text-xs uppercase tracking-[0.15em] text-accent">(c) Security</div>
          <h2 className="mt-2 max-w-[16ch] text-balance text-3xl font-bold tracking-tight md:text-4xl">
            Your money, protected by design.
          </h2>
          <p className="mt-4 max-w-[42ch] text-pretty text-sm leading-relaxed text-muted-foreground">
            Every account is held at an FDIC-insured institution, and your data is encrypted in
            transit and at rest. We never sell your information.
          </p>
        </div>
        <div className="lg:col-span-7">
          <div className="grid gap-4 sm:grid-cols-2">
            {SECURITY.map((item) => (
              <div
                key={item.tag}
                className="rounded-2xl border border-white/60 bg-white/55 p-5 backdrop-blur-xl"
              >
                <div className="font-mono text-xs text-accent">{item.tag}</div>
                <div className="mt-2 text-sm font-semibold">{item.title}</div>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CallToAction() {
  return (
    <section id="open-account" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-14">
      <div className="relative overflow-hidden rounded-[28px] border border-white/60 bg-primary/90 p-10 text-primary-foreground backdrop-blur-xl md:p-14">
        <div className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-accent/25 blur-3xl" />
        <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <h2 className="max-w-[16ch] text-balance text-3xl font-bold tracking-tight md:text-4xl">
              Ready when you are.
            </h2>
            <p className="mt-3 max-w-[40ch] text-pretty text-sm leading-relaxed text-primary-foreground/70">
              Open your first account in under five minutes. No branches required, no fine print
              surprises.
            </p>
          </div>
          <Link
            href="/signup"
            className="shrink-0 rounded-lg bg-white px-7 py-3.5 text-sm font-semibold text-primary transition-colors hover:bg-accent hover:text-primary-foreground"
          >
            Open an account
          </Link>
        </div>
      </div>
    </section>
  );
}

const FOOTER_COLUMNS = [
  {
    heading: "Products",
    links: ["Checking", "Savings", "Cards", "Loans"],
  },
  {
    heading: "Company",
    links: ["About", "Careers", "Newsroom", "Contact"],
  },
  {
    heading: "Support",
    links: ["Help center", "Security", "Accessibility", "Status"],
  },
  {
    heading: "Legal",
    links: ["Privacy", "Terms", "Disclosures", "Licensing"],
  },
];

function Footer() {
  return (
    <footer className="border-t border-border/70 bg-white/40 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="flex items-center gap-2.5">
              <span className="grid size-8 place-items-center rounded-lg bg-primary text-[13px] font-extrabold text-primary-foreground">
                F&M
              </span>
              <span className="text-[15px] font-semibold tracking-tight">F&M Bank</span>
            </div>
            <p className="mt-4 max-w-[30ch] text-sm leading-relaxed text-muted-foreground">
              A modern retail bank built for how you actually live, save, and spend.
            </p>
          </div>
          <div className="md:col-span-8">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
              {FOOTER_COLUMNS.map((column) => (
                <div key={column.heading}>
                  <div className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    {column.heading}
                  </div>
                  <ul className="mt-4 space-y-2.5 text-sm">
                    {column.links.map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="text-foreground/80 transition-colors hover:text-accent"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-border pt-6 text-xs leading-relaxed text-muted-foreground">
          <p>
            F&M Bank is a fictional brand created for this prototype. Deposits are held at an
            FDIC-insured institution, subject to applicable limits. Rates are illustrative and may
            change. Equal Housing Lender.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function Index() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background font-sans text-foreground antialiased">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-32 -left-24 h-[460px] w-[460px] rounded-full bg-accent/15 blur-3xl" />
        <div className="absolute top-40 right-[-120px] h-[420px] w-[420px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-[380px] w-[380px] rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="relative">
        <Header />
        <main>
          <Hero />
          <Products />
          <Rates />
          <Security />
          <CallToAction />
        </main>
        <Footer />
      </div>
    </div>
  );
}
