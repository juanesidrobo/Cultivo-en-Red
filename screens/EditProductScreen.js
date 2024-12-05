import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

export default function EditProductScreen({ route, navigation }) {
  const { product, user } = route.params;
  const [productName, setProductName] = useState(product.nombre);
  const [price, setPrice] = useState(product.precio.toString());
  const [description, setDescription] = useState(product.descripcion);
  const [quantity, setQuantity] = useState(product.cantidadDisponible.toString());
  const [location, setLocation] = useState(product.direccion);
  const [loading, setLoading] = useState(false);
  console.log(product.codigo);
  const handleSaveChanges = async () => {
    setLoading(true);
    console.log("ID:"+product.codigo);
    //Permite actualizar los atributos del producto
    console.log("ID agricultor:"+user.id_agricultor);
    try {
      const response = await axios.put(`https://cultivo-en-red-1074366058014.us-east1.run.app/api/producto/${product.codigo}`, {
        id_agricultor: user.id_agricultor,
        nombre: productName,
        precio: parseFloat(price),
        descripcion: description,
        cantidadDisponible: parseInt(quantity),
        direccion: location,
      });

      Alert.alert("Producto Actualizado", "Los cambios se han guardado correctamente.");
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudieron guardar los cambios.");
    } finally {
      setLoading(false);
    }
  };
//permite eliminar un producto
  const handleDeleteProduct = async () => {
    Alert.alert(
      "Eliminar Producto",
      "¿Estás seguro de que deseas eliminar este producto?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          onPress: async () => {
            setLoading(true);
            try {
              await axios.delete(`https://cultivo-en-red-1074366058014.us-east1.run.app/api/producto/${product.codigo}?id_agricultor=${user.id_agricultor}`);
              Alert.alert("Producto Eliminado", "El producto ha sido eliminado correctamente.");
              navigation.goBack();
            } catch (error) {
              console.error(error);
              Alert.alert("Error", "No se pudo eliminar el producto.");
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Producto</Text>
      <Text style={styles.label}>Nombre del Producto</Text>
      <TextInput
        style={styles.input}
        value={productName}
        onChangeText={setProductName}
        placeholder="Nombre del producto"
      />
      <Text style={styles.label}>Precio</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        placeholder="Precio"
        keyboardType="numeric"
      />
      <Text style={styles.label}>Descripción</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Descripción"
      />
      <Text style={styles.label}>Cantidad Disponible</Text>
      <TextInput
        style={styles.input}
        value={quantity}
        onChangeText={setQuantity}
        placeholder="Cantidad disponible"
        keyboardType="numeric"
      />
      <Text style={styles.label}>Ubicación</Text>
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
        placeholder="Ubicación"
      />
      <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
        <Text style={styles.buttonText}>Guardar Cambios</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDeleteProduct}>
        <Text style={styles.buttonText}>Eliminar Producto</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  button: {
    padding: 15,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: '#FF3B3B',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
