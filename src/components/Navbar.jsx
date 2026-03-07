import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">

      <h1 className="logo">Health Is Wealth</h1>

      <Link to="/">Home</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/login">Sign In</Link>
    </nav>
  );
}

export default Navbar;