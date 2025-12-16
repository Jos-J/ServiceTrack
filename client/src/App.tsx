import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navBar";
import Garage from "./pages/garage";
import AddVehicle from "./pages/addVehicle";
import VehicleDetails from "./pages/vehicleDetails";
import Login from "./pages/login";
import Register from "./pages/register";
import Logout from "./pages/logout";
import Home from "./pages/home";
// import './styles/App.css'

function App() {
  return (
    <BrowserRouter>
  <div className="min-h-screen bg-gray-100">
    <Navbar /> {/* always visible */}
    <Routes>
      {/* Public pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Main app pages */}
      <Route path="/" element={<Garage />} />
      <Route path="/addVehicle" element={<AddVehicle />} />
      <Route path="/vehicle/:id" element={<VehicleDetails />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  </div>
</BrowserRouter>
  )
}

export default App
