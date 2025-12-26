// src/components/Navbar.tsx
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { isLoggedIn as checkLoggedIn } from "../auth/auth";

export default function Navbar() {
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState<boolean>(checkLoggedIn());

  // Re-check auth on navigation (covers login/logout redirects)
  useEffect(() => {
    setLoggedIn(checkLoggedIn());
  }, [location.pathname]);

  // Re-check auth if localStorage changes in another tab/window
  useEffect(() => {
    const onStorage = () => setLoggedIn(checkLoggedIn());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <nav className="bg-gray-800 text-white p-4 flex gap-4">
      <Link className="hover:text-yellow-400 px-3 py-2 rounded" to="/">
        Home
      </Link>

      {loggedIn ? (
        <>
          <Link className="hover:text-yellow-400 px-3 py-2 rounded" to="/garage">
            Garage
          </Link>

          <Link className="hover:text-green-400 px-3 py-2 rounded" to="/add-vehicle">
            Add Vehicle
          </Link>

          <Link className="hover:text-yellow-400 px-3 py-2 rounded" to="/vehicle/1">
            Vehicle Details
          </Link>

          <Link
            className="ml-auto hover:text-green-400 px-3 py-2 rounded"
            to="/logout"
          >
            Logout
          </Link>
        </>
      ) : (
        <>
          <Link className="hover:text-yellow-400 px-3 py-2 rounded" to="/login">
            Login
          </Link>

          <Link className="hover:text-yellow-400 px-3 py-2 rounded" to="/register">
            Register
          </Link>
        </>
      )}
    </nav>
  );
}


