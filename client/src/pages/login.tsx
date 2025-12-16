import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import MyButton from "../components/button";

export default function Login() {
  const navigate = useNavigate(); // for programmatic navigation
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // prevent page reload

    // TODO: Add login validation here
    // If login successful, redirect to home
    navigate("/home");
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

        {/* Submit button */}
        <MyButton type="submit" label="Login" />

        {/* Link to register for new users */}
        <p className="mt-2 text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}


