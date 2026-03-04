import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddMeal() {
  const [date, setDate] = useState('');
  const [mealName, setMealName] = useState('');
  const [carbs, setCarbs] = useState('');
  const [sugars,setSugars] = useState("");
  const [notes, setNotes] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    await postMeal({ date, mealName, carbs: Number(carbs), notes });
    navigate('/dashboard');
  };

  return (
    <div className="page">
      <h2>Add Meal</h2>
      <form onSubmit={submit} className="form">
        <label>Date</label>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
        <label>Meal Name</label>
        <input type="text" value={mealName} onChange={e => setMealName(e.target.value)} required />
        <label>Carbs (g)</label>
        <input type="number" value={carbs} onChange={e => setCarbs(e.target.value)} required />
        <label>Sugars</label>
        <input type="number" value={carbs} onChange={e => setSugars(e.target.value)} required />
        <label>Notes</label>
        <textarea value={notes} onChange={e => setNotes(e.target.value)} />
        <button type="submit">Add Meal</button>
      </form>
    </div>
  );
}
