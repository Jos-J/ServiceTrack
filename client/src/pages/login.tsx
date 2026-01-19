//client/src/pages/login.tsx
import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import MyButton from "../components/button";
import { setToken } from "../auth/auth";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Where the user was trying to go before being redirected to login
  const from = (location.state as any)?.from?.pathname || "/garage";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 🔐 Fake login (replace later with real API call)
    const fakeToken = `fake-${Date.now()}`;
    setToken(fakeToken);

    // Redirect back to intended page
    navigate(from, { replace: true });
  };

  return (
    <div className="flex justify-center pt-40">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
        <h1 className="text-xl font-bold mb-4">Login</h1>

        <label htmlFor="uname">Username:</label>
        <input
          type="text"
          id="uname"
          name="uname"
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

        <MyButton type="submit" label="Login" />

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


