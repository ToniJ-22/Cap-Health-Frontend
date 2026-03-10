import { useState, useEffect } from "react";

export default function Meals() {
  const [meals, setMeals] = useState([]);
  const [date, setDate] = useState("");
  const [mealName, setMealName] = useState("");
  const [foodInput, setFoodInput] = useState("");
  const [carbs, setCarbs] = useState("");
  const [sugars, setSugars] = useState("");
  const [protein, setProtein] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [rewardPopup, setRewardPopup] = useState(null);

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/meals");
      const data = await res.json();
      setMeals(data);
    } catch (error) {
      console.error("Error fetching meals:", error);
    }
  };

  const submitMeal = async (e) => {
    e.preventDefault();
    if (!date || !mealName) return;

    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `http://localhost:5000/api/meals/${editingId}`
      : "http://localhost:5000/api/meals";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date,
          mealName,
          food: foodInput,
          carbs: Number(carbs),
          sugars: Number(sugars),
          protein: Number(protein),
        }),
      });

      const updatedMeal = await res.json();

      if (editingId) {
        setMeals((prev) =>
          prev.map((m) => (m.id === editingId ? updatedMeal : m))
        );
      } else {
        setMeals((prev) => [...prev, updatedMeal]);

        const current = Number(localStorage.getItem("rewardBalance")) || 0;
        localStorage.setItem("rewardBalance", current + 3);

        setRewardPopup(3);
        setTimeout(() => setRewardPopup(null), 2500);
      }

      clearForm();
    } catch (error) {
      console.error("Error saving meal:", error);
    }
  };

  const deleteMeal = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/meals/${id}`, {
        method: "DELETE",
      });
      setMeals((prev) => prev.filter((m) => m.id !== id));
    } catch (error) {
      console.error("Error deleting meal:", error);
    }
  };

  const startEdit = (meal) => {
    setEditingId(meal.id);
    setDate(meal.date);
    setMealName(meal.mealName);
    setFoodInput(meal.food || "");
    setCarbs(meal.carbs);
    setSugars(meal.sugars);
    setProtein(meal.protein || "");
  };

  const clearForm = () => {
    setEditingId(null);
    setDate("");
    setMealName("");
    setFoodInput("");
    setCarbs("");
    setSugars("");
    setProtein("");
  };

  return (
    <div className="page">
      <div className="card">
        <h2>{editingId ? "Edit Meal" : "Add Meal"}</h2>

        <form onSubmit={submitMeal}>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <input
            type="text"
            placeholder="Breakfast / Lunch / Dinner"
            value={mealName}
            onChange={(e) => setMealName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Enter foods (ex: spaghetti, meatballs, garlic bread)"
            value={foodInput}
            onChange={(e) => setFoodInput(e.target.value)}
          />

          <input
            type="number"
            placeholder="Carbs (g)"
            value={carbs}
            onChange={(e) => setCarbs(e.target.value)}
          />

          <input
            type="number"
            placeholder="Sugars (g)"
            value={sugars}
            onChange={(e) => setSugars(e.target.value)}
          />

          <input
            type="number"
            placeholder="Protein (g)"
            value={protein}
            onChange={(e) => setProtein(e.target.value)}
          />

          <button type="submit">
            {editingId ? "Update Meal" : "Add Meal"}
          </button>
        </form>
      </div>

      <div className="card">
        <h2>Meal History</h2>

        {meals.map((meal) => (
          <div key={meal.id} className="meal-item">
            <div>
              <strong>{meal.mealName}</strong>
              <p>{meal.date}</p>
              <p>{meal.food}</p>
              <p>
                Carbs: {meal.carbs}g | Sugars: {meal.sugars}g | Protein:{" "}
                {meal.protein}g
              </p>
            </div>

            <div className="crud-buttons">
              <button onClick={() => startEdit(meal)}>Edit</button>
              <button onClick={() => deleteMeal(meal.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {rewardPopup && (
        <div className="reward-popup">
          +${rewardPopup} 💰
        </div>
      )}
    </div>
  );
}