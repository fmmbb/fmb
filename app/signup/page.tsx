'use client';
// import { createFileRoute, Link } from "@tanstack/react-router";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import Cookies from "js-cookie";
import { auth, db } from "../component/firebase";

// export const Route = createFileRoute("/signup")({
//   head: () => ({
//     meta: [
//       { title: "Open an account — F&M Bank" },
//       {
//         name: "description",
//         content:
//           "Open your F&M Bank account in minutes. No monthly fees, no minimums, no fine print surprises.",
//       },
//       { property: "og:title", content: "Open an account — F&M Bank" },
//       {
//         property: "og:description",
//         content:
//           "Open your F&M Bank account in minutes. No monthly fees, no minimums, no fine print surprises.",
//       },
//       { property: "og:type", content: "website" },
//       { name: "twitter:card", content: "summary_large_image" },
//     ],
//   }),
//   component: SignupPage,
// });

const EASE = "var(--ease)";

type Errors = Partial<Record<"fullName" | "email" | "password" | "terms", string>>;

function validate(fullName: string, email: string, password: string, terms: boolean): Errors {
    const errors: Errors = {};
    if (fullName.trim().length < 2) {
        errors.fullName = "Please enter your full name.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = "Please enter a valid email address.";
    }
    if (password.length < 8) {
        errors.password = "Password must be at least 8 characters.";
    }
    if (!terms) {
        errors.terms = "Please accept the terms to continue.";
    }
    return errors;
}

