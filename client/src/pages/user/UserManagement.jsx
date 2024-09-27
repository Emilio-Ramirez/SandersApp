import axios from 'axios';
import React, { useState, useEffect } from 'react';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', email: '', password: '', role: 'USER' });
  const [showNewUserForm, setShowNewUserForm] = useState(false);

  // Obtener todos los usuarios cuando el componente se carga
  useEffect(() => {
    axios.get('/api/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  // Mostrar el formulario para nuevo usuario
  const handleNewUser = () => {
    setShowNewUserForm(true);
  };

  // Enviar los datos del nuevo usuario al backend
  const submitNewUser = () => {
    axios.post('/api/users', newUser)
      .then(response => {
        setUsers([...users, response.data]);
        setShowNewUserForm(false);
        setNewUser({ username: '', email: '', password: '', role: 'USER' }); // Limpiar formulario
      })
      .catch(error => console.error('Error creating user:', error));
  };

  return (
    <div>
      <h1>User Management</h1>

      {/* Botón para abrir el formulario de nuevo usuario */}
      <button type="button" onClick={handleNewUser}>New User</button>

      {/* Formulario para crear nuevo usuario */}
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

      {/* Lista de usuarios */}
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
