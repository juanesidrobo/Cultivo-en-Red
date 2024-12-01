// src/screens/admin/ManageUsersScreen.js
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import UserCard from '../../components/admin/UserCard';

export default function ManageProductsScreen() {
  // Lista simulada de usuarios
  const [users, setUsers] = useState([
    { id: 1, name: 'Juan Pérez', email: 'juan.perez@example.com' },
    { id: 2, name: 'Ana López', email: 'ana.lopez@example.com' },
    { id: 3, name: 'Carlos Ruiz', email: 'carlos.ruiz@example.com' },
  ]);

  // Función para eliminar un usuario
  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  // Función para editar un usuario (simulación)
  const handleEdit = (id, updatedData) => {
    setUsers(users.map((user) => (user.id === id ? { ...user, ...updatedData } : user)));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestionar Usuarios</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <UserCard user={item} onDelete={handleDelete} onEdit={handleEdit} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
});
