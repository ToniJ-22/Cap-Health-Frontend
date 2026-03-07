import React, { useEffect, useState } from "react";
import Charts from "../components/Charts";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const [readings, setReadings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchReadings();
  }, []);

  const fetchReadings = async () => {
    const res = await fetch("http://localhost:5000/api/readings");
    const data = await res.json();
    setReadings(data);
  };

  const deleteReading = async (id) => {
    await fetch(`http://localhost:5000/api/readings/${id}`, {
      method: "DELETE"
    });

    setReadings(readings.filter((r) => r.id !== id));
  };

  const editReading = async (id) => {
    const newLevel = prompt("Enter new glucose level");

    if (!newLevel) return;

    const res = await fetch(`http://localhost:5000/api/readings/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        level: Number(newLevel)
      })
    });

    const updated = await res.json();

    setReadings(
      readings.map((r) =>
        r.id === id ? updated : r
      )
    );
  };

  function formatTime(time) {
    if (!time) return "";

    let [hours, minutes] = time.split(":");
    hours = parseInt(hours);

    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    return `${hours}:${minutes} ${ampm}`;
  }

  return (
    <div className="dashboard">

      <h1>Welcome to your Dashboard</h1>
      <p>Track your blood sugar and stay healthy.</p>

      <h2 className="chart-title">Blood Sugar Trend</h2>

      <div className="dashboard-card">
        <Charts readings={readings} />
      </div>

      <div className="dashboard-card">

        <h2>Recent Readings</h2>

        <ul>
          {readings
            .filter((r) => r.level && r.time)
            .slice(-5)
            .reverse()
            .map((r) => (

              <li key={r.id}>

                <strong>{r.level} mg/dL</strong> — {formatTime(r.time)}

                <div className="crud-buttons">

                  <button
                    onClick={() => editReading(r.id)}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteReading(r.id)}
                  >
                    Delete
                  </button>

                </div>

              </li>

            ))}
        </ul>

      </div>

      <div className="dashboard-card">

        <h2>Managing Blood Sugar</h2>

        <div className="sugar-cards">

          <div className="sugar-card low">
            <h3>Low Sugar (Below 70)</h3>
            <p>Eat fast acting carbs like fruit juice or glucose tablets.</p>
          </div>

          <div className="sugar-card normal">
            <h3>Normal Sugar (70-140)</h3>
            <p>Maintain balanced meals, regular exercise, and hydration.</p>
          </div>

          <div className="sugar-card high">
            <h3>High Sugar (Above 140)</h3>
            <p>Drink water, take a short walk, and avoid sugary foods.</p>
          </div>

        </div>

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