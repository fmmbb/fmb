'use client'
import { useState } from "react";
import Link from "next/link";
import {
    signInWithEmailAndPassword,
    type UserCredential,
} from "firebase/auth";
import { auth,db } from "../component/firebase";
import { doc, getDoc } from "firebase/firestore";
import Cookies from "js-cookie";
// export const Route = createFileRoute("/login")({
//   head: () => ({
//     meta: [
//       { title: "Sign in — F&M Bank" },
//       {
//         name: "description",
//         content:
//           "Sign in to your F&M Bank account to view balances, move money, and track your savings goals.",
//       },
//       { property: "og:title", content: "Sign in — F&M Bank" },
//       {
//         property: "og:description",
//         content:
//           "Sign in to your F&M Bank account to view balances, move money, and track your savings goals.",
//       },
//       { property: "og:type", content: "website" },
//       { name: "twitter:card", content: "summary_large_image" },
//     ],
//   }),
//   component: LoginPage,
// });

const EASE = "var(--ease)";

type Errors = Partial<Record<"email" | "password", string>>;

function validate(email: string, password: string): Errors {
    const errors: Errors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = "Please enter a valid email address.";
    }
    if (password.length < 8) {
        errors.password = "Password must be at least 8 characters.";
    }
    return errors;
}

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<string>();
    const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");
     async function signIn(email: string, password: string) {
  if (!email?.trim()) {
    throw new Error("Email is required");
  }

  if (!password?.trim()) {
    throw new Error("Password is required");
  }

  try {
    // Sign in with Firebase Auth
    const credential = await signInWithEmailAndPassword(
      auth,
      email.trim(),
      password
    );

    const user = credential.user;

    // Get the user's Firestore document using their UID
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      throw new Error("User data not found");
    }

    const userData = userSnap.data() as any;

    // Store the user data in one cookie
    Cookies.set(
      "user",
      JSON.stringify({
        fullName: userData.fullName,
        email: userData.email,
        amount: userData.amount,
      }),
      {
        expires: 7,
        sameSite: "lax",
      }
    );

    return userData;
  } catch (error: any) {
    console.error("Sign in error:", error);

    throw new Error(error.message || "Sign in failed");
  }
}
   async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  const nextErrors = validate(email, password);

//   setErrors(nextErrors);

  if (Object.keys(nextErrors).length > 0) return;

  setStatus("submitting");

  try {
    await signIn(email, password);

    setStatus("done");

    // Navigate to your next page here
  } catch (error: any) {
    // setStatus("error");

    setErrors("Unable to sign in",
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
                            Welcome back
                        </div>
                        <h1 className="mt-3 max-w-[16ch] text-balance text-4xl font-extrabold leading-[1.05] tracking-tight animate-[rise_0.6s_var(--ease)_both]">
                            Your money, exactly where you left it.
                        </h1>
                        <p className="mt-5 max-w-[40ch] text-pretty leading-relaxed text-muted-foreground animate-[rise_0.6s_var(--ease)_0.1s_both]">
                            Sign in to check your balances, move money between accounts, and watch your savings
                            grow — all in one clear view.
                        </p>
                        <ul className="mt-8 space-y-4 animate-[rise_0.6s_var(--ease)_0.2s_both]">
                            {[
                                ["4.5% APY", "still earning, every day"],
                                ["$0", "fees, always and forever"],
                                ["24/7", "support when you need it"],
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
                            <div className="rounded-[24px] border border-white/60 bg-white/55 p-6 shadow-[0_24px_60px_-24px_rgba(13,27,42,0.35)] backdrop-blur-2xl md:p-8">
                                {status === "done" ? (
                                    <div className="py-8 text-center">
                                        <div className="mx-auto grid size-12 place-items-center rounded-full bg-accent/10 font-mono text-xl text-accent">
                                            ✓
                                        </div>
                                        <h2 className="mt-5 text-xl font-semibold tracking-tight">
                                            Welcome back{email ? `, ${email.split("@")[0]}` : ""}.
                                        </h2>
                                        {/* <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      This is a prototype, so nothing was actually signed in — but you can preview
                      the dashboard with sample data.
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
                                            Secure sign-in
                                        </div>
                                        <h2 className="mt-2 text-2xl font-bold tracking-tight">
                                            Sign in to F&M Bank
                                        </h2>

                                        <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
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
                                                    className={`w-full rounded-xl border bg-white/70 px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-accent focus:ring-2 focus:ring-accent/20  border-border"
                                                        `}
                                                />
                                                {/* {errors.email && (
                                                    <p className="mt-1.5 text-xs text-destructive">{errors.email}</p>
                                                )} */}
                                            </div>

                                            <div>
                                                <div className="mb-1.5 flex items-center justify-between">
                                                    <label
                                                        htmlFor="password"
                                                        className="block text-xs font-medium text-muted-foreground"
                                                    >
                                                        Password
                                                    </label>
                                                    <a
                                                        href="#"
                                                        className="text-xs font-medium text-primary transition-colors hover:text-accent"
                                                    >
                                                        Forgot password?
                                                    </a>
                                                </div>
                                                <div className="relative">
                                                    <input
                                                        id="password"
                                                        type={showPassword ? "text" : "password"}
                                                        autoComplete="current-password"
                                                        placeholder="Your password"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        className={`w-full rounded-xl border bg-white/70 px-3.5 py-2.5 pr-16 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-accent focus:ring-2 focus:ring-accent/20 border-border"
                                                            `}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPassword((v) => !v)}
                                                        className="absolute inset-y-0 right-3 font-mono text-[10px] uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
                                                    >
                                                        {showPassword ? "Hide" : "Show"}
                                                    </button>
                                                </div>
                                                {/* {errors.password && (
                                                    <p className="mt-1.5 text-xs text-destructive">{errors.password}</p>
                                                )} */}
                                            </div>

                                            <label className="flex cursor-pointer items-center gap-2.5 pt-1">
                                                <input
                                                    type="checkbox"
                                                    checked={remember}
                                                    onChange={(e) => setRemember(e.target.checked)}
                                                    className="size-4 rounded border-border accent-[var(--accent)]"
                                                />
                                                <span className="text-xs text-muted-foreground">
                                                    Keep me signed in on this device
                                                </span>
                                            </label>

                                            <button
                                                type="submit"
                                                disabled={status === "submitting"}
                                                style={{ animation: `rise 0.6s ${EASE} 0.3s both` }}
                                                className="w-full rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-70"
                                            >
                                                {status === "submitting" ? "Signing you in…" : "Sign in"}
                                            </button>

                                            <p className="text-center text-xs text-muted-foreground">
                                                New to F&M Bank?{" "}
                                                <Link
                                                    href="/signup"
                                                    className="font-medium text-primary transition-colors hover:text-accent"
                                                >
                                                    Open an account
                                                </Link>
                                            </p>
                                        </form>
                                    </>
                                )}
                            </div>

                            {/* <p className="mt-5 text-center text-xs leading-relaxed text-muted-foreground">
                                F&M Bank is a fictional brand created for this prototype. Sign-in is illustrative
                                only. Equal Housing Lender.
                            </p> */}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
