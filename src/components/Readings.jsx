import { useState, useEffect } from "react";

function ReadingForm() {
  const [readings, setReadings] = useState([]);
  const [time, setTime] = useState("");
  const [level, setLevel] = useState("");

  useEffect(() => {
    fetchReadings();
  }, []);

  const fetchReadings = async () => {
    const res = await fetch("http://localhost:5000/api/readings");
    const data = await res.json();
    setReadings(data);
  };

  const addReading = async () => {
    await fetch("http://localhost:5000/api/readings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ time, level })
    });

    fetchReadings();
  };

  return (
    <div style={{ border: "1px solid gray", padding: "15px" }}>
      <h3>Log Blood Sugar</h3>

      <input
        type="text"
        placeholder="Time (Morning, Evening)"
        onChange={(e) => setTime(e.target.value)}
      />

      <input
        type="number"
        placeholder="Glucose Level"
        onChange={(e) => setLevel(e.target.value)}
      />

      <button onClick={addReading}>Add</button>

      <ul>
        {readings.map((r) => (
          <li key={r.id}>
            {r.time} - {r.level} mg/dL
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReadingForm;