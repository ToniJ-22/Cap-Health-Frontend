import { useState, useEffect } from "react";

export default function Meals() {

  const [meals, setMeals] = useState([]);
  const [date, setDate] = useState("");
  const [mealName, setMealName] = useState("");
  const [carbs, setCarbs] = useState("");
  const [sugars, setSugars] = useState("");
  const [notes, setNotes] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    const res = await fetch("http://localhost:5000/api/meals");
    const data = await res.json();
    setMeals(data);
  };

  const submitMeal = async (e) => {
    e.preventDefault();

    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `http://localhost:5000/api/meals/${editingId}`
      : "http://localhost:5000/api/meals";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date,
        mealName,
        carbs: Number(carbs),
        sugars: Number(sugars),
        notes
      })
    });

    clearForm();
    fetchMeals();
  };

  const deleteMeal = async (id) => {
    await fetch(`http://localhost:5000/api/meals/${id}`, {
      method: "DELETE"
    });

    fetchMeals();
  };

  const startEdit = (meal) => {
    setEditingId(meal.id);
    setDate(meal.date);
    setMealName(meal.mealName);
    setCarbs(meal.carbs);
    setSugars(meal.sugars);
    setNotes(meal.notes);
  };

  const clearForm = () => {
    setEditingId(null);
    setDate("");
    setMealName("");
    setCarbs("");
    setSugars("");
    setNotes("");
  };

  return (
    <div className="page">

      <div className="card">

        <h2 className="card-title">Add Meal</h2>

        <form onSubmit={submitMeal} className="form">

          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <label>Meal Name</label>
          <input
            type="text"
            value={mealName}
            onChange={(e) => setMealName(e.target.value)}
          />

          <label>Carbs</label>
          <input
            type="number"
            value={carbs}
            onChange={(e) => setCarbs(e.target.value)}
          />

          <label>Sugars</label>
          <input
            type="number"
            value={sugars}
            onChange={(e) => setSugars(e.target.value)}
          />

          <label>Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <button type="submit">
            {editingId ? "Update Meal" : "Add Meal"}
          </button>

        </form>

      </div>

      <div className="card">

        <h2 className="card-title">Meal History</h2>

        {meals.map((meal) => (
          <div key={meal.id} className="meal-item">

            <div>
              <strong>{meal.mealName}</strong>
              <p>{meal.date}</p>
              <p>Carbs: {meal.carbs}g | Sugars: {meal.sugars}g</p>
            </div>

            <div>

              <button onClick={() => startEdit(meal)}>
                Edit
              </button>

              <button onClick={() => deleteMeal(meal.id)}>
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}