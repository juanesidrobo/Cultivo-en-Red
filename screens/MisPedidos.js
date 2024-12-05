import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const MisPedidosScreen = ({ navigation, route }) => {
  const [facturas, setFacturas] = useState([
    { id: '1', titulo: 'Factura 1', monto: '$40.000' },
    { id: '2', titulo: 'Factura 2', monto: '$30.000' },
  ]);

  useEffect(() => {
    if (route.params?.total) {
      agregarNuevaFactura(route.params.total);
    }
  }, [route.params?.total]);

  const agregarNuevaFactura = (nuevoTotal) => {
    const nuevaFactura = {
      id: (facturas.length + 1).toString(),
      titulo: `Factura ${facturas.length + 1}`,
      monto: nuevoTotal,
    };
    setFacturas((prevFacturas) => [...prevFacturas, nuevaFactura]);
  };

  const renderFactura = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.facturaInfo}>
        <Text style={styles.facturaTitulo}>{item.titulo}</Text>
        <Text style={styles.facturaMonto}>{item.monto}</Text>
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
    backgroundColor: '#F5F8FF', 
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50', 
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
    elevation: 3, 
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
    color: '#4CAF50', 
  },
  detallesButton: {
    backgroundColor: '#4CAF50', 
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
