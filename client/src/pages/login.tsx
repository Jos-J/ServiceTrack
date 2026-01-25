//client/src/pages/login.tsx
import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import MyButton from "../components/button";
import { setToken } from "../auth/auth";
import { useMeContext } from "../auth/MeProvider";
import { login } from "../api/auth.api";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

   const { refreshMe } = useMeContext(); // ✅ hooks at top level

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Where the user was trying to go before being redirected to login
  const from = (location.state as any)?.from?.pathname || "/garage";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      // username field is really email
      const result = await login(username, password);

      // IMPORTANT: store RAW JWT (no "Bearer ")
      setToken(result.data.token);

      

      setToken(result.data.token);
      await refreshMe();

      navigate(from, { replace: true });
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Login failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex justify-center pt-40">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
        <h1 className="text-xl font-bold mb-4">Login</h1>
        {error && (
          <div className="rounded border border-red-300 bg-red-50 p-2 text-red-700">
            {error}
          </div>
        )}
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded"
        />

        <label htmlFor="pword">Password:</label>
        <input
          type="password"
          id="pword"
          name="pword"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
        />

        <MyButton type="submit" label={loading ? "logging in..." : "Login"} disabled={loading} />

        <p className="mt-2 text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-blue-500 underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}


