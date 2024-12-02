import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Button } from "native-base";
const tienda = require('../assets/tiendaLogin.png'); 
export default function AgricultorScreen({ navigation, route }) {
  const userData = route.params?.user;
  /* const handleLogin = () => {
    // Autenticación con Firebase o backend
    navigation.navigate('Home');
  }; */
  const handleAddProduct = () => {
    // Navega a la pantalla para añadir productos
    navigation.navigate("AddProduct");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>CULTIVO en RED</Text>
        <Text style={styles.welcomeText}>Bienvenido Agricultor {userData.username}!</Text>
      </View>

      {/* Botón para añadir producto */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
        <Text style={styles.addButtonText}>Añadir Producto</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  addButton: {
    backgroundColor: "transparent",
    borderColor: "#4CAF50",
    borderWidth: 2,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  addButtonText: {
    color: "#4CAF50",
    fontSize: 16,
    fontWeight: "bold",
  },
});