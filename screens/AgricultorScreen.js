import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

export default function AgricultorScreen({ navigation, route }) {
  const userData = route.params?.user; // Datos del agricultor
  const [productos, setProductos] = useState([]); // Lista de productos
  const [loading, setLoading] = useState(true); 

  // Función para obtener productos
  const fetchProductos = async () => {
    try {
      setLoading(true); 
      const response = await axios.get(`https://cultivo-en-red-1074366058014.us-east1.run.app/api/producto?id_agricultor=${userData.id_agricultor}`);
      setProductos(response.data); 
    } catch (error) {
      console.error("Error al cargar productos:", error);
    } finally {
      setLoading(false); 
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchProductos();
    }, []) 
  );

  const handleAddProduct = () => {
    navigation.navigate("AddProduct", { user: userData });
  };

  const handleEditProduct = (product) => {
    navigation.navigate("EditProduct", { user: userData, product });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>CULTIVO en RED</Text>
        <Text style={styles.welcomeText}>Bienvenido Agricultor {userData?.nombre}!</Text>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" /> 
      ) : (
        <View style={styles.productsContainer}>
          {productos.length > 0 ? (
            productos.map((product) => (
              <TouchableOpacity
                key={product.codigo}
                style={styles.productCard}
                onPress={() => handleEditProduct(product)}
              >
                <Text style={styles.productName}>{product.nombre}</Text>
                <Text style={styles.productPrice}>${product.precio}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noProducts}>No tienes productos registrados.</Text>
          )}
        </View>
      )}
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
  productsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  noProducts: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
  },
  productCard: {
    backgroundColor: "#fff",
    padding: 20,
    margin: 10,
    borderRadius: 10,
    width: 150,
    alignItems: "center",
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  productPrice: {
    fontSize: 14,
    color: "#4CAF50",
  },
});