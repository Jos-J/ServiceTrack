// client/src/routes/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";

/**
 * TEMPORARY:
 * Flip this to false to simulate logged-out behavior
 * Replace this logic once auth is implemented
 */
function isLoggedIn(): boolean {
  return true; // 👈 allow access for now
}

export default function ProtectedRoute() {
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
