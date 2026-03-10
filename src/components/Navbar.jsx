import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("userName");
    setIsLoggedIn(!!user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userName");
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="navbar">

      <h2 className="logo">Health Is Wealth</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>

        {!isLoggedIn ? (
          <Link to="/login">Sign In</Link>
        ) : (
          <button onClick={handleLogout}>Logout</button>
        )}
      </div>

    </nav>
  );
}

export default Navbar;