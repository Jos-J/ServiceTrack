// client/src/App.tsx
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";
import { useEffect } from "react";
import { getToken, clearToken } from "./auth/auth";
import { me } from "./api/auth.api";

function App() {
  useEffect(() => {
    const token = getToken();
    if (!token) return;

    (async () => {
      
      try {
        await me(); // validates token
      } catch {
        clearToken(); // invalid token -> forced logout
      }
    })();
  }, [])

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
