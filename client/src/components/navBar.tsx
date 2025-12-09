import { Link } from "react-router-dom";

export default function Navbar(){
    return (
        <nav>
            <Link to="/">Garage</Link>
            <Link to="/addVin">Add Vin</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
        </nav>
    )
}