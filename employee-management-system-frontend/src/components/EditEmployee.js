import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditEmployee() {
  const { id } = useParams();
  const [employee, setEmployee] = useState({ name: '', email: '' });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8080/api/employees/${id}`)
      .then(response => setEmployee(response.data))
      .catch(error => console.error(error));
  }, [id]);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8080/api/employees/${id}`, employee)
      .then(() => navigate("/"))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Edit Employee</h2>
      <form onSubmit={handleSubmit}>
        <label>Name: <input type="text" name="name" value={employee.name} onChange={handleChange} required /></label><br />
        <label>Email: <input type="email" name="email" value={employee.email} onChange={handleChange} required /></label><br />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditEmployee;