import axios from 'axios';
import React, { useState, useEffect } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Obtener la lista de usuarios desde el servidor
    axios.get('/api/users')
      .then(response => {
        setUsers(response.data);  // Asigna los datos al estado de usuarios
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  // Función para eliminar un usuario con confirmación
  const deleteUser = (userId) => {
    const confirmed = window.confirm('¿Estás seguro de que deseas eliminar este usuario?');
    if (confirmed) {
      axios.delete(`/api/users/${userId}`)
        .then(() => {
          // Eliminar el usuario del estado de la lista
          setUsers(users.filter(user => user.id !== userId));
        })
        .catch(error => {
          console.error('Error deleting user:', error);
        });
    }
  };

  // Función para cambiar el rol de un usuario
  const updateRole = (userId, newRole) => {
    axios.put(`/api/users/${userId}/role`, { role: newRole })
      .then(response => {
        // Actualizar el rol del usuario en el estado
        setUsers(users.map(user => 
          user.id === userId ? { ...user, role: newRole } : user
        ));
        console.log('Rol actualizado exitosamente');
      })
      .catch(error => {
        console.error('Error updating role:', error);
      });
  };

  return (
    <div>
      <h1>Usuarios</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
              <select 
              value={user.role} 
              onChange={(e) => updateRole(user.id, e.target.value)}
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
                </select>

              </td>
              <td>
                <button type="button" onClick={() => deleteUser(user.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;