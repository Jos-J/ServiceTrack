// client/src/pages/Logout.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { clearToken } from "../auth/auth";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    clearToken();              // ✅ actually logs out
    navigate("/", { replace: true }); // ✅ go back to Home
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
