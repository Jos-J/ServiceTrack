// client/src/pages/Logout.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { clearToken } from "../auth/auth";
import { logout as logoutApi } from "../api/auth.api";
import { useMeContext } from "../auth/MeProvider";

export default function Logout() {
  const navigate = useNavigate();
  const { setMe } = useMeContext(); // ✅ clear user immediately

  useEffect(() => {
    (async () => {
      try {
        await logoutApi(); // optional server call
      } catch {
        // ignore
      } finally {
        clearToken();  // remove token
        setMe(null);   // ✅ remove profile from context (navbar updates immediately)
        navigate("/login", { replace: true });
      }
    })();
  }, [navigate, setMe]);

  return (
    <div className="flex justify-center pt-40">
      <p className="flex items-center gap-2 text-lg font-medium">
        <span className="animate-wave">👋</span>
        Thank you for visiting—come back soon!
      </p>
    </div>
  );
}
