// src/components/admin/UserCard.js
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, TextInput } from 'react-native';
import { VStack, HStack } from 'native-base';

export default function UserCard({ user, onDelete, onEdit }) {
  const handleEditPress = () => {
    Alert.prompt(
      'Editar Usuario',
      'Actualiza la información del usuario:',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Guardar',
          onPress: (newName) => {
            if (newName) {
              onEdit(user.id, { name: newName });
            }
          },
        },
      ],
      'plain-text',
      user.name
    );
  };

  const handleDeletePress = () => {
    Alert.alert(
      'Eliminar Usuario',
      `¿Estás seguro de que quieres eliminar a ${user.name}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', onPress: () => onDelete(user.id) },
      ]
    );
  };

  return (
    <View style={styles.card}>
      <VStack space={2}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
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
  name: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  email: { fontSize: 14, color: '#666' },
  buttons: { marginTop: 10 },
});
