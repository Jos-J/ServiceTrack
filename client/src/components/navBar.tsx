// src/components/Navbar.tsx
import { Link } from "react-router-dom";

// src/components/Navbar.tsx
export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex gap-4">
      <Link className="hover:text-yellow-400 px-3 py-2 rounded" to="/home">Home</Link>
      <Link className="hover:text-yellow-400 px-3 py-2 rounded" to="/">Garage</Link>
      <Link className="hover:text-green-400 px-3 py-2 rounded" to="/addVehicle">Add Vehicle</Link>
      <Link className="hover:text-yellow-400 px-3 py-2 rounded" to="/vehicle/1">Vehicle Details</Link>
      <Link className="hover:text-yellow-400 px-3 py-2 rounded" to="/login">Login</Link>
      <Link className="hover:text-yellow-400 px-3 py-2 rounded" to="/register">Register</Link>
      <Link className="ml-auto hover:text-green-400 px-3 py-2 rounded" to="/logout">Logout</Link>
    </nav>
  );
}
