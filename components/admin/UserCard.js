import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { VStack, HStack } from 'native-base';

export default function UserCard({ user, onDelete, onEdit }) {
  const [nombre, setNombre] = useState(user.nombre);
  const [telefono, setTelefono] = useState(user.telefono);
  const [direccion, setDireccion] = useState(user.direccion || '');
  const [rol, setRol] = useState(user.rol);

  const handleEditPress = () => {
    const updatedUser = {
      username: user.username,
      nombre,
      telefono,
      direccion: rol === 'cliente' ? direccion : null, // Dirección solo si el rol es cliente
      rol,
    };

    Alert.alert(
      'Confirmar Edición',
      '¿Estás seguro de que deseas actualizar este usuario?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Actualizar',
          onPress: () => onEdit(user.username, updatedUser),
        },
      ]
    );
  };

  const handleDeletePress = () => {
    Alert.alert(
      'Eliminar Usuario',
      `¿Estás seguro de que quieres eliminar a ${user.nombre}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', onPress: () => onDelete(user.username) },
      ]
    );
  };

  return (
    <View style={styles.card}>
      <VStack space={2}>
        <TextInput
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
          placeholder="Nombre"
        />
        <TextInput
          style={styles.input}
          value={telefono}
          onChangeText={setTelefono}
          placeholder="Teléfono"
          keyboardType="phone-pad"
        />
        {rol === 'cliente' && (
          <TextInput
            style={styles.input}
            value={direccion}
            onChangeText={setDireccion}
            placeholder="Dirección"
          />
        )}
        <Text>Rol: {rol}</Text>
      </VStack>
      <HStack space={2} style={styles.buttons}>
        <Button title="Editar" onPress={handleEditPress} />
        <Button title="Eliminar" color="red" onPress={handleDeletePress} />
      </HStack>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  buttons: { marginTop: 10 },
});
