import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

const AddProductScreen = ({navigation, route}) => {
  const [productName, setProductName] = useState('');
  const [location, setLocation] = useState('Vereda El Tunel, Popayán');
  const [quantity, setQuantity] = useState('44');
  const [price, setPrice] = useState('2');
  const [description, setDescription] = useState('Banano de excelente calidad');
  const [loading, setLoading] = useState(false);

  const handleAddProduct = async () => {
    const userData = route.params?.user;
    console.log('userData:', userData);
    console.log('Producto agregado:', {
      productName,
      location,
      quantity,
      price,
      description
    });
    setLoading(true);
    try{
        const response = await axios.post('https://cultivo-en-red-1074366058014.us-east1.run.app/api/producto', {
            id_agricultor: userData.id_agricultor,
            nombre: productName,
            precio: price,
            descripcion: description,
            cantidadDisponible: quantity,
            direccion: location,
        });
        const data = response.data;
        console.log(data);
        Alert.alert('Producto Agregado', 'El producto se ha agregado correctamente.');
        navigation.goBack();
    } catch (error) {
        console.error(error);
        Alert.alert('Error', 'No se pudo agregar el producto.');
    } finally {
        setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Agregar Producto</Text>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Nombre del Producto</Text>
        <TextInput
          style={[styles.input, styles.mb5]}
          placeholder="Nombre del producto"
          value={productName}
          onChangeText={setProductName}
        />
        
        <Text style={styles.label}>Ubicación</Text>
        <TextInput
          style={[styles.input, styles.mb10]}
          placeholder="Ubicación"
          value={location}
          onChangeText={setLocation}
        />
        <Text style={styles.label}>Cantidad Disponible</Text>
        <TextInput
          style={[styles.input, styles.mb10]}
          placeholder="Cantidad"
          value={quantity}
          onChangeText={setQuantity}
        />
        <Text style={styles.label}>Precio</Text>
        <TextInput
          style={[styles.input, styles.mb10]}
          placeholder="Precio"
          value={price}
          onChangeText={setPrice}
        />
        <Text style={styles.label}>Descripcion</Text>
        <TextInput
            style={[styles.input, styles.mb10]}
            placeholder="Descripcion"
            value={description}
            onChangeText={setDescription}
        />
        <TouchableOpacity
          style={[styles.button, loading && styles.buttonLoading]}
          onPress={handleAddProduct}
        >
          <Text style={styles.buttonText}>Agregar Producto</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    width: '100%',
    backgroundColor: '#5ba73b',
    paddingVertical: 20,
    alignItems: 'center',
    borderTopStartRadius: 35,
    borderTopEndRadius: 35,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  formContainer: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5ba73b',
    marginTop: 10,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  mb5: {
    marginBottom: 5,
  },
  mb10: {
    marginBottom: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#5ba73b',
    borderRadius: 10,
    marginHorizontal: 5,
  },
  selectedCategory: {
    backgroundColor: '#5ba73b',
  },
  categoryText: {
    fontSize: 14,
    color: '#5ba73b',
  },
  button: {
    backgroundColor: '#5ba73b',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonLoading: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default AddProductScreen;