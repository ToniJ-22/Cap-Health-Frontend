import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/dashboard";
import Meals from "./pages/meals";
import Readings from "./pages/readings";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/meals" element={<Meals />} />
        <Route path="/readings" element={<Readings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