function passwordStrength(pw: string): { label: string; score: number } {
    let score = 0;
    if (pw.length >= 8) score++;
    if (pw.length >= 12) score++;
    if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
    if (/\d/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    const labels = ["Too short", "Weak", "Fair", "Good", "Strong", "Excellent"];
    return { label: labels[Math.min(score, 5)] ?? "Weak", score };
}

export default function SignupPage() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [terms, setTerms] = useState(false);
    const [errors, setErrors] = useState<string>();
    const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");
    

    const strength = useMemo(() => passwordStrength(password), [password]);
 async function signUp(
  fullName: string,
  email: string,
  password: string
) {
  if (!fullName?.trim()) {
    throw new Error("Full name is required");
  }

  if (!email?.trim()) {
    throw new Error("Email is required");
  }

  if (!password?.trim()) {
    throw new Error("Password is required");
  }

  try {
    // Create Firebase Authentication account
    console.log("Creating user with email:", email);
    const credential = await createUserWithEmailAndPassword(
      auth,
      email.trim(),
      password
    );

    const user = credential.user;

    // Save full name to Firebase Auth profile
    await updateProfile(user, {
      displayName: fullName.trim(),
    });

    // Save user information to Firestore
    await setDoc(doc(db, "users", user.uid), {
  uid: user.uid,
  fullName: fullName.trim(),
  email: email.trim(),
  amount: 0,
  createdAt: serverTimestamp(),
});

Cookies.set(
  "user",
  JSON.stringify({
    fullName: fullName.trim(),
    email: email.trim(),
    amount: 0,
  }),
  {
    expires: 7,
    sameSite: "lax",
  }
);

    return user;
  } catch (error: any) {
    // throw new Error(error.message || "Account creation failed");
    console.log(error)
  }
}
async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

//   const nextErrors = validate(fullName, email, password, terms);

//   setErrors(nextErrors);

  setStatus("submitting");

  try {
    await signUp(fullName, email, password);

    setStatus("done");
  } catch (error: any) {
    // setStatus("error");

    setErrors(
      "Unable to create account",
    );
  }
}

    return (
        <div className="relative min-h-screen overflow-x-hidden bg-background font-sans text-foreground antialiased">
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                <div className="absolute -top-32 -left-24 h-[460px] w-[460px] rounded-full bg-accent/15 blur-3xl" />
                <div className="absolute right-[-120px] bottom-0 h-[420px] w-[420px] rounded-full bg-primary/10 blur-3xl" />
            </div>

            <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-6">
                <header className="flex h-16 items-center justify-between">
                    <Link href="/" className="flex items-center gap-2.5">
                        <span className="grid size-8 place-items-center rounded-lg bg-primary text-[13px] font-extrabold text-primary-foreground">
                            F&M
                        </span>
                        <span className="text-[15px] font-semibold tracking-tight">F&M Bank</span>
                    </Link>
                    <span className="rounded-full border border-border bg-card/60 px-3 py-1.5 font-mono text-[11px] text-muted-foreground backdrop-blur-md">
                        Member FDIC · Equal Housing Lender
                    </span>
                </header>

                <main className="grid flex-1 items-center gap-12 py-10 lg:grid-cols-12">
                    <div className="hidden lg:col-span-5 lg:block">
                        <div className="font-mono text-xs uppercase tracking-[0.15em] text-accent">
                            Open an account
                        </div>
                        <h1 className="mt-3 max-w-[16ch] text-balance text-4xl font-extrabold leading-[1.05] tracking-tight animate-[rise_0.6s_var(--ease)_both]">
                            Five minutes now. Zero fees forever.
                        </h1>
                        <p className="mt-5 max-w-[40ch] text-pretty leading-relaxed text-muted-foreground animate-[rise_0.6s_var(--ease)_0.1s_both]">
                            Join F&M Bank and get a high-yield savings account, a fee-free checking account, and
                            human support around the clock.
                        </p>
                        <ul className="mt-8 space-y-4 animate-[rise_0.6s_var(--ease)_0.2s_both]">
                            {[
                                ["4.5% APY", "on high-yield savings"],
                                ["$0", "monthly fees or minimums"],
                                ["24/7", "real humans, not bots"],
                            ].map(([stat, label]) => (
                                <li key={stat} className="flex items-baseline gap-3">
                                    <span className="w-16 shrink-0 font-mono text-xl font-medium tracking-tight text-primary">
                                        {stat}
                                    </span>
                                    <span className="text-sm text-muted-foreground">{label}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-7">
                        <div className="mx-auto max-w-md animate-[rise_0.7s_var(--ease)_0.15s_both]">
                            <div className="absolute inset-x-0 -z-10 mx-auto max-w-md blur-2xl" aria-hidden="true" />
                            <div className="rounded-[24px] border border-white/60 bg-white/55 p-6 shadow-[0_24px_60px_-24px_rgba(13,27,42,0.35)] backdrop-blur-2xl md:p-8">
                                {status === "done" ? (
                                    <div className="py-8 text-center">
                                        <div className="mx-auto grid size-12 place-items-center rounded-full bg-accent/10 font-mono text-xl text-accent">
                                            ✓
                                        </div>
                                        <h2 className="mt-5 text-xl font-semibold tracking-tight">
                                            You're on the list, {fullName.trim().split(" ")[0]}.
                                        </h2>
                                        {/* <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      This is a prototype, so no real account was opened — but you can preview the
                      dashboard with sample data.
                    </p> */}
                                        <Link
                                            href="/dashboard"
                                            className="mt-6 inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-accent"
                                        >
                                            Continue to dashboard
                                        </Link>
                                    </div>
                                ) : (
                                    <>
                                        <div className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                                            Step 1 of 3 · Your details
                                        </div>
                                        <h2 className="mt-2 text-2xl font-bold tracking-tight">
                                            Create your account
                                        </h2>

                                        <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
                                            <div>
                                                <label
                                                    htmlFor="fullName"
                                                    className="mb-1.5 block text-xs font-medium text-muted-foreground"
                                                >
                                                    Full name
                                                </label>
                                                <input
                                                    id="fullName"
                                                    type="text"
                                                    autoComplete="name"
                                                    placeholder="Ada Lovelace"
                                                    value={fullName}
                                                    onChange={(e) => setFullName(e.target.value)}
                                                    className={`w-full rounded-xl border bg-white/70 px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-accent focus:ring-2 focus:ring-accent/20  "border-border"
                                                        `}
                                                />
                                                {/* {errors.fullName && (
                                                    <p className="mt-1.5 text-xs text-destructive">{errors.fullName}</p>
                                                )} */}
                                            </div>

                                            <div>
                                                <label
                                                    htmlFor="email"
                                                    className="mb-1.5 block text-xs font-medium text-muted-foreground"
                                                >
                                                    Email
                                                </label>
                                                <input
                                                    id="email"
                                                    type="email"
                                                    autoComplete="email"
                                                    placeholder="you@example.com"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className={`w-full rounded-xl border bg-white/70 px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-accent focus:ring-2 focus:ring-accent/20 border-border
                                                        `}
                                                />
                                                {/* {errors.email && (
                                                    <p className="mt-1.5 text-xs text-destructive">{errors.email}</p>
                                                )} */}
                                            </div>

                                            <div>
                                                <label
                                                    htmlFor="password"
                                                    className="mb-1.5 block text-xs font-medium text-muted-foreground"
                                                >
                                                    Password
                                                </label>
                                                <input
                                                    id="password"
                                                    type="password"
                                                    autoComplete="new-password"
                                                    placeholder="At least 8 characters"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    className={`w-full rounded-xl border bg-white/70 px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-accent focus:ring-2 focus:ring-accent/20 border-border
                                            `}
                                                />
                                                {password.length > 0 && (
                                                    <div className="mt-2 flex items-center gap-2">
                                                        <div className="flex h-1 flex-1 gap-1">
                                                            {[0, 1, 2, 3, 4].map((i) => (
                                                                <div
                                                                    key={i}
                                                                    className={`h-full flex-1 rounded-full transition-colors duration-300 ${i < strength.score
                                                                            ? strength.score >= 4
                                                                                ? "bg-accent"
                                                                                : strength.score >= 3
                                                                                    ? "bg-primary/70"
                                                                                    : "bg-primary/40"
                                                                            : "bg-border"
                                                                        }`}
                                                                />
                                                            ))}
                                                        </div>
                                                        <span className="w-16 text-right font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                                                            {strength.label}
                                                        </span>
                                                    </div>
                                                )}
                                                {/* {errors.password && (
                                                    <p className="mt-1.5 text-xs text-destructive">{errors.password}</p>
                                                )} */}
                                            </div>

                                            <div>
                                                <label className="flex cursor-pointer items-start gap-2.5 pt-1">
                                                    <input
                                                        type="checkbox"
                                                        checked={terms}
                                                        onChange={(e) => setTerms(e.target.checked)}
                                                        className="mt-0.5 size-4 rounded border-border accent-[var(--accent)]"
                                                    />
                                                    <span className="text-xs leading-relaxed text-muted-foreground">
                                                        I agree to the{" "}
                                                        <a href="#" className="text-primary underline underline-offset-2 hover:text-accent">
                                                            Terms
                                                        </a>{" "}
                                                        and{" "}
                                                        <a href="#" className="text-primary underline underline-offset-2 hover:text-accent">
                                                            Privacy Policy
                                                        </a>
                                                        , and confirm I am a U.S. resident 18 or older.
                                                    </span>
                                                </label>
                                                {/* {errors.terms && (
                                                    <p className="mt-1.5 text-xs text-destructive">{errors.terms}</p>
                                                )} */}
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={status === "submitting"}
                                                style={{ animation: `rise 0.6s ${EASE} 0.3s both` }}
                                                className="w-full rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-70"
                                            >
                                                {status === "submitting" ? "Opening your account…" : "Open my account"}
                                            </button>

                                            <p className="text-center text-xs text-muted-foreground">
                                                Already banking with us?{" "}
                                                <Link
                                                    href="/login"
                                                    className="font-medium text-primary transition-colors hover:text-accent"
                                                >
                                                    Sign in
                                                </Link>
                                            </p>
                                        </form>
                                    </>
                                )}
                            </div>

                            {/* <p className="mt-5 text-center text-xs leading-relaxed text-muted-foreground">
                                F&M Bank is a fictional brand created for this prototype. Rates shown are
                                illustrative and may change. Equal Housing Lender.
                            </p> */}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
