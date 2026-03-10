import React, { useEffect, useState } from "react";
import Charts from "../components/Charts";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [readings, setReadings] = useState([]);
  const [rewardBalance, setRewardBalance] = useState(0);
  const [rewardPopup, setRewardPopup] = useState(null);
  const [firstName, setFirstName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchReadings();
    loadRewardBalance();

    const name = localStorage.getItem("userName");
    if (name) setFirstName(name);

    const handleReward = (event) => {
      const amount = event.detail.amount;
      const updatedBalance =
        Number(localStorage.getItem("rewardBalance")) || 0;

      setRewardBalance(updatedBalance);
      setRewardPopup(amount);

      setTimeout(() => setRewardPopup(null), 2000);
    };

    window.addEventListener("rewardEarned", handleReward);
    return () => window.removeEventListener("rewardEarned", handleReward);
  }, []);

  const loadRewardBalance = () => {
    const balance = Number(localStorage.getItem("rewardBalance")) || 0;
    setRewardBalance(balance);
  };

  const fetchReadings = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/readings");
      const data = await res.json();
      setReadings(data);
    } catch (error) {
      console.error("Error fetching readings:", error);
    }
  };

  const deleteReading = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/readings/${id}`, {
        method: "DELETE",
      });
      setReadings(readings.filter((r) => r.id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const editReading = async (id) => {
    const newLevel = prompt("Enter new glucose level");
    if (!newLevel) return;

    try {
      await fetch(`http://localhost:5000/api/readings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ level: Number(newLevel) }),
      });

      fetchReadings();
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const formatTime = (time) => {
    if (!time) return "";
    let [hours, minutes] = time.split(":");
    hours = parseInt(hours);
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${ampm}`;
  };

  return (
    <div className="dashboard">
      
      {rewardPopup && (
        <div className="reward-popup">
          +${rewardPopup} Earned!
        </div>
      )}

      <h1 className="dashboard-title">
        {firstName
          ? `Welcome back, ${firstName}!`
          : "Welcome to your Dashboard"}
      </h1>

      <p className="dashboard-subtext">
        Track your blood sugar and stay healthy.
      </p>

      <h2 className="chart-title">Blood Sugar Trend</h2>

      <div className="dashboard-card">
        <Charts readings={readings} />
      </div>
     <div className="dashboard-buttons">
        <button onClick={() => navigate("/readings")}>
          Add Reading
        </button>

        <button onClick={() => navigate("/meals")}>
          Add Meal
        </button>
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
                <div>
                  <strong>{r.level} mg/dL</strong>
                  <br />
                  {r.date} at {formatTime(r.time)}
                </div>

                <div className="crud-buttons">
                  <button onClick={() => editReading(r.id)}>Edit</button>
                  <button onClick={() => deleteReading(r.id)}>Delete</button>
                </div>
              </li>
            ))}
        </ul>
      </div>

      <div className="dashboard-card">
        <h2>Managing Blood Sugar</h2>
        <div className="sugar-cards">
          <div className="sugar-card low">
            <h3>Low (Below 70)</h3>
            <p>Eat fast-acting carbs like juice or glucose tablets.</p>
          </div>

          <div className="sugar-card normal">
            <h3>Normal (70–140)</h3>
            <p>Maintain balanced meals, exercise, and hydration.</p>
          </div>

          <div className="sugar-card high">
            <h3>High (Above 140)</h3>
            <p>Drink water, take a short walk, avoid sugary foods.</p>
          </div>
        </div>
      </div>

      <div className="dashboard-card">
        <h2>Nutrition Guide</h2>
        <div className="nutrition-section">

          <div className="nutrition-block">
            <h3>🥗 Best Foods</h3>
            <ul>
              <li>Leafy greens</li>
              <li>Whole grains</li>
              <li>Lean proteins</li>
              <li>Beans & legumes</li>
              <li>Low-glycemic fruits</li>
            </ul>
          </div>

          <div className="nutrition-block">
            <h3>💧 Best Drinks</h3>
            <ul>
              <li>Water</li>
              <li>Unsweetened tea</li>
              <li>Black coffee (moderation)</li>
              <li>Infused water</li>
            </ul>
          </div>

          <div className="nutrition-block avoid">
            <h3>⚠️ Limit</h3>
            <ul>
              <li>Sugary drinks</li>
              <li>Refined carbs</li>
              <li>Fried foods</li>
              <li>Processed snacks</li>
            </ul>
          </div>

        </div>
      </div>

   
      <div className="dashboard-card">
        <h2>Wallet</h2>
        <div className="wallet-content">
          <p className="wallet-balance">${rewardBalance}</p>
        </div>
      </div>


    </div>
  );
}

export default Dashboard;