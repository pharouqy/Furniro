import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

export default function AdminLogin() {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const login = useAuthStore((s) => s.login);
  const register = useAuthStore((s) => s.register);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isRegister) {
        await register(name, email, password);
      } else {
        await login(email, password);
      }
      navigate("/admin");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col justify-center items-center min-h-screen items-center justify-center bg-[var(--color-bg)] px-4">
      <div className="w-full max-w-sm rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-8 shadow-sm">
        <div className="mb-6 text-center">
          <h1 className="text-[var(--text-2xl)] font-extrabold text-[var(--color-text)]">Furniro Admin</h1>
          <p className="mt-1 text-[var(--text-sm)] text-[var(--color-text-muted)]">
            {isRegister ? "Create an admin account" : "Sign in to manage orders"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="text-sm font-bold text-[var(--color-text)]">Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="field-control mt-1"
                placeholder="Admin name"
              />
            </div>
          )}

          <div>
            <label className="text-sm font-bold text-[var(--color-text)]">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="field-control mt-1"
              placeholder="admin@furniro.com"
            />
          </div>

          <div>
            <label className="text-sm font-bold text-[var(--color-text)]">Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="field-control mt-1"
              placeholder="Min 6 characters"
            />
          </div>

          {error && (
            <p className="animate-shake rounded-md bg-[var(--color-error-muted)] px-3 py-2 text-xs font-semibold text-[var(--color-error)]">
              {error}
            </p>
          )}

          <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
            {loading ? "Please wait..." : isRegister ? "Register" : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[var(--color-text-muted)]">
          {isRegister ? "Already have an account?" : "No account yet?"}{" "}
          <button
            onClick={() => { setIsRegister(!isRegister); setError(""); }}
            className="font-bold text-[var(--color-primary)] hover:underline"
          >
            {isRegister ? "Sign In" : "Register"}
          </button>
        </p>
      </div>
    </main>
  );
}
