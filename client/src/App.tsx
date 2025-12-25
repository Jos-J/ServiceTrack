// client/src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";

import Garage from "./pages/Garage";
import AddVehicle from "./pages/AddVehicle";
import VehicleDetails from "./pages/VehicleDetails";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Navbar /> {/* always visible */}
        <Routes>
          {/* Public landing */}
          <Route path="/" element={<Home />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />

          {/* Main app */}
          <Route path="/garage" element={<Garage />} />
          <Route path="/add-vehicle" element={<AddVehicle />} />
          <Route path="/vehicle/:id" element={<VehicleDetails />} />

          {/* Backward compatibility redirects */}
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/addVehicle" element={<Navigate to="/add-vehicle" replace />} />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

