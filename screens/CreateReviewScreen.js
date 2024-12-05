import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function CreateReviewScreen({ route, navigation }) {
    const { codigo_producto, cedula_cliente } = route.params; // Recibe el código de producto y la cédula del cliente
    const [numeroEstrellas, setNumeroEstrellas] = useState(0); // Cantidad de estrellas
    const [comentario, setComentario] = useState(''); // Comentario
  
    const handleSubmit = async () => {
      // Validar campos
      if (!numeroEstrellas || !comentario) {
        Alert.alert('Error', 'Por favor completa todos los campos.');
        return;
      }
  
      try {
        // Enviar la cédula como id_cliente
        const response = await axios.post('http://192.168.80.20:5000/api/resenas', {
          id_cliente: cedula_cliente, // Usa la cédula pasada desde HomeScreen
          codigo_producto,
          numero_estrellas: numeroEstrellas,
          comentario,
        });
        Alert.alert('Éxito', 'Reseña enviada con éxito.');
        navigation.goBack(); // Regresar a la pantalla anterior
      } catch (error) {
        console.error('Error al enviar la reseña:', error);
        Alert.alert('Error', 'Hubo un problema al enviar la reseña.');
      }
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Crea Reseña</Text>
        <Text style={styles.productName}>Producto ID: {codigo_producto}</Text>
        <Text style={styles.label}>Cantidad de estrellas:</Text>
        <View style={styles.starsContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity
              key={star}
              onPress={() => setNumeroEstrellas(star)}
              style={styles.starButton}
            >
              <Text style={numeroEstrellas >= star ? styles.selectedStar : styles.star}>
                ★
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.label}>Escribe un comentario:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Escribe tu comentario aquí..."
          value={comentario}
          onChangeText={setComentario}
          multiline
        />
        <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Enviar Reseña</Text>
        </TouchableOpacity>
      </View>
    );
  }
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5ba73b',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  starButton: {
    marginHorizontal: 5,
  },
  star: {
    fontSize: 30,
    color: '#bbb',
  },
  selectedStar: {
    fontSize: 30,
    color: '#FFD700', // Color dorado para las estrellas seleccionadas
  },
  textInput: {
    backgroundColor: '#e5e5e5',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5ba73b',
  },
});
