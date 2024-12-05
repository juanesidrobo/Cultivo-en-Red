import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const MisPedidosScreen = ({ navigation, route }) => {
  const { total } = route.params; // Recibe el total enviado desde la pantalla anterior
  const facturas = [
    { id: '1', titulo: 'Factura 1', monto: '$40.000' },
    { id: '2', titulo: 'Factura 2', monto: '$30.000' },
  ];
  console.log(total);
  const renderFactura = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.facturaInfo}>
        <Text style={styles.facturaTitulo}>{item.titulo}</Text>
        <Text style={styles.facturaMonto}>$ {total}</Text>
      </View>
      <TouchableOpacity
        style={styles.detallesButton}
        onPress={() => navigation.navigate('EnviosCliente', { facturaId: item.id })}
      >
        <Text style={styles.detallesButtonText}>Detalles</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mis Pedidos</Text>
      <FlatList
        data={facturas}
        renderItem={renderFactura}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F8FF', // Fondo claro
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50', // Color verde
    marginBottom: 20,
    textAlign: 'center',
  },
  lista: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Sombra en Android
  },
  facturaInfo: {
    flex: 1,
  },
  facturaTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  facturaMonto: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50', // Color verde
  },
  detallesButton: {
    backgroundColor: '#4CAF50', // Color verde
    borderRadius: 15,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  detallesButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default MisPedidosScreen;
