// client/src/pages/Logout.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { clearToken } from "../auth/auth";
import { logout as logoutApi } from "../api/auth.api";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        // server call
        await logoutApi();
      } catch {
        // ignore
      } finally {
        clearToken();              //  logs out
        navigate("/login", { replace: true }); // reroutes go back to Home
      }
    })();
  }, [navigate]);


  return (
    <div className="flex justify-center pt-40">
      <p className="flex items-center gap-2 text-lg font-medium">
        <span className="animate-wave">👋</span>
        Thank you for visiting—come back soon!
      </p>
    </div>
  );
}
