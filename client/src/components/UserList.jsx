import axios from 'axios';
import React, { useState, useEffect } from 'react';

import EditRoleCard from '../sections/user/EditRoleCard'; 
import UserTableRow from '../sections/user/user-table-row';

function UserList() {
  const [users, setUsers] = useState([]);
  const [openEditRole, setOpenEditRole] = useState(false); // Estado para manejar el modal de roles
  const [selectedUser] = useState(null); // Usuario seleccionado para editar

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
        // Actualizar el rol del usuario en el estado local
        setUsers(users.map(user => 
          user.id === userId ? { ...user, role: newRole } : user
        ));
        console.log('Rol actualizado exitosamente en la base de datos');
      })
      .catch(error => {
        console.error('Error actualizando el rol:', error);
      });
  };
  

  // // Función para abrir el modal de editar roles
  // const handleEditRole = (user) => {
  //   setSelectedUser(user); // Establecer el usuario seleccionado
  //   setOpenEditRole(true); // Abrir el modal
  // };

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
            <UserTableRow
              key={user.id}
              user={user}
              onDelete={() => deleteUser(user.id)}
              onRoleChange={(newRole) => updateRole(user.id, newRole)}
            />
          ))}
        </tbody>
      </table>
      {selectedUser && (
        <EditRoleCard
          open={openEditRole}
          onClose={() => setOpenEditRole(false)}
          user={selectedUser}
          onRoleChange={updateRole} // Pasar la función para cambiar el rol
        />
      )}
    </div>
  );
}

export default UserList;