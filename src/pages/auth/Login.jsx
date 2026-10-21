import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Utensils,
} from "lucide-react";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../config/firebase";

function getAuthErrorMessage(error) {
  switch (error.code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "The email or password you entered is incorrect.";
    case "auth/invalid-email":
      return "Enter a valid email address.";
    case "auth/too-many-requests":
      return "Too many attempts. Please wait a moment and try again.";
    case "auth/network-request-failed":
      return "We couldn't connect. Check your internet connection and try again.";
    case "auth/operation-not-allowed":
      return "Email and password sign-in is not enabled for this project.";
    default:
      return "Something went wrong. Please try again.";
  }
}

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [notice, setNotice] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    setNotice(null);
    setIsSubmitting(true);

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      navigate("/dashboard", { replace: true });
    } catch (error) {
      setNotice({ type: "error", message: getAuthErrorMessage(error) });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handlePasswordReset() {
    setNotice(null);
    if (!email.trim()) {
      setNotice({
        type: "error",
        message: "Enter your email address above and then request a reset link.",
      });
      return;
    }

    setIsResetting(true);
    try {
      await sendPasswordResetEmail(auth, email.trim());
      setNotice({
        type: "success",
        message: "If an account exists for this email, a reset link is on its way.",
      });
    } catch (error) {
      setNotice({ type: "error", message: getAuthErrorMessage(error) });
    } finally {
      setIsResetting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f5f7f3] lg:grid lg:grid-cols-[1.05fr_0.95fr]">
      <section className="relative hidden min-h-screen overflow-hidden bg-[#083b20] p-12 text-white lg:flex lg:flex-col lg:justify-between xl:p-16">
        <div className="absolute -right-28 -top-28 h-96 w-96 rounded-full border border-white/10" />
        <div className="absolute -right-10 -top-10 h-60 w-60 rounded-full border border-white/10" />
        <div className="absolute -bottom-48 -left-28 h-[34rem] w-[34rem] rounded-full bg-[#a5c96a]/10 blur-3xl" />

        <Link to="/" className="relative z-10 inline-flex w-fit items-center gap-3 text-white">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#083b20]">
            <Utensils size={21} strokeWidth={2.2} />
          </span>
          <span className="text-lg font-bold tracking-tight">Meal Management</span>
        </Link>

        <div className="relative z-10 max-w-xl py-16">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#d5e8bd]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#b5d77e]" />
            Your kitchen, in sync
          </span>
          <h1 className="max-w-lg text-5xl font-semibold leading-[1.1] tracking-[-0.04em] xl:text-6xl">
            Good food starts with a well-run kitchen.
          </h1>
          <p className="mt-6 max-w-md text-base leading-7 text-white/70">
            Manage your menu, keep orders moving, and make every service a little smoother.
          </p>

          <div className="mt-12 flex max-w-md items-center gap-4 rounded-2xl border border-white/15 bg-white/[0.08] p-4 backdrop-blur-sm">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#d6e7bd] text-[#083b20]">
              <Utensils size={22} />
            </div>
            <div>
              <p className="font-semibold">Everything in one place</p>
              <p className="mt-1 text-sm text-white/65">Meals, categories, and orders at a glance</p>
            </div>
            <ArrowRight className="ml-auto text-white/55" size={18} />
          </div>
        </div>

        <p className="relative z-10 text-xs text-white/50">Made for the people behind every great meal.</p>
      </section>

      <section className="flex min-h-screen flex-col px-5 py-7 sm:px-10 lg:justify-center lg:px-12 xl:px-20">
        <Link to="/" className="inline-flex w-fit items-center gap-2.5 text-[#123d25] lg:hidden">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e4eddd]">
            <Utensils size={19} />
          </span>
          <span className="font-bold tracking-tight">Meal Management</span>
        </Link>

        <div className="mx-auto flex w-full max-w-[420px] flex-1 flex-col justify-center py-12 lg:flex-initial lg:py-0">
          <div className="mb-9">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#557452]">Admin portal</p>
            <h2 className="text-3xl font-semibold tracking-tight text-[#17221a] sm:text-[2.1rem]">Welcome back</h2>
            <p className="mt-2.5 text-[15px] leading-6 text-[#6b756d]">Sign in to manage your kitchen.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#26362a]">Email address</label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#8a968d]" size={18} />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="username"
                  autoFocus
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="h-12 w-full rounded-xl border border-[#dce3db] bg-white pl-11 pr-4 text-sm text-[#17221a] outline-none transition placeholder:text-[#a1aaa3] focus:border-[#39734a] focus:ring-4 focus:ring-[#39734a]/10"
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <label htmlFor="password" className="text-sm font-medium text-[#26362a]">Password</label>
                <button
                  type="button"
                  onClick={handlePasswordReset}
                  disabled={isResetting}
                  className="text-sm font-semibold text-[#347046] hover:text-[#205a32] disabled:opacity-60"
                >
                  {isResetting ? "Sending link…" : "Forgot password?"}
                </button>
              </div>
              <div className="relative">
                <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#8a968d]" size={18} />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  className="h-12 w-full rounded-xl border border-[#dce3db] bg-white pl-11 pr-12 text-sm text-[#17221a] outline-none transition placeholder:text-[#a1aaa3] focus:border-[#39734a] focus:ring-4 focus:ring-[#39734a]/10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-[#849087] hover:bg-[#f1f4f0] hover:text-[#35483a]"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {notice && (
              <p
                role={notice.type === "error" ? "alert" : "status"}
                className={`rounded-xl px-4 py-3 text-sm leading-5 ${
                  notice.type === "error"
                    ? "bg-[#fff0ee] text-[#a33228]"
                    : "bg-[#eaf4e8] text-[#285e34]"
                }`}
              >
                {notice.message}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0c4925] px-5 text-sm font-semibold text-white shadow-[0_5px_12px_rgba(8,67,29,0.16)] transition hover:bg-[#073a1c] focus:outline-none focus:ring-4 focus:ring-[#39734a]/25 disabled:cursor-wait disabled:opacity-70"
            >
              {isSubmitting ? "Signing in…" : "Sign in"}
              {!isSubmitting && <ArrowRight size={17} />}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-[#737e75]">
            Need access? Contact your administrator.
          </p>
        </div>

        <p className="text-center text-xs text-[#929b94] lg:absolute lg:bottom-7 lg:right-12 xl:right-20">
          Secure access for your team
        </p>
      </section>
    </main>
  );
}
