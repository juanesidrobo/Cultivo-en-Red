import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const envio = require('../assets/envio.jpeg');
const EnviosClienteScreen = () => {
  // Datos de ejemplo
  const transportador = {
    nombre: "Jose Mario",
    placa: "LKJ 26L",
  };

  const estadoEnvio = [
    { id: 1, texto: "Transportador asignado", completo: true },
    { id: 2, texto: "Pedido Recogido", completo: true },
    { id: 3, texto: "El transportador se dirige a tu dirección", completo: true },
    { id: 4, texto: "Pedido entregado", completo: false },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Título */}
      <Text style={styles.titulo}>Detalles de tu envío</Text>

      {/* Imagen */}
      <Image source={envio} style={styles.imagen}/>

      {/* Información del transportador */}
      <View style={styles.transportadorInfo}>
        <Text style={styles.textoBold}>
          Transportador asignado:
        </Text>
        <Text style={styles.texto}>
          Tu transportador es <Text style={styles.textoBold}>{transportador.nombre}</Text>
        </Text>
        <Text style={styles.texto}>
          Placa: <Text style={styles.textoBold}>{transportador.placa}</Text>
        </Text>
      </View>

      {/* Línea de tiempo del envío */}
      <View style={styles.timeline}>
        {estadoEnvio.map((estado) => (
          <View key={estado.id} style={styles.timelineItem}>
            <View style={[styles.timelineMarker, estado.completo && styles.timelineMarkerComplete]} />
            <Text style={[styles.timelineTexto, estado.completo && styles.textoCompleto]}>
              {estado.texto}
            </Text>
          </View>
        ))}
      </View>

      {/* Botón de acción */}
      <TouchableOpacity style={styles.boton}>
        <Text style={styles.botonTexto}>Pedido Recibido</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 16,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginVertical: 16,
    textAlign: 'center',
  },
  imagen: {
    width: 272,
    height: 269,
    borderRadius: 10,
    marginBottom: 16,
  },
  transportadorInfo: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  texto: {
    fontSize: 14,
    color: '#4A4A4A',
    marginBottom: 4,
  },
  textoBold: {
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  timeline: {
    marginBottom: 16,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  timelineMarker: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#B0BEC5',
    marginRight: 8,
  },
  timelineMarkerComplete: {
    backgroundColor: '#2E7D32',
  },
  timelineTexto: {
    fontSize: 14,
    color: '#4A4A4A',
  },
  textoCompleto: {
    color: '#2E7D32',
  },
  boton: {
    backgroundColor: '#2E7D32',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  botonTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EnviosClienteScreen;