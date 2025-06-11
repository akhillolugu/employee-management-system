import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddEmployee() {
  const [employee, setEmployee] = useState({ name: '', email: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/api/employees", employee)
      .then(() => navigate("/"))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit}>
        <label>Name: <input type="text" name="name" value={employee.name} onChange={handleChange} required /></label><br />
        <label>Email: <input type="email" name="email" value={employee.email} onChange={handleChange} required /></label><br />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddEmployee;