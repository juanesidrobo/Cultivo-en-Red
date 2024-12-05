import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';

const nequi = require('../assets/nequi.png');
const daviplata = require('../assets/daviaplata.png');
const bancolombia = require('../assets/bancolombia.png');
const mercadopago = require('../assets/mercadop.png');

export default function PaymentScreen({ route, navigation }) {
  const { total } = route.params; // Recibe el total enviado desde la pantalla anterior
  const [selectedPlatform, setSelectedPlatform] = useState('');

  const platforms = [
    { id: 'nequi', name: 'Nequi', image: nequi },
    { id: 'daviplata', name: 'Daviplata', image: daviplata },
    { id: 'bancolombia', name: 'Bancolombia', image: bancolombia },
    { id: 'mercadopago', name: 'MercadoPago', image: mercadopago },
  ];

  const handlePayment = () => {
    if (!selectedPlatform) {
      Alert.alert('Error', 'Por favor selecciona una plataforma de pago.');
      return;
    }

    // Simulación de pago
    Alert.alert(
      'Pago Exitoso',
      `Has pagado $${total} usando ${selectedPlatform}. ¡Gracias por tu compra!`,
      [
        {
          text: 'Aceptar',
          onPress: () => navigation.navigate('MisPedidos', { total }), // Navega a la pantalla MisPedidos
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona tu método de pago</Text>
      <Text style={styles.subtitle}>Total a pagar: ${total}</Text>

      <View style={styles.platformsContainer}>
        {platforms.map((platform) => (
          <TouchableOpacity
            key={platform.id}
            style={[
              styles.platformButton,
              selectedPlatform === platform.name && styles.selectedPlatform,
            ]}
            onPress={() => setSelectedPlatform(platform.name)}
          >
            <Image source={platform.image} style={styles.platformImage} />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
        <Text style={styles.payButtonText}>Pagar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    color: '#666',
  },
  platformsContainer: {
    width: '100%',
    marginBottom: 20,
  },
  platformButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100, // Asegurar que los botones sean uniformes
  },
  selectedPlatform: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  platformImage: {
    width: 80,
    height: 40,
    resizeMode: 'contain',
  },
  payButton: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    width: '100%',
  },
  payButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
