import { useState, useEffect } from "react";

function MealForm() {
  const [meals, setMeals] = useState([]);
  const [name, setName] = useState("");
  const [carbLevel, setCarbLevel] = useState("");

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    const res = await fetch("http://localhost:5000/api/meals");
    const data = await res.json();
    setMeals(data);
  };

  const addMeal = async () => {
    await fetch("http://localhost:5000/api/meals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, carbLevel })
    });

    fetchMeals();
  };

  return (
    <div style={{ border: "1px solid gray", padding: "15px" }}>
      <h3>Log Meal</h3>

      <input
        type="text"
        placeholder="Meal Name"
        onChange={(e) => setName(e.target.value)}
      />
      <select
        value={carbLevel}
        onChange={(e) => setCarbLevel(e.target.value)}
      >
        <option value="">Select Carb Level</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <button onClick={addMeal}>Add</button>

      <ul>
        {meals.map((m) => (
          <li key={m.id}>
            {m.name} - {m.carbLevel}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MealForm;