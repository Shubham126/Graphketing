import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddTeacher = ({ sidebar, header }) => {
  const [form, setForm] = useState({
    name: "",
    department: "",
    status: "",
    studentCount: "",
    teacherId: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.teacherId) {
      setError("Teacher ID is required");
      return;
    }
    const newTeacher = {
      ...form,
      studentCount: Number(form.studentCount),
      email: form.name.toLowerCase().replace(/ /g, '.') + '@school.edu',
    };
    const res = await fetch('http://localhost:5000/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTeacher)
    });
    if (res.status === 400) {
      const data = await res.json();
      setError(data.error || 'Teacher ID already exists');
      return;
    }
    navigate("/");
  };
  return (
    <div className="app-root">
      {sidebar}
      <main className="main-content">
        {header}
        <div className="content-area">
          <div className="modal add-teacher-modal" style={{ margin: "40px auto", maxWidth: 400 }}>
            <h2>Add Teacher</h2>
            <form onSubmit={handleSubmit}>
              <input name="name" value={form.name} onChange={handleChange} placeholder="Enter the name" required />
              <input name="department" value={form.department} onChange={handleChange} placeholder="Enter the department" required />
              <select name="status" value={form.status} onChange={handleChange} required>
                <option value="" disabled>Select the Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Blocked">Blocked</option>
                <option value="Suspended">Suspended</option>
              </select>
              <input name="studentCount" type="number" min="0" value={form.studentCount} onChange={handleChange} placeholder="Enter the student count" required />
              <input name="teacherId" value={form.teacherId} onChange={handleChange} placeholder="Enter the Teacher ID" required />
              {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
              <div className="modal-actions">
                <button type="submit">Add</button>
                <button type="button" onClick={() => navigate("/")}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddTeacher; 