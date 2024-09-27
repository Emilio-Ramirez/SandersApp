import axios from 'axios';
import React, { useState, useEffect } from 'react';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', email: '', password: '', role: 'USER' });
  const [showNewUserForm, setShowNewUserForm] = useState(false);

  // Fetch all users when component loads
  useEffect(() => {
    axios.get('/api/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  // Handle showing the new user form
  const handleNewUser = () => {
    setShowNewUserForm(true);
  };

  // Submit new user to the backend
  const submitNewUser = () => {
    axios.post('/api/users', newUser)
      .then(response => {
        setUsers([...users, response.data]);
        setShowNewUserForm(false);
        setNewUser({ username: '', email: '', password: '', role: 'USER' }); // Clear form
      })
      .catch(error => console.error('Error creating user:', error));
  };

  return (
    <div>
      <h1>User Management</h1>

      {/* Button to open the new user form */}
      <button type="button" onClick={handleNewUser}>New User</button>

      {/* New user form */}
      {showNewUserForm && (
        <div>
          <h3>Create New User</h3>
          <input 
            type="text" 
            placeholder="Username" 
            value={newUser.username} 
            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} 
          />
          <input 
            type="email" 
            placeholder="Email" 
            value={newUser.email} 
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={newUser.password} 
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} 
          />
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          >
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
          <button type="button" onClick={submitNewUser}>Submit</button>
        </div>
      )}

      {/* List of users */}
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.username} ({user.role}) - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;
