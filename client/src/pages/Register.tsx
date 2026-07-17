// client/src/pages/register.tsx
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import MyButton from "../components/button";
import { setToken } from "../auth/auth";
import { register, login } from "../api/auth.api";

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const from = (location.state as any)?.from?.pathname || "/garage";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) return setError("Email is required.");
    if (!password) return setError("Password is required.");
    if (password.length < 8) return setError("Password must be at least 8 characters.");

    try {
      setLoading(true);

      // 1) Create the user
      await register({ email, password });

      // 2) Immediately login to get token
      const loggedIn = await login(email, password);

      // 3) store RAW JWT (no Bearer prefix)
      setToken(loggedIn.data.token);

      // 4) redirect
      navigate(from, { replace: true });
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Registration failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center pt-40">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
        <h1 className="text-xl font-bold mb-2">Register</h1>

        {error && (
          <div className="rounded border border-red-300 bg-red-50 p-2 text-red-700">
            {error}
          </div>
        )}

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
        />

        <MyButton
          type="submit"
          label={loading ? "Creating account..." : "Create account"}
          disabled={loading}
        />

        <p className="mt-2 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

