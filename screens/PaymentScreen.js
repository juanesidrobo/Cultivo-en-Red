import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';

export default function PaymentScreen({ route, navigation }) {
  const { total } = route.params; // Recibe el total enviado desde la pantalla anterior
  const [selectedPlatform, setSelectedPlatform] = useState('');

  const platforms = [
    { id: 'nequi', name: 'Nequi' },
    { id: 'daviplata', name: 'Daviplata' },
    { id: 'bancolombia', name: 'Bancolombia' },
    { id: 'mercadopago', name: 'MercadoPago' },
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
          onPress: () => navigation.goBack(), // Regresa a la pantalla anterior
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
            <Text style={styles.platformText}>{platform.name}</Text>
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
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
  },
  selectedPlatform: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  platformText: {
    fontSize: 16,
    color: '#333',
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

