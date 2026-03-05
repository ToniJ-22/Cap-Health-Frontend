import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/meals">Meals</Link>
      <Link to="/readings">Readings</Link>
      <Link to="/login">Sign In</Link>
    </nav>
  );
}

export default Navbar;