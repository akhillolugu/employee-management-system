import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = () => {
    axios.get("http://localhost:8080/api/employees")
      .then(response => setEmployees(response.data))
      .catch(error => console.error(error));
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const deleteEmployee = (id) => {
    axios.delete(`http://localhost:8080/api/employees/${id}`)
      .then(() => fetchEmployees())
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h2>Employees</h2>
      <Link to="/add"><button>Add Employee</button></Link>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>
                <Link to={`/edit/${emp.id}`}><button>Edit</button></Link>
                <button onClick={() => deleteEmployee(emp.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;