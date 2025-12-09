import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navBar";
import Garage from "./pages/garage";
import AddVin from "./pages/addVin";
import VinDetail from "./pages/vinDetail";
import Login from "./pages/login";
import Register from "./pages/register";
import './styles/App.css'

function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Garage />} />
      <Route path="/addVin" element={<AddVin />} />
      <Route path="/vin/:id" element={<VinDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
