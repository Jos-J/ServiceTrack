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

  const isTestBuild = import.meta.env.VITE_APP_ENV !== "productions";


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
          <div className="ml-auto flex items-center gap-3 px-3 py-2">
            {isTestBuild && (
              <span className="text-[10px] uppercase tracking-widest text-gray-300 opacity-80">
                TEST BUILD
              </span>
            )}

            <span className="text-gray-200">
              {displayName ? `Hi, ${displayName}` : me?.email ? `Hi, ${me.email}` : ""}
            </span>
          </div>

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



