import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "15px", background: "#222" }}>
      <Link to="/" style={{ color: "white", marginRight: "15px" }}>Home</Link>
      <Link to="/dashboard" style={{ color: "white", marginRight: "15px" }}>Dashboard</Link>
      <Link to="/meals" style={{ color: "white", marginRight: "15px" }}>Meals</Link>
      <Link to="/readings" style={{ color: "white" }}>Readings</Link>
    </nav>
  );
}

export default Navbar;