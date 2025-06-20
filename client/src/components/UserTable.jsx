import React, { useState } from "react";

const statusOptions = ["Active", "Inactive", "Blocked", "Suspended"];

const UserTable = ({ users }) => {
  const [openIdx, setOpenIdx] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [userList, setUserList] = useState(users);

  React.useEffect(() => {
    setUserList(users);
  }, [users]);

  const handleStatusChange = async (user, newStatus, idx) => {
    setUpdating(true);
    await fetch(`http://localhost:5000/api/users/${user._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
    const updated = userList.map((u, i) => i === idx ? { ...u, status: newStatus } : u);
    setUserList(updated);
    setOpenIdx(null);
    setUpdating(false);
  };

  return (
    <table className="user-table">
      <thead>
        <tr className="user-table-header">
          <th>Record ID</th>
          <th>Teacher Name</th>
          <th>Teacher Id</th>
          <th>Department</th>
          <th>Student</th>
          <th>Status</th>
          <th>All Details</th>
        </tr>
      </thead>
      <tbody>
        {userList.length === 0 ? (
          <tr>
            <td colSpan="7" className="user-table-empty">No users found.</td>
          </tr>
        ) : (
          userList.map((user, idx) => (
            <tr key={user._id}>
              <td>{user.recordId}</td>
              <td>{user.name}</td>
              <td>{user.teacherId}</td>
              <td>{user.department}</td>
              <td>{user.studentCount}</td>
              <td style={{ position: 'relative' }}>
                <span className="status-cell">
                  <span className={`status-dot ${user.status?.toLowerCase()}`}></span>
                  <span className={`status-text ${user.status?.toLowerCase()}`}>{user.status}</span>
                  <span
                    className="status-arrow"
                    style={{ cursor: 'pointer' }}
                    onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                  >&#9660;</span>
                </span>
                {openIdx === idx && (
                  <div className="status-dropdown">
                    {statusOptions.map(opt => (
                      <div
                        key={opt}
                        className={`status-dropdown-option${user.status === opt ? ' selected' : ''}`}
                        onClick={() => handleStatusChange(user, opt, idx)}
                        style={{ cursor: updating ? 'not-allowed' : 'pointer' }}
                      >
                        <span className={`status-dot ${opt.toLowerCase()}`}></span> {opt}
                      </div>
                    ))}
                  </div>
                )}
              </td>
              <td>
                <a href={`/user/${user._id}`}>View More &gt;</a>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default UserTable; 