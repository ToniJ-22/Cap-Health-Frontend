import { useState, useEffect } from "react";

function ReadingForm() {
  const [readings, setReadings] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [level, setLevel] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [rewardPopup, setRewardPopup] = useState(null);

  useEffect(() => {
    fetchReadings();
  }, []);

  const fetchReadings = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/readings");
      const data = await res.json();
      setReadings(data);
    } catch (error) {
      console.error("Error fetching readings:", error);
    }
  };

  const addReading = async () => {
    if (!date || !time || !level) return;

    try {
      const res = await fetch("http://localhost:5000/api/readings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date,
          time,
          level: Number(level),
        }),
      });

      const newReading = await res.json();
      setReadings([...readings, newReading]);

      const current = Number(localStorage.getItem("rewardBalance")) || 0;
      localStorage.setItem("rewardBalance", current + 5);

      setRewardPopup(5);
      setTimeout(() => setRewardPopup(null), 2500);

      clearForm();
    } catch (error) {
      console.error("Error adding reading:", error);
    }
  };

  const updateReading = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/readings/${editingId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            date,
            time,
            level: Number(level),
          }),
        }
      );

      const updatedReading = await res.json();

      setReadings(
        readings.map((r) =>
          r.id === editingId ? updatedReading : r
        )
      );

      clearForm();
    } catch (error) {
      console.error("Error updating reading:", error);
    }
  };

  const deleteReading = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/readings/${id}`, {
        method: "DELETE",
      });

      setReadings(readings.filter((r) => r.id !== id));
    } catch (error) {
      console.error("Error deleting reading:", error);
    }
  };

  const startEdit = (reading) => {
    setEditingId(reading.id);
    setDate(reading.date);
    setTime(reading.time);
    setLevel(reading.level);
  };

  const clearForm = () => {
    setEditingId(null);
    setDate("");
    setTime("");
    setLevel("");
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
    <div className="page">

      <div className="card">
        <h2>{editingId ? "Edit Reading" : "Log New Reading"}</h2>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <input
          type="number"
          placeholder="Glucose Level (mg/dL)"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        />

        {editingId ? (
          <button onClick={updateReading}>Update Reading</button>
        ) : (
          <button onClick={addReading}>Add Reading</button>
        )}
      </div>

      <div className="card">
        <h2>Reading History</h2>

        <ul>
          {readings.map((r) => (
            <li key={r.id}>
              <div>
                <strong>{r.level} mg/dL</strong>
                <br />
                {r.date} at {formatTime(r.time)}
              </div>

              <div className="crud-buttons">
                <button onClick={() => startEdit(r)}>Edit</button>
                <button onClick={() => deleteReading(r.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {rewardPopup && (
        <div className="reward-popup">
          +${rewardPopup}
          <span className="coin">💰</span>
        </div>
      )}

    </div>
  );
}

export default ReadingForm;