// client/src/components/Navbar.tsx
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { isLoggedIn } from "../auth/auth";
import { useMeContext } from "../auth/MeProvider";

export default function Navbar() {
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState<boolean>(() => isLoggedIn());
  const { me } = useMeContext();
  const displayName = [me?.first_name, me?.last_name].filter(Boolean).join(" ");


  // Re-check auth on navigation (covers login/logout redirects)
  useEffect(() => {
    setLoggedIn(isLoggedIn());
  }, [location.pathname]);

  // Re-check auth if localStorage changes in another tab/window
  useEffect(() => {
    const onStorage = () => setLoggedIn(isLoggedIn());
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
          <Link className="hover:text-green-400 px-3 py-2 rounded" to="/service-types">
          Service Types
          </Link>

          <Link className="hover:text-yellow-400 px-3 py-2 rounded" to="/profile">
            Profile
          </Link>

          {/* push everything after this to the right */}
          <span className="ml-auto px-3 py-2 text-gray-200">
            {displayName ? `Hi, ${displayName}` : me?.email ? `Hi, ${me.email}` : ""}
          </span>

          <Link className="hover:text-green-400 px-3 py-2 rounded" to="/logout">
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



