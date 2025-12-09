import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navBar";
import Garage from "./pages/garage";
import AddVehicle from "./pages/addVehicle";
import VehicleDetails from "./pages/vehicleDetails";
import Login from "./pages/login";
import Register from "./pages/register";
// import './styles/App.css'

function App() {
  return (
    <BrowserRouter>
     {/* Apply background and min height here */}
     <div className="min-h-screen bg-gray-100">
    <Navbar />
    <Routes>
      <Route path="/" element={<Garage />} />
      <Route path="/addVehicle" element={<AddVehicle />} />
      <Route path="/vehicle/:id" element={<VehicleDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App
