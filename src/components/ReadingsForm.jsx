import { useState, useEffect } from "react";


function ReadingForm() {
  const [readings, setReadings] = useState([]);
  const [date, setDate] = useState("");
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
  if (!date || !time || !level) return;

  await fetch("http://localhost:5000/api/readings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      date,
      time,
      level: Number(level),
    }),
  });

  setDate("");
  setTime("");
  setLevel("");

  fetchReadings();
};

  return (
    <div className="card">
      <h2>Blood Sugar Tracker</h2>

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
        placeholder="Glucose Level"
        value={level}
        onChange={(e) => setLevel(e.target.value)}
      />

      <button onClick={addReading}>Add Reading</button>

      <ul>
        {readings.map((r) => (
          <li key={r.id}>
            <div>
              <strong>{r.level} mg/dL</strong>
              <br />
              {r.date} at {formatTime(r.time)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function formatTime(time) {
  if (!time) return "";

  let [hours, minutes] = time.split(":");
  hours = parseInt(hours);

  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  return `${hours}:${minutes} ${ampm}`;
}

export default ReadingForm;