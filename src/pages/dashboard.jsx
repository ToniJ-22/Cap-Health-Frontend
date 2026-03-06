import React, { useEffect, useState } from "react";
import Charts from "../components/Charts";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const [readings, setReadings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/readings")
      .then((res) => res.json())
      .then((data) => setReadings(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="dashboard">

      <h1>Health is Wealth Dashboard</h1>
      <p>Track your blood sugar and stay healthy.</p>

      <div className="dashboard-card">
        <Charts readings={readings} />
      </div>

  
      <div className="dashboard-card">
        <h2>Recent Readings</h2>

        <ul>
          {readings.slice(-5).map((r) => (
            <li key={r.id}>
              <strong>{r.level} mg/dL</strong> — {r.time}
            </li>
          ))}
        </ul>

      </div>

      <div className="dashboard-card">

        <h2>Managing Blood Sugar</h2>

        <h3>Low Sugar (Below 70)</h3>
        <p>Eat fast acting carbs like fruit juice or glucose tablets.</p>

        <h3>Normal Sugar (70-140)</h3>
        <p>Maintain balanced meals, regular exercise, and hydration.</p>

        <h3>High Sugar (Above 140)</h3>
        <p>Drink water, take a short walk, and avoid sugary foods.</p>

      </div>

      <div className="dashboard-buttons">

        <button onClick={() => navigate("/readings")}>
          Add Reading
        </button>

        <button onClick={() => navigate("/meals")}>
          Add Meal
        </button>

      </div>

    </div>
  );
}

export default Dashboard;