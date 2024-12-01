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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.bienvenido}>Bienvenido {userData.username} a</Text>
        <Text style={[styles.title, styles.greenText]}>CULTIVO en RED</Text>
        <Image source={tienda} style={{ width: 239, height: 180 }} />
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bienvenido: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    margin: 10,
  },
  greenText: {
    color: '#4CAF50',
  },
  button: {
    backgroundColor: '#4CAF50',
    width: '100%',
    height: 50,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});