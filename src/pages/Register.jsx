import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    diagnosis: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    console.log("User Registered:", formData);

    navigate("/");
  };

  return (
    <div className="auth-container">
      <div className="card">

        <h2>Create Account</h2>
<form onSubmit={handleRegister}>

  <div className="name-row">
    <input
      type="text"
      name="firstName"
      placeholder="First Name"
      onChange={handleChange}
      required
    />

    <input
      type="text"
      name="lastName"
      placeholder="Last Name"
      onChange={handleChange}
      required
    />
  </div>

  <div className="input-row">
    <input
      type="email"
      name="email"
      placeholder="Email"
      onChange={handleChange}
      required
    />

    <input
      type="password"
      name="password"
      placeholder="Password"
      onChange={handleChange}
      required
    />
  </div>

  <div className="radio-group">
    <label>
      <input
        type="radio"
        name="gender"
        value="Male"
        onChange={handleChange}
      />
      Male
    </label>

    <label>
      <input
        type="radio"
        name="gender"
        value="Female"
        onChange={handleChange}
      />
      Female
    </label>
  </div>

  <select name="diagnosis" onChange={handleChange} required>
    <option value="">Select Diagnosis</option>
    <option value="Type 1 Diabetes">Type 1 Diabetes</option>
    <option value="Type 2 Diabetes">Type 2 Diabetes</option>
    <option value="Pre-Diabetic">Pre-Diabetic</option>
    <option value="Gestational Diabetes">Gestational Diabetes</option>
  </select>

  <button type="submit">Create Account</button>

</form>

      </div>
    </div>
  );
}

export default Register;