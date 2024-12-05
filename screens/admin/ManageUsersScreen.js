import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import UserCard from '../../components/admin/UserCard';
import CreateUserCard from '../../components/admin/CreateUserCard';

export default function ManageUsersScreen({ navigation, route }) {
  // Datos enviados desde AdminScreen
  const data = route.params?.users;

  // Estado de los usuarios
  const [users, setUsers] = useState(data || []);

  const handleCreateUser = async (newUser) => {
    try {
      const response = await axios.post('https://cultivo-en-red-1074366058014.us-east1.run.app/api/users', newUser);
      const { userId } = response.data;
      const createdUser = { id: userId, ...newUser };
  
      setUsers((prevUsers) => [...prevUsers, createdUser]);
      Alert.alert('Usuario Creado', 'El usuario se ha creado correctamente.');
    } catch (error) {
      console.error('Error al crear usuario:', error);
      if (error.response && error.response.data) {
        Alert.alert('Error', `No se pudo crear el usuario: ${error.response.data.message}`);
      } else {
        Alert.alert('Error', 'No se pudo crear el usuario. Verifica el servidor.');
      }
      throw error; // Re-lanza el error para permitir la depuración
    }
  };
  
  // Eliminar un usuario
  const handleDelete = async (username) => {
    try {
      await axios.delete(`https://cultivo-en-red-1074366058014.us-east1.run.app/api/users/${username}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.username !== username));
      Alert.alert('Usuario Eliminado', 'El usuario se ha eliminado correctamente.');
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      Alert.alert('Error', 'No se pudo eliminar el usuario.');
    }
  };
  

  const handleEdit = async (username, updatedData) => {
    try {
      await axios.put(`https://cultivo-en-red-1074366058014.us-east1.run.app/api/users/${username}`, updatedData);
      setUsers(users.map((user) => (user.username === username ? { ...user, ...updatedData } : user)));
      Alert.alert('Usuario Actualizado', 'El usuario se ha actualizado correctamente.');
    } catch (error) {
      console.error('Error al editar usuario:', error);
      Alert.alert('Error', 'No se pudo editar el usuario.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestionar Usuarios</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.username} // Usa `username` como clave
        ListHeaderComponent={<CreateUserCard onCreate={handleCreateUser} navigation={navigation} />}
        renderItem={({ item }) => (
          <UserCard
            user={item}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
});
